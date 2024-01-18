<!--装置解锁-->
<template>
    <div class="d-container">
        <el-card class="h-100">
            <el-form :model="queryParams" inline>
                <el-form-item label="装置:">
                    <el-input v-model="queryParams.device"></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="tableList" :height="tableHeight">
                <el-table-column label="序号" type="index"/>
                <el-table-column label="装置名称" prop="Name" key="Name"></el-table-column>
                <el-table-column label="班次开始时间" prop="BeginShift" key="BeginShift"></el-table-column>
                <el-table-column label="班次结束时间" prop="EndShift" key="EndShift"></el-table-column>
                <el-table-column label="锁定日期" prop="LockDate" key="LockDate"></el-table-column>
                <el-table-column label="加锁人" prop="LockUser" key="LockUser"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

export default {
    name: 'Device',
    props:['params'],
    data(){
        return{
            queryParams:{
                pageNum:1,
                pageSize:20,
            },
            tableList:[],
            tableHeight:600
        }
    },
    mounted() {
        // 获取当前页面的高度tank-unlock
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 300; // 减去 100px 的边距
        // 设置 <div> 的高度
        this.tableHeight = maxDivHeight
    },
    created() {
        this.getList();
    },
    methods:{
        getList(){
            this.$api.getDeviceUnlockList({}).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.tableList = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        getOtherData(){

        }
    }
}
</script>

<style lang="scss" scoped>
.d-container{
    height: 100%;
    width: 100%;
}
</style>
