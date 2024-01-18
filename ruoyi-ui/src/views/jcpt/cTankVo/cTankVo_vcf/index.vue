<template>
  <!-- vcf表 -->
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="编码:" prop="vcfNum" style="margin-left: -30px;">
        <el-input v-model="queryParams.vcfNum" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="算法类别:" prop="artcSt">
        <el-select v-model="queryParams.artcSt" placeholder="算法类别" clearable>
          <el-option v-for="dict in dict.type.math_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
        <el-button size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
          @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
          @click="handleDelete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" width="50" align="center" />
      <el-table-column label="编码" sortable align="center" key="vcfNum" prop="vcfNum" v-if="columns[0].visible"
        :show-overflow-tooltip="true" />
      <el-table-column label="密度" sortable align="center" key="den" prop="den" v-if="columns[1].visible"
        :show-overflow-tooltip="true" />
      <el-table-column label="VCF值" sortable align="center" key="vcfVal" prop="vcfVal" v-if="columns[2].visible"
        :show-overflow-tooltip="true" />
      <el-table-column label="温度" sortable align="center" key="temp" prop="temp" v-if="columns[3].visible"
        :show-overflow-tooltip="true" />
      <el-table-column label="算法类别" sortable align="center" key="vcfTypeName" prop="vcfTypeName" v-if="columns[4].visible"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="编码:" prop="vcfNum">
              <el-input v-model="form.vcfNum" placeholder="请输入编码" maxlength="30" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="height: 10px;">
          </el-col>
          <el-col :span="10">
            <el-form-item label="密度:" prop="den">
              <el-input v-model="form.den" placeholder="请输入密度" maxlength="11" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="温度:" prop="temp">
              <el-input v-model="form.temp" placeholder="请输入温度" maxlength="30" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="height: 10px;">
          </el-col>
          <el-col :span="10">
            <el-form-item label="VCF值:" prop="vcfVal">
              <el-input v-model="form.vcfVal" placeholder="请输入VCF值" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="算法类别:" prop="artcSt">
              <el-select v-model="form.artcSt" placeholder="算法类别">
                <el-option v-for="(item, index) in math_type_add" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增/修改弹窗 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 公式验证编辑 -->
    <varPop :openGS="openGS" @close="handleClose"></varPop>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
  name: "cTankVo_vcf",
  dicts: ['work_c', 'math_type'],
  components: { varPop },
  data() {
    return {
      // 列信息
      columns: [
        { key: 0, label: `编码`, visible: true },
        { key: 1, label: `密度`, visible: true },
        { key: 2, label: `温度`, visible: true },
        { key: 3, label: `VCF值`, visible: true },
        { key: 4, label: `算法类别`, visible: true }
      ],
      math_type_add: [
        {
          label: "未定义", value: "0"
        },
        {
          label: "原油", value: "1"

        },
        {
          label: "成品油", value: "2"

        },
        {
          label: "润滑油", value: "3"

        }, {
          label: "扩展", value: "4"

        }
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openGS: false,
      // 表单参数
      form: {},
      // 用户导入参数
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
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/mes/vcf/import"
      },
      // 查询参数
      queryParams: {
        vcfId: "",// 编码
        artcSt: "",//算法类别
        pageNum: 1,
        pageSize: 10,
        unitAlias: "",
        "vcfNum": ""
      },
      rules: {
        vcfNum: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
        vcfVal: [
          { required: true, message: "请输入VCF值", trigger: "blur" },
        ],
        den: [
          { required: true, message: "请输入密度", trigger: "blur" },
        ],
        temp: [
          { required: true, message: "请输入温度", trigger: "blur" },
        ],
      }
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    //传给子组件的控制方法
    handleClose() {
      this.openGS = false; // 关闭父组件的弹窗
      this.reset();
    },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      this.$api.i_vcfList(this.queryParams).then(res => {
        this.userList = res.rows
        this.total = res.total
        this.loading = false;
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        "artcSt": "",
        "den": "",
        "id": undefined,
        "temp": "",
        "vcfNum": "",
        "vcfVal": "",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.id = undefined;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            this.$api.i_vcfSU({
              "artcSt": this.form.artcSt,
              "den": this.form.den,
              "id": this.form.id,
              "temp": this.form.temp,
              "vcfNum": this.form.vcfNum,
              "vcfVal": this.form.vcfVal,
            }).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.$api.i_vcfSU(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.id || this.ids[0];
      this.$api.i_vcfById({ id: userId }).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改信息";
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.id || this.ids[0];
      this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
        return this.$api.i_vcfDel({ id: userIds })
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('mes/vcf/export', {
        ...this.queryParams
      }, `VCF表_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('mes/vcf/export', {
      }, `VCF表_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }

  }
};
</script>
