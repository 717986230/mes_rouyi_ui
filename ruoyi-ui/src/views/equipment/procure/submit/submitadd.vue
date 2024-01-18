<template>
  <!-- 需求提报新增 -->
  <div class="box-card-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>需求基础信息</span>
      </div>
      <el-form ref="form" :model="dataInfo" :rules="rules" label-width="120px">
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="请购单号:" prop="num">
              <el-input style="width: 90%" v-model="dataInfo.num" placeholder="请购单号" maxlength="30"
                        :disabled="routerId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划使用时间:" prop="Plannedtime">
              <el-date-picker style="width: 90%" v-model="dataInfo.Plannedtime" type="datetime"
                              placeholder="选择时间日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="请购部门:" prop="department">
              <el-select style="width: 90%" v-model="formForm.department" placeholder="请购部门">
                <el-option v-for="item in unitoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请购人:" prop="user">
              <el-input style="width: 90%" :disabled="routerId" v-model="dataInfo.user" placeholder="请购人"
                        maxlength="30"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="请购原因:" prop="remark">
              <el-input style="width: 90%" v-model="dataInfo.remark" placeholder="请输入原因" maxlength="30"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>请购明细</span>
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="success" size="mini" @click="handleAdd">添加</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" size="mini" :disabled="singlepopw" @click="handleRemove">移除</el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="PopwindowDate" @selection-change="handleSelectionPopwindowDate">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="设备名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="规格型号" align="center" sortable key="modelValue" prop="modelValue"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="生产厂家" align="center" sortable key="manufacturer" prop="manufacturer"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="单位" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true"/>
        <el-table-column label="请购数量" align="center" sortable key="quantity" prop="quantity"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div v-if="routerId">
              {{ scope.row.quantity }}
            </div>
            <el-input v-else type="text" v-model="scope.row.quantity" @blur="handleBlur" maxlength="30"
                      style="width: 100px;"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="请购明细" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="formForm" label-width="100px" :rules="rulesForm">
        <el-form-item label="设备名称:" prop="name">
          <el-input v-model="formForm.name" placeholder="请输入" type="text" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="设备编号:" prop="num">
          <el-input v-model="formForm.num" placeholder="请输入" :disabled="this.routerId"></el-input>
        </el-form-item>
        <el-form-item label="规格型号:" prop="modelValue">
          <el-input v-model="formForm.modelValue" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家:" prop="manufacturer">
          <el-input v-model="formForm.manufacturer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="unit">
          <el-select v-model="formForm.unit" placeholder="请选择单位" style="width: 100%;">
            <el-option v-for="item in unitoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请购数量:" prop="quantity">

          <el-input v-model="formForm.quantity" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer clearfixfooter">
        <el-button type="primary" @click="submitFormFormula">保 存</el-button>
        <el-button @click="cancelFormula">取 消</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer clearfixfooter">
      <el-button type="primary" @click="submitForm">保 存</el-button>
      <el-button @click="canCel">取 消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "submitadd",
  components: {},
  data() {
    return {
      dataInfo: {
        num: "",
        Plannedtime: new Date(),
        department: "",
        user: "",
        remark: ""
      },
      dataList: [
        {
          id: 1,    //id
          num: "AJJ-10029", // 订单编号
          status: "0", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月15日",
          department: "行政部",
          user: "临安",
          auditor: "李海",
          remark: "李海-备注"
        }, {
          id: 2,    //id
          num: "AJJ-10030", // 订单编号
          status: "1", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "满周丽",
          auditor: "石永",
          remark: "石永-备注"
        }, {
          id: 3,    //id
          num: "AJJ-10031", // 订单编号
          status: "2", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月15日",
          department: "行政部",
          user: "李娜",
          auditor: "时因",
          remark: "时因-备注"
        }, {
          id: 4,    //id
          num: "AJJ-10032", // 订单编号
          status: "3", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月15日",
          department: "销售部",
          user: "李佳",
          auditor: "彭宏",
          remark: "彭宏-备注"
        },
        {
          id: 5,    //id
          num: "AJJ-10033", // 订单编号
          status: "4", // 审核状态
          Purchasetime: "2023年12月15日",
          Plannedtime: "2023-12-25",
          Actualtime: "2023年12月15日",
          department: "技术部",
          user: "李杰",
          auditor: "王波",
          remark: "王波-备注"
        }
      ],
      unitoptions: [
        {
          value: '量纲1',
          label: '量纲1'
        },
        {
          value: '量纲2',
          label: '量纲2'
        },
        {
          value: '量纲3',
          label: '量纲3'
        },
        {
          value: '量纲4',
          label: '量纲4'
        }

      ],
      routerId: undefined,
      PopwindowDate: [
        // {
        //     id: 1,    //id
        //     name: "液压后杠", // 设备名称
        //     modelValue: "OUJ-10022", // 规格型号
        //     manufacturer: "海联帆",//生产厂家
        //     unit: "个",
        //     quantity: "12"
        // }, {
        //     id: 2,    //id
        //     name: "前挡器", // 设备名称
        //     modelValue: "PUJ-10023", // 规格型号
        //     manufacturer: "得利士",//生产厂家
        //     unit: "套",
        //     quantity: "22"
        // }, {
        //     id: 3,    //id
        //     name: "拖动扳手", // 设备名称
        //     modelValue: "OPU-100029", // 规格型号
        //     manufacturer: "施耐德",//生产厂家
        //     unit: "米",
        //     quantity: "14"
        // }, {
        //     id: 4,    //id
        //     name: "全身套条件", // 设备名称
        //     modelValue: "TYP-10089", // 规格型号
        //     manufacturer: "虎卡",//生产厂家
        //     unit: "盒",
        //     quantity: "2"
        // }
      ],
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      idspopw: [],
      singlepopw: true,
      multiplepopw: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      title: "",
      open: false,
      // 表单参数
      form: {},
      formForm: {},
      // 查询参数
      queryParams: {
        department: "0",
        requisitionnumber: "",
        status: "0"
      },
      rules: {
        num: [{
          required: true,
          message: "请输入请购单号",
          trigger: "blur"
        }],
        Plannedtime: [{
          required: true,
          message: "请输入设备名称",
          trigger: "change"
        }],
        department: [{
          required: true,
          message: "请输入请购部门",
          trigger: "blur"
        }],
        user: [{
          required: true,
          message: "请输入请购人",
          trigger: "blur"
        }],
        unitType: [{
          required: true,
          message: "请输入请购原因",
          trigger: "blur"
        }],
        remark: [{
          required: true,
          message: "请输入请购原因",
          trigger: "blur"
        }]
      },
      // 表单校验
      rulesForm: {
        num: [{
          required: true,
          message: "请输入设备编号",
          trigger: "blur"
        }],
        name: [{
          required: true,
          message: "请输入设备名称",
          trigger: "blur"
        }],
        Equipmentnumber: [{
          required: true,
          message: "请输入设备编号",
          trigger: "blur"
        }],
        Specificationmodel: [{
          required: true,
          message: "请输入规格型号",
          trigger: "blur"
        }],
        unit: [
          {
            required: true,
            message: "请输入单位",
            trigger: "blur"
          }
        ],
        Requisitionedquantity: [{
          required: true,
          message: "请输入请购数量",
          trigger: "blur"
        }],

      }
    };
  },
  watch: {},
  created() {
    this.routerId = this.$route.query.id || undefined
    if (this.routerId) {
      let newdata = this.dataList.filter(item => {
        return item.id == this.routerId;
      })[0]
      this.dataInfo = newdata
      this.PopwindowDate = [
        {
          id: 1,    //id
          name: "液压后杠", // 设备名称
          modelValue: "OUJ-10022", // 规格型号
          manufacturer: "海联帆",//生产厂家
          unit: "个",
          quantity: "12"
        }, {
          id: 2,    //id
          name: "前挡器", // 设备名称
          modelValue: "PUJ-10023", // 规格型号
          manufacturer: "得利士",//生产厂家
          unit: "套",
          quantity: "22"
        }, {
          id: 3,    //id
          name: "拖动扳手", // 设备名称
          modelValue: "OPU-100029", // 规格型号
          manufacturer: "施耐德",//生产厂家
          unit: "米",
          quantity: "14"
        }, {
          id: 4,    //id
          name: "全身套条件", // 设备名称
          modelValue: "TYP-10089", // 规格型号
          manufacturer: "虎卡",//生产厂家
          unit: "盒",
          quantity: "2"
        }
      ]
    }
  },
  methods: {
    canCel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //添加
    handleAdd() {
      this.open = true;
    },
    close() {
      done();
    },
    cancelFormula() {
      this.open = false
    },
    submitForm() {
      this.$message.success("保存成功")
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    submitFormFormula() {
      this.PopwindowDate.push({
        ...this.formForm,
        id: this.PopwindowDate.length + 1
      }),
        this.$message.success("保存成功")
      this.formForm = {},
        this.open = false

    },
    //失焦事件
    handleBlur() {},
    handleRemove() {
      //移除
      let seleid = this.idspopw[0]
      let newdata = this.PopwindowDate.filter(item => {
        return item.id != seleid;
      })
      this.PopwindowDate = newdata
      this.$message.success("移除成功")

    },
    //选择
    handleSelectionPopwindowDate(selection) {
      this.idspopw = selection.map(item => item.id);
      this.singlepopw = selection.length != 1;
      this.multiplepopw = !selection.length;
    }
  }
};
</script>
<style scoped>
.box-card {
  margin: 30px 0;
}

.box-card-add {
  width: 100%;
  height: 100%;

}

.clearfixfooter {
  margin: 30px;
  text-align: center
}
</style>
