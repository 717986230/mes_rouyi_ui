<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--互供点-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
          <el-form-item label="编码" prop="nodeCode" style="margin-left: -40px;">
            <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="名称" prop="nodeName">
            <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="源工厂:" prop="srMesFctrId">
            <el-select v-model="queryParams.srMesFctrId" placeholder="请选择源工厂" clearable>
              <el-option v-for="dict in YGCtype" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="目的工厂:" prop="tgMesFctrId">
            <el-select v-model="queryParams.tgMesFctrId" placeholder="请选择目的工厂" clearable>
              <el-option v-for="dict in YGCtype" :key="dict.value" :label="dict.label" :value="dict.value" />
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
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column fixed="left" type="selection" width="50" align="center" />
          <el-table-column fixed="left" label="编号" align="center" sortable key="nodeId" prop="nodeId" />
          <el-table-column label="编码" align="center" sortable key="nodeCode" prop="nodeCode"
            :show-overflow-tooltip="true" />
          <el-table-column label="名称" align="center" sortable key="nodeName" prop="nodeName"
            :show-overflow-tooltip="true" />
          <el-table-column label="别名" align="center" sortable key="nodeAlias" prop="nodeAlias"
            :show-overflow-tooltip="true" />
          <el-table-column label="精度" align="center" sortable key="pres" prop="pres" :show-overflow-tooltip="true" />
          <el-table-column label="源工厂" align="center" sortable key="srMesFctrName" width="100" prop="srMesFctrName"
            :show-overflow-tooltip="true" />
          <el-table-column label="目的工厂" align="center" sortable key="tgMesFctrName" prop="tgMesFctrName" width="120" />
          <el-table-column label="源物料" align="center" sortable key="srMtrlId" prop="srMtrlId" width="130" />
          <el-table-column label="目的物料" align="center" sortable key="tgMtrlId" prop="tgMtrlId" width="120" />
          <el-table-column label="源节点" align="center" sortable key="srMtrlName" prop="srMtrlName" width="130" />
          <el-table-column label="目的节点" align="center" sortable key="tgMtrlName" prop="tgMtrlName" width="120" />
          <el-table-column label="源计算公式" align="center" sortable key="srFormula" prop="srFormula" width="120" />
          <el-table-column label="目的计算公式" align="center" sortable key="tgFormula" prop="tgFormula" width="120" />
          <el-table-column label="仲裁公式" align="center" sortable key="arbiFor" prop="arbiFor" width="120" />
          <el-table-column label="启用标识" align="center" prop="useFlag">
            <template slot-scope="scope">
              <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                v-model="scope.row.useFlag"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="显示顺序" align="center" sortable key="displayOrder" prop="displayOrder" width="160">
          </el-table-column>
          <el-table-column label="备注" align="center" sortable key="des" prop="des" width="120" />
          <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="getList" />
      </el-col>
    </el-row>
    <!-- 添加或修改配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号:" prop="nodeId">
              <el-input type="number" :disabled="formType == 'edit'" v-model="form.nodeId" placeholder="请输入编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="输入码段范围:" prop="deptId">
              600000-699999
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码:" prop="nodeCode">
              <el-input v-model="form.nodeCode" placeholder="请输入编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称:" prop="nodeName">
              <el-input v-model="form.nodeName" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="别名:" prop="nodeAlias">
              <el-input v-model="form.nodeAlias" placeholder="请输入别名" />
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
            <el-form-item label="源工厂:" prop="srMesFctrId">
              <el-select v-model="form.srMesFctrId" placeholder="请选择源工厂" clearable style="width:100% ">
                <el-option v-for="dict in YGCtype" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的工厂:" prop="tgMesFctrId">
              <el-select v-model="form.tgMesFctrId" placeholder="请选择目的工厂" clearable style="width:100% ">
                <el-option v-for="dict in YGCtype" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="能源物料:" prop="type">
              <el-select v-model="form.type" placeholder="能源物料" clearable style="width:100% ">
                <el-option v-for="dict in EnergyMaterial" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="srMtrlIdtitle" prop="srMtrlId">
              <el-select v-model="form.srMtrlId" :placeholder="srMtrlIdtitle" clearable style="width:100% ">
                <el-option v-for="dict in WLList" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="MtrlIdtitle" prop="tgMtrlId">
              <el-select v-model="form.tgMtrlId" :placeholder="MtrlIdtitle" clearable style="width:100% ">
                <el-option v-for="dict in WLList" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="仲裁公式:">
              <el-input v-model="form.arbiFor" placeholder="请输入仲裁公式" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用:" prop="useFlag">
              <el-checkbox v-model="form.useFlag" false-label="0" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input v-model="form.des" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序:">
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
          <!--          <div class="el-upload__tip" slot="tip">-->
          <!--            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据-->
          <!--          </div>-->
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
  </div>
</template>

<script>
import _ from 'lodash';
import { getToken } from "@/utils/auth";
export default {
  name: "MutualSupplyPoint",
  dicts: ['work_c'],
  data() {
    return {
      srMtrlIdtitle: "源物料",//源
      MtrlIdtitle: "目的物料",//目的
      EnergyMaterial: [
        {
          label: '能源',
          value: "2"
        },
        {
          label: '物料',
          value: "1"
        },
      ],
      WLList: [],//源物料   或者  源节点    目的物料   或者  目的节点
      YGCtype: [],//源工厂
      //遮罩层
      loading: false,
      // 是否显示搜索
      showSearch: true,
      //列表数据
      tableData: [],
      // 双项绑定search
      queryParams: {
        "isAsc": "",
        "nodeCode": "",
        "nodeName": "",
        "orderByColumn": "",
        "pageNum": 1,
        "pageSize": 10,
        "reasonable": true,
        "srMesFctrId": "",
        "tgMesFctrId": ""
      },
      total: 0,
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
        url: process.env.VUE_APP_BASE_API + "/mes/pminnsmtnode/import"
      },

      // 表单校验
      rules: {
        nodeId: [
          { required: true, message: "编号不能为空", trigger: "blur" },
          { pattern: /^6[0-9]{5}$/, message: '范围在600000-699999', trigger: 'blur' }
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
        ],
        srMesFctrId: [
          { required: true, message: "源工厂未选择", trigger: "blur" }
        ],
        tgMesFctrId: [
          { required: true, message: "目的工厂未选择", trigger: "change" }
        ],
        srMtrlId: [
          { required: true, message: "源物料未选择", trigger: "blur" }
        ],
        tgMtrlId: [
          { required: true, message: "目的物料未选择", trigger: 'change' }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getOther();
  },
  watch: {
    "form.type": {
      handler: _.debounce(function (newValue) {
        this.srMtrlIdtitle = newValue == 1 ? "源物料" : "源节点";
        this.MtrlIdtitle = newValue == 1 ? "目的物料" : "目的节点";
        this.WLList = newValue == 1 ? this.getOther() : this.getEnergy();
      }, 500),  // 设置防抖时间，单位为毫秒
    },
  },
  methods: {
    getOther() {

      //源物料
      this.$api.i_mtrAllList().then(res => {
        let WL = res.data.map(e => {
          return {
            label: e.name,
            value: e.id
          }
        })
        this.WLList = WL
      })
      //源工厂
      this.$api.i_MESFactoryAllList().then(res => {
        this.YGCtype = res.data.map(e => {
          return {
            label: e.mesFctrName,
            value: e.mesFctrId
          }
        })
      })
    },
    getEnergy() {
      // i_QueyrEnergyNodeAllList // 全部节点
      this.$api.i_QueyrEnergyNodeAllList().then(res => {
        let qu = res.data.map(e => {
          return {
            label: e.nodeName,
            value: e.id
          }
        })
        this.WLList = qu
      })
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      this.$api.i_QueyrPminnsmtnodeList(this.queryParams).then(response => {
        this.tableData = response.rows.map(e => {
          return {
            ...e,
            useFlag: String(e.useFlag)
          }
        })
        this.total = response.total;
        this.loading = false;
      }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        type: '1',
        "isdes": "0",//能源物料
        "arbiFor": "", // 仲裁公式
        "des": "", // 备注说明
        "displayOrder": "1000", // 显示顺序
        "nodeAlias": "", // 节点别名
        "nodeCode": "", // 编码
        "nodeId": "", // 编号
        "nodeName": "", // 节点名称
        "pres": 100, // 精度
        "srMesFctrId": "", // 	源MES工厂
        "srMtrlId": "", // 源物料ID
        "tgMesFctrId": "", // 目的MES工厂
        "tgMtrlId": "", // 目的物料ID
        "useFlag": "1",//启用标识 1启用 0不启用
        "tgFormula": "", // 目的计量公式
        "srFormula": "", // 源计量公式
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery: _.debounce(function () {
      this.queryParams.pageNum = 1;
      this.getList();
    }, 1000),
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.deptId = undefined;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.nodeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.formType = 'add'
      this.open = true;
      this.title = "增加信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.formType = 'edit'
      const userId = row.nodeId || this.ids[0];
      this.$api.i_pminnsmtnodeByid({ nodeId: userId }).then(response => {
        this.form = response.data;
        this.form.useFlag = String(response.data.useFlag)
        this.open = true;
        this.title = "修改信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formType == 'add') {
            this.$api.i_PminnsmtNodeSave({
              "arbiFor": this.form.arbiFor,
              "des": this.form.des,
              "displayOrder": this.form.displayOrder,
              "nodeAlias": this.form.nodeAlias,
              "nodeCode": this.form.nodeCode,
              "nodeId": this.form.nodeId,
              "nodeName": this.form.nodeName,
              "pres": this.form.pres,
              "srFormula": this.form.srFormula,
              "srMesFctrId": this.form.srMesFctrId,
              "srMtrlId": this.form.srMtrlId,
              "srRankId": this.form.srRankId,
              "tgFormula": this.form.tgFormula,
              "tgMesFctrId": this.form.tgMesFctrId,
              "tgMtrlId": this.form.tgMtrlId,
              "tgRankId": this.form.tgRankId,
              "type": this.form.type,
              "useFlag": this.form.useFlag,
            }).then((res) => {
              if (res.code == 200) {
                console.log('接口成功', res)
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "新增互供点数据成功"
                });
                this.getList()
                this.cancel()
              } else {
                console.log(`接口成功,但接口状态=${res.code}`, res)
              }
            })
              .catch((err) => {
                console.log('接口失败', err)
              })
          } else {
            this.$api.i_PminnsmtNodeUpdate({
              "arbiFor": this.form.arbiFor,
              "des": this.form.des,
              "displayOrder": this.form.displayOrder,
              "nodeAlias": this.form.nodeAlias,
              "nodeCode": this.form.nodeCode,
              "nodeId": this.form.nodeId,
              "nodeName": this.form.nodeName,
              "pres": this.form.pres,
              "srFormula": this.form.srFormula,
              "srMesFctrId": this.form.srMesFctrId,
              "srMtrlId": this.form.srMtrlId,
              "srRankId": this.form.srRankId,
              "tgFormula": this.form.tgFormula,
              "tgMesFctrId": this.form.tgMesFctrId,
              "tgMtrlId": this.form.tgMtrlId,
              "tgRankId": this.form.tgRankId,
              "type": this.form.type,
              "useFlag": this.form.useFlag,
            }).then((res) => {
              if (res.code == 200) {
                console.log('接口成功', res)
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "修改互供点数据成功"
                });
                this.getList()
                this.cancel()
              } else {
                console.log(`接口成功,但接口状态=${res.code}`, res)
              }
            })
              .catch((err) => {
                console.log('接口失败', err)
              })
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.nodeId || this.ids[0];
      console.log(userIds);
      this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
        return this.$api.i_PminnsmtNodeDel({ nodeIds: [userIds] })
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('mes/pminnsmtnode/export', {
        ...this.queryParams
      }, `互供点_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('mes/pminnsmtnode/export', {
      }, `互供点_${new Date().getTime()}.xlsx`)
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
    }
  }
};
</script>
