<template>
    <!--日数据解析-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期" @change="handleDateTime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="date">
                <div style="color: red;">{{ "您权限下仓库有用户正在盘点，暂时无法进行其它业务." }}</div>
            </el-form-item>
            <el-form-item style="margin-left: 300px;" label="" prop="date">
                <el-button type="success" plain size="mini" @click="handleAddRecode">解析并保存</el-button>
            </el-form-item>
            <el-form-item label="" prop="date">
                <el-button type="primary" plain size="mini" :disabled="!queryParams.LocationId"
                    @click="handleSaveRecode">提交至统计</el-button>
            </el-form-item>
            <el-form-item label="" prop="date">
                <el-button type="danger" plain size="mini" :disabled="!queryParams.LocationId"
                    @click="handleBeginInventory">撤销解析</el-button>
            </el-form-item>
        </el-form>

        <el-row :style="{ height: bodyHeight + 'px' }">
            <el-col :span="7" style="height: 100%;overflow: auto;">
                <el-card>
                    <div slot="header">
                        <span>解析浏览</span>
                    </div>
                    <el-table :height="bodyHeight-70" ref="multipleTable" border v-loading="loading" :data="dataList_left"
                        @row-click="handledataListUp">
                        <el-table-column label="日期" align="center" prop="date" :show-overflow-tooltip="true" />
                        <el-table-column label="状态" align="center" key="status" :show-overflow-tooltip="true" prop="status" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="17" style="height: 100%;overflow: auto">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left: 10px">
                    <el-tab-pane label="日库存" name="first">
                        <el-table ref="multipleTable" border v-loading="loading" :data="dataList">
                            <el-table-column label="" align="center" type="index" />
                            <el-table-column label="物料" align="center" key="LocationName" :show-overflow-tooltip="true"
                                width="200" prop="LocationName" />
                            <el-table-column label="质量等级" align="center" key="MtrlName" :show-overflow-tooltip="true"
                                width="200" prop="MtrlName" />
                            <el-table-column label="仓库" align="center" key="Rank" prop="Rank" />
                            <el-table-column label="重量(吨)" align="center" width="150" key="WgtPerPack" prop="WgtPerPack" />
                            <el-table-column label="创建人" align="center" key="WgtDim" prop="WgtDim" />
                            <el-table-column label="创建记录时间" align="center" width="150" key="Batch" prop="Batch" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="日移动" name="second">
                        <el-table ref="multipleTable" border v-loading="loading" :data="dataList">
                            <el-table-column label="" align="center" type="index" />
                            <el-table-column label="操作类型" align="center" key="LocationName" :show-overflow-tooltip="true"
                                width="200" prop="LocationName" />
                            <el-table-column label="来源" align="center" key="MtrlName" :show-overflow-tooltip="true"
                                width="200" prop="MtrlName" />
                            <el-table-column label="物料名称" align="center" key="Rank" prop="Rank" />
                            <el-table-column label="原质量等级" align="center" width="150" key="WgtPerPack" prop="WgtPerPack" />
                            <el-table-column label="重量(吨)" align="center" key="WgtDim" prop="WgtDim" />
                            <el-table-column label="去向" align="center" width="150" key="Batch" prop="Batch" />
                            <el-table-column label="目标物料名称" align="center" width="150" key="Batch1" prop="Batch1" />
                            <el-table-column label="目标质量等级" align="center" width="150" key="Batch2" prop="Batch2" />
                            <el-table-column label="运输方式" align="center" width="150" key="Batch3" prop="Batch3" />
                            <el-table-column label="创建人" align="center" width="150" key="Batch4" prop="Batch4" />
                            <el-table-column label="记录创建时间" align="center" width="150" key="Batch5" prop="Batch5" />
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "DailyDataAnalysis",
    components: {},
    data() {
        return {
            bodyHeight: 500,
            activeName: 'second',
            dialog: {
                open: false,
                title: '',
                type: 'user',
            },
            //库位下的物料列表
            MtrList: [],
            dataList_left: [],
            // 等级
            TgRankList: [],
            //重量单位
            WgtPerPackList: [],
            //弹窗中的 为保存列表
            newInventoryList: [],
            //弹窗列表 多选 ids集合
            ids: [],
            // 遮罩层
            loading: false,
            // 表格数据
            dataList: null,
            // 表单参数
            form: {
                CrtTime: '',//创建时间
                MtrlId: null,
                RankId: null,
                Dim: null,
            },
            // 查询参数
            queryParams: {
                date: new Date(),
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
        };
    },
    watch: {},
    created() {
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 180; // 减去 100px 的边距
        this.bodyHeight = maxDivHeight
    },
    methods: {
        handleDateTime(row) {
            this.getListleft()
        },
        handledataListUp() {
            this.getList()
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getOther() { },
        /** 查询列表 */
        getListleft() {
            if (this.queryParams.date) {
                const selectedDate = new Date(this.queryParams.date);
                const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                const testData = [];
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = selectedDate.getFullYear() + '年' + (selectedDate.getMonth() + 1) + '月' + day + '日';
                    const status = '状态' + day;
                    testData.push({ date, status });
                }
                this.dataList_left = testData;
            }
            console.log("日期", this.dataList_left);
        },
        getList() {
            this.loading = true;
            this.$api.GetCheckStockLists(this.queryParams).then(res => {
                if (res.code == 200) {
                    console.log(' 查询列表', res)
                    this.dataList = res.data
                    console.log('查询主数据成功', this.dataList)
                    this.loading = false;
                }
            }
            );
        },
        /*开始盘点按钮操作*/
        handleBeginInventory() {
            this.msgSuccess("开始盘点按钮操作成功");
        },
        /*取消盘点操作*/
        handleCancleInventory() {
            this.msgSuccess("取消盘点钮操作成功");
        },
        /*盘点管理*/
        handleInventoryManage() {
            this.dialog = {
                open: true,
                title: '盘点用户管理',
                type: 'user',
            }
        },
        /*新增记录*/
        handleAddRecode() {
            this.$modal.confirm('确定对当日数据进行解析操作?').then(() => {

            }).then(() => {
                this.$modal.msgSuccess("解析并保存");
            }).catch(() => { });
        },
        /*结束盘点*/
        handleEndInventory() {
            this.msgSuccess("结束盘点操作成功");
            this.dialog.open = false
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },

        /** 提交按钮 */
        submitForm: function () {
            this.dialog.open = false
            this.$modal.msgSuccess("保存成功");
            this.getList();
        },
        /*删除弹窗中的记录*/
        delForm() {
            this.ids.forEach(e => {
                this.newInventoryList.splice(e, 1)
            })
            this.$modal.msgSuccess("删除成功");
        },
        /*新增盘点记录*/
        AddMoveRecord() {
            this.$refs["formDialog"].validate(valid => {
                if (valid) {
                    console.log('业务单类型', this.form)
                    let { MtrlId, Batch, RankId, WgtPerPack, Dim, AmntOld, WgtOld, Location } = this.form
                    let newInventory = {
                        time: new Date().getTime(),
                        "MtrlId": MtrlId.value,
                        "MtrlName": MtrlId.label,
                        "Batch": Batch,
                        "WgtDimId": MtrlId.value,
                        "WgtDim": Dim.label,
                        "WgtPerPack": WgtPerPack,
                        "UserId": "admin",
                        "RankId": RankId.value,
                        "Rank": RankId.label,
                        "CrtTime": "/Date(1698115764000)/",
                        "BegShiftTime": "/Date(946684800000)/",
                        "EndShiftTime": "/Date(946728000000)/",
                        "LocationId": Location.LocationId,
                        "LocationName": Location.LocationName,
                        "AmntOld": AmntOld,
                        "WgtOld": WgtOld
                    }
                    this.newInventoryList.push(newInventory)
                }
            });
        },
        //
        handleSaveRecode() {
            this.dialog.open = false
            this.msgSuccess("保存成功");
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


