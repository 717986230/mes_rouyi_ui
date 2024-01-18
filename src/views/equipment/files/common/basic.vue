<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">设备基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="设备">{{basicData.parents}}</el-descriptions-item>
                        <el-descriptions-item label="设备编码">{{basicData.DeviceNumber}}</el-descriptions-item>
                        <el-descriptions-item label="设备名称">{{basicData.DeviceName}}</el-descriptions-item>
                        <el-descriptions-item label="设备类型">{{basicData.DeviceTypeName}}</el-descriptions-item>
                        <el-descriptions-item label="位号">{{basicData.tagNumber}}</el-descriptions-item>
                        <el-descriptions-item label="规格型号">{{basicData.model}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">设备购置信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="需求关联">{{basicData.demand}}</el-descriptions-item>
                        <el-descriptions-item label="需求部门">{{basicData.demandDept}}</el-descriptions-item>
                        <el-descriptions-item label="供应商">{{basicData.supplier}}</el-descriptions-item>
                        <el-descriptions-item label="采购时间">{{basicData.PurchaseTime}}</el-descriptions-item>
                        <el-descriptions-item label="生产厂家">{{basicData.Manufacturer}}</el-descriptions-item>
                        <el-descriptions-item label="生产时间">{{basicData.ProductionTime}}</el-descriptions-item>
                        <el-descriptions-item label="使用寿命">{{basicData.ServiceLife}}</el-descriptions-item>
                        <el-descriptions-item label="购买价格">{{basicData.price}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">设备图片</span>
                    </div>
                    <img class="img" v-for="item in basicData.accessor" :src="item.url" alt="">
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">关联文档</span>
                    </div>
                    <el-table :data="basicData.files" >
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="fileName" label="文件名"></el-table-column>
                        <el-table-column prop="fileUPTime" label="上传时间"></el-table-column>
                        <el-table-column prop="fileUPUser" label="上传者"></el-table-column>
                        <el-table-column prop="fileSize" label="文档大小(kb)"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <svg-icon v-if="scope.row.fileType != 'ppt'" class-name="svg-icon medium cs mr10" icon-class="view" @click="handlePreview(scope.row)"/>
                                <svg-icon class-name="svg-icon medium cs" icon-class="download2" @click="handleDownload(scope.row)"/>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <file-preview :dialog-visible="fileDialogVisible" :file="file" @close="fileDialogVisible = false"></file-preview>
    </div>
</template>

<script>
import filePreview from "@/views/equipment/mixins/filePreview.js";
export default {
    name: 'basic',
    mixins: [filePreview],
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