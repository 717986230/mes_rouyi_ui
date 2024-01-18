<!--互供解锁-->
<template>
    <div>
        <el-card class="h-100">
            <el-form :model="queryParams" inline>
                <el-form-item label="互供点:">
                    <el-input v-model="queryParams.mark"></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="tableList" >
                <el-table-column label="序号" type="index"/>
                <el-table-column label="互供点名称" prop="Name1" key="Name1"></el-table-column>
                <el-table-column label="班次开始时间" prop="BeginShift" key="BeginShift"></el-table-column>
                <el-table-column label="班次结束时间" prop="EndShift" key="EndShift"></el-table-column>
                <el-table-column label="确认互供量" prop="Value" key="Value"></el-table-column>
                <el-table-column label="锁定日期" prop="LockDate" key="LockDate"></el-table-column>
                <el-table-column label="加锁人" prop="LockUser" key="LockUser"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'InterchangeUnlock',
    data(){
        return{
            tableList:[],
            queryParams:{
                pageNum:1,
                pageSize:20,
            },
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
        this.getList()
        this.getOtherData()
    },
    methods:{
        getList(){
            this.$api.getInterchangeUnlockList({}).then((res) => {
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

<style scoped>

</style>
