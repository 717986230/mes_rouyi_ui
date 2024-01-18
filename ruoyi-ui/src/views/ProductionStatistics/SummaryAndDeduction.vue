<template>
    <!-- 汇总及扣减 -->
    <div class="app-container">
        <el-card>
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                <el-form-item label="MES工厂:" prop="mesFctrId" style="margin-left: -20px;">
                    <el-select v-model="queryParams.mesFctrId" placeholder="MES工厂" clearable style="width: 180px;">
                        <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间:" prop="strTime">
                    <el-date-picker v-model="queryParams.strTime" type="date" placeholder="开始时间" style="width: 180px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:" prop="endTime">
                    <el-date-picker v-model="queryParams.endTime" type="date" placeholder="结束时间" style="width: 180px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="类型:" prop="factoryList">
                    <el-select v-model="queryParams.factoryList" placeholder="类型" clearable style="width: 180px;">
                        <el-option v-for="dict in datType" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <fieldset>
                <legend>
                    查询结果信息
                </legend>
                <el-row :gutter="10">
                    <el-col :span="11">
                        <el-button type="danger" plain size="mini" @click="handleDeleteMove"
                            :disabled="single_left">删除移动数据</el-button>
                        <el-table style="height: 500px;" border v-loading="loading" :data="dataListTC_left"
                            @selection-change="handleSelectionChange_left">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column label="开始时间" align="center" key="strTime" prop="strTime">
                                <template slot-scope="scope">
                                    {{ scope.row.strTime }}
                                </template>
                            </el-table-column>
                            <el-table-column label="结束时间" align="center" key="endTime" prop="endTime">
                                <template slot-scope="scope">
                                    {{ scope.row.endTime }}
                                </template>
                            </el-table-column>
                            <el-table-column label="汇总时间" align="center" key="countTime" prop="countTime">
                                <template slot-scope="scope">
                                    {{ scope.row.countTime }}
                                </template>
                            </el-table-column>
                            <el-table-column label="汇总人" align="center" key="per" prop="per" :show-overflow-tooltip="true">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="2" class="rebox">
                        <div>
                            <el-button class="rebox-x1" plain size="mini" @click="handlePlusadd"
                                :disabled="single_left">添加</el-button>
                            <el-button class="rebox-x2" plain size="mini" @click="handleRight"
                                :disabled="single_right">删除</el-button>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <el-table style="margin-top: 27px;height: 500px;" border v-loading="loading"
                            :data="dataListTC_right" @selection-change="handleSelectionChange_right">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column label="开始时间" align="center" key="strTime" prop="strTime">
                                <template slot-scope="scope">
                                    {{ scope.row.strTime }}
                                </template>
                            </el-table-column>
                            <el-table-column label="结束时间" align="center" key="endTime" prop="endTime">
                                <template slot-scope="scope">
                                    {{ scope.row.endTime }}
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" align="center" width="160"
                                class-name="small-padding fixed-width">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="text" icon="el-icon-edit"
                                        @click="handleUpdate(scope.row)">修改</el-button>
                                    <el-button size="mini" type="text" icon="el-icon-delete"
                                        @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </fieldset>
        </el-card>
        <el-card>
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="130px">
                <el-form-item label="合计开始时间:" prop="factoryList" style="margin-left: 280px;">
                    <el-date-picker v-model="queryParams.sumstrTime" type="date" placeholder="开始时间" style="width: 180px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合计结束时间:" prop="factoryList">
                    <el-date-picker v-model="queryParams.sumEndTime" type="date" placeholder="结束时间" style="width: 180px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button plain size="mini" @click="handleStart">开始</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "SummaryAndDeduction",
    data() {
        return {
            datType: [
                {
                    label: '全部',
                    value: '0'
                },
                {
                    label: '日',
                    value: '1'
                },
                {
                    label: '旬',
                    value: '2'
                },
                {
                    label: '月',
                    value: '3'
                },
                {
                    label: '年',
                    value: '4'
                },
                {
                    label: '其他',
                    value: '5'
                },
            ],
            checked1: false,
            activeName: 'first',
            open: false,
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            single_left: true,
            // 非多个禁用
            multiple: true,
            multiple_left: true,
            single_right: true,
            multiple_right: true,
            // 总条数
            total: 0,
            dataList: [],
            dataListTC: [],
            dataListTC_left: [],
            dataListTC_right: [],
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            FactoryList: [],//mes工厂
            // 查询参数
            queryParams: {
                sumstrTime: new Date(),
                sumEndTime: new Date(),
                factoryList: "0",
                "id": undefined,
                "isAsc": "",
                "mtrlId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "mesFactId": "1",
                "endTime": JSON.stringify(new Date(new Date())).slice(1, 11),
                "mesFctrId": "1",
                "strTime": JSON.stringify(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).slice(1, 11),
                "type": "1"
            },
            // 表单校验
            rules: {},

            iseditdata: [],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },

    methods: {
        //开始
        handleStart() {
            this.$message.success("开始");
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getOther() {
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.queryParams.mesFactId = this.FactoryList[0].value
            })
        },
        //添加
        handlePlusadd(row) {
            let uid = this.ids_left[0]
            let leftdata = this.dataListTC_left.filter(e => e.id == uid)[0]
            this.$api.P_summaryAndDeductionsAdd({
                "endTime": leftdata.endTime.slice(0, 10),
                "mesFctrId": this.queryParams.mesFctrId,
                "strTime": leftdata.strTime.slice(0, 10),
                "countTime": leftdata.countTime.slice(0, 10),
                "fcrtId": leftdata.fcrtId,
                "id": leftdata.id,
                "per": leftdata.per,
                "type": leftdata.type
            }).then(res => {
                this.$message.success("添加成功")//向右添加  视为删除
                this.getList()
            })

        },
        //删除
        handleRight(row) {
            let uid = this.ids_right[0]
            let rightdata = this.dataListTC_right.filter(e => e.id == uid)[0]
            this.$api.P_summaryAndDeductionsDelete({
                "countTime": rightdata.countTime.slice(0, 10),
                "endTime": rightdata.endTime.slice(0, 10),
                "fcrtId": rightdata.fcrtId,
                "id": rightdata.id,
                "per": rightdata.per,
                "strTime": rightdata.strTime.slice(0, 10),
                "type": rightdata.type,
            }).then(res => {
                this.$message.success("删除成功")
                this.getList()
            })
        },
        //保存
        handleSave() {
            function compareArrays(arr1, arr2) {
                // 比较数组长度
                if (arr1.length !== arr2.length) {
                    return "数组长度不相同";
                }
                for (let i = 0; i < arr1.length; i++) {
                    const item1 = arr1[i];
                    const item2 = arr2[i]
                    // 比较两个对象是否相同
                    if (JSON.stringify(item1) !== JSON.stringify(item2)) {
                        return `元素 ${i + 1} 有变化:\n${JSON.stringify(item1)}\n${JSON.stringify(item2)}`;
                    }
                }
                return false;
            }
            console.log(this.iseditdata, this.dataListTC);
            const isDataChanged = compareArrays(this.iseditdata, this.dataListTC);
            if (!isDataChanged) {
                this.$message.error("没有添加或修改需要保存的数据!")
            } else {
                this.$message.error("数据改变!")
            }
            let isEdit = false
            if (isEdit) {
                this.$message.error("没有添加或修改需要保存的数据!")
            }
        },
        //双击修改
        toggleRowVisibility(row) {
            row.Editable = true;
        },
        toggleRowVisibility1(row) {
            row.Editable1 = true;
        },
        //失焦事件
        handleBlur(row) {
            row.Editable = false;
        },
        handleBlur1(row) {
            row.Editable1 = false
        },


        /** 查询用户列表 */
        getList() {
            this.loading = true;

            this.$api.P_summaryAndDeductionsSelectL({
                "mesFactId": this.queryParams.mesFactId,
                "endTime": JSON.stringify(new Date(new Date())).slice(1, 11),
                "mesFctrId": this.queryParams.mesFctrId,
                "strTime": JSON.stringify(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).slice(1, 11),
                "type": this.queryParams.mesFctrId
            }).then(res => {
                this.dataListTC_left = res.data  // 左侧
            })
            this.$api.P_summaryAndDeductionsSelectR({
                "type": this.queryParams.type, "mesFactId": this.queryParams.mesFactId,
                "endTime": JSON.stringify(new Date(new Date())).slice(1, 11),
                "mesFctrId": this.queryParams.mesFctrId,
                "strTime": JSON.stringify(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).slice(1, 11),
            }).then(res => {
                this.dataListTC_right = res.data
            })
            this.loading = false
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
            this.$message.success("查询成功")
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
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleSelectionChange_left(selection) {
            this.ids_left = selection.map(item => item.id);
            this.single_left = selection.length != 1;
            this.multiple_left = !selection.length;
        },
        handleSelectionChange_right(selection) {
            this.ids_right = selection.map(item => item.id);
            this.single_right = selection.length != 1;
            this.multiple_right = !selection.length;
        },
        //删除移动数据
        handleDeleteMove() {
            const uid = this.ids_left[0];
            let leftdata = this.dataListTC_left.filter(e => e.id == uid)[0]
            this.$modal.confirm('是否确认删除"' + uid + '"的数据项？').then(() => {
                this.$api.P_summaryAndDeductionsDelete({
                    "countTime": leftdata.countTime.slice(0, 10),
                    "endTime": leftdata.endTime.slice(0, 10),
                    "fcrtId": leftdata.fcrtId,
                    "id": leftdata.id,
                    "per": leftdata.per,
                    "strTime": leftdata.strTime.slice(0, 10),
                    "type": leftdata.type,
                    "mesFctrId": this.queryParams.mesFctrId,
                })
            }).then((res) => {
                if (res.code == 200) {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }
            }).catch((err) => {
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const uid = row.id
            let rightdata = this.dataListTC_left.filter(e => e.id == uid)[0]
            this.$modal.confirm('是否确认删除"' + uid + '"的数据项？').then(() => {
                this.$api.P_summaryAndDeductionsDelete({
                    "countTime": rightdata.countTime.slice(0, 10),
                    "endTime": rightdata.endTime.slice(0, 10),
                    "fcrtId": rightdata.fcrtId,
                    "id": rightdata.id,
                    "per": rightdata.per,
                    "strTime": rightdata.strTime.slice(0, 10),
                    "type": rightdata.type,
                })
            }).then((res) => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch((err) => {
            });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 10px 10px 10px 10px !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}

.rebox {
    position: relative;
    height: 500px;

    .rebox-x1 {
        position: absolute;
        top: 100px;
        left: 28px;

    }

    .rebox-x2 {
        position: absolute;
        top: 200px;
        left: 15px
    }
}
</style>
