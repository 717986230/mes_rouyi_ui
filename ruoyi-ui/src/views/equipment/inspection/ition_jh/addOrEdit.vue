<template>
  <!-- 巡检计划（新增/修改）   -->
  <div>
    <div style="margin: 20px;font-size:24px ;">
      巡检计划（新增/修改）
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维护计划基础信息</span>
      </div>
      <el-form ref="formForm" :model="formForm" label-width="120px" :rules="rulesForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="巡检条目名称:" prop="name">
              <el-input style="width: 90%" v-model="formForm.name" placeholder="巡检条目名称" type="text"
                        maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="巡检条目编码:" prop="num">
              <el-input style="width: 90%" v-model="formForm.num" placeholder="巡检条目编码"
                        :disabled="this.routerId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="区域:" prop="area">
              <el-select style="width: 90%" v-model="formForm.area" placeholder="区域" clearable>
                <el-option v-for="dict in RequisitionDepartment" :key="dict.value" :label="dict.label"
                           :value="dict.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行规则:" prop="Executiverule">
              <el-input style="width: 90%" v-model="formForm.Executiverule" placeholder="执行规则"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="是否循环:" prop="useFlag">
              <el-radio v-model="formForm.useFlag" label="1">是</el-radio>
              <el-radio v-model="formForm.useFlag" label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划开始时间:" prop="Plannedtime">
              <el-date-picker style="width: 90%" v-model="formForm.Plannedtime" type="datetime" format="yyyy-MM-dd"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划结束时间:" prop="Purchasetime">
              <el-date-picker style="width: 90%" v-model="formForm.Purchasetime" type="datetime" format="yyyy-MM-dd"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>涉及设备明细</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="1.5">
          <el-col :span="1.5">
            <el-button type="success" plain @click="handleAdd(1)">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain @click="handleRemove(1)" :disabled="singleDetails">移除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="PopwindowDateDetails"
                @selection-change="handleSelectionChangeDetails">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="设备名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="设备编号" align="center" key="num" prop="num" :show-overflow-tooltip="true"/>
        <el-table-column label="规格型号" align="center" key="Specificationmodel" prop="Specificationmodel"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="设备类型" align="center" key="Devicetype" prop="Devicetype"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="所属区域" align="center" key="department" prop="department"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="存放位置" align="center" key="user" prop="user" :show-overflow-tooltip="true"/>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>巡检条目</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="1.5">
          <el-col :span="1.5">
            <el-button type="success" plain @click="handleAdd(2)">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain @click="handleRemove(2)" :disabled="singleTable">移除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="PopwindowDateItem" @selection-change="handleSelectionChangeTable">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="巡检条目名称" align="center" sortable key="name" prop="name"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="巡检条目编码" align="center" sortable key="num" prop="num"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="条目内容" align="center" sortable key="remark" prop="remark"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="是否启用" align="center" sortable key="useFlag" prop="useFlag"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.useFlag == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card" style="margin-bottom: 100px">
      <div slot="header" class="clearfix">
        <span>巡检规程</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="1.5">
          <el-col :span="1.5">
            <el-button type="success" plain @click="handleAdd(3)">上传文档</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain @click="handleRemove(3)">移除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-table :data="form.files" @selection-change="handleSelectionTableFile">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="fileUPTime" label="上传时间"></el-table-column>
        <el-table-column prop="fileUPUser" label="上传者"></el-table-column>
        <el-table-column prop="fileSize" label="文档大小(kb)"></el-table-column>
      </el-table>
    </el-card>
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button type="success" @click="handlePass">通过</el-button>
        <el-button @click="handleTurndown" plain type="danger">驳回</el-button>
        <el-button @click="onCancel()" style="margin-right: 12px">关闭</el-button>
      </el-col>
    </el-row>
    <!--    上传-->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="2" accept=".xlsx, .xls" :headers="upload.headers"
                 :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                 :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择设备" :visible.sync="open1" width="60%" append-to-body>
      <el-form :model="queryParamsTable" ref="queryForm" size="small" :inline="true" label-width="130px"
               @submit.native.prevent>
        <el-form-item label="设备名称:" prop="status">
          <el-input type="text" v-model="queryParamsTable.name1" maxlength="20" placeholder="设备名称"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="设备编码:" prop="num">
          <el-input type="text" v-model="queryParamsTable.num1" maxlength="20" placeholder="设备编码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleQueryTable">查询</el-button>
          <el-button size="mini" @click="resetQueryTable">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="dataListTable" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="设备名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="设备编号" align="center" key="num" prop="num" :show-overflow-tooltip="true"/>
        <el-table-column label="规格型号" align="center" key="Specificationmodel" prop="Specificationmodel"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="设备类型" align="center" key="Devicetype" prop="Devicetype"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="所属区域" align="center" key="department" prop="department"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="存放位置" align="center" key="user" prop="user" :show-overflow-tooltip="true"/>
        <el-table-column label="备注" align="center" key="remark" prop="remark" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileTable(1)">确 定</el-button>
        <el-button @click="open1 = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择条目" :visible.sync="open2" width="60%" append-to-body>
      <el-form :model="queryParamsTable" ref="queryForm" size="small" :inline="true" label-width="130px"
               @submit.native.prevent>
        <el-form-item label="条目名称:" prop="status">
          <el-input type="text" v-model="queryParamsTable.name2" maxlength="20" placeholder="设备名称"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="条目编码:" prop="num">
          <el-input type="text" v-model="queryParamsTable.num2" maxlength="20" placeholder="设备编码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleQueryTable">查询</el-button>
          <el-button size="mini" @click="resetQueryTable">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="dataListTable" @selection-change="handleSelectionTable">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="巡检条目名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="巡检条目编号" align="center" key="num" prop="num" :show-overflow-tooltip="true"/>
        <el-table-column label="条目内容" align="center" key="remark" prop="remark"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="是否启用" align="center" key="useFlag" prop="useFlag"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.useFlag == "1" ? "是" : "否" }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileTable(2)">确 定</el-button>
        <el-button @click="open2 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getToken} from "@/utils/auth";

export default {
  name: "addOrEdit",
  components: {},
  data() {
    return {
      PopwindowDateFileUpload: [],//文件上传列表
      PopwindowDateDetails: [],
      open1: false,
      open2: false,
      queryParamsTable: {},
      dataListTable: [
        {
          id: 1,    //id
          name: "液压控制器",
          Devicetype: "主要部件",
          Specificationmodel: "PM-20022",
          correlationpoint: "测量点1,测量点2",
          num: "QG-20023", // 订单编号
          status: 1, // 审核状态
          statustext: "在役",
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月21日",
          department: "技术部",
          user: "杨波",
          auditor: "王帆",
          remark: "王帆-备注"
        }, {
          id: 2,    //id
          name: "聚乙烯检测模块",
          correlationpoint: "测量点1",
          Specificationmodel: "PM-500",

          Devicetype: "模块部件",
          num: "QG-20024", // 订单编号
          status: 2, // 审核状态
          statustext: "备用",
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月20日",
          department: "行政部",
          user: "李丽",
          auditor: "石昊",
          remark: "石昊-备注"
        }, {
          id: 3,    //id
          name: "液压销售样品",
          Specificationmodel: "PM-500",

          correlationpoint: "测量点1,测量点2",
          Devicetype: "销售样品",
          num: "QG-20025", // 订单编号
          status: 3, // 审核状态
          statustext: "停役",
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月25日",
          department: "销售部",
          user: "石晓雅",
          auditor: "伊月",
          remark: "伊月-备注"
        }, {
          id: 4,    //id
          name: "打印机配件",
          Devicetype: "行政备件",
          Specificationmodel: "PM-2002",

          num: "QG-20026", // 订单编号
          status: 4, // 审核状态
          statustext: "试运行",
          correlationpoint: "测量点1,测量点2",
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月17日",
          department: "行政部",
          user: "南柠",
          auditor: "蓝泉",
          remark: "蓝泉-备注"
        },
        {
          id: 5,    //id
          name: "记录档案",
          Specificationmodel: "PM-2002",

          Devicetype: "行政备件",
          correlationpoint: "测量点2",
          num: "QG-20027", // 订单编号
          status: 5, // 审核状态
          statustext: "报废",
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月19日",
          department: "总裁办",
          user: "李海",
          auditor: "胡南",
          remark: "胡南-备注"
        }
      ],
      ids: [],
      idsTable: [],
      idsDetails: [],
      idsFile: [],
      singleFile: true,
      multipleFile: true,
      single: true,
      singleDetails: true,
      multipleDetails: true,
      singleTable: true,
      multiple: true,
      multipleTable: true,
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
        url: process.env.VUE_APP_BASE_API + "file/upload"
      },
      form: {
        files: []
      },
      idsfile: [],
      rulesForm: {
        area: [{required: true, message: '请输入所属区域', trigger: 'blur'}],
        name: [{required: true, message: '请输入巡检名称', trigger: 'blur'}],
        Executiverule: [{required: true, message: '请输入执行规程', trigger: 'blur'}],
        num: [{required: true, message: '请输入设备编号', trigger: 'blur'}],
        useFlag: [{required: true, message: '请选择是否启用', trigger: 'change'}],
        Plannedtime: [{required: true, message: '请输入计划开始时间', trigger: 'blur'}],
        Purchasetime: [{required: true, message: '请输入计划结束时间', trigger: 'blur'}],
      },
      formForm: {
        useFlag: "1"
      },
      RequisitionDepartment: [
        {
          value: 1,
          label: "技术部"
        }, {
          value: 2,
          label: "行政部"
        }, {
          value: 3,
          label: "财务部"
        }, {
          value: 4,
          label: "生产部"
        }, {
          value: 5,
          label: "市场部"
        }
      ],
      dataList: [
        {
          id: 1,    //id
          name: "盘点巡检",
          Equipmentinvolved: "空压机",
          Inspectioncontent: "液压阀检测",
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          num: "PNQG-20023", // 订单编号
          useFlag: "0",
          status: 1, // 审核状态
          statustext: "未提交", // 审核状态
          Purchasetime: "2023-11-31",
          Plannedtime: "2023-12-01",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "杨波",
          auditor: "王帆",
          remark: "王帆-备注"
        }, {
          name: "抽查巡检",
          id: 2,    //id
          Claimtype: "维护领用",
          Equipmentinvolved: "风冷机",
          Inspectioncontent: "风冷检测",
          Associatedorder: "维修单号2",
          num: "PNQG-20024", // 订单编号
          status: 5, // 审核状态
          statustext: "未审核", // 审核状态
          Purchasetime: "2023-12-15",
          Plannedtime: "2023-11-20",
          Actualtime: "2023年12月24日",
          department: "行政部",
          user: "李丽",
          useFlag: "1",
          auditor: "石昊",
          remark: "石昊-备注"
        }, {
          name: "抽查巡检",
          id: 3,    //id
          Equipmentinvolved: "抽芽机",
          Inspectioncontent: "抽芽机检测",
          num: "PNQG-20025", // 订单编号
          status: 3, // 审核状态
          Claimtype: "维护领用",
          Associatedorder: "维修单号3",
          statustext: "已撤回", // 审核状
          Purchasetime: "2023-12-23",
          Plannedtime: "2023-12-23",
          Actualtime: "2023年12月28日",
          department: "销售部",
          user: "石晓雅",
          useFlag: "0",
          auditor: "伊月",
          remark: "伊月-备注"
        }, {
          name: "盘点巡检",
          id: 4,    //id
          num: "PNQG-20026", // 订单编号
          status: 2, // 审核状态
          Claimtype: "维修领用",
          Equipmentinvolved: "暖灯机",
          Inspectioncontent: "暖灯机检测",
          Associatedorder: "维修单号1",
          statustext: "审核通过", // 审核状态
          Purchasetime: "2023-12-20",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月29日",
          department: "行政部",
          user: "南柠",
          auditor: "蓝泉",
          useFlag: "1",
          remark: "蓝泉-备注",
        },
        {
          name: "安全巡检",
          id: 5,    //id
          Equipmentinvolved: "空气切割机",
          Inspectioncontent: "空气切割机检测",
          Claimtype: "备用领用",
          Associatedorder: "维修单号4",
          num: "PNQG-20027", // 订单编号
          status: 4, // 审核状态
          statustext: "驳回", // 审核状态
          Purchasetime: "2023-12-13",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月29日",
          department: "总裁办",
          user: "李海",
          auditor: "胡南",
          remark: "胡南-备注",
          useFlag: "1"
        }
      ],
      loading: false,
      PopwindowDateItem: [],
      PopwindowDate: [
        {
          Editquantity: false,
          id: 1,    //id
          Stash: "配件仓库",
          name: "液压后杠", // 设备名称
          modelValue: "OUJ-10022", // 规格型号
          manufacturer: "海联帆",//生产厂家
          unit: "个",
          quantity: "12",
          useFlag: "1",
          num: "PNG-200242", // 订单编号

        }, {
          Editquantity: false,
          id: 2,    //id
          Stash: "零部件仓库",
          name: "前挡器", // 设备名称
          modelValue: "PUJ-10023", // 规格型号
          manufacturer: "得利士",//生产厂家
          unit: "套",
          quantity: "22",
          useFlag: "1",
          num: "PNQG-20024", // 订单编号
        }, {
          Editquantity: false,
          id: 3,    //id
          Stash: "工具仓库",
          name: "拖动扳手", // 设备名称
          modelValue: "OPU-100029", // 规格型号
          manufacturer: "施耐德",//生产厂家
          unit: "米",
          quantity: "14",
          useFlag: "0",
          num: "PNQG-200", // 订单编号
        }, {
          Editquantity: false,
          useFlag: "0",
          num: "PNQG-200", // 订单编号
          id: 4,    //id
          Stash: "套件仓库",
          name: "全身套条件", // 设备名称
          modelValue: "TYP-10089", // 规格型号
          manufacturer: "虎卡",//生产厂家
          unit: "盒",
          quantity: "2",
        }
      ],
      rules: {
        name: [
          {required: true, message: "请输入设备名称", trigger: "blur"}
        ],
        modelValue: [
          {required: true, message: "请输入规格型号", trigger: "blur"}
        ],
        manufacturer: [
          {required: true, message: "请输入生产厂家", trigger: "blur"}
        ],
        unit: [
          {required: true, message: "单位", trigger: "blur"}
        ]
      },
      routerId: "",
      datafilterdata: {},
      PopwindowDateFile: [],
      newFile: {},//文件上传
    }
  },
  created() {
    this.routerId = this.$route.query.id
    if (this.routerId == "") {
      this.PopwindowDate = []
    } else {
      this.formForm = this.dataList.find(item => item.id == this.routerId)
    }
  },
  methods: {
    //关闭
    onCancel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    handlePass() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
      this.$message.success("通过")
    },
    handleSelectionChangeDetails(selection) {
      this.idsDetails = selection.map(item => item.id);
      this.singleDetails = selection.length != 1;
      this.multipleDetails = !selection.length;
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleSelectionTable(selection) {
      this.idsTable = selection.map(item => item.id);
      this.singleTable = selection.length != 1;
      this.multipleTable = !selection.length;
    },
    handleSelectionTableFile(selection) {
      this.idsfile = selection.map(item => item.timeStamp);
    },
    handleSelectionChangeTable(selection) {
      this.idsFile = selection.map(item => item.id);
      this.singleFile = selection.length != 1;
      this.multipleFile = !selection.length;
    },
    handleTurndown() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
      this.$message.success("驳回成功")
    },
    handleAdd(row) {
      switch (row) {
        case 1:
          this.open1 = true
          break;
        case 2:
          this.open2 = true
          break
        case 3:
          this.upload.open = true
          break
      }
    },
    handleRemove(row) {
      switch (row) {
        case 1:
          let ud = this.ids[0]
          this.PopwindowDateDetails = this.PopwindowDateDetails.filter(item => item.id !== ud)
          this.$message.success("移除成功");
          break;
        case 2:
          let udd = this.idsFile[0]
          this.PopwindowDateItem = this.PopwindowDateItem.filter(item => item.id !== udd);
          break
        case 3:
          const idx = this.idsTable;
          this.form.files = this.form.files.filter(item => {
            return idx.indexOf(item.timeStamp) === -1
          })
          this.$message.success("移除成功");
          break
      }
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    submitFileTable(row) {
      switch (row) {
        case 1:
          let ud = this.ids
          let ndObj = []
          for (let i = 0; i < ud.length; i++) {
            ndObj.push(this.dataListTable.find(item => item.id == ud[i]));
          }
          this.PopwindowDateDetails.push(...ndObj)
          this.open1 = false
          break;
        case 2:
          let ud2 = this.idsTable
          let ndObj2 = []
          for (let i = 0; i < ud2.length; i++) {
            ndObj2.push(this.dataListTable.find(item => item.id == ud2[i]));
          }
          this.PopwindowDateItem.push(...ndObj2)
          this.open2 = false
          break
        case 3:
          console.log(this.newFile, 'shuzu ')
          this.PopwindowDateFileUpload.push(this.newFile);
          console.log(this.PopwindowDateFileUpload, 'shuzsssssu ')
          this.$refs.upload.submit();
          this.upload.open = false
          break
      }
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    // 文件上传中处理
    handleFileUploadProgress() {
    },
    // 文件上传成功处理
    handleFileSuccess(res, file, filelist) {
      console.log(res, "上传");
      let {name, originalFilename, size, type, url} = res.data
      this.form.files.unshift({
        timeStamp: new Date().getTime(),
        fileName: originalFilename,
        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        fileUPUser: 'admin',
        fileSize: size
      })
      this.upload.open = false
    },
    handleQueryTable() {

    },
    resetQueryTable() {
      this.queryParamsTable = {}
    },
  }
}
</script>
<style scoped>
.foot-btn {
  z-index: 9;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 0 10px #a0a8a0;
}

.box-card {
  margin: 20px 0;
}

.clearfixfooter {
  margin: 30px;
  text-align: center;
}

.topboxheader {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 30px;
}
</style>
