<template>
    <!-- 封账提交-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="time">
                <div class="block">
                    <el-date-picker style="width:150px" format="yyyy-MM-dd" v-model="queryParams.time" type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="班次" clearable>
                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐区:" prop="tankAreaId">
                <el-select v-model="queryParams.tankAreaId" placeholder="罐区" clearable>
                    <el-option v-for="dict in TankFarm" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="PartialSubmission">部分提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="SubmitAll">全部提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="PartialRelease" :disabled="single">部分解除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="FullRelease">全部解除</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" style="width: 100%;margin-bottom: 20px;" border :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.detailsList" :row-class-name="tableRowClassName">
                            <el-table-column fixed="left" type="index" align="center" />
                            <el-table-column label="操作类型" align="center" prop="GaugeType" width="130" />
                            <el-table-column label="对方节点名称" align="center" prop="GaugeName" width="130">
                            </el-table-column>
                            <el-table-column label="开始时间" align="center" prop="PreVal" width="130">
                            </el-table-column>
                            <el-table-column label="结束时间" align="center" prop="DftFlg" width="130">
                            </el-table-column>
                            <el-table-column label="节点值" align="center" prop="AftTime" width="130">
                                <template slot-scope="scope">
                                    {{ convertTimestampToDateFormat(scope.row.AftTime) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="是否可提交" align="center" key="isSubmit" prop="isSubmit" sortable>
            </el-table-column>
            <el-table-column label="节点名称" align="center" sortable key="nodeName" prop="nodeName"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料" align="center" sortable key="mtrl" prop="mtrl" :show-overflow-tooltip="true" />
            <el-table-column label="提交状态" align="center" sortable key="submissionStatus" prop="submissionStatus"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.FormulaData == 0 ? "未提交" : "已提交" }}
                </template>
            </el-table-column>
            <el-table-column label="提交人" align="center" sortable key="submitter" prop="submitter"
                :show-overflow-tooltip="true" />
            <el-table-column label="解除提交人" align="center" sortable key="contactSubmitter" prop="contactSubmitter"
                :show-overflow-tooltip="true" />
            <el-table-column label="提交时间" align="center" sortable key="submitTime" prop="submitTime">
                <template slot-scope="scope">
                    {{ scope.row.submitTime }}
                </template>
            </el-table-column>
            <el-table-column label="解除提交时间" align="center" sortable key="contactSubmitTime" prop="contactSubmitTime">
                <template slot-scope="scope">
                    {{ scope.row.contactSubmitTime }}
                </template>
            </el-table-column>
            <el-table-column label="罐收付" align="center" sortable key="tankPaymentReceipt" prop="tankPaymentReceipt" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "ClosedAccountSubmission",
    components: {},
    data() {
        return {
            expands: [], // 只展开一行放入当前行id
            getRowKeys: (row) => { // 获取当前行id
                return row.RecId || ''; // 这里看这一行中需要根据哪个属性值是id
            },
            TankFarm: [],//获取全部罐区
            Fulltank: [],//获取全部罐
            dataList: [],
            dataListTC: [],
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],

            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "classes": "0",
                "tankAreaId": "2",
                "time": new Date(),
            },
            // 表单校验
            rules: {},
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() { },
    methods: {

        convertTimestampToDateFormat(timestamp) {
            // 提取时间戳
            const timestampValue = parseInt(timestamp.replace(/[^0-9]/g, ''));
            // 创建Date对象
            const date = new Date(timestampValue);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 注意月份是从0开始的，需要加1
            const day = String(date.getDate()).padStart(2, '0');
            // 拼接成 "yyyy-MM-dd" 格式
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        },
        //表格变色的方法
        tableRowClassName({ row, rowIndex }) {
            if (row.SmtState === 0) {
                return 'warning-row';
            } else if (row.SmtState === 1) {
                return 'success-row';
            }
            return '';
        },
        //全部解除
        FullRelease() {
            this.$message.success("全部解除")

            const userIds = row.id || this.ids[0];
            this.$modal.confirm('没有操作数据').then(() => {
                this.$api.i_mtrlTemVcfDel({ id: userIds })
            }).then(() => {
            }).catch(() => { });
        },
        //部分解除
        PartialRelease(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('请选择一条封帐记录').then(() => {
                // this.$api.i_mtrlTemVcfDel({ id: userIds })
            }).then(() => {
                this.$message.success("解除成功")
            }).catch(() => { });
        },
        //全部提交
        SubmitAll() {
            this.$message.success("全部提交")
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('未到末班,不能操作').then(() => {
                this.$api.i_mtrlTemVcfDel({ id: userIds })
            }).then(() => {
            }).catch(() => { });
        },
        //部分提交
        PartialSubmission() {
            this.$message.success("部分提交")
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('未到末班,不能操作').then(() => {
                this.$api.i_mtrlTemVcfDel({ id: userIds })
            }).then(() => {
            }).catch(() => { });
        },
        //仪表名称 改变
        selectBlur(e, row) {
            console.log('仪表名称 改变', e)
            console.log('仪表名称 改变', row)
            this.$modal.msgWarning("仪表已改变。请检查对应的侧线和物料信息是否正确。");
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_sealSelece({
                ...this.queryParams,
                time: JSON.stringify(new Date(this.queryParams.time)).slice(1, 11)
            }).then(res => {
                if (res.code == 200) {
                    this.dataList = res.rows
                    this.total = res.total
                }
            }
            );
            this.loading = false;
            this.$message.success("获取数据成功")
        },
        getOther() {
            //获取全部罐区
            this.$api.i_tankAreaAll().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: ' ' };
                // 将 "全部" 选项添加到数组的开头
                this.TankFarm = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tankAreaId = this.TankFarm[1].value
            })
            //获取全部罐
            this.$api.i_tankAllList({
                "tankAreaId": ""
            }).then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: " " };
                // 将 "全部" 选项添加到数组的开头
                this.Fulltank = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tank = this.Fulltank[0].value
            })
        },
        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "des": "",
                "capacity": 0,
                "unitNum": "",
                "useFlag": "1",
                "sectorId": "",
                "unitCode": "",
                "unitName": "",
                "unitAlias": "",
                "nodeAreaId": "",
                "unitTypeId": "",
                "upperUnitId": "",
                "displayOrder": "1000",
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
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}

::v-deep .el-table .warning-row {
    color: red;
}

::v-deep .el-table .success-row {
    color: black;

}
</style>
