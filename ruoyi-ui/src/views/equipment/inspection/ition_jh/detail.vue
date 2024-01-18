<template>
  <!-- 巡检计划（详细信息）   -->
  <div>
    <div style="margin: 20px;font-size:24px ;">
      巡检计划（详细信息）
    </div>
    <el-card class="box-card" v-model="datafilterdata">
      <div class="topboxheader">
        <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px"
          xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1 0 0 1 -42 -110 )">
            <path
              d="M 7.8125 9  L 20 9  L 20 30.3571428571429  C 19.6428571428571 30.8407738095238  19.4661458333333 31.2593005952381  19.1127232142857 31.6127232142857  C 18.7593005952381 31.9661458333333  18.3407738095238 32.1428571428571  18 32.1428571428571  L 18 48.2142857142857  C 17.8571428571429 48.6979166666667  17.6804315476191 49.1164434523809  17.3270089285714 49.4698660714286  C 16.9735863095238 49.8232886904762  16.5550595238095 50  16.0714285714286 50  L 1.78571428571429 50  C 1.30208333333333 50  0.883556547619048 49.8232886904762  0.530133928571429 49.4698660714286  C 0.17671130952381 49.1164434523809  0 48.6979166666667  0 48.2142857142857  L 0 33.9285714285714  L 6.94754464285714 9.5703125  C 7.07775297619048 9.14248511904762  7.36607142857143 8.92857142857143  7.8125 9  Z M 22 8.92857142857143  L 28 8.92857142857143  L 28 28.5714285714286  L 22 28.5714285714286  L 22 8.92857142857143  Z M 43.0524553571429 9.5703125  L 50 33.9285714285714  L 50 48.2142857142857  C 50 48.6979166666667  49.8232886904762 49.1164434523809  49.4698660714286 49.4698660714286  C 49.116443452381 49.8232886904762  48.6979166666667 50  48.2142857142857 50  L 33.9285714285714 50  C 33.4449404761905 50  33.0264136904762 49.8232886904762  32.6729910714286 49.4698660714286  C 32.319568452381 49.1164434523809  32.1428571428571 48.6979166666667  32 48.2142857142857  L 32 32.1428571428571  C 31.6592261904762 32.1428571428571  31.2406994047619 31.9661458333333  30.8872767857143 31.6127232142857  C 30.5338541666667 31.2593005952381  30.3571428571429 30.8407738095238  30 30.3571428571429  L 30 9  L 42.1875 9  C 42.6339285714286 8.92857142857143  42.9222470238095 9.14248511904762  43.0524553571429 9.5703125  Z M 20.2845982142857 0.25111607142857  C 20.4520089285714 0.418526785714285  20.5357142857143 0.632440476190471  20.5357142857143 0.892857142857145  L 20.5357142857143 7.14285714285715  L 10.7142857142857 7.14285714285715  L 10.7142857142857 0.892857142857145  C 10.7142857142857 0.632440476190471  10.7979910714286 0.418526785714285  10.9654017857143 0.25111607142857  C 11.1328125 0.0837053571428548  11.3467261904762 0  11.6071428571429 0  L 19.6428571428571 0  C 19.9032738095238 0  20.1171875 0.0837053571428548  20.2845982142857 0.25111607142857  Z M 39.0345982142857 0.25111607142857  C 39.2020089285714 0.418526785714285  39.2857142857143 0.632440476190471  39.2857142857143 0.892857142857145  L 39.2857142857143 7.14285714285715  L 29.4642857142857 7.14285714285715  L 29.4642857142857 0.892857142857145  C 29.4642857142857 0.632440476190471  29.5479910714286 0.418526785714285  29.7154017857143 0.25111607142857  C 29.8828125 0.0837053571428548  30.0967261904762 0  30.3571428571429 0  L 38.3928571428571 0  C 38.6532738095238 0  38.8671875 0.0837053571428548  39.0345982142857 0.25111607142857  Z "
              fill-rule="nonzero" fill="#027cb2" stroke="none" transform="matrix(1 0 0 1 42 110 )" />
          </g>
        </svg>
        <p style="margin-left: 20px;">{{ datafilterdata.num }}</p>
        <div class="svg-icon2">
          <type-box :text="datafilterdata.statustext" :status="datafilterdata.status"></type-box>
        </div>
      </div>
      <el-descriptions title="" :column=2 style="margin-left: 30px;">
        <el-descriptions-item label="创建人">{{ datafilterdata.user }}</el-descriptions-item>
        <el-descriptions-item label="更新人">{{ datafilterdata.auditor }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ datafilterdata.Purchasetime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ datafilterdata.Actualtime }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>维护计划基础信息</span>
      </div>
      <el-descriptions title="" :column=2 style="margin-left: 30px;">
        <el-descriptions-item label="巡检计划编码">{{ datafilterdata.Claimtype }}</el-descriptions-item>
        <el-descriptions-item label="区域">{{ datafilterdata.Associatedorder }}</el-descriptions-item>
        <el-descriptions-item label="执行规则">{{ datafilterdata.department }}</el-descriptions-item>
        <el-descriptions-item label="是否循环">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
        <el-descriptions-item label="计划开始时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
        <el-descriptions-item label="计划结束时间">{{ datafilterdata.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>涉及设备明细</span>
      </div>
      <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
        <el-table-column label="设备名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="设备编号" align="center" sortable key="modelValue" prop="modelValue"
          :show-overflow-tooltip="true" />
        <el-table-column label="规格型号" align="center" sortable key="manufacturer" prop="manufacturer"
          :show-overflow-tooltip="true" />
        <el-table-column label="设备类型" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true" />
        <el-table-column label="所属区域" align="center" sortable key="quantity" prop="quantity"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="存放位置" align="center" sortable key="Storagelocation" prop="Storagelocation"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>巡检条目</span>
      </div>
      <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
        <el-table-column label="巡检条目名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="巡检条目编码" align="center" sortable key="modelValue" prop="modelValue"
          :show-overflow-tooltip="true" />
        <el-table-column label="条目内容" align="center" sortable key="manufacturer" prop="manufacturer"
          :show-overflow-tooltip="true" />
        <el-table-column label="是否启用" align="center" sortable key="useFlag" prop="useFlag" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.useFlag == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>巡检规程</span>
      </div>
      <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
        <el-table-column label="文件名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="上传时间" align="center" sortable key="modelValue" prop="modelValue"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ dayjs(scope.row.uploadtime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="上传者" align="center" sortable key="manufacturer" prop="manufacturer"
          :show-overflow-tooltip="true" />
        <el-table-column label="文档大小" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true" />
      </el-table>
    </el-card>
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button type="success" @click="handlePass">通过</el-button>
        <el-button @click="handleTurndown" plain type="danger">驳回</el-button>
        <el-button @click="onCancel()" style="margin-right: 12px">{{ isCreate ? "取消" : "关闭" }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "detail",
  components: {},
  data() {
    return {
      dataList: [
        {
          id: 1,    //id
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          num: "PNQG-20023", // 订单编号
          status: 0, // 审核状态
          statustext: "未提交", // 审核状态
          Purchasetime: "2023年11月31日",
          Plannedtime: "2023-12-01",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "杨波",
          auditor: "王帆",
          remark: "王帆-备注"
        }, {
          id: 2,    //id
          Claimtype: "维护领用",
          Associatedorder: "维修单号2",
          num: "PNQG-20024", // 订单编号
          status: 1, // 审核状态
          statustext: "未审核", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-11-20",
          Actualtime: "2023年12月24日",
          department: "行政部",
          user: "李丽",
          auditor: "石昊",
          remark: "石昊-备注"
        }, {
          id: 3,    //id
          num: "PNQG-20025", // 订单编号
          status: 3, // 审核状态
          Claimtype: "维护领用",
          Associatedorder: "维修单号3",
          statustext: "已撤回", // 审核状
          Purchasetime: "2023年12月23日",
          Plannedtime: "2023-12-23",
          Actualtime: "2023年12月28日",
          department: "销售部",
          user: "石晓雅",
          auditor: "伊月",
          remark: "伊月-备注"
        }, {
          id: 4,    //id
          num: "PNQG-20026", // 订单编号
          status: 2, // 审核状态
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          statustext: "审核通过", // 审核状态
          Purchasetime: "2023年12月20日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月29日",
          department: "行政部",
          user: "南柠",
          auditor: "蓝泉",
          remark: "蓝泉-备注"
        },
        {
          id: 5,    //id
          Claimtype: "备用领用",
          Associatedorder: "维修单号4",
          num: "PNQG-20027", // 订单编号
          status: 4, // 审核状态
          statustext: "驳回", // 审核状态
          Purchasetime: "2023年12月13日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月29日",
          department: "总裁办",
          user: "李海",
          auditor: "胡南",
          remark: "胡南-备注"
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
          unit: "个",
          quantity: "12"
        }, {
          Editquantity: false,
          id: 2,    //id
          Stash: "零部件仓库",
          name: "前挡器", // 设备名称
          modelValue: "PUJ-10023", // 规格型号
          manufacturer: "得利士",//生产厂家
          unit: "套",
          quantity: "22"
        }, {
          Editquantity: false,
          id: 3,    //id
          Stash: "工具仓库",
          name: "拖动扳手", // 设备名称
          modelValue: "OPU-100029", // 规格型号
          manufacturer: "施耐德",//生产厂家
          unit: "米",
          quantity: "14"
        }, {
          Editquantity: false,

          id: 4,    //id
          Stash: "套件仓库",
          name: "全身套条件", // 设备名称
          modelValue: "TYP-10089", // 规格型号
          manufacturer: "虎卡",//生产厂家
          unit: "盒",
          quantity: "2"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入设备名称", trigger: "blur" }
        ],
        modelValue: [
          { required: true, message: "请输入规格型号", trigger: "blur" }
        ],
        manufacturer: [
          { required: true, message: "请输入生产厂家", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位", trigger: "blur" }
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
}</style>