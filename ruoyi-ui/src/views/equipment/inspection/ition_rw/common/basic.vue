<template>
  <!--巡检任务（详细信息/验证）-->
  <div class="content basic">
    <el-row>
      <el-col :span="24" class="card-box mt10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="normal m20 bold">巡检任务基础信息</span>
          </div>
          <el-descriptions :column=2 style="margin-left: 30px;">
            <el-descriptions-item label="巡检任务单号">{{ basicData.parents }}</el-descriptions-item>
            <el-descriptions-item label="关联计划">{{ basicData.DeviceNumber }}</el-descriptions-item>
            <el-descriptions-item label="所属区域">{{ basicData.DeviceName }}</el-descriptions-item>
            <el-descriptions-item label="计划开始时间">{{ basicData.startTime }}</el-descriptions-item>
            <el-descriptions-item label="计划结束时间">{{ basicData.PurchaseTime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box mt10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="normal m20 bold">涉及设备明细</span>
          </div>
          <el-table :data="basicData.recodeList" align="center">
            <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
            <el-table-column align="center" prop="warehouse" label="设备名称"></el-table-column>
            <el-table-column align="center" prop="num" label="设备编号"></el-table-column>
            <el-table-column align="center" prop="position" label="规格型号"></el-table-column>
            <el-table-column align="center" prop="position" label="设备类型"></el-table-column>
            <el-table-column align="center" prop="position" label="所属区域"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="normal m20 bold">备件库存明细</span>
          </div>
          <el-table :data="basicData.recodeList" align="center">
            <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
            <el-table-column align="center" prop="warehouse" label="仓库"></el-table-column>
            <el-table-column align="center" prop="num" label="库存数量"></el-table-column>
            <el-table-column align="center" prop="position" label="存放位置"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box mt10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="normal m20 bold">巡检任务执行信息</span>
          </div>
          <el-descriptions :column=2 style="margin-left: 30px;">
            <el-descriptions-item label="存在问题">{{ basicData.parents }}</el-descriptions-item>
            <el-descriptions-item label="处理方式">{{ basicData.DeviceNumber }}</el-descriptions-item>
            <el-descriptions-item label="实际开始时间">{{ basicData.ProductionTime }}</el-descriptions-item>
            <el-descriptions-item label="实际结束时间">{{ basicData.PurchaseTime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box mt10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="normal m20 bold">巡检规程</span>
          </div>
          <el-table :data="basicData.files">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="fileName" label="文件名"></el-table-column>
            <el-table-column prop="fileUPTime" label="上传时间"></el-table-column>
            <el-table-column prop="fileUPUser" label="上传者"></el-table-column>
            <el-table-column prop="fileSize" label="文档大小(kb)"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <svg-icon class-name="svg-icon medium cs mr10" icon-class="view"
                          @click="handlePreview(scope.row)"/>
                <svg-icon class-name="svg-icon medium cs" icon-class="download2"
                          @click="handleDownload(scope.row)"/>
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
  components: {},
  mixins: [filePreview],
  data() {
    return {
      fileDialogVisible: false,
      file: {
        fileUrl: '',
        fileType: '',
        fileName: '',
      }
    }
  },
  props: ['basicData'],
  methods: {
    handlePreview(row) {
      let {fileUrl, fileType, fileName} = row
      this.file = {fileUrl, fileType, fileName}
      this.fileDialogVisible = true
    },
    handleDownload() {
      this.msgSuccess('下载成功')
    }
  }
}
</script>

<style scoped>
.img {
  border-width: 0px;
  width: 196px;
  height: 146px;
}
</style>
