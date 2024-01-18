<template>
    <!-- 生产平衡 -->
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
            <el-form-item label="执行时间:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择执行时间" clearable>
                    <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8" type="flex" align="center">
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUnSubmit">开始平衡</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUnSubmit">继续平衡</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUnSubmit">组分计算</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUnSubmit">提交结果</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUnSubmit">无解分析</el-button>
            </el-col>
            <el-col :span="1.5" class="flex align-center">
                最小损耗:0
            </el-col>
            <el-col :span="1.5" class="flex align-center">
                确认:
                <el-input type="number" style="width: 60%;"></el-input>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" type="card" :style="{ height: tabsHeight + 'px' }">
            <el-tab-pane label="综合" name="combined" class="h-100">
                <combined></combined>
            </el-tab-pane>
            <el-tab-pane label="移动组" name="movinggroup" class="h-100">
                <moving-group></moving-group>
            </el-tab-pane>
            <el-tab-pane label="装置" name="device" class="h-100">
                <device></device>
            </el-tab-pane>
            <el-tab-pane label="罐" name="tank" class="h-100">
                <tank></tank>
            </el-tab-pane>
            <el-tab-pane label="其他节点" name="othernode" class="h-100">
                <other-node></other-node>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

import Combined from './common/Combined'
import MovingGroup from './common/MovingGroup'
import Device from './common/Device'
import Tank from './common/Tank'
import OtherNode from './common/OtherNode'
export default {
    name: "productionBalance2",
    components: { OtherNode, Tank, Device, MovingGroup, Combined },
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
            //页签选中项
            activeName: 'combined',
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

