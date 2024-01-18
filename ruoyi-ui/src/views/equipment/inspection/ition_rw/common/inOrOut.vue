<template>
    <!--巡检任务（任务执行）-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">巡检任务执行信息</span>
                    </div>
                    <el-form :model="spareForm" ref="form" inline size="small">
                        <el-row :gutter=20>
                            <el-col :span="12">
                                <el-form-item prop="code" label="实际开始时间:">
                                    <el-date-picker v-model="spareForm.starttime" disabled type="datetime"
                                        format="yyyy-MM-dd" placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="code" label="实际结束时间:">
                                    <el-date-picker v-model="spareForm.endtime" type="datetime" format="yyyy-MM-dd"
                                        placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter=20>
                            <el-col :span="12">
                                <el-form-item prop="Existingproblem" label="存在问题:">
                                    <el-input v-model="spareForm.Existingproblem" placeholder="存在问题"
                                        maxlength="30"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="Processingmode" label="处理方式:">
                                    <el-input v-model="spareForm.Processingmode" placeholder="处理方式"
                                        maxlength="30"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">巡检条目明细</span>
                    </div>
                    <el-form :model="recordForm" ref="form" inline size="small">
                        <el-form-item>
                            <el-button type="success" plain @click="Abnormalornot" size="small">无异常</el-button>
                            <el-button type="info" plain @click="handleResetRecord" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="outList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="巡检条目名称" align="center" sortable key="name" prop="name">
                        </el-table-column>
                        <el-table-column label="巡检条目编码" align="center" sortable key="type" prop="type"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="条目内容" align="center" sortable key="unit" prop="unit"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="是否启用" align="center" sortable key="useFlag" prop="useFlag">
                            <template slot-scope="scope">
                                {{ scope.row.useFlag ? '是' : '否' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务状态" align="center" sortable key="status" prop="status" />
                        <el-table-column label="巡检结果" align="center" sortable key="Inspectionresult" prop="Inspectionresult"
                            :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.Inspectionresult" placeholder="请选择">
                                    <el-option v-for="item in Tionresult" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="完成时间" align="center" sortable key="Completiontime" prop="Completiontime">
                            <template slot-scope="scope">
                                <el-date-picker v-model="scope.row.Completiontime" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'association',
    props: ['deviceId'],
    data() {
        return {
            Tionresult: [
                {
                    value: '0',
                    label: '无异常'
                },
                {
                    value: '1',
                    label: '异常'
                }
            ],
            spareForm: {
            },
            recordForm: {
                name: '',
                date: ''
            },
            inList: [],
            recordList: []
        }
    },
    created() {
        this.getInList();
        this.getOutList();
        this.spareForm = {
            starttime: "2024-01-11",
            endtime: "2024-01-16",
            Existingproblem: "暂无",
            Processingmode: "热重启",
        }
    },
    methods: {
        getInList() {
            this.inList = [
                {
                    code: 'D-001',
                    type: '采购入库',
                    unit: '个',
                    inNum: 200,
                    status: "未开始",
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-01-01',
                    operator: 'admin'
                },
                {
                    code: 'D-002',
                    type: '采购入库',
                    unit: '个',
                    status: "执行中",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-01-01',
                    operator: 'admin'
                },
                {
                    code: 'D-003',
                    type: '采购入库',
                    unit: '个',
                    status: "执行中",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-01-01',
                    operator: 'admin'
                },
                {
                    code: 'D-004',
                    type: '采购入库',
                    unit: '个',
                    status: "未验证",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-01-01',
                    operator: 'admin'
                },
            ]
        },
        getOutList() {
            this.outList = [
                {
                    code: 'D-001',
                    type: '销售出库',
                    name: "起重机销售出库",
                    status: "未验证",
                    unit: '个',
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-06-08',
                    operator: 'admin'
                },
                {
                    code: 'D-002',
                    type: '领用出库',
                    status: "未开始",
                    unit: '个',
                    name: "起重机领用出库",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-06-08',
                    operator: 'admin'
                },
                {
                    code: 'D-003',
                    type: '更换出库',
                    status: "未执行",
                    unit: '个',
                    name: "起重机更换出库",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-06-08',
                    operator: 'admin'
                },
                {
                    code: 'D-004',
                    type: '调拨出库',
                    status: "未执行",
                    unit: '个',
                    name: "起重机调拨出库",
                    inNum: 200,
                    warehouse: '北1区仓库',
                    position: '1-4架',
                    time: '2021-06-08',
                    operator: 'admin'
                },
            ]
        },
        handleQuerySpare() {
            this.getInList();
        },
        handleResetSpare() {
            this.getInList();
        },
        Abnormalornot() {
            this.getOutList();
        },
        handleResetRecord() {
            this.getOutList();
        },
        //入库单详情
        handleOrderDetail(row) {
            console.log(row);
            // this.$router.push({
            //     path:'/association/inDetail',
            //     query:{
            //         id:row.id
            //     }
            // })
        }
    }
}
</script>

<style scoped></style>