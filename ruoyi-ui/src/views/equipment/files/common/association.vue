<template>
    <!--关联设备-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">关联备件</span>
                    </div>
                    <el-form :model="spareForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="spareForm.name" placeholder="请输入备件名称或备件编码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQuerySpare" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetSpare" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="spareList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="备件名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="备件编码" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="规格型号" align="center" sortable key="model" prop="model"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="备件类型" align="center" sortable key="type" prop="type"/>
                        <el-table-column label="单位" align="center" sortable key="unit" prop="unit" />
                        <el-table-column label="当前库存" align="center" sortable key="inventory" prop="inventory"
                                         :show-overflow-tooltip="true" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">更换记录</span>
                    </div>
                    <el-form :model="recordForm" ref="form" inline size="small">
                        <el-form-item  prop="name">
                            <el-input v-model="recordForm.name" placeholder="请输入备件名称或备件编码" />
                        </el-form-item>
                        <el-form-item  prop="name">
                            <el-date-picker v-model="recordForm.date" type="date" placeholder="请选择更换日期"
                                           style="width: 200px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQueryRecord" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetRecord" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="recordList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="备件名称" align="center" sortable key="name" prop="name" />
                        <el-table-column label="备件编码" align="center" sortable key="code" prop="code"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="规格型号" align="center" sortable key="model" prop="model"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="备件类型" align="center" sortable key="type" prop="type"/>
                        <el-table-column label="单位" align="center" sortable key="unit" prop="unit" />
                        <el-table-column label="当前库存" align="center" sortable key="inventory" prop="inventory"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="事件类型" align="center" sortable key="event" prop="event" />
                        <el-table-column label="工单号" align="center" sortable key="workOrder" prop="workOrder" />
                        <el-table-column label="更换数量" align="center" sortable key="replaceNum" prop="replaceNum" />
                        <el-table-column label="更换时间" align="center" sortable key="replaceTime" prop="replaceTime" />
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'association',
    props:['deviceId'],
    data(){
        return{
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
                    name:'设备1',
                    code:'D-001',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100'
                },
                {
                    name:'设备2',
                    code:'D-002',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100'
                },
                {
                    name:'设备3',
                    code:'D-003',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100'
                },
                {
                    name:'设备1',
                    code:'D-001',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100'
                },
                {
                    name:'设备2',
                    code:'D-002',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100'
                }
            ]
        },
        getRecordList(){
            this.recordList = [
                {
                    name:'设备1',
                    code:'D-001',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100',
                    event:'维护',
                    workOrder:'20230112-1',
                    replaceNum:2,
                    replaceTime:'2023-01-12 12:12:12'
                },
                {
                    name:'设备2',
                    code:'D-002',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100',
                    event:'维护',
                    workOrder:'20230112-1',
                    replaceNum:1,
                    replaceTime:'2023-01-12 12:12:12'
                },
                {
                    name:'设备3',
                    code:'D-003',
                    model:'6000W',
                    type:'重要设备',
                    unit:'量纲',
                    inventory:'100',
                    event:'维护',
                    workOrder:'20230112-1',
                    replaceNum:1,
                    replaceTime:'2023-01-12 12:12:12'
                },
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