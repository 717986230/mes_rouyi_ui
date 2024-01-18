<template>
    <!-- 解析器展示 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="MES工厂:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择状态" clearable>
                    <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-close" size="mini" @click="handleUnSubmit">解除提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleSubmitForInspection">提交检查</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleMissingCheck">缺失检查</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-upload2" size="mini"
                    @click="handleEmptySubmit">空提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-position" size="mini" @click="handleSubmit">提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-set-up" size="mini" @click="handleAnalysis">解析</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleDelete">删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-delete" size="mini" @click="handleExport">导出
                </el-button>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" v-if="dataList && dataList.length > 0" border v-loading="loading" :data="dataList"
            @selection-change="handleSelectionChange" :row-key="getRowKeys" :expand-row-keys="expands"
            @expand-change="expandColumn">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.ListSub">
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="移动记录ID" align="center" width="200" key="MtrlNodeDataId"
                                prop="MtrlNodeDataId" />
                            <el-table-column label="节点名称" align="center" width="200" key="NodeName" prop="NodeName" />
                            <el-table-column label="原始量" align="center" width="200" key="NodeRawVal" prop="NodeRawVal" />
                            <el-table-column label="前量" align="center" width="200" key="NodePreRaw" prop="NodePreRaw" />
                            <el-table-column label="前量时间" align="center" width="200" key="NodePreTime" prop="NodePreTime" />
                            <el-table-column label="后量" align="center" width="200" key="NodeAftRaw" prop="NodeAftRaw" />
                            <el-table-column label="后量时间" align="center" width="200" key="NodeAftTime" prop="NodeAftTime" />
                            <el-table-column label="提交" align="center" width="200" key="IsCmtFlg" prop="IsCmtFlg" />
                            <el-table-column label="存在" align="center" width="200" key="IsExistFlg" prop="IsExistFlg" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="源" align="center" key="SrState" prop="SrState" width="120">
                <template slot-scope="scope">
                    <div style="color: orange">
                        ▲{{ scope.row.SrState | SrAndTgFilter }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="目的" align="center" key="TgState" prop="TgState" width="150">
                <template slot-scope="scope">
                    <div style="color: orange">
                        ▲{{ scope.row.TgState | SrAndTgFilter }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="移动类型" align="center" key="MoveTypeName" prop="MoveTypeName" width="150" />
            <el-table-column label="移动记录ID" align="center" key="MtrlMoveDataId" prop="MtrlMoveDataId" width="120" />
            <el-table-column label="源节点名称" align="center" key="SrNodeName" prop="SrNodeName" width="120" />
            <el-table-column label="目的节点名称" align="center" key="TgNodeName" prop="TgNodeName" width="120" />
            <el-table-column label="原物料名称" align="center" key="SrMtrlName" prop="SrMtrlName" width="120" />
            <el-table-column label="目的物料名称" align="center" key="TgMtrlName" prop="TgMtrlName" width="120" />
            <el-table-column label="移动开始时间" align="center" key="MoveBegTime" prop="MoveBegTime" width="150" />
            <el-table-column label="移动结束时间" align="center" key="MoveEndTime" prop="MoveEndTime" width="150" />
            <el-table-column label="源节点变化量" align="center" key="SrRawVal" prop="SrRawVal" width="120" />
            <el-table-column label="目的节点变化量" align="center" key="TgRawVal" prop="TgRawVal" width="120" />
            <el-table-column label="MES工厂名称" align="center" key="Mfn" prop="Mfn" width="120" />
        </el-table>
    </div>
</template>
<script>
export default {
    name: "parser",
    components: {},
    filters: {
        SrAndTgFilter(val) {
            switch (val) {
                case '02':
                    return 'C'
                case '03':
                    return 'G'
                case '05':
                    return 'G'
                case '06':
                    return 'H'
                default:
                    break;
            }
        },
    },
    data() {
        return {
            banCi: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            //mes工厂下拉列表
            mesFactory: [
                {
                    label: '石炼化',
                    value: '1'
                },
                {
                    label: '石化纤',
                    value: '2'
                }
            ],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 表格数据
            dataList: null,
            // 表单参数
            form: {
                CrtTime: '',//创建时间
            },
            // 查询参数
            queryParams: {
                "isAsc": "",
                "pageNum": 1,
                "pageSize": 10,
                "mesWspId": "",
                "mesFctrName": "",
                "nodeAreaCode": "",
                "unitAreaName": "",
                "reasonable": true,
                "orderByColumn": "",
                "unitAreaAlias": "",
            },
            // 表单校验
            rules: {
                UnitRdType: [
                    { required: true, message: "请选择操作类型", trigger: "blur" },
                ],
            },
            expands: [], // 只展开一行放入当前行id
            getRowKeys: (row) => { // 获取当前行id
                return row.MtrlMoveDataId || ''; // 这里看这一行中需要根据哪个属性值是id
            },
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //班次下拉数据
            this.$api.classes().then(res => {
                this.banCi = res.data.map(r => {
                    return {
                        label: r.ShiftText,
                        value: r.ShiftId,
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            //主数据
            this.$api.GetQueryData().then((res) => {
                if (res.code == 200) {
                    this.dataList = res.data
                    console.log('页面主数据', this.dataList)
                    this.loading = false;
                }
            }).catch(err => {
                this.loading = false;
            })
        },

        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.MtrlMoveDataId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        // 解除提交
        handleUnSubmit() {
        },
        // 提交检查
        handleSubmitForInspection() {
        },
        // 缺失检查
        handleMissingCheck() {
        },
        // 空提交
        handleEmptySubmit() {
        },
        // 提交
        handleSubmit() {
        },
        // 解析
        handleAnalysis() {
        },
        // 导出
        handleExport() {
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + this.ids + '"的数据项？').then(() => {

            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        //只展开一行
        expandColumn(row, expandedRows) {
            // 每次只展开一行
            let that = this;
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.MtrlMoveDataId)
                    this.single = false;
                }
            } else {
                that.expands = []
                this.single = true;
            }
        },


    }
};
</script>
<style scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}
</style>

