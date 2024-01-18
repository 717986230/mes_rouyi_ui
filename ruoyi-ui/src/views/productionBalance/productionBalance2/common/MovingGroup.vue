<!--移动组页签-->
<template>
    <div class="m-container">
        <el-row class="h-100">
            <el-col :span="10" class="h-100">
                <el-card class="h-100">
                    <el-form :model="queryParams" inline>
                        <el-form-item label="排序" >
                            <el-select v-model="queryParams.sort">
                                <el-option>
                                    差量
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button icon="el-icon-search" type="primary">筛选</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableList" >
                        <el-table-column label="编号" prop="code" key="code"></el-table-column>
                        <el-table-column label="移动量" prop="moveNum" key="moveNum"></el-table-column>
                        <el-table-column label="差量" prop="chaNum" key="chaNum"></el-table-column>
                        <el-table-column label="统计差量" prop="tjNum" key="tjNum"></el-table-column>
                    </el-table>
                    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                                @pagination="getList" />
                </el-card>
            </el-col>
            <el-col :span="14" class="h-100">
                <el-card class="h-100">
                    <div slot="header">
                        <el-button icon="el-icon-search" type="primary">查看场景图</el-button>
                        <el-button icon="el-icon-folder-checked" type="success">保存</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'MovingGroup',
    data(){
        return{
            queryParams:{
                pageNum:1,
                pageSize:20,
            },
            tableList:[],
            total:1,
        }
    },
    methods:{
        getList(){

        }
    }
}
</script>

<style lang="scss" scoped>
.m-container{
    width: 100%;
    height: 100%;
}
</style>
