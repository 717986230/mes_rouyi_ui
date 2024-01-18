<!--罐解锁-->
<template>
    <div class="t-container" id="tank-unlock">
        <el-card class="h-100">
            <el-form :model="queryParams" inline>
                <el-form-item label="罐区:" >
                    <el-select v-model="queryParams.sort">
                        <el-option v-for="item in tankArea" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="罐:">
                    <el-input v-model="queryParams.tank"></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="tableList" :height="tableHeight">
                <el-table-column label="序号" type="index"/>
                <el-table-column label="罐名称" prop="Name" key="Name"></el-table-column>
                <el-table-column label="所属区域" prop="Name1" key="Name1"></el-table-column>
                <el-table-column label="班次开始时间" prop="BeginShift" key="BeginShift"></el-table-column>
                <el-table-column label="班次结束时间" prop="EndShift" key="EndShift"></el-table-column>
                <el-table-column label="锁定日期" prop="LockDate" key="LockDate"></el-table-column>
                <el-table-column label="加锁人" prop="LockUser" key="LockUser"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { getTankUnlockList } from '../../../../api/materialMove/mock'

export default {
    name: 'unlock',
    props:['params'],
    data(){
        return{
            tableList:[],
            queryParams:{
                pageNum:1,
                pageSize:20,
            },
            tankArea:[],
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
      this.getOtherData();
      this.getList();
    },
    methods:{
        getList(){
            this.$api.getTankUnlockList({}).then((res) => {
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
            this.$api.GetTankArea().then((res) => {
                 if (res.code == 200) {
                      console.log('接口成功', res)
                     this.tankArea = res.data
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

<style lang="scss" scoped>
.t-container{
    height: 100%;
    width: 100%;
}
</style>
