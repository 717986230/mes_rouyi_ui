<!--罐页签-->
<template>
    <div class="t-container">
        <el-row class="h-100">
            <el-col :span="6" class="h-100">
                <el-card class="h-100">

                </el-card>
            </el-col>
            <el-col :span="18" class="h-100">
                <el-card class="h-100">
                    <el-radio-group v-model="radio" class="p10">
                        <el-radio :label="1">只显示最后检尺</el-radio>
                        <el-radio :label="2">显示所有检尺</el-radio>
                    </el-radio-group>
                    <el-table :data="topData" height="80%">
                        <el-table-column label="罐名称" prop="tankName" key="tankName"></el-table-column>
                        <el-table-column label="物料" prop="wl" key="wl"></el-table-column>
                        <el-table-column label="检尺时间" prop="jglph" key="jglph"></el-table-column>
                        <el-table-column label="前量" prop="scl" key="scl"></el-table-column>
                        <el-table-column label="后量" prop="sclph" key="sclph"></el-table-column>
                        <el-table-column label="变化量" prop="sl" key="sl"></el-table-column>
                        <el-table-column label="总收" prop="slsp" key="slsp"></el-table-column>
                        <el-table-column label="总付" prop="yslss" key="yslss"></el-table-column>
                        <el-table-column label="差量" prop="phlss" key="phlss"></el-table-column>
                        <el-table-column label="查看" prop="ck" key="ck"></el-table-column>
                    </el-table>
                    <pagination  :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                                 @pagination="getList" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Tank',
    data(){
        return{
            radio:1,
            total:1,
            topData:[],
            queryParams:{
                pageNum:1,
                pageSize:20,
            },

        }
    },
    methods:{
        getList(){

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
