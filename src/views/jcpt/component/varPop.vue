<template>
    <!-- 公式验证编辑 -->
    <div class="dialog-con">
        <el-dialog title="公式验证 / 编辑" :visible.sync="openGS" width="900px" center>
            <el-form ref="elForm" :model="PopForm" size="small" label-width="80px" label-position="left">
                <el-row :gutter='15' style="line-height: 50px;">
                    <div v-if="isshow" :class="isred ? 'isred' : 'isshowcss'">{{ showSave }}</div>
                    <div v-if="isooo" :class="isred ? 'isred' : 'isshowcss'"> {{ tigtext }}</div>
                </el-row>
                <el-row :gutter='15' style="line-height: 50px;">
                    <el-col :span="16">
                        <el-form-item label="函数:" prop="field101">
                            <el-input ref="textInput" @keydown="handleKeyDown" v-model="PopForm.field101" type="textarea"
                                placeholder="请输入函数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-button type="primary" size="medium" @click="Verification"> 验证 </el-button>
                    <el-button type="success" size="medium" @click="Save"> 保存 </el-button>
                    <el-button type="danger" size="medium" @click="Clear"> 清空 </el-button>
                </el-row>
                <el-row :gutter='15' style="line-height: 80px;margin-left: 80px;">
                    <el-button type="primary" size="medium" @click="PushWord(0)"> + </el-button>
                    <el-button type="primary" size="medium" @click="PushWord(1)"> - </el-button>
                    <el-button type="primary" size="medium" @click="PushWord(2)"> x </el-button>
                    <el-button type="primary" size="medium" @click="PushWord(3)"> / </el-button>
                    <el-button type="primary" size="medium" @click="PushWord(4)"> ( </el-button>
                    <el-button type="primary" size="medium" @click="PushWord(5)"> ) </el-button>
                </el-row>
                <el-row :gutter='15'>
                    <el-col :span="8">
                        <el-form-item label="界区类型:" prop="nodeAreaType">
                            <el-select v-model="PopForm.nodeAreaType" placeholder="界区类型" clearable>
                                <el-option v-for="dict in JQtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" prop="instrumentName">
                            <el-input v-model="PopForm.instrumentName" placeholder="请输入测试点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row :gutter="15">
                            <el-col :span="6">
                                <el-button type="primary" size="medium" @click="QueryList"> 查询 </el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter='15'>
                    <el-col :span="16">
                        <el-form-item label="观测点:" prop="field104" clearable>
                            <el-select v-model="PopForm.field104" placeholder="请选择观测点" clearable style="width:480px">
                                <el-option v-for="dict in CLDList" :key="dict.label" :label="dict.label"
                                    :value="dict.label" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div style="font-size: 50px;position: absolute;top:7px;">}</div>
                        <el-button style="margin-left: 30px;position: absolute;top: 20px;" type="primary" size="medium"
                            @click="VarMath"> 匹配 </el-button>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="函数:" prop="field105" clearable>
                            <el-select v-model="PopForm.field105" placeholder="请选择函数" clearable style="width:480px">
                                <el-option v-for="dict in hsList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="cancel">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "varPop",
    props: ['openGS', 'formTitle'],
    dicts: ['var_end'],
    data() {
        return {
            CLDList: [], //测量点列表
            JQtype: [],
            hsList: [
                { label: 'VAR', value: "VAR" },
                { label: 'DIFF', value: "DIFF" },
                { label: 'VAR2', value: "VAR2" },
                { label: 'VAR3', value: "VAR3" },
                { label: 'VAR4', value: "VAR4" }
            ],
            isshow: false,
            isooo: false,
            isred: false,
            tigtext: '',
            // 查询参数
            PopForm: {
                nodeAreaType: "-1",
                instrumentName: "",
                field101: "",
                field103: "",
                field104: "",
                field105: "",
            },
            isVer: false,//是否验证
        }
    },
    computed: {
        showSave() {
            if (
                this.isooo ||
                this.isred == false
            ) {
                return "保存成功"
            } else {
                return "请重试保存失败！"
            }
        }
    },
    created() {
        this.geti_formulaList()
        this.getOther()
        
    },
    watch: {
        CLDList(newLabel) {
            this.PopForm.field104 = newLabel[0].label;
        }
    },

    methods: {

        //界区类型
        getOther() {
            this.$api.i_formulaInstrumentList({
                "nodeAreaType": this.PopForm.nodeAreaType || "-1",
                "instrumentName": this.PopForm.instrumentName,
            }).then(res => {
                this.CLDList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                this.PopForm.field104 = this.CLDList[0].label
            });
            this.$api.i_nodeAreaType().then(res => {
                this.JQtype = [
                    { label: "全部", value: "-1" },
                    ...res.data.map(r => ({
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }))
                ];

            })
        },
        geti_formulaList() {
            this.$api.i_formulaList().then(res => {
                let data = res.data
                this.hsList = data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                this.PopForm.field105 = this.hsList[0].label
                console.log("获取列表", this.hsList);
            });
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); // 阻止光标移动事件默认行为
            }
        },
        //验证
        Verification() {
            // 吧参数传到接口里获取接口返回的验证结果
            this.$api.i_verify({ value: this.PopForm.field101 }).then(res => {
                if (res.code == 200) {
                    this.isooo = true
                    this.isred = false
                    this.isshow = false
                    if (this.PopForm.field101 == "") {
                        this.tigtext = ""
                        this.$message.error("请输入函数!")
                    } else {
                        this.tigtext = "验证通过"
                    }
                    this.isVer = true
                }
            }).catch(e => {
                this.isooo = true
                this.isred = true
                this.isshow = false
                this.tigtext = e.toString().substring(7)
            });
        },
        //子组件调用父组件修改方法
        submitToParent() {
            console.log(this.PopForm.field101, '子组件参数');
            this.$emit('submit-to-parent', this.PopForm.field101);
        },
        Save() {
            if (this.PopForm.field101 && this.isVer) {
                // code==200
                this.isooo = false
                this.isshow = true
                this.submitToParent()
                this.$message.success("保存成功")
            } else {
                this.$message.error("请输入并验证函数 !")
            }
        },
        Clear() {
            this.tigtext = ""
            this.isshow = false
            this.isVer = false
            this.PopForm.field101 = ""
        },
        QueryList() {
            this.$api.i_formulaInstrumentList({
                "nodeAreaType": this.PopForm.nodeAreaType || "-1",
                "instrumentName": this.PopForm.instrumentName,
            }).then(res => {
                this.CLDList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            });
            // 参数是界区类型和观测点 查询的是 观测点和函数的数据获取接口列表
        },
        VarMath() {

            //将选择的函数和观测点结合起来   VAR("1")  输入到函数输入框中
            if (this.PopForm.field105 && this.PopForm.field104) {
                let adds = ""
                let input = this.$refs.textInput.$refs.textarea;
                let startPos = input.selectionStart;
                let endPos = input.selectionEnd;
                let beforeText = this.PopForm.field101.substring(0, startPos);
                let afterText = this.PopForm.field101.substring(endPos);
                if (this.PopForm.field105 === "VAL BEG" || this.PopForm.field105 === "VAL END") {
                    let asd = this.PopForm.field105.slice(0, 3).trim()
                    let af = this.PopForm.field105.slice(3, 7).trim()
                    adds = asd + "(" + "'" + this.PopForm.field104 + "'" + ',' + af + ")"
                } else {
                    adds = this.PopForm.field105 + "(" + "'" + this.PopForm.field104 + "'" + ")"
                }
                this.PopForm.field101 = beforeText + adds + afterText;
                this.$forceUpdate();
                // Focus and move cursor
                this.$nextTick(() => {
                    input.focus();
                    // input.setSelectionRange(startPos, startPos + 1);
                });
            } else {
                this.$message.warning("请检测选项")
            }
        },
        cancel() {
            this.isVer = false
            this.$emit('close');
        },
        PushWord(e) {
            const input = this.$refs.textInput.$refs.textarea;
            const startPos = input.selectionStart;
            const endPos = input.selectionEnd;
            const beforeText = this.PopForm.field101.substring(0, startPos);
            const afterText = this.PopForm.field101.substring(endPos);
            this.PopForm.field101 = beforeText + this.getCharacterForIndex(e) + afterText;
            // Update Vue's reactivity
            this.$forceUpdate();
            // Focus and move cursor
            this.$nextTick(() => {
                input.focus();
                input.setSelectionRange(startPos + 1, startPos + 1);
            });
        },
        getCharacterForIndex(index) {
            switch (index) {
                case 0:
                    return "+";
                case 1:
                    return "-";
                case 2:
                    return '*';
                case 3:
                    return "/";
                case 4:
                    return "(";
                case 5:
                    return ")";
                default:
                    return "";
            }
        }
    },
}

</script>
<style lang="scss" scoped>
.dialog-con {
    .isshowcss {
        color: green;
        margin-left: 100px;
    }

    .isred {
        color: red;
        margin-left: 100px;
    }
}
</style>
