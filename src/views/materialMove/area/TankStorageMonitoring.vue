<template>
    <!-- 罐存监控-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="">
                <el-checkbox v-model="queryParams.checked">自动刷新</el-checkbox>
            </el-form-item>
            <el-form-item label="站号:" prop="movement">
                <el-select v-model="queryParams.movement" placeholder="站号" clearable>
                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="动静罐:" prop="tankArea">
                <el-select v-model="queryParams.tankArea" placeholder="动静罐" clearable>
                    <el-option v-for="dict in TankFarm" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="info" size="small" @click="handleRefresh">刷新</el-button>
            </el-form-item>
            <el-form-item label="刷新时间:" prop="time">
                <el-date-picker v-model="queryParams.time" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column fixed="left" width="100" label="标示" align="center" key="Identifier" prop="Identifier">
            </el-table-column>
            <el-table-column label="罐号" width="130" align="center" sortable key="tankNum" prop="tankNum"
                :show-overflow-tooltip="true" />
            <el-table-column label="油品名称" align="center" width="100" sortable key="oilName" prop="oilName"
                :show-overflow-tooltip="true" />
            <el-table-column label="合格状态" align="center" width="100" sortable key="qualificationStatus"
                prop="qualificationStatus" :show-overflow-tooltip="true" />
            <el-table-column label="收付目的地" align="center" width="130" sortable key="Payment " prop="Payment "
                :show-overflow-tooltip="true" />
            <el-table-column label="液位(m)" width="100" align="center" sortable key="liquidLevel" prop="liquidLevel"
                :show-overflow-tooltip="true" />
            <el-table-column label="油温(℃)" align="center" sortable key="oilTemperature" prop="oilTemperature" width="100" />
            <el-table-column label="油量流量(t/h)" align="center" sortable key="oilFlowRate" prop="oilFlowRate" width="130" />
            <el-table-column label="净油量(t)" align="center" sortable key="netOilAmount" prop="netOilAmount" width="100" />
            <el-table-column label="已收付量(t)" align="center" sortable key="amountPaidReceived" prop="amountPaidReceived"
                width="120" />
            <el-table-column label="密度(kg/m)" align="center" sortable prop="density" key="density" width="120">
            </el-table-column>
            <el-table-column label="体积流量(m3/h)" align="center" sortable key="volumeFlowRate" prop="volumeFlowRate"
                width="140" />
            <el-table-column label="合格日期" align="center" sortable key="Qualification " prop="Qualification " width="120" />
            <el-table-column label="水尺" align="center" sortable key="waterLevel" prop="waterLevel" width="120" />
            <el-table-column label="水份(%)" align="center" sortable key="waterContent" prop="waterContent" width="120" />
            <el-table-column label="气压(KPa)" align="center" sortable key="airPressure" prop="airPressure" width="120" />
            <el-table-column label="最大进流量(m3/h)" align="center" sortable key="maxInflow" prop="maxInflow" width="150" />
            <el-table-column label="最大出流量(m3/h)" align="center" sortable key="maxOutflow" prop="maxOutflow" width="150" />
            <el-table-column label="油体积(m3)" align="center" sortable key="oilVolume" prop="oilVolume" width="120" />
            <el-table-column label="收付操作" align="center" sortable key="paymentOperation" prop="paymentOperation"
                width="120" />
            <el-table-column label="气温(℃)" align="center" sortable key="airTemperature" prop="airTemperature" width="120" />
            <el-table-column fixed="right" label="备注" align="center" sortable key="remark" prop="remark" width="120" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "TankStorageMonitoring",
    components: {},
    watch: {
        "queryParams.checked": function (newValue) {
            // 在复选框状态变化时执行的操作
            //自动刷新
            if (newValue) {
                this.intervalId = setInterval(() => {
                    this.getList();
                    // 定时器回调函数
                }, 2000);
            } else {
                clearInterval(this.intervalId);
            }
        },
    },

    data() {
        return {
            TankFarm: [],//获取全部罐区
            Fulltank: [],//获取全部罐
            dataList: [],
            dataListTC: [],
            value1: new Date(),
            Banci: [{
                label: "油品0#罐区",
                value: "0"
            },
            {
                label: "油品1#罐区",
                value: "1"
            },
            {
                label: "油品2#罐区",
                value: "2"
            },
            {
                label: "油品3#罐区",
                value: "3"
            },
            {
                label: "油品4#罐区",
                value: "4"
            }, {
                label: "油品5#罐区",
                value: "5"
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
            // 总条数
            total: 0,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "checked": false,
                "movement": "",
                "tankArea": "",
                time: new Date(),
                pageNum: 1,
                pageSize: 10,
            },
            // 表单校验
            rules: {},
        };
    },
    beforeDestroy() {
        this.queryParams.checked = false;
        clearInterval(this.intervalId);
    },
    created() {
        this.getList();
        this.getOther();
    },
    mounted() { },
    methods: {


        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankStorageMonitoringSelece(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.dataListTC = res.data
                    this.total = res.total
                }
            }
            );
            this.loading = false;
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
                this.queryParams.tankfarm = this.TankFarm[0].value
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
                this.queryParams.tankArea = this.Fulltank[0].value
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
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
        //刷新
        handleRefresh() {
            this.getList()
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
</style>
