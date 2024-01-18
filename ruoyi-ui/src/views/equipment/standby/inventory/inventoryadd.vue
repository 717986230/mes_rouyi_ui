<template>
  <div class="box-card-add">
    <div style="font-size: 24px;margin:10px 20px;">盘点管理（新增/修改）</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盘点任务信息</span>
      </div>
      <el-form ref="form" :model="dataInfo" :rules="formRules" label-width="120px">
        <el-row :gutter="40">
          <el-col :span="10">
            <el-form-item label="盘点单号:" prop="Inventorynumber">
              <el-input style="width: 90%" v-model="dataInfo.Inventorynumber" placeholder="盘点单号" maxlength="30"
                        :disabled="Boolean(routerId)"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="盘点规则:" prop="Inventoryrule">
              <el-select style="width: 90%" v-model="dataInfo.Inventoryrule" placeholder="盘点规则"
              >
                <el-option v-for="item in Prules" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="10">
            <el-form-item label="计划使用时间:" prop="Plannedtime">
              <el-date-picker style="width: 90%" v-model="dataInfo.Plannedtime" type="datetime"
                              placeholder="选择时间日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否循环:" prop="isLoop">
              <el-radio v-model="dataInfo.isLoop" label="1">是</el-radio>
              <el-radio v-model="dataInfo.isLoop" label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盘点范围</span>
      </div>
      <el-form ref="form" :model="dataInfo" :rules="rules" label-width="120px">
        <el-row :gutter="40">
          <el-col :span="10">
            <el-form-item label="盘点仓库:" prop="Stash">
              <el-select style="width: 90%" v-model="dataInfo.Stash" placeholder="盘点仓库">
                <el-option v-for="item in Stashoptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="存放位置:" prop="Storagelocation">
              <el-select style="width: 90%" v-model="dataInfo.Storagelocation" placeholder="存放位置">
                <el-option v-for="item in Stashoptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="10">
            <el-form-item label="盘点备件:" prop="Inventoryparts">
              <el-select style="width: 90%" v-model="dataInfo.Inventoryparts" placeholder="盘点备件" :multiple="true"
                         :disabled="true">
                <el-option v-for="item in Stashoptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="盘点负责人:" prop="Headinventory">
              <el-select style="width: 90%" v-model="dataInfo.Headinventory" placeholder="盘点负责人">
                <el-option v-for="item in PersonCharge" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-bottom: 100px;">
      <div slot="header" class="clearfix">
        <span>盘点计划明细</span>
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="success" size="mini" @click="handleAdd">添加</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" size="mini" :disabled="single" @click="handleRemove">移除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" size="mini" @click="handleAddAll">全部添加</el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="PopwindowDate" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="50" align="center"/>
        <el-table-column label="序号" fixed="left" type="index" width="50" align="center"/>
        <el-table-column label="备件名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="备件编号" align="center" sortable key="Sparenumber" prop="Sparenumber"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="规格型号" align="center" sortable key="Specificationmodel" prop="Specificationmodel"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="备件类型" align="center" sortable key="Sparetype" prop="Sparetype"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="单位" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true"/>
        <el-table-column label="盘点仓库" align="center" sortable key="Stash" prop="Stash"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="存放位置" align="center" sortable key="Storagelocation" prop="Storagelocation"
                         :show-overflow-tooltip="true"/>
      </el-table>
    </el-card>
    <el-dialog title="盘点计划明细" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="formForm" label-width="100px" :rules="rulesForm">
        <el-form-item label="仓库:" prop="Stash">
          <el-select v-model="formForm.Stash" placeholder="仓库" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '冶炼仓库-1', value: '冶炼仓库-1' }, { label: '冶炼仓库-2', value: '冶炼仓库-2' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存放位置:" prop="Storagelocation">
          <el-select v-model="formForm.Storagelocation" placeholder="存放位置" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '冶炼仓库-PO', value: '冶炼仓库-PO' }, { label: '冶炼仓库-NK-2', value: '冶炼仓库-NK-2' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备:" prop="equipment">
          <el-select v-model="formForm.equipment" placeholder="设备" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '冶炼设备-MNK-1', value: '冶炼设备-MNK-1' }, { label: '冶炼设备-PMNK-1', value: '冶炼设备-PMNK-1' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备件名称:" prop="name">
          <el-select v-model="formForm.name" placeholder="备件名称" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '冶炼PPL-1', value: '冶炼PPL-1' }, { label: '冶炼PPL-2', value: '冶炼PPL-2' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备件类型:" prop="Sparetype">
          <el-select v-model="formForm.Sparetype" placeholder="备件类型" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '主件备料', value: '主件备料' }, { label: '冶炼备料', value: '冶炼备料' }, { label: '行政备料', value: '行政备料' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备件编号:" prop="Sparenumber">
          <el-select v-model="formForm.Sparenumber" placeholder="备件编号" style="width: 100%;">
            <el-option
              v-for="item in [{ label: 'PLK-101', value: 'PLK-101' }, { label: 'PLK-202', value: 'PLK-202' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号:" prop="Specificationmodel">
          <el-select v-model="formForm.Specificationmodel" placeholder="规格型号" style="width: 100%;">
            <el-option v-for="item in [{ label: 'NKP-1', value: 'NKP-1' }, { label: 'NKP-2', value: 'NKP-2' }]"
                       :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位:" prop="unit">
          <el-select v-model="formForm.unit" placeholder="单位" style="width: 100%;">
            <el-option
              v-for="item in [{ label: '冶炼单位-1', value: '冶炼单位-1' }, { label: '冶炼单位-2', value: '冶炼单位-2' }]"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer clearfixfooter">
        <el-button type="primary" @click="submitFormFormula">保 存</el-button>
        <el-button @click="cancelFormula">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <div slot="footer" class="dialog-footer clearfixfooter">
        <el-button type="primary" @click="submitForm">保 存</el-button>
        <el-button @click="canCel">取 消</el-button>
    </div> -->
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button type="success" @click="handleSave">保存</el-button>
        <el-button @click="onCancel()" style="margin-right: 12px">{{ "关闭" }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "inventoryadd",
  components: {},
  data() {
    return {
      formRules: {
        Inventorynumber: [{required: true, message: '请输入盘点计划编号', trigger: 'blur'}],
        Inventoryrule: [{required: true, message: '请输入盘点规则', trigger: 'blur'}],
        Plannedtime: [{required: true, message: '请选择', trigger: 'blur'}],
        isLoop: [{required: true, message: '请选择', trigger: 'blur'}]

      },
      Prules: [
        {
          value: "0",
          label: "快速盘点"
        }, {
          value: "1",
          label: "标准盘点"
        }, {
          value: "2",
          label: "自由盘点"
        }
      ],
      PersonCharge: [
        {
          value: '0',
          label: '李海'
        },
        {
          value: '1',
          label: '石楠'
        },
        {
          value: '2',
          label: '刘亚博'
        },
        {
          value: '3',
          label: '伊柠'
        },
      ],
      Stashoptions: [
        {
          label: '全部',
          value: '0'
        },
        {
          value: '1',
          label: '配件仓库'
        },
        {
          value: '2',
          label: '耗材仓库'
        },
        {
          value: '3',
          label: '备件仓库'
        },
        {
          value: '4',
          label: '行政仓库'
        }
      ],
      dataInfo: {
        Inventorynumber: "",
        Inventoryrule: "",
        Plannedtime: new Date(),
        Stash: "0",//盘点仓库
        Storagelocation: "0",//存放位置
        Inventoryparts: "",//盘点备件
        Headinventory: "",//盘点负责人
        department: "",
        department1: "",
        user: "",
        remark: "",
        isLoop: "1",
      },
      dataList: [
        {
          id: 1,    //id
          num: "PD-100020", // 订单编号
          status: "0", // 审核状态
          statustext: "未开始",
          Inventoryrule: "自由规则",
          Stash: "配件仓库",
          Plannedparts: "液压缸",
          Scheduledstarttime: "2023年12月15日",
          Scheduledendtime: "2023-12-25",
          Actualstarttime: "2023年12月15日",
          Actualendtime: "2023年12月15日",
          isLoop: "1",
          user: 0,
          auditor: "李海",
          remark: "石杜-备注"
        }, {
          id: 2,    //id
          num: "PD-100022", // 订单编号
          status: "1", // 审核状态
          statustext: "执行中",
          Inventoryrule: "生产规则",
          Stash: "生产仓库",
          Plannedparts: "柴油机液压阀",
          Scheduledstarttime: "2023年12月15日",
          Scheduledendtime: "2023-12-25",
          Actualstarttime: "2023年12月15日",
          Actualendtime: "2023年12月15日",
          isLoop: "0",
          user: 56,
          auditor: "杜海波",
          remark: "王宁-备注"
        }, {
          id: 3,    //id
          num: "PD-100024", // 订单编号
          status: "2", // 审核状态
          statustext: "已完成",
          Inventoryrule: "准确挑选",
          Stash: "备件仓库",
          Plannedparts: "后遥感控件",
          Scheduledstarttime: "2023年12月15日",
          Scheduledendtime: "2023-12-25",
          Actualstarttime: "2023年12月15日",
          Actualendtime: "2023年12月15日",
          isLoop: "0",
          user: 100,
          auditor: "杨南",
          remark: "时圣博-备注"
        }, {
          id: 4,    //id
          num: "PD-100028", // 订单编号
          status: "3", // 审核状态
          statustext: "已逾期",
          Inventoryrule: "快速规则",
          Stash: "临时仓库",
          Plannedparts: "快插拨打火头",
          Scheduledstarttime: "2023年12月15日",
          Scheduledendtime: "2023-12-25",
          Actualstarttime: "2023年12月15日",
          Actualendtime: "2023年12月15日",
          isLoop: "1",
          user: 71,
          auditor: "诺楠",
          remark: "亚月-备注"
        },
        {
          id: 5,    //id
          num: "PD-100029", // 订单编号
          status: "4", // 审核状态
          statustext: "未开始",
          Inventoryrule: "标准规则",
          Stash: "行政物品仓库",
          Plannedparts: "打印机",
          Scheduledstarttime: "2023年12月15日",
          Scheduledendtime: "2023-12-25",
          Actualstarttime: "2023年12月15日",
          Actualendtime: "2023年12月15日",
          isLoop: "1",
          user: 29,
          auditor: "图卡罗",
          remark: "哈雅-备注"
        }
      ],
      unitoptions: [
        {
          value: '1',
          label: '米'
        },
        {
          value: '2',
          label: '套'
        },
        {
          value: '3',
          label: '箱'
        },
        {
          value: '4',
          label: '项'
        }

      ],
      routerId: undefined,
      PopwindowDate: [
        // {
        //     id: 1,    //id
        //     name: "木质材料", // 设备名称
        //     Sparenumber: "11001-PLK",
        //     Specificationmodel: "NKP-1", // 规格型号
        //     Sparetype: "主件备料",
        //     Stash: "备材仓库",
        //     Storagelocation: "耗材仓库",
        //     unit: "个",
        //     quantity: ""
        // }, {
        //     id: 2,    //id
        //     name: "花岗岩材料", // 设备名称
        //     Sparenumber: "11002-PLK",
        //     Specificationmodel: "NKP-2", // 规格型号
        //     Sparetype: "主件备料",
        //     Stash: "备材仓库",
        //     Storagelocation: "耗材仓库",
        //     unit: "箱",
        //     quantity: ""
        // }, {
        //     id: 3,    //id
        //     name: "贴纸材料", // 设备名称
        //     Sparenumber: "11003-PLK",
        //     Specificationmodel: "NKP-3", // 规格型号
        //     Sparetype: "行政备料",
        //     Stash: "备材仓库",
        //     Storagelocation: "备材仓库",
        //     unit: "套",
        //     quantity: ""
        // }, {
        //     id: 4,    //id
        //     name: "打印机", // 设备名称
        //     Sparenumber: "11004-PLK",
        //     Specificationmodel: "NKP-4", // 规格型号
        //     Sparetype: "行政备料",
        //     Stash: "行政仓库",
        //     Storagelocation: "行政仓库",
        //     unit: "盒",
        //     quantity: ""
        // }
      ],
      // 遮罩层
      loading: false,
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
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
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
        isLoop: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        department: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
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
        user: [{
          required: true,
          message: "请输入请购人",
          trigger: "blur"
        }],
        unitType: [{
          required: true,
          message: "请输入请购原因",
          trigger: "blur"
        }]
      },
      // 表单校验
      rulesForm: {
        name: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }],
        Stash: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        Storagelocation: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        equipment: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        Sparenumber: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        Specificationmodel: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }],
        unit: [{
          required: true,
          message: "请选择",
          trigger: "change"
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
          name: "木质材料", // 设备名称
          Sparenumber: "11001-PLK",
          Specificationmodel: "NKP-1", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "个",
          quantity: ""
        }, {
          id: 2,    //id
          name: "花岗岩材料", // 设备名称
          Sparenumber: "11002-PLK",
          Specificationmodel: "NKP-2", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "箱",
          quantity: ""
        }, {
          id: 3,    //id
          name: "贴纸材料", // 设备名称
          Sparenumber: "11003-PLK",
          Specificationmodel: "NKP-3", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "套",
          quantity: ""
        }, {
          id: 4,    //id
          name: "冶钢材料", // 设备名称
          Sparenumber: "11004-PLK",
          Specificationmodel: "NKP-4", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "盒",
          quantity: ""
        }
      ]
    }
  },
  methods: {
    handleSave() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
      this.$message.success("保存成功")
    },
    onCancel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //添加
    handleAdd() {
      this.open = true;
    },
    handleAddAll() {
      this.PopwindowDate = [
        {
          id: 1,    //id
          name: "木质材料", // 设备名称
          Sparenumber: "11001-PLK",
          Specificationmodel: "NKP-1", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "个",
          quantity: ""
        }, {
          id: 2,    //id
          name: "花岗岩材料", // 设备名称
          Sparenumber: "11002-PLK",
          Specificationmodel: "NKP-2", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "箱",
          quantity: ""
        }, {
          id: 3,    //id
          name: "贴纸材料", // 设备名称
          Sparenumber: "11003-PLK",
          Specificationmodel: "NKP-3", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "套",
          quantity: ""
        }, {
          id: 4,    //id
          name: "冶钢材料", // 设备名称
          Sparenumber: "11004-PLK",
          Specificationmodel: "NKP-4", // 规格型号
          Sparetype: "冶炼备料",
          Stash: "备材仓库",
          Storagelocation: "冶炼仓库1",
          unit: "盒",
          quantity: ""
        }
      ]
      this.$message.success("全部添加成功")
    },
    onSubmit3() {
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

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleRemove() {
      //移除
      let iiid = this.ids[0]
      let newdata = this.PopwindowDate.filter(item => {
        return item.id != iiid;
      })
      console.log(newdata, '数据申诉');
      this.PopwindowDate = newdata
      this.$message.success("移除成功")
    }

  }
};
</script>
<style scoped>
.box-card {
  margin: 30px 0;
}

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

.box-card-add {
  width: 100%;
  height: 100%;

}

.clearfixfooter {
  margin: 30px;
  text-align: center
}
</style>
