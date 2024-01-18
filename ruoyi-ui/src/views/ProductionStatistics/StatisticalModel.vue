<template>
    <!-- 统计模型 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="mesFctrId">
                <el-select size="mini" v-model="queryParams.mesFctrId" placeholder="MES工厂" clearable @change="handleToggle">
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="界区:" style="margin-left: -20px;" prop="areaId">
                <el-select size="mini" v-model="queryParams.areaId" placeholder="界区" clearable>
                    <el-option v-for="dict in limitZoneType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="节点:" style="margin-left: -20px;" prop="nodeId">
                <el-select size="mini" v-model="queryParams.nodeId" placeholder="节点" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" plain @click="handleQuery">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleChangTank"> 保存</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleBatchScale">重置平衡项</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleAdd">添加工厂模型</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleRenewal" :disabled="single">添加平衡项</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除</el-button>
            </el-col>
        </el-row>
        <el-table border v-loading="loading" :data="dataListTC" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.lists">
                            <el-table-column fixed="left" type="selection" align="center" />
                            <el-table-column label="检尺时间" align="center" prop="AftTime" width="130">
                                <template slot-scope="scope">
                                    {{ "2023-11-28" }}
                                </template>
                            </el-table-column>
                            <el-table-column label="检尺类型" align="center" prop="GaugeName" width="130">
                            </el-table-column>
                            <el-table-column label="物料" align="center" prop="mtrl" width="130">
                            </el-table-column>
                            <el-table-column label="别名" align="center" prop="DftFlg" width="130">
                            </el-table-column>
                            <el-table-column label="罐量" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="人工检尺高度" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="油温" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="密度" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="净油容积" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="仪表检尺" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="水尺高度" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="水容积" align="center" prop="Val" width="130">
                            </el-table-column>
                            <el-table-column label="含水率" align="center" prop="Val" width="130">
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="编码" align="center" key="code" prop="code">
            </el-table-column>
            <el-table-column label="来源节点" align="center" key="stNode" prop="stNode">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.stNode }}
                    </div>
                    <el-select placeholder="请选择" v-else v-model="scope.row.stNode" style="width: 100%;"
                        @change="handleBlur(scope.row)">
                        <el-option v-for="option in balanceItemsOptions" :key="option.value" :label="option.label"
                            :value="option.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="来源物料" align="center" key="strMtrl" prop="strMtrl">
                <template slot-scope="scope">
                    <div style="width: 100%;height: 50px;" @click="handleOpenSelect(scope.row)">
                        {{ scope.row.strMtrl }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="等级" align="center" key="tgGrade" prop="tgGrade">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.tgGrade }}
                    </div>
                    <el-select v-else v-model="scope.row.tgGrade" placeholder="请选择" style="width: 100%;"
                        @change="handleBlur(scope.row)">
                        <el-option v-for="option in balanceItemsOptions" :key="option.value" :label="option.label"
                            :value="option.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="目的节点" align="center" key="tgNode" prop="tgNode">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.tgNode }}
                    </div>
                    <el-select v-else v-model="scope.row.tgNode" placeholder="请选择" style="width: 100%;"
                        @change="handleBlur(scope.row)">
                        <el-option v-for="option in balanceItemsOptions" :key="option.value" :label="option.label"
                            :value="option.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="目的物料" width="100" sortable align="center" key="tgMtrl" prop="tgMtrl"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div style="width: 100%;height: 50px;" @click="handleOpenMaterialofpurpose(scope.row)">
                        {{ scope.row.tgMtrl }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="等级" sortable align="center" key="strGrade" prop="strGrade"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.strGrade }}
                    </div>
                    <el-select v-else v-model="scope.row.strGrade" placeholder="请选择" style="width: 100%;"
                        @change="handleBlur(scope.row)">
                        <el-option v-for="option in balanceItemsOptions" :key="option.value" :label="option.label"
                            :value="option.value"></el-option>
                    </el-select>
                </template></el-table-column>
            <el-table-column label="精度" sortable align="center" key="temperature2" prop="temperature2"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.NodeAlias }}
                    </div>
                    <el-select v-else v-model="scope.row.NodeAlias" placeholder="请选择" style="width: 100%;"
                        @change="handleBlur(scope.row)">
                        <el-option v-for="option in balanceItemsOptions" :key="option.value" :label="option.label"
                            :value="option.value"></el-option>
                    </el-select>
                </template></el-table-column>
            <el-table-column label="消耗" sortable align="center" key="consume" prop="consume" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" false-label="0" v-model="scope.row.consume"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="收方" align="center" key="decStr" prop="decStr"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" false-label="0" v-model="scope.row.decStr"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="公式" align="center" prop="formula" width="160"
                class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleUpdate(scope.row.formula)">特殊移动</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="公式:" prop="Formula">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="10">
                                    <el-input ref="textInput" @keydown="handleKeyDown" v-model="form.formula"
                                        :autosize="{ minRows: 16, maxRows: 16 }" type="textarea"
                                        placeholder="请输入函数"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <div class="buttons flex flex-direction align-center justify-around">
                                        <el-button class="el-botton" @click="calculate(0)">+</el-button>
                                        <el-button class="el-botton" @click="calculate(1)">-</el-button>
                                        <el-button class="el-botton" @click="calculate(2)">*</el-button>
                                        <el-button class="el-botton" @click="calculate(3)">/</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true"
                                        label-width="50px">
                                        <el-form-item label="装置:" prop="device" style="margin-top: 25px;">
                                            <el-select size="mini" style="width: 150px;height: 70px;"
                                                v-model="queryParams.device" placeholder="装置" clearable>
                                                <el-option v-for="dict in DevicelIST" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="侧线:" prop="cline">
                                            <el-select size="mini" style="width: 150px;height: 70px;"
                                                v-model="queryParams.cline" placeholder="侧线" clearable>
                                                <el-option v-for="dict in ClineList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="物料:" prop="mtrlId">
                                            <el-select size="mini" style="width: 150px;height: 70px;"
                                                v-model="queryParams.mtrlId" placeholder="物料" clearable>
                                                <el-option v-for="dict in MtrlIdList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="等级:" prop="factoryList">
                                            <el-select size="mini" style="width: 150px;height: 65px;"
                                                v-model="queryParams.factoryList" placeholder="等级" clearable>
                                                <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">清 除</el-button>
            </div>
        </el-dialog>
        <!-- 物料平衡 -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.open" width="30%">
            <div style="display: flex;justify-content: center;">
                <div style="line-height: 25px;">
                    物料名称:
                </div>
                <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" type="tel" maxlength="11" size="mini"
                    style="width:200px"></el-input>
                <el-button @click="handelTreeFilTer" type="success" size="mini">查询</el-button>
                <el-button @click="handelTreeFilTerReset" type="info" size="mini">重置</el-button>
            </div>
            <div class="treeboxflex">
                <el-tree :key="treeKey" style="height: 500px;overflow: auto;width: 100%;padding: 20px 40px" :data="MtrlTree"
                    :props="defaultProps" :expand-on-click-node="false"
                    :show-checkbox="dialog.type == 'update' ? false : true" :check-strictly="true"
                    :filter-node-method="filterNode" ref="MtrlTree" node-key="id" highlight-current @check="dialogCheck"
                    @node-click="dialogNodeClick" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="verify" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "StatisticalModel",
    data() {
        return {
            treeKey: 0,//弹窗树 refkey 用于重置 tree 组件
            dialog: {
                title: "",
                open: false,
                type: 'update',
                //当前选中节点
                currentSelectNode: null,
                //当前勾选节点 id
                checkedKeys: [],
                //当前勾选节点 data
                checkedNodes: [],
            },
            filterText: "",
            MtrlTree: [],//物料下拉列表
            balanceItemsOptions: [
                {
                    label: "aaaa",
                    value: "0"
                },
                {
                    label: "bbbb",
                    value: "1"
                }, {
                    label: "cccc",
                    value: "2"
                }, {
                    label: "dddd",
                    value: "3"
                }, {
                    label: "eeee",
                    value: "4"
                },
            ],
            limitZoneType: [
                {
                    label: "原料罐区",
                    value: "0"
                },
                {
                    label: "液体CPL产品罐区",
                    value: "1"
                },
                {
                    label: "苯甲醛罐区",
                    value: "2"
                },
                {
                    label: "苯甲酸罐区",
                    value: "3"
                },
                {
                    label: "CCA罐区",
                    value: "4"
                },
                {
                    label: "NTR罐区",
                    value: "5"
                },
                {
                    label: "酰胺油罐区",
                    value: "6"
                },
                {
                    label: "烟酸罐区",
                    value: "7"
                }
            ],
            mtrList: [],

            selectionlist: {},//选中数据
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            dataList: [],
            dataListTC: [],
            // 表单参数
            form: {
                formula: ""
            },
            FactoryList: [],//mes工厂
            expendSide: false,//消耗
            debitSide: false,//收方
            // 查询参数
            queryParams: {
                "areaId": "",
                "mesFctrId": "",
                "nodeId": ""
            },
            // 表单校验
            rules: {},
            open: false,
            title: "",
            //罐数据
            tankList: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            lineData: [],
            openselsetop: {},//选中弹窗后的数据
            selectedRow: null,
            newDate: [],// 深拷贝数据
            DevicelIST: [],//装置
            ClineList: [],//侧线
            MtrlIdList: [],//物料

        };
    },
    watch: {},
    created() {
        // this.getList();
        this.getTankList();
        this.getOther();
    },
    methods: {
        //弹窗 取消
        cancel() {
            this.form = {}
            this.open = false
        },
        //弹窗 确定
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.IndexDataId != undefined) {
                        this.msgSuccess('修改成功')
                        this.form = {}
                        this.open = false
                    } else {
                        this.msgSuccess('新增成功')
                        this.form = {}
                        this.open = false
                    }
                }
            });
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); // 阻止光标移动事件默认行为
            }
        },
        calculate(e) {
            const input = this.$refs.textInput.$refs.textarea;
            const startPos = input.selectionStart;
            const endPos = input.selectionEnd;
            const beforeText = this.form.formula.substring(0, startPos);
            const afterText = this.form.formula.substring(endPos);
            this.form.formula = beforeText + this.getCharacterForIndex(e) + afterText;
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
                default:
                    return "";
            }
        },
        //公式弹窗
        handleUpdate(row) {
            this.open = true
            this.title = "选择公式"
        },
        getOther() {
            //根据装置查侧线列表
            this.$api.i_sideLineALLList({
                "mesFctrId": "",
                "nodeName": "",
                "unitId": ""
            }).then(res => {
                this.ClineList = res.data.map(r => {
                    return {
                        label: r.nodeName,
                        value: r.id,
                    }
                })
            })
            //物料
            this.$api.i_mtrAllList().then(res => {
                this.MtrlIdList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //装置
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.DevicelIST = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //装置下的 侧线公式
            this.$api.InitSideName().then(res => {
                let beforeData = [
                    {
                        label: '进侧线总和',
                        value: `INSTREAM()`
                    },
                    {
                        label: '出侧线总和',
                        value: `OUTSTREAM()`
                    },
                    {
                        label: '消耗线总和',
                        value: `CONSPSTREAM()`
                    }
                ]
                let lineData = res.data.map(e => {
                    return {
                        label: e.SideLineAlias,
                        value: `STREAM(${e.SideLineAlias})`
                    }
                })
                this.lineData = beforeData.concat(lineData)
            })
            //物料下拉数据
            this.$api.LoadTreeData().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    // 递归函数，用于构建树形结构
                    function buildTree(data, parentId) {
                        const tree = [];
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].UpperMtrlCode == parentId) {
                                const node = {
                                    id: data[i].MtrlId,
                                    label: data[i].MtrlName,
                                    parentId: data[i].UpperMtrlCode,
                                };
                                const children = buildTree(data, data[i].MtrlCode);
                                if (children.length > 0) {
                                    node.children = children;
                                }
                                tree.push(node);
                            }
                        }
                        return tree;
                    }
                    this.MtrlTree = buildTree(res.data, 0);
                    console.log('物料树结构', this.MtrlTree)
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.queryParams.mesFctrId = this.FactoryList[0].value
            }),
                this.$api.i_mtrAllList().then((res) => {
                    if (res.code == 200) {
                        console.log('接口成功', res)
                        this.mtrList = res.data;
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                }).catch((err) => {
                    console.log('接口失败', err)
                })
        },
        dialogNodeClick(row) {
            console.log(row, '选中参数');
            console.log('弹窗参数', this.dialog)
            this.dialog.currentSelectNode = row
        },
        //来源物料点击弹窗
        handleOpenSelect(row) {
            this.dialog.open = true
            this.dialog.title = "来源物料"
            this.openselsetop = row
        },
        handleOpenMaterialofpurpose(row) {
            this.dialog.open = true
            this.dialog.title = "目的物料"
            this.openselsetop = row
            console.log(this.openselsetop, '   this.openselsetop');
        },
        //工厂切换
        handleToggle() {
            this.queryParams.mesFctrId = String(this.FactoryList[1].value)
            this.queryParams.areaId = String(this.FactoryList[2].value)
        },
        //保存
        handleChangTank() {
            this.$message.success("保存成功")
        },
        //重置平衡项
        handleBatchScale() {
            this.dataListTC = this.newDate
            this.$message.success("重置平衡项")
        },
        handleAdd() {
            //添加工厂模型
            // this.$api.P_countModelAddFctr().then(res => {
            //     if (res.code == 200) {
            //         this.$message.success("添加工厂成功")
            //     }
            // })
            const newParentRow = {
                "code": "编码",
                "consume": "消耗",
                "debit": "收方",
                "decStr": "1",
                "formula": "公式",
                "id": this.ids.length,
                "lists": [
                    {
                        "grade": "等级",
                        "id": undefined,
                        "itmeName": "平衡项名称",
                        "mainId": "主id",
                        "mecFctrName": "工厂名称",
                        "mtrl": "物料",
                        "nodeAreaName": "界区名称"
                    }
                ],
                "nodeId": "节点id",
                "stNode": "源节点",
                "strGrade": "源等级",
                "strMtrl": "源物料",
                "tgGrade": "目的等级",
                "tgMtrl": "目的物料",
                "tgNode": "目的节点"
            }
            this.dataList.unshift(newParentRow);
            this.dataListTC.unshift(newParentRow);
            this.total = this.dataListTC.length;
            this.$message.success("添加工厂模型");
        },
        //添加平衡项
        handleRenewal() {
            if (this.selectionlist[0]) {
                // this.$api.P_countModelAddItme().then(res => {
                //     if (res.code == 200) {
                //         this.$message.success("添加平衡项成功")
                //     }
                // })
                const newChildRow = {
                    Val: "3",
                    DftFlg: "2",
                    "GaugeName": "1",
                    "grade": "等级",
                    "id": this.selectionlist[0].lists.length + 1,
                    "itmeName": "平衡项名称",
                    "mainId": "主id",
                    "mecFctrName": "工厂名称",
                    "mtrl": "物料",
                    "nodeAreaName": "界区名称"
                };
                this.selectionlist[0].lists.push(newChildRow);
                console.log("参数ssss", this.selectionlist[0]);
                this.$message.success("添加平衡项");
            } else {
                this.$message.error("无法找到父级行对象");
            }
        },
        //s删除
        handleDelete() {
            let uid = this.ids[0]
            this.$modal.confirm('是否确认删除"' + uid + '"的数据项？').then(() => {
                return this.$api.P_countModelDelete({ id: uid })
            }).then(() => {
                // this.getList();
                this.dataListTC = this.dataListTC.filter(item => item.RecId !== uid)
                console.log(uid, "数据", this.dataListTC);
                return this.dataListTC
            }).catch(() => { });
            this.$message.success("删除")
        },
        //弹窗 筛选
        handelTreeFilTer() {
            this.$refs.MtrlTree.filter(this.filterText);
        },
        //弹窗 重置
        handelTreeFilTerReset() {
            this.filterText = ''
            this.$refs.MtrlTree.filter();
        },
        //弹窗取消
        Cancel() {
            this.dialog = {
                open: false,
                type: 'update',
                title: '',
                //当前选中节点
                currentSelectNode: null,
                //当前勾选节点 id
                checkedKeys: [],
                //当前勾选节点 data
                checkedNodes: [],
            }
        },
        dialogCheck(data, checked) {
            console.log('弹窗点击check的节点数据=', data)
            console.log('弹窗被选中的数据们=', checked)
            let { checkedKeys, checkedNodes } = checked
            this.dialog.checkedKeys = checkedKeys
            this.dialog.checkedNodes = checkedNodes
        },
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //弹窗确认
        verify() {
            this.dialog.open = false
            if (this.dialog.title == "来源物料") {
                this.openselsetop.MtrlAlias = this.dialog.currentSelectNode.label
            } else {
                this.openselsetop.Recstate4Self = this.dialog.currentSelectNode.label
            }
        },
        /** 查询用户列表 */
        getList() {
            // this.loading = true;
            // this.$api.P_countModelSelect(this.queryParams).then(res => {
            //     let List = res.list  //RecId
            //     let lists = res.lists  //ClsRecId
            //     let Listam = List.map(e => {
            //         return {
            //             ...e,
            //             lists: lists.filter(k => e.RecId == k.ClsRecId)
            //         }
            //     })
            //     this.dataList = Listam.map(p => {
            //         return {
            //             ...p,
            //             ...{
            //                 Editable: false,
            //                 Editable1: false,
            //                 lists: p.lists.map(r => {
            //                     return {
            //                         ...r,
            //                         ...{
            //                             editable: false,
            //                             editable1: false,
            //                         }
            //                     }
            //                 })
            //             }
            //         }
            //     })
            this.dataListTC = [
                {
                    "code": "编码",
                    "consume": "消耗",
                    "debit": "收方",
                    "decStr": "1",
                    "formula": "公式",
                    "id": 1,
                    "lists": [
                        {
                            "grade": "等级",
                            "id": undefined,
                            "itmeName": "平衡项名称",
                            "mainId": "11",
                            "mecFctrName": "工厂名称",
                            "mtrl": "物料",
                            "nodeAreaName": "界区名称"
                        }
                    ],
                    "nodeId": "节点id",
                    "stNode": "源节点",
                    "strGrade": "源等级",
                    "strMtrl": "源物料",
                    "tgGrade": "目的等级",
                    "tgMtrl": "目的物料",
                    "tgNode": "目的节点"
                },
                {
                    "code": "编码",
                    "consume": "消耗",
                    "debit": "收方",
                    "decStr": "2",
                    "formula": "公式",
                    "id": 2,
                    "lists": [
                        {
                            "grade": "等级",
                            "id": 22,
                            "itmeName": "平衡项名称",
                            "mainId": "主id",
                            "mecFctrName": "工厂名称",
                            "mtrl": "物料",
                            "nodeAreaName": "界区名称"
                        }
                    ],
                    "nodeId": "节点id",
                    "stNode": "源节点",
                    "strGrade": "源等级",
                    "strMtrl": "源物料",
                    "tgGrade": "目的等级",
                    "tgMtrl": "目的物料",
                    "tgNode": "目的节点"
                },
                {
                    "code": "编码",
                    "consume": "消耗",
                    "debit": "收方",
                    "decStr": "3",
                    "formula": "公式",
                    "id": 33,
                    "lists": [
                        {
                            "grade": "等级",
                            "id": undefined,
                            "itmeName": "平衡项名称",
                            "mainId": "33",
                            "mecFctrName": "工厂名称",
                            "mtrl": "物料",
                            "nodeAreaName": "界区名称"
                        }
                    ],
                    "nodeId": "节点id",
                    "stNode": "源节点",
                    "strGrade": "源等级",
                    "strMtrl": "源物料",
                    "tgGrade": "目的等级",
                    "tgMtrl": "目的物料",
                    "tgNode": "目的节点"
                },
                {
                    "code": "编码",
                    "consume": "消耗",
                    "debit": "收方",
                    "decStr": "2",
                    "formula": "公式",
                    "id": 4,
                    "lists": [
                        {
                            "grade": "等级",
                            "id": 44,
                            "itmeName": "平衡项名称",
                            "mainId": "主id",
                            "mecFctrName": "工厂名称",
                            "mtrl": "物料",
                            "nodeAreaName": "界区名称"
                        }
                    ],
                    "nodeId": "节点id",
                    "stNode": "源节点",
                    "strGrade": "源等级",
                    "strMtrl": "源物料",
                    "tgGrade": "目的等级",
                    "tgMtrl": "目的物料",
                    "tgNode": "目的节点"
                }

            ]
            this.newDate = JSON.parse(JSON.stringify(this.dataListTC));
            this.total = this.dataListTC.length
            this.loading = false;
            // }
            // );
        },
        //获取罐列表
        getTankList() {
            this.$api.i_stdCmmmCuabtankList().then((res) => {
                this.tankList = res.data.map(e => {
                    return {
                        label: e.tankName,
                        value: e.tankId
                    }
                })
            })
        },
        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "mtrlId": undefined,
                "temperature": "",
                "vcfVal": "",
                mtrlName: ""
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            console.log()
            this.queryParams = {
                ...this.queryParams,
                ...{
                    id: '',
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            console.log("选中参数", selection);
            this.selectionlist = selection
            console.log(selection, 'selection数据');
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        }
    }
};
</script>
<style lang="scss" >
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}

.buttons {
    height: 100%;

    .el-botton {
        width: 60px;
        color: black;
        font-size: 24px;
        font-weight: bold;
        text-align: justify;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-button+.el-button {
        margin-left: 0;
    }
}
</style>
