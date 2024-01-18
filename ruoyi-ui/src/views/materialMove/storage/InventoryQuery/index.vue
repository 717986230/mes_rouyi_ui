<template>
    <!-- 库存查询 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="60px">
            <el-form-item label="仓库:" prop="StockIds">
                <el-select size="mini" v-model="queryParams.StockIds" placeholder="仓库" clearable>
                    <el-option v-for="dict in LocationId" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="库位:" prop="LocationIds">
                <el-select size="mini" v-model="queryParams.LocationIds" placeholder="库位" clearable>
                    <el-option v-for="dict in LocationId" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="等级:" prop="RankIds">
                <el-select size="mini" v-model="queryParams.RankIds" placeholder="等级" clearable>
                    <el-option v-for="dict in materialGrade" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="批次:" prop="Batches">
                <el-input type="text" size="mini" v-model="queryParams.Batches" placeholder="批次"></el-input>
            </el-form-item>
            <el-form-item label="规格:" prop="WgtPerPacks">
                <el-input type="text" size="mini" v-model="queryParams.WgtPerPacks" placeholder="规格"></el-input>
            </el-form-item>
            <el-form-item label="物料:" prop="MtrlNames">
                <el-input type="text" size="mini" v-model="queryParams.MtrlNames" placeholder="物料"></el-input>
            </el-form-item>
            <el-form-item label="日期:" prop="SelDate">
                <el-date-picker size="mini" v-model="queryParams.SelDate" type="date" placeholder="日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="UserId">
                <el-select size="mini" v-model="queryParams.UserId" placeholder="班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="dataList" border :summary-method="getSummaries" show-summary>
            <el-table-column fixed="left" type="index" width="50" align="center" />
            <el-table-column fixed="left" label="库位" align="center" key="LocationName" prop="LocationName" />
            <el-table-column label="物料名称" align="center" sortable key="MtrlName" prop="MtrlName"
                :show-overflow-tooltip="true" />
            <el-table-column label="批次" align="center" sortable key="Batch" prop="Batch" :show-overflow-tooltip="true" />
            <el-table-column label="等级" align="center" sortable key="Rank" prop="Rank" :show-overflow-tooltip="true" />
            <el-table-column label="单件重(KG)" align="center" sortable key="WgtPerPack" prop="WgtPerPack"
                :show-overflow-tooltip="true" />
            <el-table-column label="件数" align="center" sortable key="AmntAftBook" prop="AmntAftBook"
                :show-overflow-tooltip="true" />
            <el-table-column label="重量" align="center" sortable key="WgtAftBook" prop="WgtAftBook" />
            <el-table-column label="单位" align="center" sortable key="WgtDim" prop="WgtDim" />
            <el-table-column label="更新班次" align="center" sortable key="EndShiftTime" prop="EndShiftTime" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "InventoryQuery",
    components: {},
    data() {
        return {
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
            banCi: [],
            // 遮罩层
            loading: true,
            total: 0,
            dataList: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 20,
                Batches: "",
                LocationIds: "",
                MtrlNames: "",
                RankIds: "",
                SelDate: new Date(),
                StockIds: "",
                UserId: "",
                WgtPerPacks: "",
            },
            // 表单校验
            rules: {}
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },
    mounted() {

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
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.QueryInventorys(this.queryParams).then(response => {
                this.dataList = response.list
                this.total = response.list.length;
                this.loading = false;
            }
            );

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
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            console.log('总计操作', columns, data)
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                if (index === 7) {
                    const values = data.map(item => Number(item[column.property]));
                    console.log('values == ', values)
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' ';
                    } else {
                        sums[index] = 'N/A';
                    }
                }
                if (index === 0 && index === 7) {
                    sums[index] = ''
                }
            });
            return sums;
        }
    }
};
</script>
