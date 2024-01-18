<template>
    <!--关联设备-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维护计划</span>
                    </div>
                    <el-form :model="spareForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="spareForm.name" placeholder="请输入计划名称或计划编号" />
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
                        <el-table-column label="维护计划名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="维护计划编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="状态" align="center" sortable key="type" prop="type"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="执行规则" align="center" sortable key="rule" prop="rule"/>
                        <el-table-column label="规则类型" align="center" sortable key="unit" prop="unit" />
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
                        <span class="normal m20 bold">巡检计划</span>
                    </div>
                    <el-form :model="recordForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="recordForm.name" placeholder="请输入计划名称或计划编号" />
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
                        <el-table-column label="巡检计划名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="巡检计划编号" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="状态" align="center" sortable key="type" prop="type"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="执行规则" align="center" sortable key="rule" prop="rule"/>
                        <el-table-column label="规则类型" align="center" sortable key="unit" prop="unit" />
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
    name: 'plan',
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
                    name:'维护计划名称1',
                    code:'D-001',
                    type:'未执行',
                    rule:'规则1',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称2',
                    code:'D-002',
                    type:'执行中',
                    rule:'规则2',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称3',
                    code:'D-003',
                    type:'未执行',
                    rule:'规则3',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称4',
                    code:'D-004',
                    type:'未验证',
                    rule:'规则4',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称5',
                    code:'D-005',
                    type:'已完成',
                    rule:'规则5',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称6',
                    code:'D-006',
                    type:'未执行',
                    rule:'规则6',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'维护计划名称7',
                    code:'D-007',
                    type:'已完成',
                    rule:'规则7',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
            ]
        },
        getRecordList(){
            this.recordList = [
                {
                    name:'巡检计划名称1',
                    code:'D-001',
                    type:'已完成',
                    rule:'规则1',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称2',
                    code:'D-002',
                    type:'执行中',
                    rule:'规则2',
                    unit:'月',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称3',
                    code:'D-003',
                    type:'未执行',
                    rule:'规则3',
                    unit:'周',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称4',
                    code:'D-004',
                    type:'未验证',
                    rule:'规则4',
                    unit:'季',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称5',
                    code:'D-005',
                    type:'已完成',
                    rule:'规则5',
                    unit:'小时',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称6',
                    code:'D-006',
                    type:'未执行',
                    rule:'规则6',
                    unit:'年',
                    startTime:'2022-01-01',
                    endTime:'2022-12-31'
                },
                {
                    name:'巡检计划名称7',
                    code:'D-007',
                    type:'已完成',
                    rule:'规则7',
                    unit:'年',
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