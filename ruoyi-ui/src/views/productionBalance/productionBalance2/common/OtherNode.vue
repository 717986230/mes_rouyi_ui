<!--其他节点页签-->
<template>
    <div class="t-container">
        <el-row class="h-100">
            <el-col :span="6" class="h-100">
                <el-card class="h-100">

                </el-card>
            </el-col>
            <el-col :span="18" class="h-100">
                <el-card class="h-100">
                    <div slot="header">
                        <el-button icon="el-icon-folder-checked" type="success">保存</el-button>
                    </div>
                    <el-table :data="topData" height="80%">
                        <el-table-column label="节点名称" prop="tankName" key="tankName"></el-table-column>
                        <el-table-column label="物料" prop="wl" key="wl"></el-table-column>
                        <el-table-column label="原始量" prop="jglph" key="jglph"></el-table-column>
                        <el-table-column label="平衡量" prop="scl" key="scl"></el-table-column>
                        <el-table-column label="差量" prop="sclph" key="sclph"></el-table-column>
                        <el-table-column label="准确量" prop="sl" key="sl"></el-table-column>
                        <el-table-column label="确认量" prop="slsp" key="slsp"></el-table-column>
                        <el-table-column label="确认" prop="yslss" key="yslss"></el-table-column>
                        <el-table-column label="确认准确度" prop="phlss" key="phlss"></el-table-column>
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
    name: 'OtherNode',
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


