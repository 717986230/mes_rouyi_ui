<template>
    <!-- 计量单查询页 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="起始时间:" prop="startTime">
                <el-date-picker size="mini" v-model="queryParams.startTime" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:" prop="endTime">
                <el-date-picker size="mini" v-model="queryParams.endTime" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="单据状态:" prop="wgtDim">
                <el-select size="mini" v-model="queryParams.wgtDim" placeholder="单据状态" clearable>
                    <el-option v-for="dict in materialGrade" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="分组:" prop="group">
                <el-select size="mini" v-model="queryParams.group" placeholder="进出方向" clearable>
                    <el-option v-for="dict in groupType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="运输类型:" prop="transportType">
                <el-select size="mini" v-model="queryParams.transportType" placeholder="单据状态" clearable>
                    <el-option v-for="dict in TransporType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="进出方向:" prop="direction">
                <el-select size="mini" v-model="queryParams.direction" placeholder="进出方向" clearable>
                    <el-option v-for="dict in outIN" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="进出厂点:" prop="rank">
                <el-select size="mini" v-model="queryParams.rank" placeholder="进出厂点" clearable>
                    <el-option v-for="dict in materialGrade" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="物料:" prop="mtrlName">
                <el-input type="text" size="mini" v-model="queryParams.mtrlName" placeholder="物料" clearable
                    maxlength="30"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="dataList" border>
            <el-table-column fixed="left" type="index" width="50" align="center" />
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" label="单据编号" align="center" key="code" prop="code" />
            <el-table-column label="业务开始班次时间" align="center" sortable key="startTime" prop="startTime"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>
                        {{ dayjs(scope.row.startTime.substring(0, 23)).format("YYYY-MM-DD")  }} {{scope.row.startTime.substring(24, scope.row.startTime.length)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="业务结束班次时间" align="center" sortable key="endTime" prop="endTime"
                             :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                    <div>
                        {{ dayjs(scope.row.endTime.substring(0, 23)).format("YYYY-MM-DD")  }} {{scope.row.endTime.substring(24, scope.row.endTime.length)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="进出厂点" align="center" sortable key="inoutName" prop="inoutName"
                :show-overflow-tooltip="true" />
            <el-table-column label="主物料名称" align="center" sortable key="mtrlName" prop="mtrlName"
                :show-overflow-tooltip="true" />
            <el-table-column label="单据总量" align="center" sortable key="document" prop="document"
                :show-overflow-tooltip="true" />
            <el-table-column label="确认总量" align="center" sortable key="confirm" prop="confirm" />
            <el-table-column label="单据状态" align="center" sortable key="documentStatus" prop="documentStatus" />
            <el-table-column label="物料组分" align="center" sortable key="mtrlGrop" prop="mtrlGrop" />
            <el-table-column label="辅计量" align="center" sortable key="auxiliaryMetering" prop="auxiliaryMetering" />
            <el-table-column label="创建人" align="center" sortable key="createUser" prop="createUser" />
            <el-table-column label="创建时间" align="center" sortable key="createTime" prop="createTime">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column label="关闭人" align="center" sortable key="closeUser" prop="closeUser" />
            <el-table-column label="关闭时间" align="center" sortable key="closeTime" prop="closeTime">

            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="remark" prop="remark" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    name: "MeasurementSheetQueryPage",
    components: {},
    data() {
        return {

            groupType: [
                {
                    label: "按物料分组",
                    value: "0"
                },
                {
                    label: "按进出厂点分组",
                    value: "1"
                },
            ],
            outIN: [
                {
                    label: "进厂",
                    value: "0"
                },
                {
                    label: "出厂",
                    value: "1"
                },
            ],

            TransporType: [
                {
                    label: "管输",
                    value: "0"
                },
                {
                    label: "火车",
                    value: "1"
                },
                {
                    label: "汽车",
                    value: "2"
                },
                {
                    label: "轮船",
                    value: "3"
                }
            ],
            LocationId: [
                {
                    label: "石油焦库位",
                    value: "0"
                },
                {
                    label: "球状石油焦",
                    value: "1"
                }
            ],
            materialGrade: [
                {
                    label: "(空)",
                    value: "(空)"
                }, {
                    label: "破包料",
                    value: "破包料"
                }, {
                    label: "扫地料",
                    value: "扫地料"
                }, {
                    label: "等外品",
                    value: "等外品"
                }, {
                    label: "优等品",
                    value: "优等品"
                }, {
                    label: "一级品",
                    value: "一级品"
                }, {
                    label: "合格品",
                    value: "合格品"
                }, {
                    label: "废料",
                    value: "废料"
                },
                {
                    label: "无等级",
                    value: "无等级"
                },
                {
                    label: "未指定",
                    value: "未指定"
                },

            ],
            banCi: [{
                label: "物料",
                value: "0"
            }, {
                label: "辅料",
                value: "1"
            }],
            // 遮罩层
            loading: true,
            total: 0,
            dataList: [],
            // 查询参数
            queryParams: {
                "direction": "",
                "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "group": "",
                "mtrlName": "",
                "pageNum": 1,
                "pageSize": 10,
                "rank": "",
                "startTime": new Date(),
                "transportType": "",
                "wgtDim": "",
            },
            // 表单校验
            rules: {}
        };
    },
    watch: {},
    created() {
        this.getList();
    },
    mounted() { },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_gaugeTicketQuerySelece(this.queryParams).then(response => {
                if (response.code == 200) {
                    this.dataList = response.rows
                    this.total = response.total
                }
            }
            );
            this.loading = false;
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
    }
};
</script>
