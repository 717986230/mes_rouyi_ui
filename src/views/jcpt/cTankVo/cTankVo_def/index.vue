<template>
  <!-- 罐默认配置 -->
  <div class="app-container">
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" width="50" align="center" />
      <el-table-column label="简称" sortable align="center" prop="keyv" key="keyv" v-if="columns[0].visible" />
      <el-table-column label="值" sortable align="center" prop="val" v-if="columns[1].visible"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div style="width: 100%;height: 30px;" @click="handleClickVal(scope.row)">{{ scope.row.val }}</div>
        </template>
      </el-table-column>
      <el-table-column label="描述信息" sortable align="center" prop="descStr" key="descStr" v-if="columns[2].visible"
        :show-overflow-tooltip="true" />
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="简称:" prop="keyv">
              <el-input v-model="form.keyv" placeholder="请输入简称" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="值:" prop="val">
              <el-input v-model="form.val" placeholder="请输入值" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述信息:" prop="descStr">
              <el-input v-model="form.descStr" placeholder="请输入描述信息" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 公式修正弹窗-->
    <el-dialog title="公式修正" :visible.sync="openFormula" width="800px" append-to-body>
      <el-row>
        <el-col :span="24">
          <el-input v-model="formulaForm.formula" placeholder="" style="width: 200px" />
          <el-button type="primary" size="mini" @click="formulaSubmit">确认</el-button>
          <el-button type="primary" size="mini" @click="formulaCancel">取消</el-button>
          <el-button type="primary" size="mini" @click="formulaNotSet">不设置</el-button>
          <el-button type="primary" size="mini" @click="formulaAdd">新增</el-button>
          <el-button type="primary" size="mini" @click="formulaRefresh">查询</el-button>
          <el-button type="primary" size="mini" @click="formulaSave">保存</el-button>
          <el-button type="primary" size="mini" @click="formulaDelete" :disabled="singlechild">删除</el-button>
        </el-col>
      </el-row>
      <el-table :data="popListData" @selection-change="handleSelectionChange11">
        <el-table-column fixed="left" type="selection" width="50" align="center" />
        <el-table-column sortable align="center" label="值">
          <template slot-scope="scope">
            <div style="width: 100%;height: 30px;" v-if="!scope.row.isEditingName" @click="startEditing_N(scope.row)">{{
              scope.row.name }}</div>
            <el-input v-else v-model="scope.row.name" @blur="finishEditing_N(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column sortable align="center" label="描述信息">
          <template slot-scope="scope">
            <div style="width: 100%;height: 30px;" v-if="!scope.row.isEditingDes" @click="startEditing_V(scope.row)">{{
              scope.row.val }}</div>
            <el-input v-else v-model="scope.row.val" @blur="finishEditing_V(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormFormula">确 定</el-button>
        <el-button @click="cancelFormula">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cTankVo_def",
  data() {
    return {
      // 列信息
      columns: [
        { key: 0, label: `简称`, visible: true },
        { key: 1, label: `值`, visible: true },
        { key: 2, label: `描述信息`, visible: true },
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      idschild: [],
      // 非单个禁用
      single: true,
      singlechild: true,
      multiplechild: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      dataList: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {
        name: '',
        val: '',
        des: '',
      },

      // 查询参数
      queryParams: {
        "id": undefined,
        "isAsc": "",
        "orderByColumn": "",
        "pageNum": 1,
        "pageSize": 10,
        "reasonable": true
      },
      // 表单校验
      rules: {
        keyv: [
          { required: true, message: "简称不能为空", trigger: "blur" }
        ],
        val: [
          { required: true, message: "值不能为空", trigger: "blur" }
        ],
        descStr: [
          { required: true, message: "描述信息不能为空", trigger: "blur" }
        ],
      },
      rowDate: {},//点击存储数据
      //弹窗中的列表数据
      popListData: [
        {
          id: "1",
          name: 'VCF',
          des: '将油品从计量温度下体积修正到标准体积的体积修正系数',
          isEditingName: false,
          isEditingDes: false,
        },
        {
          id: "2",
          name: 'VTF',
          des: '罐内液位高度下的表载体积体积，修正到罐壁平均温度下的实际体积',
          isEditingName: false,
          isEditingDes: false,
        },
        {
          id: "3",
          name: 'VT',
          des: '任意计量温度下油品体积',
          isEditingName: false,
          isEditingDes: false,
        },
      ],
      openFormula: false,
      formulaForm: {
        formula: ""
      }
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
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
      this.$api.i_tankDefaultList(this.queryParams).then(res => {
        this.dataList = res.rows
        this.total = res.total;
      });
      this.loading = false;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        "descStr": "",
        "id": undefined,
        "keyv": "",
        "val": ""
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleSelectionChange11(selection) {
      this.idschild = selection.map(item => item.id);
      this.singlechild = selection.length != 1;
      this.multiplechild = !selection.length;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            this.$api.i_tankDefaultSU({
              "descStr": this.form.descStr,
              "id": this.form.id,
              "keyv": this.form.keyv,
              "val": this.form.val,
            }).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.$api.i_tankDefaultSU(this.form).then(response => {
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
      this.$api.i_tankDefaultByid({ id: userId }).then(response => {
        this.form = response.data;
        this.form.useFlag = String(response.data.useFlag)
        this.open = true;
        this.title = "修改信息";
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.id || this.ids[0];
      this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
        return this.$api.i_tankDefaultDel({ id: userIds })
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    //点击值
    handleClickVal(row) {
      this.rowDate = row
      this.formulaForm.formula = row.val
      console.log("参数", row);
      this.openFormula = true;
    },
    getDefaultData(val) {

    },
    startEditing_N(row) {
      row.isEditingName = true;
    },
    finishEditing_N(row) {
      row.isEditingName = false;
    },
    startEditing_V(row) {
      row.isEditingDes = true;
    },
    finishEditing_V(row) {
      row.isEditingDes = false;
    },
    //确认
    formulaSubmit() {
      this.$api.i_tankDefaultSU({
        "descStr": this.rowDate.descStr,
        "id": this.rowDate.id,
        "keyv": this.rowDate.keyv,
        "val": this.formulaForm.formula
      }).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.open = false;
        this.getList();
      });
    },
    //取消
    formulaCancel() {
      this.openFormula = false;
    },
    //不设置
    formulaNotSet() {
      this.$modal.confirm('是否设置默认值?').then(() => {
        this.$api.i_tankDefaultSU({
          "descStr": this.rowDate.descStr,
          "id": this.rowDate.id,
          "keyv": this.rowDate.keyv,
          "val": ""
        }).then(response => {
          // this.$modal.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        });
      }).then(() => {
        this.formulaForm.formula = ""
        this.$modal.msgSuccess("默认值设置成功");
      }).catch(() => { });
    },
    //新增
    formulaAdd() {
      this.popListData.unshift({
        name: '',
        des: '',
        id: this.popListData.length + 1,
        isEditingName: false,
        isEditingDes: false,
      },)

    },
    //查询
    formulaRefresh() {

    },
    //保存
    formulaSave() {
      this.$message.info('保存成功');
    },
    //删除
    formulaDelete() {
      this.$modal.confirm('是否确认删除"' + this.idschild[0] + '"的数据项？').then(() => {
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    submitFormFormula() {
      this.openFormula = false;
    },
    cancelFormula() {
      this.openFormula = false;
    }
  }
};
</script>
