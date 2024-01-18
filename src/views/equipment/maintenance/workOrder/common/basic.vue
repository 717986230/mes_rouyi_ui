<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">报修工单基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="设备">{{basicData.parents}}</el-descriptions-item>
                        <el-descriptions-item label="设备编码">{{basicData.DeviceNumber}}</el-descriptions-item>
                        <el-descriptions-item label="设备名称">{{basicData.DeviceName}}</el-descriptions-item>
                        <el-descriptions-item label="设备类型">{{basicData.DeviceTypeName}}</el-descriptions-item>
                        <el-descriptions-item label="规格型号">{{basicData.model}}</el-descriptions-item>
                        <el-descriptions-item label="报修部门">{{basicData.dept}}</el-descriptions-item>

                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">报修工单故障信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="目前状态">{{basicData.currentStatus}}</el-descriptions-item>
                        <el-descriptions-item label="故障时间">{{basicData.downTime}}</el-descriptions-item>
                        <el-descriptions-item label="备注">{{basicData.reamrk}}</el-descriptions-item>
                        <el-descriptions-item label="故障描述">{{basicData.desc}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">现场图片</span>
                    </div>
                    <img class="img" v-for="item in basicData.accessor" :src="item.url" alt="">
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