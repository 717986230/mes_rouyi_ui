<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width
    >
      <el-form-item label="保养计划名称:" prop="dictName">
        <el-input
          v-model="queryParams.planName"
          placeholder="请输入保养计划名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--区域选择-->
      <select-area
        ref="selectAreaRef"
        @selectArea="selectAreaChange"
      ></select-area>
      <el-form-item label="计划状态:" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择计划状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="计划时间:">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="关联设备:" prop="status">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入关联设备名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="query"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetForm"
          >重置</el-button
        >
        <el-button
          type="cyan"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          >导入</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
        <el-button type="success" size="mini" @click="downloadTemplate"
          >模板下载</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['equipment:maintenance:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          :disabled="btnAuth.btn2 || single"
          v-hasPermi="['equipment:maintenance:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="btnAuth.btn3 || multiple"
          @click="handleDelete"
          v-hasPermi="['equipment:maintenance:del']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-upload2"
          size="mini"
          :disabled="btnAuth.btn4 || single"
          v-hasPermi="['equipment:maintenance:submit']"
          @click="handleSubmit(1)"
          >提交</el-button
        >
      </el-col>

      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getTableData"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="tableLoading"
      height="500"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        fixed
        label="序号"
        width="55"
        align="center"
        type="index"
      />
      <el-table-column
        fixed
        width="120"
        label="保养计划名称"
        align="center"
        prop="planName"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div
            :title="scope.row.planName"
            class="column-name"
            @click="handleToDetail(scope.row.id)"
          >
            {{ scope.row.planName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="计划状态"
        align="center"
        prop="status"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="是否逾期"
        align="center"
        prop="isOverdue"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="保养内容"
        align="center"
        prop="maintenanceContent"
        :show-overflow-tooltip="true"
        width="120"
      />
      <el-table-column
        label="区域"
        align="center"
        prop="area"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="关联设备"
        align="center"
        prop="equipmentName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="钳工"
        align="center"
        prop="benchwork"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="电工"
        align="center"
        prop="electrical"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="焊工"
        align="center"
        prop="welder"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="其他工种" align="center" prop="other" />
      <el-table-column
        label="计划开始时间"
        align="center"
        prop="planStartTime"
        :show-overflow-tooltip="true"
        width="180"
      />
      <el-table-column
        label="计划结束时间"
        align="center"
        prop="planEndTime"
        :show-overflow-tooltip="true"
        width="180"
      />
      <el-table-column
        label="实际开始时间"
        align="center"
        prop="realityStartTime"
        :show-overflow-tooltip="true"
        width="180"
      />
      <el-table-column
        label="实际完成时间"
        align="center"
        prop="realityEndTime"
        :show-overflow-tooltip="true"
        width="180"
      />
      <el-table-column
        label="计划提报人"
        align="center"
        prop="createUserName"
        :show-overflow-tooltip="true"
        width="120"
      />
      <el-table-column
        label="负责人"
        align="center"
        prop="chargePersonName"
        :show-overflow-tooltip="true"
        width="120"
      />
      <el-table-column
        label="负责工程师"
        align="center"
        prop="engineerPersonName"
        :show-overflow-tooltip="true"
        width="120"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
        width="180"
      />
    </el-table>
    <pagination
      v-show="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.pageNum"
      :page-sizes="pagination.sizes"
      :limit.sync="pagination.pageSize"
      position="left"
      @pagination="getTableData"
    />
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              >{{ dict.dictLabel }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="500px"
      append-to-body
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        action
        :http-request="submitUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="true"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div
          class="el-upload__tip"
          style="font-size: 20px; color: red"
          slot="tip"
        >
          <div>导入前请先下载模板,按照模板填写</div>
          <el-button
            type="warning"
            style="font-size: 20px; color: red"
            @click="downloadTemplate"
            >下载模板</el-button
          >
        </div>
        <div
          class="el-upload__tip"
          style="color: red; font-size: 14px"
          slot="tip"
        >
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="cancelsss">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

import {
  listType,
  getType,
  delType,
  addType,
  updateType,
  exportType,
  clearCache,
} from "@/api/system/dict/type";
import tableSearchPaginationMixin from "@/views/equipment/mixins/tableSearchPagination.js";
import { mapGetters } from "vuex";
import SelectArea from "@/views/equipment/common/SelectArea";

export default {
  name: "tenjh",
  mixins: [tableSearchPaginationMixin],
  components: {
    SelectArea,
  },
  data() {
    return {
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
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 任务类型字典值
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" },
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" },
        ],
      },
      //按钮权限
      btnAuth: {
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
      },
      fileList: [],

      filename: "", //上传文件名
    };
  },
  computed: {
    ...mapGetters(["areaList", "areaStationList", "stationList", "userId"]),
  },
  created() {
    this.getTableData();
    //任务类型字典值
    this.getDicts("maintain_task_status").then((response) => {
      console.log("计划状态 字典=", response);
      this.statusOptions = response.data;
    });
  },
  methods: {
    // 重置
    resetForm() {
      this.queryParams = {};
      this.dateRange = [];
      this.getTableData(this.queryParams);
    },
    /** 查列表 */
    getTableData() {
      this.tableLoading = true;
      console.log(this.pagination);
      this.$api
        .ten_jhList({
          ...this.pagination,
          ...this.queryParams,
          ...{
            planStartTime: this.dateRange[0] || "",
            planEndTime: this.dateRange[1] || "",
          },
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.tableData = res.rows;
            this.pagination.total = res.total;
            this.tableLoading = false;
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        dictId: undefined,
        dictName: undefined,
        dictType: undefined,
        status: "0",
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getTableData();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset()
      this.$router.push("Submit/create");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      //按钮是否禁用
      console.log("多选数据", selection);
      let btn1, btn2, btn3, btn4;
      btn1 = false; //新增
      btn2 = !selection.every((item) => item.statusId == 0); //修改
      btn3 = !selection.every((item) => item.statusId <= 1); //删除
      btn4 = !selection.every((item) => item.statusId == 0); //提报
      console.log("按钮点击权限", btn1, btn2, btn3, btn4);
      this.btnAuth = {
        btn1,
        btn2,
        btn3,
        btn4,
      };
    },
    /** 修改按钮操作 */
    handleUpdate() {
      // this.reset()
      let nowData = this.tableData.filter((item) => {
        //接收新数组
        return item.id == this.ids[0];
      })[0];
      //只有未提交才能修改
      if (nowData.statusId !== 0) {
        this.$message({
          type: "error",
          message: "保养计划已提交，不可修改",
        });
        return false;
      }
      this.$router.push({
        path: "submit/edit",
        query: {
          id: nowData.id,
        },
      });
    },

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    //模板下载  保养
    downloadTemplate() {
      this.$api.DRexport({ type: "conserve" }).then((res) => {
        if (res.code == 200) {
          this.download(res.msg);
        }
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.$confirm("是否确认导出所有数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.$api.DRdownload({
            type: "conserve",
          });
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
    submitUpload(e) {
      this.efile = e;
    },
    // 提交上传文件
    submitFileForm() {
      /** 提交按钮 */
      const FormDatas = new FormData();
      FormDatas.append("file",  this.efile.file);
      FormDatas.append("type", "conserve");
      //新增操作
      this.$api
        .DRimport(FormDatas)
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.$message({
              showClose: true,
              message: "文档信息上传成功",
              type: "success",
            });
            this.upload.open = false;
            this.upload.isUploading = false;
            this.fileList = [];
            this.getTableData();
          } else {
            this.$message.error("上传失败,请重试");
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          this.$message.error("上传失败,请重试");
          console.log("接口失败", err);
        });
      // this.$refs.upload.submit();
    },
    // 图片上传回调函数 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      window.open(file.url);
    },
    // 图片上传回调函数 文件上传成功时的钩子
    uploadSuccess(response, file, fileList) {
      console.log("上传成功", response, file, fileList);
      let { fileName, size, url } = response;
      this.fileList.push({
        fileName: fileName,
        fileSize: size * 1024,
        name: fileName,
        url: url,
      });
    },
    // 图片上传回调函数 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let nowFileList = [];
      fileList.forEach((file) => {
        this.fileList.forEach((item) => {
          if (file.uid == item.uid) {
            nowFileList.push(item);
          }
        });
      });
      this.fileList = nowFileList;
    },
    // 图片上传回调函数 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制只能上传1个文件`);
    },

    cancelsss() {
      this.upload.isUploading = false;
      this.upload.open = false;
      this.fileList = [];
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.dictId != undefined) {
            updateType(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getTableData();
            });
          } else {
            addType(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getTableData();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete() {
      let nowData = this.tableData.filter((item) => {
        //接收新数组
        return item.id == this.ids[0];
      })[0];
      //只有未提交才能删除
      if (nowData.statusId > 1) {
        this.$message({
          type: "error",
          message: "保养任务已开启，不可删除",
        });
        return false;
      }
      this.$confirm("是否确认删除选中的保养计划数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            this.msgSuccess("删除成功");
            return;
          this.handleTenanceDel(this.ids);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 删除计划*/
    handleTenanceDel(ids) {
      this.$api
        .tenanceDel({ ids })
        .then((res) => {
          if (res.code == 200) {
            this.msgSuccess("删除成功");
            this.getTableData();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    /** 提报按钮操作 */
    handleSubmit(status) {
        this.msgSuccess("提报成功");
        return
      let nowData = this.tableData.filter((item) => {
        //接收新数组
        return item.id == this.ids[0];
      })[0];
      //只有未提交才能删除
      if (nowData.statusId > 0) {
        this.$message({
          type: "error",
          message: "计划已提交",
        });
        return false;
      }
      this.$api
        .tenanceSubmit({ status, planId: this.ids })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.msgSuccess("提报成功");
            this.sendMsg(nowData);
            this.getTableData();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //发送订阅消息
    async sendMsg(param) {
      //发送订阅消息
      let { equipmentName, area, createUserName, planStartTime, planEndTime } =
        param;
      const res1 = await this.$api.SendMsgSubmit({
        msgType: "maintenance",
        type: "maintainPlanExecute",
        data: {
          thing1: {
            value: equipmentName || "-", //设备名称
          },
          thing6: {
            value: area || "-", //区域
          },
          thing13: {
            value: createUserName + "创建", //备注
          },
          time7: {
            value:
              this.dayjs(planStartTime).format("YYYY-MM-DD HH:mm") +
              "~" +
              this.dayjs(planEndTime).format("YYYY-MM-DD HH:mm"), //保养时间
          },
        },
      });
    },
    /** 清理缓存按钮操作 */
    handleClearCache() {
      clearCache().then((response) => {
        this.msgSuccess("清理成功");
      });
    },
    /*跳转去详情*/
    handleToDetail(id) {
      this.$router.push({
        path: "/equipment/ten_jh_detail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style scoped>
.column-name {
  color: #00c6ff;
  cursor: pointer;
}
</style>
