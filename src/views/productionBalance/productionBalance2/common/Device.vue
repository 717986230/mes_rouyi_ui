<!--装置页签-->
<template>
    <div class="d-container">
        <el-row class="h-100">
            <el-col :span="5" class="h-100">
                <el-card class="h-100">

                </el-card>
            </el-col>
            <el-col :span="19" class="h-100 ">
                <el-table :data="topData" height="42%">
                    <el-table-column label="装置" prop="deviceName" key="deviceName"></el-table-column>
                    <el-table-column label="加工量" prop="jgl" key="jgl"></el-table-column>
                    <el-table-column label="加工量(平衡)" prop="jglph" key="jglph"></el-table-column>
                    <el-table-column label="生产量" prop="scl" key="scl"></el-table-column>
                    <el-table-column label="生产量(平衡)" prop="sclph" key="sclph"></el-table-column>
                    <el-table-column label="收率(%)" prop="sl" key="sl"></el-table-column>
                    <el-table-column label="收率(平衡)(%)" prop="slsp" key="slsp"></el-table-column>
                    <el-table-column label="原始量损失" prop="yslss" key="yslss"></el-table-column>
                    <el-table-column label="平衡量损失" prop="phlss" key="phlss"></el-table-column>
                    <el-table-column label="查看" prop="ck" key="ck"></el-table-column>
                </el-table>
                <pagination  :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getList" />
                <el-table :data="btoData" height="42%">
                    <el-table-column label="节点名称" prop="deviceName" key="deviceName"></el-table-column>
                    <el-table-column label="物料" prop="jgl" key="jgl"></el-table-column>
                    <el-table-column label="进/出" prop="jglph" key="jglph"></el-table-column>
                    <el-table-column label="原始量" prop="scl" key="scl"></el-table-column>
                    <el-table-column label="生产量" prop="sclph" key="sclph"></el-table-column>
                    <el-table-column label="差量" prop="sl" key="sl"></el-table-column>
                    <el-table-column label="收率(%)" prop="slsp" key="slsp"></el-table-column>
                    <el-table-column label="准确度" prop="yslss" key="yslss"></el-table-column>
                    <el-table-column label="确认量" prop="phlss" key="phlss"></el-table-column>
                    <el-table-column label="确认" prop="qr" key="qr"></el-table-column>
                    <el-table-column label="确认准确度" prop="qrzqd" key="qrzqd"></el-table-column>
                    <el-table-column label="查看" prop="ck" key="ck"></el-table-column>
                </el-table>
                <pagination  :total="total" :page.sync="queryParams2.pageNum" :limit.sync="queryParams2.pageSize"
                            @pagination="getList" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Device',
    data(){
        return{
            total:1,
            total2:1,
            topData:[],
            btoData:[],
            queryParams:{
                pageNum:1,
                pageSize:20,
            },
            queryParams2:{
                pageNum:1,
                pageSize:20,
            }
        }
    },
    methods:{
        getList(){

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
