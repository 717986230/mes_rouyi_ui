<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">出库基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="出库类型">{{basicData.InType}}</el-descriptions-item>
                        <el-descriptions-item label="出库日期">{{basicData.InDate}}</el-descriptions-item>
                        <el-descriptions-item label="出库操作人">{{basicData.InPerson}}</el-descriptions-item>
                        <el-descriptions-item label="关联单号">{{basicData.AssociatedDocument}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">出库明细</span>
                    </div>
                    <el-table :data="basicData.recodeList">
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="spareName" label="备件名称"></el-table-column>
                        <el-table-column prop="spareCode" label="备件编号"></el-table-column>
                        <el-table-column prop="model" label="规格型号"></el-table-column>
                        <el-table-column prop="SpareType" label="备件类型"></el-table-column>
                        <el-table-column prop="spareUnit" label="单位"></el-table-column>
                        <el-table-column prop="inNum" label="出库数量"></el-table-column>
                        <el-table-column prop="warehouse" label="出库仓库"></el-table-column>
                        <el-table-column prop="position" label="存放位置"></el-table-column>
                        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
                        <el-table-column prop="supplier" label="供应商"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'basic',
    props:['basicData']
}
</script>

<style scoped>
.img{
    border-width: 0px;
    width: 196px;
    height: 146px;
}
</style>