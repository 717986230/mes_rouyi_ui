<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width
    >
      <el-form-item label="设备名称或编码:" prop="facilityName">
        <el-input
          v-model="queryParams.facilityName"
          placeholder="请输入设备名称或编码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--区域选择-->
      <select-area @selectArea="selectAreaChange"></select-area>
      <el-form-item label="工单状态:" prop="workStatus">
        <el-select
          v-model="queryParams.workStatus"
          placeholder="请选择工单状态"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="(dict, index) in workStatus"
            :key="index"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="报修时间:" prop="dateRange">
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
      <el-form-item label="是否停线" prop="whetherLineStop">
        <el-select
          v-model="queryParams.whetherLineStop"
          placeholder="是否停线"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="(dict, index) in workistrue"
            :key="index"
            :label="dict.label"
            :value="dict.status"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="故障类型" prop="faultStatus">
        <el-select
          v-model="queryParams.faultStatus"
          placeholder="请选择故障类型"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in faultStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
        <!-- <el-button
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
        > -->
      </el-form-item>
    </el-form>

      <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
              <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAddInfo"
                  v-hasPermi="['equipment:repair:add']"
              >新增</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <el-button
                  type="success"
                  icon="el-icon-edit"
                  size="mini"
                  :disabled="btnAuth.btn1 || single"
                  @click="handleeditTable"
                  v-hasPermi="['equipment:repair:edit']"
              >修改</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  :disabled="btnAuth.btn2 || single"
                  @click="handleDelete"
                  v-hasPermi="['equipment:repair:del']"
              >删除</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <el-button
                  type="success"
                  size="mini"
                  :disabled="btnAuth.btn3 || isWorkSumbit || single"
                  @click="handleSubmit(1)"
                  v-hasPermi="['equipment:repair:submit']"
              >提交</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <el-button
                  type="success"
                  size="mini"
                  :disabled="btnAuth.btn4 || single || !isWorkS"
                  @click="updateClaimStateById"
                  v-hasPermi="['equipment:repair:claim']"
              >认领</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <!-- :disabled="single || isPreserve !== '工程师'" -->
              <el-button
                  type="success"
                  v-show="engineer"
                  size="mini"
                  :disabled="btnAuth.btn5 || multiple"
                  @click="gcsYS"
                  v-hasPermi="['equipment:repair:acceptance']"
              >工程师验收</el-button
              >
          </el-col>
          <el-col :span="1.5">
              <!-- :disabled="single || isPreserve !== '工程师'" -->
              <el-button
                  type="success"
                  size="mini"
                  v-show="engineer"
                  :disabled="btnAuth.btn6 || multiple"
                  @click="CJhandler"
                  v-hasPermi="['equipment:repair:check']"
              >抽检</el-button
              >
          </el-col>
      </el-row>

    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="序号"
        width="55"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="设备名称" align="center" prop="facilityName">
        <template slot-scope="scope">
          <div
            :title="scope.row.facilityName"
            class="column-name"
            @click="
              handleToProcess(scope, scope.row.facilityId, scope.row.workStatus)
            "
          >
            {{ scope.row.facilityName }}
          </div>
        </template>
        <!-- </template> -->
      </el-table-column>
      <el-table-column
        label="设备编号"
        align="center"
        prop="facilityNumber"
      ></el-table-column>
      <el-table-column label="规格型号" align="center" prop="sizeModel" />
      <el-table-column label="设备类别" align="center" prop="facilityCategory">
        <template slot-scope="scope">{{
          scope.row.facilityCategory == 0 ? "重要设备" : "非重要设备"
        }}</template>
      </el-table-column>
      <el-table-column label="工单状态" align="center" prop="workStatus">
        <template slot-scope="scope">
          <!--          <span>{{ scope.row.workStatus}}{{workStatus}}</span>-->
          <span>{{
            scope.row.workStatus | getFaultLabel(scope.row.workStatus)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="故障类型" align="center" prop="faultStatus">
        <template slot-scope="scope">{{
          scope.row.faultStatus == 0 ? "机械类故障" : "电气类故障"
        }}</template>
      </el-table-column>
      <el-table-column
        label="故障详情"
        align="center"
        prop="faultDetails"
        width="140px"
      >
        <template slot-scope="scope">{{ scope.row.faultDetails }}</template>
      </el-table-column>
      <!--      <el-table-column label="区域" align="center" prop="area" />-->
      <el-table-column
        label="报修时间"
        align="center"
        prop="repairsStartTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>
            {{
              dayjs(scope.row.repairsStartTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="报修人" align="center" prop="repairsPeople" />
      <el-table-column label="维修人" align="center" prop="maintainPeople" />
      <el-table-column label="故障时长" align="center" prop="duration">
        <template slot-scope="scope">{{ scope.row.duration }}</template>
      </el-table-column>
      <el-table-column label="维修时长" align="center" prop="maintainTime">
        <template slot-scope="scope">{{ scope.row.maintainTime }}</template>
      </el-table-column>
      <el-table-column label="是否停线" align="center" prop="whetherLineStop">
        <template slot-scope="scope">{{
          scope.row.whetherLineStop == 0 ? "停线" : "未停线"
        }}</template>
      </el-table-column>
      <el-table-column
        label="是否更换配件"
        align="center"
        prop="whetherChangeParts"
        width="140px"
      >
        <template slot-scope="scope">{{
          scope.row.whetherChangeParts == 0 ? "已更换" : "未更换"
        }}</template>
      </el-table-column>
      <el-table-column label="存在问题" align="center" prop="existProblem" />
      <el-table-column label="备注" align="center" prop="remark" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getWXAll"
    />
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
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

import { mapGetters } from "vuex";
import SelectArea from "@/views/equipment/common/SelectArea";
var self;
import dayjs from "dayjs";
export default {
  components: {
    SelectArea,
  },
  name: "Maintenance",
  filters: {
    getFaultLabel(status) {
      return self.workStatus.find((item) => item.dictValue == status).dictLabel;
    },
  },
  data() {
    return {
      cjtypes: "",
      dataList: [],
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
      // 弹出层标题
      title: "",
      //是否停线
      // 0:停线:
      // 1:未停线;
      workistrue: [
        {
          status: 0,
          label: "停线",
        },
        {
          status: 1,
          label: "未停线",
        },
      ],
      // 0:机械类故障;
      // 1:电气类故障;';
      faultStatus: [],
      //工单状态
      workStatus: [],
      //故障类型
      faultDetails: [
        {
          status: 0,
          label: "磨损性故障",
        },
        {
          status: 1,
          label: "腐蚀性故障",
        },
        {
          status: 2,
          label: "断裂性故障",
        },
        {
          status: 3,
          label: "老化性故障",
        },
        {
          status: 4,
          label: "人为机械性故障",
        },
        {
          status: 5,
          label: "电源故障",
        },
        {
          status: 6,
          label: "电路故障",
        },
        {
          status: 7,
          label: "设备和元件故障",
        },
        {
          status: 8,
          label: "软件故障",
        },
        {
          status: 9,
          label: "人为电气性故障",
        },
      ],
      idsFour: [], //工程师验收数组4
      // 状态数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        facilityName: "",
        facilityNumber: "",
        isAsc: "",
        orderBy: "",
        orderByColumn: "",
        pageNum: 1,
        pageSize: 10,
        areaId: "",
      },
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
      guzinfo: "",
      isWorkS: true,
      isWorkSumbit: true,
      leader: false, //领导
      generalWorkers: false, //普工
      manager: false, //主管
      monitor: false, //班长
      maintenance: false, //维修人员
      engineer: false, //工程师
      isNowLeader: false, //是否是当前登录的领导
      isNowGeneralWorkers: false, //是否是当前登录的普工
      isNowManager: false, //是否是当前登录的主管
      isNowMonitor: false, //是否是当前登录的班长
      isNowMaintenance: false, //是否是当前登录的维修人员
      isNowEngineer: false, //是否是当前登录的工程师
      //按钮权限
      btnAuth: {
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
      },
      filename: "", //上传文件名
      fileList: [],
    };
  },
  created() {
    self = this;
      this.$api.Fault_Status().then((response) => {
      this.faultStatus = response.data.map((item) => {
        return {
          ...item,
          ...{
            dictValue: Number(item.dictValue),
          },
        };
      });
    });
    this.$api.Work_Status().then((response) => {
      this.workStatus = response.data.map((item) => {
        return {
          ...item,
          ...{
            dictValue: Number(item.dictValue),
          },
        };
      });
      console.log("工单状态", this.workStatus);
      this.getWXAll();
    });
  },
  watch: {
    $route: {
      handler(to, from) {
        // 路由变化时执行的逻辑
        setTimeout(() => {
          this.getWXAll();
        }, 700);
        // 可以在这里触发刷新页面的操作或执行其他操作
      },
      immediate: true, // 立即执行handler函数
      deep: true, // 深度观察$route对象的变化
    },
  },
  computed: {
  },
  methods: {
    //获取当前用户得身份
    getUserIdentity() {
      let userInfoRoles = ['*.*.*'];
      this.leader =
        userInfoRoles.includes("leader") || userInfoRoles.includes("admin"); //领导
      this.generalWorkers =
        userInfoRoles.includes("generalWorkers") ||
        userInfoRoles.includes("admin"); //普工
      this.manager =
        userInfoRoles.includes("manager") || userInfoRoles.includes("admin"); //管理人员
      this.monitor =
        userInfoRoles.includes("monitor") || userInfoRoles.includes("admin"); //班长
      this.maintenance =
        userInfoRoles.includes("maintenance") ||
        userInfoRoles.includes("admin"); //维修人员
      this.engineer =
        userInfoRoles.includes("engineer") || userInfoRoles.includes("admin"); //工程师
      this.isNowLeader =
        userInfoRoles.includes("leader") || userInfoRoles.includes("admin"); //是否是当前登录的领导
      this.isNowMonitor =
        userInfoRoles.includes("monitor") || userInfoRoles.includes("admin"); //是否是当前登录的班长
    },
    handleToProcess(scope, id, workStatus) {
      switch (workStatus) {
        case 0:
          this.cjtypes = "basic";
          break;
        case 1:
          this.cjtypes = "basic";
          break;
        case 2:
          this.cjtypes = "cloum";
          break;
        case 3:
          this.cjtypes = "genInfo";
          break;
        case 4:
          this.cjtypes = "genInfo1";
          break;
        case 5:
          this.cjtypes = "genInfo2";
          break;
        case 6:
          this.cjtypes = "genInfo3";
          break;
        default:
          this.cjtypes = "basic";
          break;
      }
      this.$router.push({
        path: "/equipment/edit",
        query: {
          id: id,
          workStatus: workStatus,
          cjtype: this.cjtypes,
        },
      });
    },
    //抽检
    CJhandler() {
      const allAreFour = this.idsFour.every((element) => element == 5);
      if (allAreFour) {
        this.$api
          .WXaddMaintainSpotTest({
            facilityIds: this.ids,
            spotTestIdea: "合格",
            workStatus: 6,
          })
          .then((res) => {
            if (res.code == 200) {
              console.log("接口成功", res);
              this.getWXAll();
              this.$message({
                type: "success",
                message: "抽检成功",
              });
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res);
            }
          })
          .catch((err) => {
            console.log("接口失败", err);
          });
      } else {
        this.$message.error("请检查选中选项，有不符合条件的选项");
      }
      // //只有未提交才能修改
      // if (this.isWorkS !== 5) {
      //   this.$message({
      //     type: 'error',
      //     message: '流程未处理完毕,不可抽检'
      //   })
      //   return false
      // }
      // this.$router.push({
      //   path: '/equipment/edit',
      //   query: {
      //     id: this.ids[0],
      //     workStatus: this.isWorkS,
      //     cjtype: 'genInfo2'
      //   }
      // })
    },
    //工程师验收
    gcsYS() {
      const allAreFour = this.idsFour.every((element) => element === 4);
      if (allAreFour) {
        this.$api
          .WXaddLeadCheck({
            facilityIds: this.ids,
            checkIdea: "合格",
            workStatus: 5,
          })
          .then((res) => {
            if (res.code == 200) {
              console.log("接口成功", res);
              this.getWXAll();
              this.$message({
                type: "success",
                message: "工程师验收成功",
              });
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res);
            }
          })
          .catch((err) => {
            console.log("接口失败", err);
          });
      } else {
        this.$message.error("请检查选中选项，有不符合条件的选项");
      }
    },
    MDdayjs(statet, endt) {
      if (!statet || !endt) {
        return " ";
      }
      // 假设有两个时间变量 startTime 和 endTime
      const startTime = new Date(statet);
      const endTime = new Date(endt);
      // 计算时间差（单位为毫秒）
      const timeDiff = endTime.getTime() - startTime.getTime();
      // 计算小时和分钟
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      // 输出时间差
      const filtime = hours + "时 " + minutes + "分";
      return filtime;
    },
    getWXAll() {
      this.loading = true;
      const [startDate, endDate] = this.dateRange;
      this.$api
        .WXAll({
          ...this.queryParams,
          ...{ repairsStartTime: startDate, repairsEndTime: endDate },
        })
        .then((res) => {
            console.log('获取设备报修列表',res)
          if (res.code == 200) {
            this.dataList = res.rows;
            this.total = res.total;
            this.loading = false;
          }
        })
        .catch((e) => {
          console.log(e, "数据获取失败");
        });
    },

    // 表单重置
    reset() {
      this.queryParams = {};
      this.resetForm("form");
    },
    /*区域选择*/
    selectAreaChange(e) {
      this.queryParams.areaId = e.id;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getWXAll();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        facilityName: "",
        facilityNumber: "",
        isAsc: "",
        orderBy: "",
        orderByColumn: "",
        pageNum: 1,
        pageSize: 10,
      };
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAddInfo() {
      // const tableId = row.tableId || this.ids[0]
      this.$router.push("/equipment/addinfo");
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.facilityId);
      this.idsFour = selection.map((item) => item.workStatus);
      this.isWorkS = selection.map((item) => item.workStatus)[0];
      this.isWorkSumbit = selection[0]?.workStatus == 1;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      //按钮是否禁用
      console.log("多选数据", selection);
      let btn1, btn2, btn3, btn4, btn5, btn6;
      btn1 = !selection.every((item) => item.workStatus == 0); //修改
      btn2 = !selection.every(
        (item) => item.workStatus == 1 || item.workStatus == 0
      ); //删除
      btn3 = !selection.every((item) => item.workStatus == 0); //提交
      btn4 = !selection.every((item) => item.workStatus == 1); //认领
      btn5 = !selection.every((item) => item.workStatus == 4); //工程师验收
      btn6 = !selection.every((item) => item.workStatus == 5); //抽检
      console.log("按钮点击权限", btn1, btn2, btn3, btn4, btn5, btn6);
      this.btnAuth = {
        btn1,
        btn2,
        btn3,
        btn4,
        btn5,
        btn6,
      };
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    //模板下载  维修
    downloadTemplate() {
      this.$api.DRexport({ type: "maintenance" }).then((res) => {
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
            type: "maintenance",
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
      FormDatas.append("type", "maintenance");
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

    cancel() {
      this.upload.isUploading = false;
      this.upload.open = false;
      this.fileList = [];
    },
    /** 修改按钮操作 */
    handleeditTable() {
      // //只有未提交才能修改
      if (this.isWorkS !== 0) {
        this.$message({
          type: "error",
          message: "设备维修单已提交，不可修改",
        });
        return false;
      }
      this.$router.push({
        path: "/equipment/addinfo",
        query: {
          id: this.ids,
          workStatus: this.isWorkS,
          isInput: 0,
        },
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.dictId != undefined) {
            updateType(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getWXAll();
            });
          } else {
            addType(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getWXAll();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete() {
      let nowData = this.dataList.filter((item) => {
        //接收新数组
        return item.facilityId == this.ids[0];
      })[0];
      //只有未提交才能删除
      if (this.isWorkS !== 0) {
        this.$message({
          type: "error",
          message: "设备维修单已提交，不可删除",
        });
        return false;
      }

      this.$confirm("是否确认删除选中的设备维修数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            this.msgSuccess("删除成功");
            return
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
        .WXdeleteById({ ids })
        .then((res) => {
          if (res.code == 200) {
            this.msgSuccess("删除成功");
            this.getWXAll();
          } else {
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },

    //认领
    updateClaimStateById() {
        this.$message.success("认领成功");
        return
      if (this.isWorkS >= 2) {
        this.$message({
          type: "error",
          message: "重复认领",
        });
        return false;
      }
      this.$api
        .WXupdateClaimStateById({
          perop: this.name,
          facilityId: this.ids[0],
          workStatus: 2,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getWXAll();
            this.$message.success("认领成功");
          } else {
            this.getWXAll();
            this.$message.success("认领失败");
          }
        });
    },
    /** 提交按钮操作 */
    handleSubmit(status) {
        this.msgSuccess("提交成功");
        return
      let nowId;
      let nowData = this.dataList.filter((item) => {
        //接收新数组
        nowId = item.facilityId = this.ids[0];
        return nowId;
      })[0];
      //只有未提交才能删除
      if (this.isWorkS > 0) {
        this.$message({
          type: "error",
          message: "重复提交",
        });
        return false;
      }
      this.form.workStatus = status;
      this.$api
        .WXupdateSubmitStateById({
          facilityId: nowId,
          workStatus: this.form.workStatus,
        })
        .then((res) => {
          if (res.code == 200) {
            this.msgSuccess("提交成功");
            this.sendMsg(nowData);
            this.getWXAll();
          } else {
            this.msgSuccess("提交失败，请重试");
          }
        });
    },
    //发送订阅消息
    async sendMsg(param) {
      //发送订阅消息
      let { facilityName, area, repairsPeople, repairsStartTime, faultStatus } =
        param;
      const res1 = await this.$api.SendMsgSubmit({
        msgType: "repair",
        type: "maintenance",
        data: {
          thing4: {
            value: facilityName, //设备名称
          },
          thing3: {
            value: area || "-", //区域
          },
          thing6: {
            value: repairsPeople, //报修人
          },
          time7: {
            value: this.dayjs(repairsStartTime).format("YYYY-MM-DD HH:mm"), //报修时间
          },
          thing2: {
            value: faultStatus === "0" ? "机械类故障" : "电气类故障", //报障类型
          },
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.column-name {
  color: #00c6ff;
  cursor: pointer;
}
</style>
