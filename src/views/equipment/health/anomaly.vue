<!--设备异常情况分析-->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
            <el-form-item label="区域:" prop="area">
                <el-select v-model="queryParams.area" placeholder="请选择区域">
                    <el-option v-for="(area,index) in areas" :key="index" :label="area.label" :value="area.value"></el-option>"
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称:" prop="device">
                <el-select v-model="queryParams.area" placeholder="请选择设备名称">
                    <el-option v-for="(device,index) in deviceOptions" :key="index" :label="area.label" :value="area.value"></el-option>"
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="datetimerange" :picker-options="pickerOptions"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <img style="width: 100%" src="@/assets/images/equipment/anomaly.png">
    </div>
</template>

<script>
export default {
    name: 'anomaly',
    data(){
        return{
            queryParams:{},
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
            areaOptions:[],
            deviceOptions:[]
        }
    },
    caeated(){
        this.getOtherData();
        this.getList();
    },
    methods:{
        getList(){

        },
        getOtherData(){
            this.areaOptions = [
                {
                    label: '区域1',
                    value: '1'
                },
                {
                    label: '区域2',
                    value: '2'
                },
                {
                    label: '区域3',
                    value: '3'
                },
                {
                    label: '区域4',
                    value: '4'
                },
                {
                    label: '区域5',
                    value: '5'
                },
                {
                    label: '区域6',
                    value: '6'
                }
            ];
            this.deviceOptions = [
                {
                    label: '设备1',
                    value: '1'
                },
                {
                    label: '设备2',
                    value: '2'
                },
                {
                    label: '设备3',
                    value: '3'
                },
                {
                    label: '设备4',
                    value: '4'
                },
                {
                    label: '设备5',
                    value: '5'
                },
                {
                    label: '设备6',
                    value: '6'
                }
            ]
        },
        handleQuery(){

        }
    }
}
</script>

<style scoped>

</style>