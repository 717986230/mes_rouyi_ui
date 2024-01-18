<template>
  <!-- 维护计划（详细信息）   -->
  <div>
    <div style="margin: 20px;font-size:24px ;">
      维护计划（详细信息）
    </div>
    <el-card class="box-card" v-model="datafilterdata">
      <div class="topboxheader">
        <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px"
             xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1 0 0 1 -46 -110 )">
            <path
              d="M 43 5  L 35.4117647058823 5  L 35.4117647058823 2.5  C 35.4117647058823 1.125  34.2735294117647 0  32.8823529411765 0  L 2.52941176470588 0  C 1.13823529411765 0  0 1.125  0 2.5  L 0 12.5  C 0 13.875  1.13823529411765 15  2.52941176470588 15  L 32.8823529411765 15  C 34.2735294117647 15  35.4117647058823 13.875  35.4117647058823 12.5  L 35.4117647058823 10  L 38 10  L 38 20  L 13 20  L 13 47.5  C 12.6470588235294 48.875  13.7852941176471 50  15.1764705882353 50  L 20.2352941176471 50  C 21.6264705882353 50  22.7647058823529 48.875  22 47.5  L 22 25  L 43 25  L 43 5  Z "
              fill-rule="nonzero" fill="#027db4" stroke="none" transform="matrix(1 0 0 1 46 110 )"/>
          </g>
        </svg>
        <p style="margin-left: 20px;">{{ datafilterdata.num }}</p>
        <div class="svg-icon2">
          <type-box :text="datafilterdata.statustext" :status="datafilterdata.status"></type-box>
        </div>
      </div>
      <el-descriptions title="" :column=2 style="margin-left: 30px;">
        <el-descriptions-item label="提报人">{{ datafilterdata.user }}</el-descriptions-item>
        <el-descriptions-item label="审核人">{{ datafilterdata.auditor }}</el-descriptions-item>
        <el-descriptions-item label="提报时间">{{ datafilterdata.Purchasetime }}</el-descriptions-item>
        <el-descriptions-item label="审核通过时间">
          {{ datafilterdata.Actualtime }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维护计划基础信息</span>
      </div>
      <el-descriptions title="" :column=2 style="margin-left: 30px;">
        <el-descriptions-item label="维护计划编码">{{ datafilterdata.Claimtype }}</el-descriptions-item>
        <el-descriptions-item label="区域">{{ datafilterdata.Associatedorder }}</el-descriptions-item>
        <el-descriptions-item label="执行规则">{{ datafilterdata.department }}</el-descriptions-item>
        <el-descriptions-item label="是否循环">{{ datafilterdata.Claimtype }}</el-descriptions-item>
        <el-descriptions-item label="计划开始时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
        <el-descriptions-item label="计划结束时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
        <el-descriptions-item label="维护负责人">{{ datafilterdata.Claimtype }}</el-descriptions-item>
        <el-descriptions-item label="申领原因">{{ datafilterdata.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>涉及设备明细</span>
      </div>
      <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="仓库" align="center" sortable key="Stash" prop="Stash" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="设备名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="设备编号" align="center" sortable key="modelValue" prop="modelValue"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="规格型号" align="center" sortable key="manufacturer" prop="manufacturer"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="设备类型" align="center" sortable key="size" prop="size" :show-overflow-tooltip="true"/>
        <el-table-column label="所属区域" align="center" sortable key="quantity" prop="quantity"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="存放位置" align="center" sortable key="quantity" prop="quantity"
                         :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维护规程</span>
      </div>
      <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="文件名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="上传时间" align="center" sortable key="modelValue" prop="modelValue"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ dayjs(scope.row.uploadtime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="上传者" align="center" sortable key="manufacturer" prop="manufacturer"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="文档大小" align="center" sortable key="size" prop="size" :show-overflow-tooltip="true"/>
      </el-table>
    </el-card>
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button type="success" @click="handlePass">通过</el-button>
        <el-button @click="handleTurndown" plain type="danger">驳回</el-button>
        <el-button @click="onCancel()" style="margin-right: 12px">{{ "关闭" }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "scheduledetail",
  components: {},
  data() {
    return {
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
          statustext: "驳回", // 审核状态
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
          Claimtype: "审核通过",
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
          statustext: "未审核", // 审核状态
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
      PopwindowDate: [
        {
          Editquantity: false,
          id: 1,    //id
          Stash: "配件仓库",
          name: "液压后杠", // 设备名称
          modelValue: "OUJ-10022", // 规格型号
          manufacturer: "海联帆",//生产厂家
          size: "1230",
          quantity: "12"
        }, {
          Editquantity: false,
          id: 2,    //id
          Stash: "零部件仓库",
          name: "前挡器", // 设备名称
          modelValue: "PUJ-10023", // 规格型号
          manufacturer: "得利士",//生产厂家
          size: "2420",
          quantity: "22"
        }, {
          Editquantity: false,
          id: 3,    //id
          Stash: "工具仓库",
          name: "拖动扳手", // 设备名称
          modelValue: "OPU-100029", // 规格型号
          manufacturer: "施耐德",//生产厂家
          size: "5610",
          quantity: "14"
        }, {
          Editquantity: false,

          id: 4,    //id
          Stash: "套件仓库",
          name: "全身套条件", // 设备名称
          modelValue: "TYP-10089", // 规格型号
          manufacturer: "虎卡",//生产厂家
          size: "6439",
          quantity: "2"
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
        size: [
          {required: true, message: "单位", trigger: "blur"}
        ]
      },
      routerId: "",
      datafilterdata: {}
    }
  },
  created() {
    this.routerId = this.$route.query.id
    this.datafilterdata = this.dataList.find((item) => item.id == this.routerId)
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
    handleTurndown() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
      this.$message.success("驳回成功")
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
