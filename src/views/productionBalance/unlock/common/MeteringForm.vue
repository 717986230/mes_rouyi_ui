<!--进出厂计量单-->
<template>
    <div>
        <el-card class="h-100">
            <el-form :model="queryParams" inline>
                <el-form-item label="装卸台:" >
                    <el-select v-model="queryParams.loadingDock">
                        <el-option v-for="item in loadingDockList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="装卸点:">
                    <el-input v-model="queryParams.tank"></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="tableList" :height="tableHeight">
                <el-table-column label="序号" type="index"/>
                <el-table-column label="进出厂点" prop="Name" key="Name"></el-table-column>
                <el-table-column label="物料名称" prop="MtrlAlias" key="MtrlAlias"></el-table-column>
                <el-table-column label="计量单号" prop="Code" key="Code"></el-table-column>
                <el-table-column label="班次开始时间" prop="BeginShift" key="BeginShift"></el-table-column>
                <el-table-column label="班次结束时间" prop="EndShift" key="EndShift"></el-table-column>
                <el-table-column label="确认班量" prop="Value" key="Value"></el-table-column>
                <el-table-column label="锁定日期" prop="LockDate" key="LockDate"></el-table-column>
                <el-table-column label="加锁人" prop="LockUser" key="LockUser"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'MeteringForm',
    data(){
        return{
            loadingDockList:[],
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
            this.$api.getMeteringUnlockList({}).then((res) => {
                if (res.code == 200) {
                    console.log('罐解锁数据接口成功', res)
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
            //获取罐区下拉数据
            this.$api.GetInoutArea().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.loadingDockList = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        }
    }
}
</script>

<style scoped>

</style>

