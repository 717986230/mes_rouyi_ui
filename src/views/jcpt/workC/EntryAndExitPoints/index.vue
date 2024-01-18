<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--进出厂点-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
          <el-form-item label="名称:" prop="nodeName" style="margin-left: -50px;">
            <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="编码:" prop="nodeCode">
            <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="运输类型:" prop="transTypeId">
            <el-select v-model="queryParams.transTypeId" placeholder="请选择运输类型" clearable>
              <el-option v-for="dict in dict.type.transport_type" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="进出类型:" prop="inoutTypeId">
            <el-select v-model="queryParams.inoutTypeId" placeholder="请选择进出类型" clearable>
              <el-option v-for="dict in dict.type.inout_type" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
        <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column fixed="left" sortable :width="columns[0].width" :label="columns[0].label" align="center"
            :prop="columns[0].key" v-if="columns[0].visible" />
          <el-table-column fixed="left" sortable :width="columns[1].width" :label="columns[1].label" align="center"
            :prop="columns[1].key" v-if="columns[1].visible" />
          <el-table-column sortable :width="columns[2].width" :label="columns[2].label" align="center"
            :prop="columns[2].key" v-if="columns[2].visible" />
          <el-table-column sortable :width="columns[3].width" :label="columns[3].label" align="center"
            :prop="columns[3].key" v-if="columns[3].visible" />
          <el-table-column sortable :width="columns[4].width" :label="columns[4].label" align="center"
            :prop="columns[4].key" v-if="columns[4].visible" />
          <el-table-column sortable :width="columns[5].width" :label="columns[5].label" align="center"
            :prop="columns[5].key" v-if="columns[5].visible" />
          <el-table-column sortable :width="columns[6].width" :label="columns[6].label" align="center"
            :prop="columns[6].key" v-if="columns[6].visible" />
          <el-table-column sortable :width="columns[7].width" :label="columns[7].label" align="center"
            :prop="columns[7].key" v-if="columns[7].visible" />
          <el-table-column sortable :width="columns[8].width" :label="columns[8].label" align="center"
            :prop="columns[8].key" v-if="columns[8].visible" />
          <el-table-column sortable :width="columns[9].width" :label="columns[9].label" align="center"
            v-if="columns[9].visible">
            <template slot-scope="scope">
              <el-checkbox true-label="1" false-label="0" disabled v-model="scope.row.useFlag"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column sortable :width="columns[10].width" :label="columns[10].label" align="center"
            :prop="columns[10].key" v-if="columns[10].visible" />
          <el-table-column sortable :width="columns[11].width" :label="columns[11].label" align="center"
            :prop="columns[11].key" v-if="columns[11].visible" />
          <el-table-column fixed="right" label="进出厂点" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button style="font-size: 20px;" size="mini" type="text" icon="el-icon-edit-outline"
                @click="handleFormulaPop(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.pageNum"
          :sizes.sync="pagination.sizes" :limit.sync="pagination.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
    <!-- 添加或修改配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号:" prop="nodeNum">
              <el-input type="number" v-model="form.nodeNum" placeholder="请输入编号" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="编码:" prop="nodeCode">
              <el-input v-model="form.nodeCode" placeholder="请输入编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="名称:" prop="nodeName">
              <el-input v-model="form.nodeName" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="别名:" prop="nodeAlias">
              <el-input v-model="form.nodeAlias" placeholder="请输入别名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="界区:" prop="nodeAreaId">
              <el-select v-model="form.nodeAreaId" placeholder="请选择界区" clearable style="width:100% ">
                <el-option v-for="dict in areaOption" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="精度:" prop="pres">
              <el-input v-model="form.pres" type="number">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="运输类型:" prop="transTypeId">
              <el-select v-model="form.transTypeId" placeholder="请选择运输类型" clearable style="width:100% ">
                <el-option v-for="dict in dict.type.transport_type" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进出类型:" prop="inoutTypeId">
              <el-select v-model="form.inoutTypeId" placeholder="请选择进出类型" clearable style="width:100% ">
                <el-option v-for="dict in dict.type.inout_type" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="启用标识:" prop="useFlag">
              <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:" prop="des">
              <el-input v-model="form.des" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示顺序:" prop="displayOrder">
              <el-input v-model="form.displayOrder" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">

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
    <!--计算弹窗-->
    <var-pop :openGS="openGS" @close="handleClose" @submit-to-parent="submitForm"></var-pop>
  </div>
</template>
<script>
import VarPop from '@/views/jcpt/component/varPop';
import { getToken } from "@/utils/auth";
export default {
  name: "EntryAndExitPoints",
  components: {
    VarPop
  },
  dicts: ['transport_type', 'inout_type'],
  data() {
    return {
      //遮罩层
      tableLoading: false,
      // 是否显示搜索
      showSearch: true,
      //列表数据
      tableData: [],
      // 双项绑定search
      queryParams: {
        "nodeCode": "",
        "nodeName": "",
        "pageNum": 1,
        "pageSize": 10,
        "transTypeId": "",
        "inoutTypeId": ""
      },
      // 分页
      pagination: {
        pageNum: 1, // 当前页
        pageSize: 10, // 分页大小
        sizes: [10, 20, 50, 100], // 分页大小选项
        total: 0 // 总条数
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "", //
      // 是否显示弹出层
      open: false,
      //表单类型  新增或修改  add edit
      formType: 'add',
      // 表单参数
      form: {},
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "", //
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/mes/shipment/import"
      },
      // 列信息
      columns: [
        { idx: 0, label: `编号`, key: 'nodeNum', visible: true, width: '100px' },
        { idx: 1, label: `编码`, key: 'nodeCode', visible: true, width: '100px' },
        { idx: 2, label: `名称`, key: 'nodeName', visible: true, width: '100px' },
        { idx: 3, label: `别名`, key: 'nodeAlias', visible: true, width: '100px' },
        { idx: 4, label: `精度`, key: 'pres', visible: true, width: '100px' },
        { idx: 5, label: `运输类型`, key: 'transportTypeName', visible: true, width: '100px' },
        { idx: 6, label: `进出类型`, key: 'inoutTypeName', visible: true, width: '100px' },
        { idx: 7, label: `区域`, key: 'nodeAreaName', visible: true, width: '100px' },
        { idx: 8, label: `计算公式`, key: 'formula', visible: true, width: '250px' },
        { idx: 9, label: `启用标识`, key: 'useFlag', visible: true, width: '100px' },
        { idx: 10, label: `显示顺序`, key: 'displayOrder', visible: true, width: '100px' },
        { idx: 11, label: `备注`, key: 'des', visible: true, width: '200px' },
      ],
      // 表单校验
      rules: {
        nodeNum: [
          { required: true, message: "编号不能为空", trigger: "blur" },
          // { pattern: /^6[0-9]{5}$/, message: '范围在600000-699999', trigger: 'blur' }
        ],
        nodeCode: [
          { required: true, message: "编码不能为空", trigger: "blur" }
        ],
        nodeName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        nodeAlias: [
          { required: true, message: "别名不能为空", trigger: "blur" }
        ],
        pres: [
          { required: true, message: "精度不能为空", trigger: "blur" },
          { pattern: /^(?:0|[1-9]\d?|100)$/, message: '范围在0-100的整数', trigger: 'blur' }
        ]
      },
      //界区下拉数据
      areaOption: [],
      //计算弹窗显隐
      openGS: false,
    };
  },
  created() {
    this.getList();
    //获取其他页面配置数据
    this.getOtherData();
  },
  methods: {
    //传给子组件的控制方法
    handleClose() {
      this.openGS = false; // 关闭父组件的弹窗
      this.reset();
    },
    /** 查询用户列表 */
    getList() {
      this.tableLoading = true;
      this.$api.i_shipmentList(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.pagination.total = response.total;
      }
      );
      this.tableLoading = false;

    },
    /*获取其他页面配置参数*/
    getOtherData() {
      //  4装卸台
      this.$api.i_nodeAreaList({ nodeAreaType: "4" }).then(res => {
        this.areaOption = res.data.map(e => {
          return {
            label: e.name,
            value: e.id,
          }
        })
      })
      // todo  需要对接接口

    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        "id": undefined,
        "des": "",
        "pres": "0",
        "useFlag": "1",
        "formula": "",
        "nodeAlias": "",
        "nodeCode": "",
        "nodeName": "",
        "nodeNum": "",
        "weighBridgeTag": "",
        "nodeAreaId": null,
        "inoutTypeId": null,
        "transTypeId": null,
        "displayOrder": "1000",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pagination.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "增加信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.id || this.ids[0];
      this.$api.i_shipmentByid({ id: userId }).then(response => {
        this.form = response.data;
        this.form.useFlag = String(response.data.useFlag)
        this.open = true;
        this.title = "修改信息";
      });
    },
    /** 提交按钮 */
    submitForm: function (field101) {
         if (typeof field101 === 'string') {
        this.$api.i_shipmentSU({
          "id": this.form.id,
          "des": this.form.des,
          "pres": this.form.pres,
          "useFlag": this.form.useFlag,
          "formula": field101,
          "nodeAlias": this.form.nodeAlias,
          "nodeCode": this.form.nodeCode,
          "nodeName": this.form.nodeName,
          "nodeNum": this.form.nodeNum,
          "weighBridgeTag": this.form.weighBridgeTag,
          "nodeAreaId": this.form.nodeAreaId,
          "inoutTypeId": this.form.inoutTypeId,
          "transTypeId": this.form.transTypeId,
          "displayOrder": this.form.displayOrder,
        }).then(response => {
          this.$modal.msgSuccess("修改成功");
          this.getList();
        }).catch(error => {
          // 处理请求错误，例如显示错误信息
          console.error("请求失败:", error);
        });
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            this.$api.i_shipmentSU(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.$api.i_shipmentSU(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const uid = row.id || this.ids[0];
      this.$modal.confirm('是否确认删除"' + uid + '"的数据项？').then(() => {
        return this.$api.i_shipmentDel({ id: uid })
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      let { pageNum, pageSize } = this.pagination
      this.download('mes/shipment/export', {
        ...this.queryParams,
        ...{
          pageNum,
          pageSize
        },
      }, `进出厂点_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('mes/shipment/import', {
      }, `进出厂点_${new Date().getTime()}.xlsx`)
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
    },
    // 计算弹窗
    handleFormulaPop(row) {
      this.reset();
      const userId = row.id || this.ids[0];
      this.$api.i_shipmentByid({ id: userId }).then(response => {
        this.form = response.data;
        this.openGS = true;
      });
    }
  }
};
</script>

<style lang="scss">
.app-container {
  height: calc(100vh - 84px);
  overflow: auto;
}
</style>
