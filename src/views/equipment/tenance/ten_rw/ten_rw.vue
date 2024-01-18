<template>
  <div class="app-container">
    <div style="fontSize:20px;fontWeight: 700;marginBottom: 10px;"></div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width>
      <el-form-item label="保养任务名称:" prop="dictName">
        <el-input
          v-model="queryParams.planName"
          placeholder="请输保养任务名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--区域选择-->
      <select-area ref="selectAreaRef" @selectArea="selectAreaChange"></select-area>
      <el-form-item label="计划状态:" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择计划状态" clearable size="small" style="width: 240px">
          <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="实际时间:">
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
      <el-form-item label="关联设备:" prop="status">
        <el-input v-model="queryParams.area" placeholder="请输入关联设备名称" clearable size="small" style="width: 240px" />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" :disabled="btnAuth.btn1||single" @click="handleClaim" v-hasPermi="['equipment:maintenance:claim']">认领</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" :disabled="btnAuth.btn2||single" @click="handle" v-hasPermi="['equipment:maintenance:claim']">处理</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" :disabled="btnAuth.btn3||multiple" @click="handleYanShou" v-hasPermi="['equipment:maintenance:acceptance']">工程师验收</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" :disabled="btnAuth.btn4||multiple" @click="handleChouJian" v-hasPermi="['equipment:maintenance:check']">设备主管抽检</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getTableData"></right-toolbar>
    </el-row>

    <el-table v-loading="tableLoading" height="500" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column fixed label="序号" width="80" align="center" type="index" />
      <el-table-column fixed width="120" label="保养任务名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div :title="scope.row.planName" class="column-name" @click="handleToProcess(scope.row)">{{scope.row.planName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" width="150" align="center" prop="status" />
      <el-table-column label="是否逾期" width="150" align="center" prop="isOverdue" />
      <el-table-column label="保养内容" align="center" prop="maintenanceContent" :show-overflow-tooltip="true" width="120" />
      <el-table-column label="关联设备" width="150" align="center" prop="equipmentName" />
      <el-table-column label="钳工" align="center" prop="benchwork" :show-overflow-tooltip="true" />
      <el-table-column label="电工" align="center" prop="electrical" :show-overflow-tooltip="true" />
      <el-table-column label="焊工" align="center" prop="welder" :show-overflow-tooltip="true" />
      <el-table-column label="其他工种" width="120" align="center" prop="other" />
      <el-table-column label="计划开始时间" align="center" prop="planStartTime" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="计划结束时间" align="center" prop="planEndTime" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="实际开始时间" align="center" prop="realityStartTime" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="实际完成时间" align="center" prop="realityEndTime" :show-overflow-tooltip="true" width="180" />
      <el-table-column label="计划提报人" align="center" prop="createUserName" :show-overflow-tooltip="true" width="120" />
      <el-table-column label="负责人" align="center" prop="chargePersonName" :show-overflow-tooltip="true" width="120" />
      <el-table-column label="负责工程师" align="center" prop="engineerPersonName" :show-overflow-tooltip="true" width="120" />
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" width="180" />
    </el-table>
    <pagination
      v-show="pagination.total>0"
      :total="pagination.total"
      :page.sync="pagination.pageNum"
      :page-sizes="pagination.sizes"
      :limit.sync="pagination.pageSize"
      position="left"
      @pagination="getTableData"
    />
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listType, getType, delType, addType, updateType, exportType, clearCache } from '@/api/system/dict/type'
import { mapGetters } from 'vuex'
import tableSearchPaginationMixin from '@/views/equipment/mixins/tableSearchPagination.js'
import SelectArea from "@/views/equipment/common/SelectArea";

export default {
  name: 'Dict',
  mixins: [tableSearchPaginationMixin],
  components:{
    SelectArea
  },
  data() {
    return {
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
      // 字典表格数据
      typeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
        dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }]
      },
      //按钮权限
      btnAuth: {
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false
      }
    }
  },
  computed: {
    ...mapGetters(['areaList', 'areaStationList', 'stationList', 'userId'])
  },
  created() {
    console.log('区域列表', this.areaList)
    this.getTableData()
    this.getOtherData()
  },
  methods: {
    /** 查询字典类型列表 */
    getTableData(param = {}) {
      this.tableLoading = true
      this.$api
        .ten_rwList({
          ...{
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.pageSize
          },
          ...this.queryParams,
          ...param
        })
        .then(res => {
          if (res.code == 200) {
            console.log('接口成功', res)
            this.tableData = res.rows
            this.pagination.total = res.total
            this.tableLoading = false
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res)
          }
        })
        .catch(err => {
          console.log('接口失败', err)
        })
    },
    /*h获取其数据*/
    getOtherData() {
      //展示类型字典
      this.getDicts('maintain_task_status').then(response => {
        console.log('计划状态 字典=', response)
        this.statusOptions = response.data
      })
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        dictId: undefined,
        dictName: undefined,
        dictType: undefined,
        status: '0',
        remark: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      let queryParams = {
        ...this.queryParams,
        ...{
          planStartTime: this.dateRange[0] || '',
          planEndTime: this.dateRange[1] || ''
        }
      }
      this.getTableData(queryParams)
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm()
      this.handleQuery()
    },
    /*维修认领*/
    handleClaim() {
        this.$message({
            type: 'success',
            message: '保养任务认领成功'
        })
        return
      let nowData = this.tableData.filter(item => {
        //接收新数组
        return item.id == this.ids[0]
      })[0]
      console.log('认领数据', nowData)
      if (nowData.statusId != 1) {
        this.$message({
          type: 'warning',
          message: '该任务不可认领，请检查任务状态'
        })
        return false
      }
      //判断维修人员id 是否之当前人
      if (nowData.chargePersonId == this.userId || !nowData.chargePersonId) {
        console.log('当前维修人员可认领', this.userId)
        this.$api
          .TasksClaim({
            ...{
              planId: [nowData.id],
              status: 2
            },
            ...{
              chargePerson: this.userId
            }
          })
          .then(res => {
            if (res.code == 200) {
              console.log('任务认领接口成功', res)
              this.$message({
                type: 'success',
                message: '保养任务认领成功'
              })
              this.getTableData()
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res)
            }
          })
          .catch(err => {
            console.log('接口失败', err)
          })
      } else {
        this.$message({
          type: 'error',
          message: '指定保养负责人员，非当前登陆人'
        })
        return false
      }
    },
    //任务抽检
    handleSpotCheck() {
      let nowList = this.tableData.filter(item => {
        //接收新数组
        return item.id == this.ids[0] && item.statusId == 5
      })
      console.log('抽检数据', nowList)
      if (nowList.length == 0) {
        this.$message({
          type: 'warning',
          message: '该任务不可抽检，请检查任务状态'
        })
        return false
      } else {
        this.$api
          .TaskSpotCheck({
            planId: nowList[0].id,
            status: 6
          })
          .then(res => {
            if (res.code == 200) {
              console.log('接口成功', res)
              this.$message({
                type: 'success',
                message: '提交抽检成功'
              })
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res)
            }
          })
          .catch(err => {
            console.log('接口失败', err)
          })
      }
    },
    //保养处理
    handle() {
      let nowData = this.tableData.filter(item => {
        //接收新数组
        return item.id == this.ids[0]
      })[0]
      //只有未提交才能修改
      if (nowData.statusId !== 2 && nowData.statusId !== 3) {
        this.$message({
          type: 'error',
          message: '保养任务非处理状态'
        })
        return false
      }
      this.$router.push({
        path: '/equipment/ten_rw_process',
        query: {
          id: nowData.id,
          activeTab: 1
        }
      })
    },
    //工程师验收
    handleYanShou() {
      let nowList = this.tableData.filter((item, index) => {
        //接收新数组
        return this.ids.includes(item.id) && item.statusId == 4
      })
      if (nowList.length !== this.ids.length) {
        this.$message({
          type: 'warning',
          message: '任务不可验收，请检查任务状态'
        })
        return false
      } else {
        this.$api
          .TaskLeadCheck({
            planId: this.ids,
            remark: '合格',
            status: 5
          })
          .then(res => {
            if (res.code == 200) {
              console.log('接口成功', res)
              this.getTableData()
              this.$message({
                type: 'success',
                message: '工程师验收成功'
              })
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res)
            }
          })
          .catch(err => {
            console.log('接口失败', err)
          })
      }
    },
    //设备主管抽检
    handleChouJian() {
      let nowList = this.tableData.filter((item, index) => {
        //接收新数组
        return this.ids.includes(item.id) && item.statusId == 5
      })
      if (nowList.length !== this.ids.length) {
        this.$message({
          type: 'warning',
          message: '任务不可抽检，请检查任务状态'
        })
        return false
      } else {
        this.$api
          .TaskSpotCheck({
            planId: this.ids,
            remark: '合格',
            status: 7
          })
          .then(res => {
            if (res.code == 200) {
              console.log('接口成功', res)
              this.getTableData()
              this.$message({
                type: 'success',
                message: '设备主管抽检完成'
              })
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res)
            }
          })
          .catch(err => {
            console.log('接口失败', err)
          })
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加字典类型'
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
      //按钮是否禁用
      console.log('多选数据', selection)
      let btn1, btn2, btn3, btn4
      btn1 = !selection.every(item => item.statusId == 1) //认领
      btn2 = !selection.every(item => item.statusId == 2) //处理
      btn3 = !selection.every(item => item.statusId == 4) //工程师验收
      btn4 = !selection.every(item => item.statusId == 5) //领导抽检
      console.log('按钮点击权限', btn1, btn2, btn3, btn4)
      this.btnAuth = {
        btn1,
        btn2,
        btn3,
        btn4
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const dictId = row.dictId || this.ids
      getType(dictId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改字典类型'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.dictId != undefined) {
            updateType(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getTableData()
            })
          } else {
            addType(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getTableData()
            })
          }
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有类型数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return exportType(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
    },
    /** 清理缓存按钮操作 */
    handleClearCache() {
      clearCache().then(response => {
        this.msgSuccess('清理成功')
      })
    },
    handleToProcess(row) {
      console.log('row-=', row)
      let activeTab = 1
      switch (row.statusId) {
        case 1:
          activeTab = 0
          break
        case 2:
          activeTab = 1
          break
        case 3:
          activeTab = 2
          break
        case 4:
          activeTab = 3
          break
        case 5:
          activeTab = 4
          break
        case 6:
          activeTab = 4
          break
        case 7:
          activeTab = 5
          break
      }
      this.$router.push({
        path: '/equipment/ten_rw_process',
        query: {
          id: row.id,
          activeTab
        }
      })
    }
  }
}
</script>
<style scoped>
.pagination-container ::v-deep .el-pagination {
  left: 0;
}
.column-name {
  color: #00c6ff;
  cursor: pointer;
}
</style>
