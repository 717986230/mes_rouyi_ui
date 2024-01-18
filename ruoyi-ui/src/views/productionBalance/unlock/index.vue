<template>
    <!-- 通用解锁 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择状态" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择执行时间" clearable>
                    <el-option v-for="dict in statusOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery" plain>搜索</el-button>
                <el-button size="mini" @click="resetQuery" plain>重置</el-button>
                <el-button type="warning" size="mini" @click="handleUnlock" plain>
                    <svg-icon class-name="lock-icon" icon-class="lock-on" />
                    解锁
                </el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="card" :style="{ height: tabsHeight + 'px' }">
            <el-tab-pane label="罐解锁" name="1" class="h-100">
                <tank params="queryParams"></tank>
            </el-tab-pane>
            <el-tab-pane label="装置解锁" name="2" class="h-100">
                <device params="queryParams"></device>
            </el-tab-pane>
            <el-tab-pane label="进出厂班量" name="3" class="h-100">
                <class-size params="queryParams"></class-size>
            </el-tab-pane>
            <el-tab-pane label="进出厂计量单" name="4" class="h-100">
                <metering-form params="queryParams"></metering-form>
            </el-tab-pane>
            <el-tab-pane label="互供解锁" name="5" class="h-100">
                <interchange-unlock params="queryParams"></interchange-unlock>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

import Device from './common/Device'
import Tank from './common/Tank'
import ClassSize from './common/ClassSize'
import MeteringForm from './common/MeteringForm'
import InterchangeUnlock from './common/InterchangeUnlock'
export default {
    name: "productionBalance2",
    components: { InterchangeUnlock, MeteringForm, ClassSize, Tank, Device },
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
            FactoryList: [],
            statusOption: [
                {
                    label: '已锁定',
                    value: '1'
                },
                {
                    label: '未锁定',
                    value: '2'
                }
            ],
            //页签选中项
            activeName: '1',
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
            //tabs 高度
            tabsHeight: 500
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 180; // 减去 100px 的边距
        this.tabsHeight = maxDivHeight
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
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
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
        /** 解锁按钮操作 */
        handleUnlock() {
            this.$modal.msgSuccess("解锁成功");
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

::v-deep .el-tabs__content {
    height: calc(100% - 60px);
}

::v-deep .pagination-container {
    padding: 0 !important;
}
</style>

