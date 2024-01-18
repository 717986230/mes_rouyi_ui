<template>
  <div>
    保养处理
    <el-form ref="form" :model="handleForm" label-width="80px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>保养情况</span>
          <el-button class="el-icon-edit" style="float: right; padding: 3px 0" @click="handleEdit(1)" type="text">编辑
          </el-button>
        </div>
        <el-descriptions>
          <el-descriptions-item label="存在问题">{{ handleForm.question }}</el-descriptions-item>
          <el-descriptions-item label="保养执行人">{{ handleForm.chargePersonName }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>处理情况</span>
          <el-button class="el-icon-edit" style="float: right; padding: 3px 0" type="text" @click="handleEdit(2)">编辑
          </el-button>
        </div>
        <el-descriptions :column="2">
          <el-descriptions-item label="保养内容">{{ handleForm.maintenanceContent }}</el-descriptions-item>
          <el-descriptions-item label="是否更换零部件">{{ handleForm.renewal }}</el-descriptions-item>
          <el-descriptions-item label="开始时间">18100000000</el-descriptions-item>
          <el-descriptions-item label="结束时间">18100000000</el-descriptions-item>
          <el-descriptions-item :span="2" label="总时长">{{ handleForm.countTime }}</el-descriptions-item>
          <el-descriptions-item :span="2" label="完成情况">{{ handleForm.circumstances }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>更换零部件</span>
          <el-link class="el-icon-edit" style="float: right; padding: 3px 0" type="primary">新增</el-link>
          <el-link class="el-icon-delete" style="float: right; padding: 3px 0;margin-right: 20px" type="danger">删除行
          </el-link>
        </div>
        <el-table
          ref="multipleTable"
          :data="handleForm.usePartDTOS"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            width="55" type="index"/>
          <el-table-column
            prop="partName"
            label="零部件名称"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="partModel"
            label="规格型号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="领用数量"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <span>故障图片</span>
        </div>
        <div style="padding-bottom: 20px" class="upload-box">
          <p>最多上传10张图片</p>
          <el-upload
            list-type="picture-card"
            ref="uploadImg"
            multiple
            :limit="10"
            accept=".png, .jpg"
            :headers="upload.headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="ImghandleFileSuccess"
            :auto-upload="true"
            :file-list="handleForm.imgList"
            drag
          >
            <span>点击或者将图片拖拽到这里上传</span>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt/>
          </el-dialog>
        </div>
      </el-card>
    </el-form>
    <el-dialog title="保养情况" :visible.sync="dialogShow"
               width="50%" append-to-body @close="cancel">
      <el-form ref="form" :model="dialogShowForm" label-width="80px">
        <div v-if="dialogType == 1">
          <el-form-item label="存在问题" label-width="80px" prop="area">
            <el-input v-model="dialogShowForm.question" placeholder=请填写存在问题></el-input>
          </el-form-item>
          <el-form-item label="保养执行人" label-width="80px" prop="area">
            <el-input v-model="dialogShowForm.engineerPerson"></el-input>
          </el-form-item>
        </div>
        <div v-if="dialogType == 2">
          <el-row class="flex flex-wrap">
            <el-col :span="12">
              <el-form-item label="保养内容" label-width="120px" prop="">
                <el-input v-model="dialogShowForm.maintenanceContent" placeholder=请填写保养内容></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否更换零部件" label-width="120px" prop="">
                <el-radio-group v-model="dialogShowForm.renewal">
                  <el-radio label="是" value="1"></el-radio>
                  <el-radio label="否" value="0"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始时间" label-width="120px" prop="">
                <el-input v-model="dialogShowForm.startTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间" label-width="120px" prop="">
                <el-input v-model="dialogShowForm.endTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <el-form-item label="总时长" label-width="120px" prop="">
                  <el-input disabled v-model="dialogShowForm.countTime"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-form-item label="完成情况" label-width="120px" prop="">
                <el-input type="textarea" v-model="dialogShowForm.circumstances"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="dialogType == 3"></div>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="success" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>


</div>
</template>

<script>
import {getToken} from "@/utils/auth";

export default {
  name: "handle",
  props: {
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/maintenance/tasks/common/upload",
      },
      handleForm: {},
      dialogVisible: false,
      dialogImageUrl: '',
      dialogShow: false,
      dialogType: 1,//1,2,3  分别指弹窗 1 2 3
      dialogShowForm: {}
    }
  },
  watch: {
    formData(newVal) {
      this.handleForm = newVal
    }
  },
  mounted() {
    console.log('this.formData', this.formData)
    this.handleForm = this.formData
  },
  methods: {
    handleEdit(type) {
      this.dialogShow = true
      this.dialogType = type
      switch (type) {
        case 1:
          this.dialogShowForm = {

          }
          break
      }
    },
    cancel() {
      this.dialogShow = false;
      this.dialogType = 0
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传
    handleRemove(file) {
      console.log(file);
    },
    handleFileUploadProgress(row) {
    },
    ImghandleFileSuccess(res, file, filelist) {
      let imageInfo = {
        url: res.data.url,
        name: res.data.fileName,
        filePath: res.data.url,
        pictureName: res.data.fileName,
        filetype: 0,
        pictureSize: res.data.size / 1024,
      };
      this.form.accessor.push(imageInfo);
    }
  }
}
</script>

<style scoped>

.box-card {
  margin: 20px 0;
}
</style>
