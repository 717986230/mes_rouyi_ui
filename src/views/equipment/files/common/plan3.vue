<template>
    <!--维修维护记录-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">变更记录</span>
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
                        <el-table-column label="变更任务名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="变更任务编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="变更前状态" align="center" sortable key="item1" prop="item1"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="变更后状态" align="center" sortable key="item2" prop="item2"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="执行人" align="center" sortable key="item3" prop="item3"/>
                        <el-table-column label="验证人" align="center" sortable key="item4" prop="item4" />
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
                        <span class="normal m20 bold">调拨记录</span>
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
                        <el-table-column label="调拨任务名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="调拨任务编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="调拨前存放位置" align="center" sortable key="item1" prop="item1"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="调拨后存放位置" align="center" sortable key="item2" prop="item2"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="执行人" align="center" sortable key="item3" prop="item3"/>
                        <el-table-column label="验证人" align="center" sortable key="item4" prop="item4" />
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
    name: 'plan3',
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
                    name:'变更任务名称1',
                    code:'D-001',
                    item1:'在役',
                    item2:'在役',
                    item3:'执行人1',
                    item4:'验证人1',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'变更任务名称1',
                    code:'D-002',
                    item1:'故障类型2',
                    item2:'故障类型2',
                    item3:'执行人2',
                    item4:'验证人2',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'变更任务名称1',
                    code:'D-003',
                    item1:'故障类型3',
                    item2:'故障类型3',
                    item3:'执行人3',
                    item4:'验证人3',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'变更任务名称1',
                    code:'D-004',
                    item1:'故障类型4',
                    item2:'故障类型4',
                    item3:'执行人4',
                    item4:'验证人4',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'变更任务名称1',
                    code:'D-005',
                    item1:'故障类型5',
                    item2:'故障类型5',
                    item3:'执行人5',
                    item4:'验证人5',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'变更任务名称1',
                    code:'D-006',
                    item1:'故障类型6',
                    item2:'故障类型6',
                    item3:'执行人6',
                    item4:'验证人6',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
            ]
        },
        getRecordList(){
            this.recordList = [
                {
                    name:'调拨任务名称1',
                    code:'D-006',
                    item1:'存放位置1',
                    item2:'存放位置1',
                    item3:'执行人6',
                    item4:'验证人6',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'调拨任务名称1',
                    code:'D-005',
                    item1:'存放位置2',
                    item2:'存放位置2',
                    item3:'执行人5',
                    item4:'验证人5',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'调拨任务名称1',
                    code:'D-004',
                    item1:'存放位置3',
                    item2:'存放位置3',
                    item3:'执行人4',
                    item4:'验证人4',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'调拨任务名称1',
                    code:'D-003',
                    item1:'存放位置4',
                    item2:'存放位置4',
                    item3:'执行人3',
                    item4:'验证人3',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'调拨任务名称1',
                    code:'D-002',
                    item1:'存放位置5',
                    item2:'存放位置5',
                    item3:'执行人2',
                    item4:'验证人2',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'调拨任务名称1',
                    code:'D-001',
                    item1:'存放位置6',
                    item2:'存放位置6',
                    item3:'执行人1',
                    item4:'验证人1',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
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