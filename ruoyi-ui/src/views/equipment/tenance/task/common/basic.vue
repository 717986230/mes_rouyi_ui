<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维护任务基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="维护任务单号">{{basicData.item1}}</el-descriptions-item>
                        <el-descriptions-item label="关联计划">{{basicData.item2}}</el-descriptions-item>
                        <el-descriptions-item label="所属区域">{{basicData.item3}}</el-descriptions-item>
                        <el-descriptions-item label="涉及设备">{{basicData.item4}}</el-descriptions-item>
                        <el-descriptions-item label="计划开始时间">{{basicData.item5}}</el-descriptions-item>
                        <el-descriptions-item label="计划结束时间">{{basicData.item6}}</el-descriptions-item>
                        <el-descriptions-item label="维护内容">{{basicData.item7}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box">
                <el-card>
                    <div slot="header">
                        <span>涉及设备明细</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="basicData.item12">
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="name" label="设备名称"></el-table-column>
                                <el-table-column prop="code" label="设备编号"></el-table-column>
                                <el-table-column prop="model" label="规格型号"></el-table-column>
                                <el-table-column prop="SpareType" label="设备类型"></el-table-column>
                                <el-table-column prop="area" label="所属区域"></el-table-column>
                                <el-table-column prop="supplier" label="存放位置"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">维护任务执行信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="故障分析">{{basicData.item8}}</el-descriptions-item>
                        <el-descriptions-item label="处理方式">{{basicData.item9}}</el-descriptions-item>
                        <el-descriptions-item label="实际开始时间">{{basicData.item10}}</el-descriptions-item>
                        <el-descriptions-item label="实际结束时间">{{basicData.item11}}</el-descriptions-item>
                        <el-descriptions-item label="是否更换配件">是</el-descriptions-item>
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
                            <el-table :data="basicData.item13">
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
                        <span class="normal m20 bold">维护规程</span>
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