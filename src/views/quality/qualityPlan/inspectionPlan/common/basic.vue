<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">基础信息</span>
                    </div>
                    <el-descriptions :column=1 style="margin-left: 30px;">
                        <el-descriptions-item label="方案编号">{{basicData.inspectionNumber}}</el-descriptions-item>
                        <el-descriptions-item label="方案名称">{{basicData.name}}</el-descriptions-item>
                        <el-descriptions-item label="建立日期">{{basicData.establish}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">质检方案</span>
                    </div>
                    <el-table :data="basicData.planList" align="center">
                        <el-table-column label="序号" align="center" type="index" width="100" fixed></el-table-column>
                        <el-table-column align="center" prop="item" label="检验项目" fixed></el-table-column>
                        <el-table-column align="center" prop="item1" label="检验项目类别"></el-table-column>
                        <el-table-column align="center" prop="item2" label="分析方法"></el-table-column>
                        <el-table-column align="center" prop="item3" label="检验方法"></el-table-column>
                        <el-table-column align="center" prop="item4" label="目标值"></el-table-column>
                        <el-table-column align="center" prop="item5" label="规格下限"></el-table-column>
                        <el-table-column align="center" prop="item6" label="下公差"></el-table-column>
                        <el-table-column align="center" prop="item7" label="规格上限"></el-table-column>
                        <el-table-column align="center" prop="item8" label="上公差"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">其他信息</span>
                    </div>
                    <el-descriptions :column=3 style="margin-left: 30px;">
                        <el-descriptions-item label="提交人">{{basicData.subUser}}</el-descriptions-item>
                        <el-descriptions-item label="提交时间">{{basicData.subTime}}</el-descriptions-item>
                        <el-descriptions-item label="更新时间">{{basicData.upTime}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'basic',
    data(){
        return {

        }
    },
    props:['basicData'],
    methods:{

    }
}
</script>

<style scoped>
.img{
    border-width: 0px;
    width: 196px;
    height: 146px;
}
</style>