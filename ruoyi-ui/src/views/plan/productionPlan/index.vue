<template>
  <!-- 生产计划-->
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px" @submit.native.prevent>
      <el-form-item label="订单编号:" prop="num">
        <el-input type="text" v-model="queryParams.num" maxlength="20" placeholder="订单编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称:" prop="clientname">
        <el-input type="text" v-model="queryParams.clientname" maxlength="20" placeholder="客户名称"
                  clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-row :gutter="10" class="mb8">
        <el-col :span="10">
          <div>{{ TitleHeard }}</div>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-select v-model="queryParams.page" placeholder="显示页数/页" @change="handlePageChange(0)">
            <el-option v-for="item in PageList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1.5">
          <el-select v-model="queryParams.sortmode" placeholder="排序方式" @change="handlePageChange(1)">
            <el-option v-for="item in Sortmode" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="计划单号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="订单编号" align="center" key="Ordernumber" prop="Ordernumber"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="客户名称" align="center" key="Customername" prop="Customername"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="交货日期" align="center" key="Purchasetime" prop="Purchasetime"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="联系人" align="center" key="Contactperson" prop="Contactperson"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="联系电话" align="center" key="Contactnumber" prop="Contactnumber"
                         :show-overflow-tooltip="true"/>
        <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="this.dataList.length" :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize" @pagination="getList"/>
    </el-card>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="产品目录" name="first">
          <el-row :gutter="10" class="mb8">
            <el-col :span="10">
              <div>{{ TitleHeard }}</div>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" plain @click="handleAddCH">新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-select v-model="queryParams.pagechild" placeholder="显示页数/页" @change="handlePageChange(2)">
                <el-option v-for="item in PageList" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5">
              <el-select v-model="queryParams.sortmodechild" placeholder="排序方式" @change="handlePageChange(3)">
                <el-option v-for="item in Sortmode" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange1">
            <el-table-column fixed="left" type="selection" width="50" align="center"/>
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
            <el-table-column label="产品编码" align="center" key="num" prop="num" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="产品名称" align="center" key="Productname" prop="Productname"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="产品规格" align="center" key="Productspecification" prop="Productspecification"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="订单数量" align="center" key="Productionvolume" prop="Productionvolume"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="计划生产数" align="center" key="Plannedproduction" prop="Plannedproduction"
                             :show-overflow-tooltip="true"/>
            <el-table-column fixed="right" label="操作" align="center" width="160"
                             class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="text" @click="handleViewCH(scope.row)">查看</el-button>
                <el-button type="text" @click="handleUpdateCH(scope.row)">修改</el-button>
                <el-button type="text" @click="handleDeleteCH(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination style="margin-bottom: 20px;" v-show="total > 0" :total="this.dataList.length"
                      :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
        </el-tab-pane>
        <el-tab-pane label="BOM清单" name="third">
          <el-row :gutter="10" class="mb8">
            <el-col :span="10">
              <div>{{ TitleHeard }}</div>
            </el-col>
            <el-col :span="1.5">
              <el-select v-model="queryParams.pagedown" placeholder="显示页数/页" @change="handlePageChange(4)">
                <el-option v-for="item in PageList" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5">
              <el-select v-model="queryParams.sortmodedown" placeholder="排序方式" @change="handlePageChange(5)">
                <el-option v-for="item in Sortmode" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="BOMList">
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
            <el-table-column label="物料名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="规格型号" align="center" key="Specificationmodel" prop="Specificationmodel"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="材质" align="center" key="material" prop="material"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="色号" align="center" key="Colournumber" prop="Colournumber"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="规格单位" align="center" key="Specificationunit" prop="Specificationunit"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="生产用量" align="center" key="Orderquantity" prop="Orderquantity"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="计价单位" align="center" key="Unitaccount" prop="Unitaccount"
                             :show-overflow-tooltip="true"/>
          </el-table>
          <pagination style="margin-bottom: 20px;" v-show="total > 0" :total="this.BOMList.length"
                      :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 修改产品目录 -->
    <el-dialog :title="titleCH" :visible.sync="openCH" width="66%" append-to-body>
      <el-card>
        <div slot="header" class="clearfix">
          <span>产品目录信息:</span>
        </div>
        <el-form ref="formnew" :model="formCH" :rules="rules" label-width="120px">
          <el-row :gutter="40">
            <el-col :span="7">
              <el-form-item label="产品名称:" prop="name">
                <el-input type="text" v-model="formCH.name" maxlength="20" placeholder="产品名称"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="产品规格:" prop="Specificationmodel">
                <el-input type="text" v-model="formCH.Specificationmodel" maxlength="20" placeholder="产品规格"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="产品编码:" prop="Productcode">
                <el-input type="text" v-model="formCH.Productcode" maxlength="20" placeholder="产品编码"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="7">
              <el-form-item label="规格单位:" prop="Specificationunit">
                <el-input type="text" v-model="formCH.Specificationunit" maxlength="20" placeholder="规格单位"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="订单数量:" prop="Orderquantity">
                <el-input type="text" v-model="formCH.Orderquantity" maxlength="20" placeholder="订单数量"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="计划生产数:" prop="Plannedproduction">
                <el-input type="text" v-model="formCH.Plannedproduction" maxlength="20" placeholder="计划生产数"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20">
              <el-form-item label="产品工艺要求:" prop="Productequirements">
                <el-input type="textarea" v-model="formCH.Productequirements" maxlength="30"
                          placeholder="产品工艺要求" clearable :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20">
              <el-form-item label="备注:" prop="remark">
                <el-input type="textarea" v-model="formCH.remark" maxlength="30" placeholder="备注" clearable
                          :autosize="{ minRows: 2, maxRows: 2 }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer clearfixfooter">
        <el-button type="primary" @click="handleSaveTc">保 存</el-button>
        <el-button @click="openCH = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "productionPlan",
  components: {},
  data() {
    return {
      formCH: {},//下查看
      form: {},
      TitleHeard: "数据列表",
      activeName: "first",
      PageList: [{
        value: 10,
        label: 10
      }, {
        value: 20,
        label: 20
      }, {
        value: 30,
        label: 30
      }, {
        value: 50,
        label: 50
      }
      ],
      Sortmode: [
        {
          value: "1",
          label: "订单编号"
        }, {
          value: "2",
          label: "产品编码"
        }, {
          value: "3",
          label: "产品名称"
        }
      ],
      dataList: [
        {
          Productionvolume: "79",
          Unitaccount: "100",
          Ordernumber: "YUK-1202",//订单编号
          Customername: "李尔",//客户名称
          Purchasetime: "2023年11月31日",
          Contactperson: "锦原",//联系人
          Contactnumber: "15369816545",
          id: 1,    //id
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          num: "PNQG-20023", // 订单编号
          Productname: "橡胶气管",
          Productspecification: "bmh25*25",
          Orderquantity: 55,
          Plannedproduction: "100",
          status: 1, // 审核状态
          statustext: "未提交", // 审核状态
          Plannedtime: "2023-12-01",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "杨波",
          auditor: "王帆",
          remark: "王帆-备注"
        }, {
          Productionvolume: "28",
          Unitaccount: "100",
          Customername: "锦原生",//客户名称
          Contactperson: "海东升",//联系人
          Contactnumber: "13678767656",
          Ordernumber: "YUK-1302",//订单编号
          id: 2,    //id
          Productname: "水平带",
          Productspecification: "bmh25*25",
          Orderquantity: 25,
          Plannedproduction: "50",
          Claimtype: "维护领用",
          Associatedorder: "维修单号2",
          num: "PNQG-20024", // 订单编号
          status: 5, // 审核状态
          statustext: "未审核", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-11-20",
          Actualtime: "2023年12月24日",
          department: "行政部",
          user: "李丽",
          auditor: "石昊",
          remark: "石昊-备注"
        }, {
          Productionvolume: "9",
          Unitaccount: "100",
          Productname: "杯盖",
          Productspecification: "bmh25*25",
          Orderquantity: 28,
          Plannedproduction: "80",
          Customername: "来亚门",//客户名称
          Contactperson: "胡萨",//联系人
          Contactnumber: "13678767890",
          Ordernumber: "YUK-1402",//订单编号
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
          Productionvolume: "19",
          Unitaccount: "100",
          Productname: "杯盖",
          Productspecification: "bmh25*25",
          Orderquantity: 28,
          Plannedproduction: "80",
          Customername: "王都",//客户名称
          Contactperson: "法林",//联系人
          Contactnumber: "15978766556",
          Ordernumber: "YUK-1502",//订单编号
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
          Productionvolume: "29",
          Unitaccount: "100",
          Productname: "二级密封条",
          Productspecification: "bmh25*25",
          Orderquantity: 59,
          Plannedproduction: "59",
          Customername: "王都",//客户名称
          Contactperson: "史莱欧",//联系人
          Contactnumber: "15978763333",
          Ordernumber: "YUK-1604",//订单编号
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
      AuditStatus: [
        {
          label: "全部",
          value: "0"
        },
        {
          label: "未提交",
          value: "1"
        }, {
          label: "审核通过",
          value: "2"
        }, {
          label: "已撤回",
          value: "3"
        }, {
          label: "未审核",
          value: "4"
        }, {
          label: "驳回",
          value: "5"
        },

      ],
      RequisitionDepartment: [ // 请购部门
        {
          label: "全部",
          value: "0"
        },
        {
          label: "技术部",
          value: "技术部"
        }, {
          label: "行政部",
          value: "行政部"
        }, {
          label: "总裁办",
          value: "总裁办"
        }, {
          label: "销售部",
          value: "销售部"
        },
        {
          label: "后勤部",
          value: "后勤部"
        }
      ],
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      ids1: [],
      single: true,
      single1: true,
      multiple: true,
      multiple1: true,
      total: 0,
      titleCH: "", // 下数据列表标题  新增/修改产品目录
      open: false,
      openCH: false,
      // 查询参数
      queryParams: {
        requisitionDate: new Date(),
        department: "0",
        num: "",
        status: "0",
        endtime: new Date(),
        page: "",
        pagechild: "",
        pagedown: "",
        sortmodedown: "",
        sortmodechild: "",
        sortmode: "",
      },
      // 表单校验
      rules: {},
      BOMList: [{
        id: 1,
        name: "纽扣",
        Productcode: "PML-10002",
        Specificationmodel: "bmh25*2.5",
        material: "橡胶",
        Colournumber: "白色",
        Specificationunit: "包",
        Productionvolume: 78,
        Unitaccount: "KG",
        Orderquantity: "120",
        Plannedproduction: "100"
      },
        {
          id: 2,
          name: "铁锹",
          Productcode: "PML-10003",
          Specificationmodel: "bmh25*2.5",
          material: "钢铁",
          Colournumber: "灰色",
          Specificationunit: "把",
          Productionvolume: 20,
          Unitaccount: "KG",
          Plannedproduction: "100",
          Orderquantity: "100",
        },
        {
          id: 3,
          name: "皮带",
          Productcode: "PML-10004",
          Specificationmodel: "bmh25*2.5",
          material: "橡胶",
          Colournumber: "黑色",
          Specificationunit: "条",
          Productionvolume: 110,
          Unitaccount: "KG",
          Orderquantity: "200",
          Plannedproduction: "100"

        },
        {
          id: 4,
          name: "纽扣",
          Productcode: "PML-10005",
          Specificationmodel: "bmh25*2.5",
          material: "橡胶",
          Colournumber: "乳白色",
          Specificationunit: "包",
          Productionvolume: 178,
          Unitaccount: "KG",
          Orderquantity: "150",
          Plannedproduction: "100"

        }
      ],
    };
  },
  watch: {},
  created() {
    this.total = this.dataList.length
  },
  methods: {
    handleClick() {
    },
    //产品工序删除
    handleDel() {
    },
    //产品工序加入
    handleJoin() {
      this.$message.success("产品工序加入成功");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    //搜索改变促发
    handlePageChange(num) {
      switch (num) {
        case 0:
          break;
        case 1:

          break;
        case 2:

          break;
        case 3:

          break;
        case 4:

          break;
        case 5:

          break;
        default:
          break;
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      let nowData
      if (this.queryParams.department != "0") {
        nowData = this.dataList.filter((item) => {
          return item.department == this.queryParams.department;
        });
      }
      if (this.queryParams.status != "0") {
        nowData = this.dataList.filter((item) => {
          //接收新数组
          return item.status == this.queryParams.status;
        });
      }
      if (this.queryParams.num) {
        nowData = this.dataList.filter((item) => {
          return item.num == this.queryParams.num;
        });
      }
      if (this.queryParams.department == "0" && this.queryParams.status == "0" && this.queryParams.num == "") {
        return this.dataList
      }
      this.dataList = nowData;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      // this.handleQuery();
      let data = [
        {
          Ordernumber: "YUK-1202",//订单编号
          Customername: "李尔",//客户名称
          Purchasetime: "2023年11月31日",
          Contactperson: "锦原",//联系人
          Contactnumber: "15369816545",
          id: 1,    //id
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          num: "PNQG-20023", // 订单编号
          Productname: "橡胶气管",
          Productspecification: "bmh25*25",
          Orderquantity: 55,
          Plannedproduction: "100",
          status: 1, // 审核状态
          statustext: "未提交", // 审核状态
          Plannedtime: "2023-12-01",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "杨波",
          auditor: "王帆",
          remark: "王帆-备注"
        }, {
          Customername: "锦原生",//客户名称
          Purchasetime: "2023年11月31日",
          Contactperson: "海东升",//联系人
          Contactnumber: "13678767656",
          Ordernumber: "YUK-1302",//订单编号
          id: 2,    //id
          Productname: "水平带",
          Productspecification: "bmh25*25",
          Orderquantity: 25,
          Plannedproduction: "50",
          Claimtype: "维护领用",
          Associatedorder: "维修单号2",
          num: "PNQG-20024", // 订单编号
          status: 5, // 审核状态
          statustext: "未审核", // 审核状态
          Plannedtime: "2023-11-20",
          Actualtime: "2023年12月24日",
          department: "行政部",
          user: "李丽",
          auditor: "石昊",
          remark: "石昊-备注"
        }, {
          Productname: "杯盖",
          Productspecification: "bmh25*25",
          Orderquantity: 28,
          Plannedproduction: "80",
          Customername: "来亚门",//客户名称
          Purchasetime: "2023年11月31日",
          Contactperson: "胡萨",//联系人
          Contactnumber: "13678767890",
          Ordernumber: "YUK-1402",//订单编号
          id: 3,    //id
          num: "PNQG-20025", // 订单编号
          status: 3, // 审核状态
          Claimtype: "维护领用",
          Associatedorder: "维修单号3",
          statustext: "已撤回", // 审核状
          Plannedtime: "2023-12-23",
          Actualtime: "2023年12月28日",
          department: "销售部",
          user: "石晓雅",
          auditor: "伊月",
          remark: "伊月-备注"
        }, {
          Productname: "杯盖",
          Productspecification: "bmh25*25",
          Orderquantity: 28,
          Plannedproduction: "80",
          Customername: "王都",//客户名称
          Purchasetime: "2023年11月31日",
          Contactperson: "法林",//联系人
          Contactnumber: "15978766556",
          Ordernumber: "YUK-1502",//订单编号
          id: 4,    //id
          num: "PNQG-20026", // 订单编号
          status: 2, // 审核状态
          Claimtype: "维修领用",
          Associatedorder: "维修单号1",
          statustext: "审核通过", // 审核状态
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月29日",
          department: "行政部",
          user: "南柠",
          auditor: "蓝泉",
          remark: "蓝泉-备注"
        },
        {
          Productname: "二级密封条",
          Productspecification: "bmh25*25",
          Orderquantity: 59,
          Plannedproduction: "59",
          Customername: "王都",//客户名称
          Contactperson: "史莱欧",//联系人
          Contactnumber: "15978763333",
          Ordernumber: "YUK-1604",//订单编号
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
      ]
      this.dataList = data
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleSelectionChange1(selection) {
      this.ids1 = selection.map(item => item.id);
      this.single1 = selection.length != 1;
      this.multiple1 = !selection.length;
    },
    //数据列表新增
    handleAdd() {
      this.$router.push({
        path: "/plan/productionPlandetail",
        query: {},
      });
    },
    handleAddCH() {
      this.openCH = true
    },
    //数据列表上查看按钮
    handleView(row) {
      //查看
      this.$router.push({
        path: "/plan/productionPlandetail",
        query: {
          id: row.id,
        },
      });
    },
    handleSaveTc() {
      this.openCH = false
    },
    handleViewTc(row) {
      //查询
      this.openTC = true
    },
    handleViewCH(row) {
      let CHInfo = this.BOMList.find(m => m.id == row.id)
      this.formCH = CHInfo
      //查看
      this.titleCH = "查看产品目录"
      this.openCH = true
    },
    //下修改
    handleUpdateCH(row) {
      let CHInfo = this.BOMList.find(m => m.id == row.id)
      this.formCH = CHInfo
      this.titleCH = "修改产品目录"
      this.openCH = true
    },
    //上修改
    handleUpdate(row) {
      this.$router.push({
        path: "/plan/productionPlandetail",
        query: {
          id: row.id,
        },
      });
    },
    /** 删除按钮操作 */
    handleDelete() {
      let oid = this.ids[0]
      this.$confirm('确认删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataList = this.dataList.filter(item => !this.ids.includes(item.id));
        this.$message.success('删除成功');
        this.ids = [];
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleDeleteCH() {
      let oid = this.ids1[0]
      this.$confirm('确认删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataList = this.dataList.filter(item => !this.ids.includes(item.id));
        this.$message.success('删除成功');
        this.ids = [];
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
  }
};
</script>
<style scope>
.column-name {
  color: #00c6ff;
  cursor: pointer;
}

.clearfixfooter {
  text-align: center;
}
</style>
