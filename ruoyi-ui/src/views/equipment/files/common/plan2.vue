<template>
    <!--维修维护记录-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维护记录</span>
                    </div>
                    <el-form :model="spareForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="spareForm.name" placeholder="请输入任务名称或任务编号" />
                        </el-form-item>
                        <el-form-item prop="date">
                            <el-date-picker v-model="spareForm.date" type="datetimerange" :picker-options="pickerOptions"
                                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQuerySpare" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetSpare" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="spareList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="维护任务名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="维护计划编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="维护计划" align="center" sortable key="item1" prop="item1"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="维护人" align="center" sortable key="item2" prop="item2"/>
                        <el-table-column label="验证人" align="center" sortable key="item3" prop="item3" />
                        <el-table-column label="计划开始时间" align="center" sortable key="startTime" prop="startTime"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="计划结束时间" align="center" sortable key="endTime" prop="endTime"
                                         :show-overflow-tooltip="true" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维修记录</span>
                    </div>
                    <el-form :model="recordForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="recordForm.name" placeholder="请输入任务名称或任务编号" />
                        </el-form-item>
                        <el-form-item prop="date">
                            <el-date-picker v-model="recordForm.date" type="datetimerange" :picker-options="pickerOptions"
                                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQueryRecord" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetRecord" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="recordList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="维修任务名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="维修任务编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="故障类型" align="center" sortable key="item1" prop="item1"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="维修人" align="center" sortable key="item2" prop="item2"/>
                        <el-table-column label="验证人" align="center" sortable key="item3" prop="item3" />
                        <el-table-column label="计划开始时间" align="center" sortable key="startTime" prop="startTime"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="计划结束时间" align="center" sortable key="endTime" prop="endTime" />
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'plan2',
    props:['deviceId'],
    data(){
        return{
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            spareForm:{
                name:''
            },
            recordForm:{
                name:'',
                date:''
            },
            spareList:[],
            recordList:[]
        }
    },
    created() {
        this.getSpareList();
        this.getRecordList();
    },
    methods:{
        getSpareList(){
            this.spareList = [
                {
                    name:'维护任务名称1',
                    code:'D-001',
                    item1:'维护计划名称1',
                    item2:'执行人1',
                    item3:'验证人1',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护任务名称2',
                    code:'D-002',
                    item1:'维护计划名称2',
                    item2:'执行人2',
                    item3:'验证人2',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护任务名称3',
                    code:'D-003',
                    item1:'维护计划名称3',
                    item2:'执行人3',
                    item3:'验证人3',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修计划名称4',
                    code:'D-004',
                    item1:'维护计划名称4',
                    item2:'执行人4',
                    item3:'验证人4',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修计划名称5',
                    code:'D-005',
                    item1:'维护计划名称5',
                    item2:'执行人5',
                    item3:'验证人5',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修计划名称6',
                    code:'D-006',
                    item1:'维护计划名称6',
                    item2:'执行人6',
                    item3:'验证人6',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                }
            ]
        },
        getRecordList(){
            this.recordList = [
                {
                    name:'维修任务名称1',
                    code:'D-006',
                    item1:'故障类型1',
                    item2:'执行人6',
                    item3:'验证人6',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修任务名称2',
                    code:'D-007',
                    item1:'故障类型2',
                    item2:'执行人7',
                    item3:'验证人7',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修任务名称3',
                    code:'D-008',
                    item1:'故障类型3',
                    item2:'执行人8',
                    item3:'验证人8',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修任务名称4',
                    code:'D-009',
                    item1:'故障类型4',
                    item2:'执行人9',
                    item3:'验证人9',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维修任务名称5',
                    code:'D-010',
                    item1:'故障类型5',
                    item2:'执行人10',
                    item3:'验证人10',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'

                },
                {
                    name:'维修任务名称6',
                    code:'D-011',
                    item1:'故障类型6',
                    item2:'执行人11',
                    item3:'验证人11',
                    startTime:'2022-01-01',
                }
            ]
        },
        handleQuerySpare(){
            this.getSpareList();
        },
        handleResetSpare(){
            this.getSpareList();
        },
        handleQueryRecord(){
            this.getRecordList();
        },
        handleResetRecord(){
            this.getRecordList();
        },
    }
}
</script>

<style scoped>

</style>