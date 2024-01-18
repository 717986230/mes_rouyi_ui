<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维修任务基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="设备">{{basicData.parents}}</el-descriptions-item>
                        <el-descriptions-item label="设备编码">{{basicData.DeviceNumber}}</el-descriptions-item>
                        <el-descriptions-item label="设备名称">{{basicData.DeviceName}}</el-descriptions-item>
                        <el-descriptions-item label="设备类型">{{basicData.DeviceTypeName}}</el-descriptions-item>
                        <el-descriptions-item label="规格型号">{{basicData.model}}</el-descriptions-item>
                        <el-descriptions-item label="区域">{{basicData.area}}</el-descriptions-item>

                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维修情况</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="维修开始时间">{{basicData.repairStartTime}}</el-descriptions-item>
                        <el-descriptions-item label="维修结束时间">{{basicData.repairEndTime}}</el-descriptions-item>
                        <el-descriptions-item label="维修总时长">{{basicData.repairTotalTime}}</el-descriptions-item>
                        <el-descriptions-item label="故障分析">{{basicData.faultAnalysis}}</el-descriptions-item>
                        <el-descriptions-item label="故障类型">{{basicData.faultType}}</el-descriptions-item>
                        <el-descriptions-item label="故障详情">{{basicData.faultDetail}}</el-descriptions-item>
                        <el-descriptions-item label="处理方式">{{basicData.faultHandling}}</el-descriptions-item>
                        <el-descriptions-item label="维修负责人">{{basicData.repairHead}}</el-descriptions-item>
                        <el-descriptions-item label="是否更换零部件">{{basicData.replaceAccessories}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box" v-if="basicData.replaceAccessories">
                <el-card>
                    <div slot="header">
                        <span>更换配件明细</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="basicData.accessories">
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="spareName" label="备件名称"></el-table-column>
                                <el-table-column prop="code" label="备件编码"></el-table-column>
                                <el-table-column prop="model" label="规格型号"></el-table-column>
                                <el-table-column prop="unit" label="单位"></el-table-column>
                                <el-table-column prop="num" label="使用数量"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
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