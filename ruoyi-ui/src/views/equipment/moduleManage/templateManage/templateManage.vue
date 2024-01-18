<template>
  <div class="app-container">
    <el-form :model="queryParams2" ref="queryForm" :inline="true">
      <el-form-item label="模板类型:">
        <el-select
          v-model="queryParams2.modelType"
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="(dict) in templateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" size="mini" @click="query">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="success" :disabled="selectedRow == null" @click="handleExport" >导出打印</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-table v-loading="tableLoading" :data="tableData"
                  highlight-current-row v-model="selectedRow" :current-row-key="radio" @row-click="handleRowClick">
          <el-table-column label="" width="55" align="center">
            <template slot-scope="scope">
              <el-radio
                :label="scope.$index"
                v-model="radio">{{ ' ' }}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="80" align="center" type="index"/>
          <el-table-column label="模板编号" align="center" prop="code" :show-overflow-tooltip="true"/>
          <el-table-column label="模板名称" align="center" prop="name" :show-overflow-tooltip="true"/>
          <el-table-column label="创建时间" align="center" prop="time" width="180">
            <template slot-scope="scope">
              <span>{{ dayjs(scope.row.time).format('YYYY-MM-DD HH:mm') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板描述" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
<!--              <span>{{ queryParams.modelType |typeFilter }}</span>-->
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
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
      </el-col>
      <el-col :span="10" class="flex align-start justify-center"
              style="height: 70vh;overflow-y: scroll">
        <!--设备保养-->
        <conserve-template v-if="excelData!=null && pageType == 'conserve'" :excelData="excelData"></conserve-template>
        <!--设维修养-->
        <maintenance-template v-if="excelData!=null && pageType == 'maintenance'" :excelData="excelData"></maintenance-template>
        <!--设备故障-->
        <fault-template v-if="excelData!=null && pageType == 'fault'" :excelData="excelData"></fault-template>
      </el-col>
    </el-row>
    <!--设备保养excel表格-->


  </div>
</template>

<script>
import {listType, getType, delType, addType, updateType, exportType, clearCache} from '@/api/system/dict/type'
import tableSearchPaginationMixin from "@/views/equipment/mixins/tableSearchPagination";
import conserveTemplate from "@/views/equipment/moduleManage/templateManage/conserveTemplate";
import maintenanceTemplate from "@/views/equipment/moduleManage/templateManage/maintenanceTemplate";
import faultTemplate from "@/views/equipment/moduleManage/templateManage/faultTemplate";

export default {
  name: 'templateExport',
  mixins: [tableSearchPaginationMixin],
  filters: {
    typeFilter(val) {
      let desc = ''
      switch (val) {
        case 'inspection': //巡检记录
          desc = '巡检记录模板'
          break;
        case 'conserve'://保养记录
          desc = '保养记录模板'
          break;
        case 'maintenance'://维修记录
          desc = '维修记录模板'
          break;
        case 'fault'://设备故障
          desc = '设备故障模板'
          break;
        default:
          desc = '保养记录模板'
          break;
      }
      return desc
    }
  },
  data() {
    return {
      // 选中数组
      ids: [],
      // 模板类型数据字典
      templateOptions: [],
      selectedRow: null,
      radio: -1,
      excelData: null,//excel数据
      pageType:'conserve',//inspection 巡检记录  conserve 保养记录  maintenance 维修记录  fault 设备故障
      queryParams2:{
        modelType:'conserve'
      }
    }
  },
  components: {
    conserveTemplate,
    maintenanceTemplate,
    faultTemplate
  },
  created() {
    this.getTableData()
    this.getOtherData()
  },
  methods: {
    /** 查询列表 */
    getTableData() {
      let option = this.queryParams2.modelType;
      this.tableLoading = true;
      this.radio = -1
      this.excelData = null
      this.selectedRow = null
      switch (option) {
        case 'inspection': //巡检记录
          this.pageType = 'inspection';
          this.getInspectionList();
          break;
        case 'conserve'://保养记录
          this.pageType = 'conserve';
          this.getConserve();
          break;
        case 'maintenance'://维修记录
          this.pageType = 'maintenance';
          this.getmaintenance();
          break;
        case 'fault'://设备故障
          this.pageType = 'fault';
          this.getfaultList();
          break;
        default:
          console.log('进入default')
          this.pageType = 'conserve';
          this.getConserve();
          break;
      }

    },
    //巡检记录
    getInspectionList() {
      console.log('获取巡检记录')
      this.tableData = []
      this.pagination.total = 0
      this.tableLoading = false
    },
    //保养记录
    getConserve() {
      this.$api.getMaintenanceTasksList1({
          ...{
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.pageSize,
            status: 7
          },
        }
      ).then((res) => {
        if (res.code == 200) {
          console.log('养记录接口成功', res)
          this.pagination.total = res.total
          this.tableLoading = false
          let rows = res.rows
          this.tableData = rows.map((item) => {
            return {
              code: item.id,
              name: item.planName,
              time: item.planStartTime,
              remark: item.remark,
            }
          })

        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //维修记录
    getmaintenance() {
      this.$api
        .WXAll({
          ...{
            workStatus: 6
          },
          ...this.pagination
        })
        .then((res) => {
          if (res.code == 200) {
            console.log('维修记录接口成功', res)
            this.pagination.total = res.total
            this.tableLoading = false
            let rows = res.rows
            this.tableData = rows.map((item) => {
              return {
                code: item.facilityId,
                name: item.facilityName,
                time: item.repairsStartTime,
                remark: item.remark,
              }
            })
          }
        })
        .catch((e) => {
          console.log(e, "数据获取失败");
        });
    },
    //设备故障
    getfaultList() {
      this.$api
        .WXAll({
          ...this.pagination
        })
        .then((res) => {
          if (res.code == 200) {
            console.log('维修记录接口成功', res)
            this.pagination.total = res.total
            this.tableLoading = false
            let rows = res.rows
            this.tableData = rows.map((item) => {
              return {
                code: item.facilityId,
                name: item.facilityName,
                time: item.repairsStartTime,
                remark: item.remark,
              }
            })
          }
        })
        .catch((e) => {
          console.log(e, "数据获取失败");
        });
    },
    /*获取其他数据*/
    getOtherData() {
      this.getDicts('template_export').then(response => {
        this.templateOptions = response.data

      })
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    //单选 赋值
    handleRowClick: _.debounce(function (row, column, event) {
      this.selectedRow = row;
      let index = this.tableData.findIndex(item => item.code == row.code)
      if (this.radio != index) {
        this.radio = index
      }
      console.log('this.selectedRow = row;', this.selectedRow)
      // this.handleButtonClick()
      this.getRowDetail(row.code)
    }, 200),
    //获取模板详情
    getRowDetail(id) {
      let option = this.queryParams2.modelType;
      switch (option) {
        case 'inspection': //巡检记录
          this.getInspectionDetail(id);
          break;
        case 'conserve'://保养记录
          this.getConserveDetail(id);
          break;
        case 'maintenance'://维修记录
          this.getmaintenanceDetail(id);
          break;
        case 'fault'://设备故障
          this.getfaulDetail(id);
          break;
        default:
          console.log('进入default')
          this.getConserveDetail(id);
          break;
      }
    },
    //巡检记录详情
    getInspectionDetail() {

    },
    //保养数据详情
    getConserveDetail(id) {
      this.$api.maintainexportDeatil(id).then((res) => {
        if (res.code == 200) {
          console.log('保养数据详情接口成功', res)
          this.excelData = res.data
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //维修记录 详情
    getmaintenanceDetail(id) {
      this.$api.maintenanceDetail(id).then((res) => {
        if (res.code == 200) {
          console.log('维修记录 详情接口成功', res)
          this.excelData = res.data
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //设备故障详情
    getfaulDetail(id) {
      this.$api.faulDetail(id).then((res) => {
        if (res.code == 200) {
          console.log('设备故障详情接口成功', res)
          this.excelData = res.data
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //获取
    //测试文件下载
    // async handleButtonClick() {
    //   console.log('进入 handleButtonClick1')
    //   try {
    //     console.log('进入 handleButtonClick2')
    //     // 获取 XLSX 文件
    //     const response = await axios.get(process.env.VUE_APP_BASE_API + '/profile/download/设备保养记录表.xlsx', {responseType: 'arraybuffer'});
    //     let fileReader = new FileReader()
    //     fileReader.readAsArrayBuffer(response.data)
    //     fileReader.onload = () => {
    //       this.src = fileReader.result
    //     }
    //     const data = new Uint8Array(response.data);
    //     console.log('获取 XLSX 文件response', response)
    //     console.log('获取 XLSX 文件data', data)
    //
    //     // 修改数据
    //     // const workbook = XLSX.read(data, { type: 'array' });
    //     // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //     // const rows = XLSX.utils.sheet_to_json(worksheet);
    //     // console.log('获取 XLSX workbook',workbook)
    //     // console.log('获取 XLSX worksheet',worksheet)
    //     // console.log('获取 XLSX rows',rows)
    //     // rows.forEach((row) => {
    //     //   row['New Column'] = 'New Value';
    //     // });
    //     //
    //     //
    //     // // 生成新的 XSLX 文件
    //     // const newWorkbook = XLSX.utils.book_new();
    //     // const newWorksheet = XLSX.utils.json_to_sheet(rows);
    //     // XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, worksheet.name);
    //     //
    //     // // 将新文件转换为 Blob 对象
    //     // const newFileData = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    //     // const newFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //     // const blob = new Blob([newFileData], { type: newFileType });
    //     //
    //     // // 下载文件
    //     // const link = document.createElement('a');
    //     // link.href = URL.createObjectURL(blob);
    //     // link.download = 'new-file.xlsx';
    //     // link.click();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    /** 导出按钮操作 */
    handleExport() {
      this.$confirm('是否确认导出所选模板?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          switch (this.pageType){
            //inspection 巡检记录  conserve 保养记录  maintenance 维修记录  fault 设备故障
            case 'conserve' :
              this.$api.conservePortName(this.selectedRow.code).then((res) => {
                if (res.code == 200) {
                  console.log('接口成功', res)
                  this.download(res.msg)
                } else {
                  console.log(`接口成功,但接口状态=${res.code}`, res)
                }
              })
              break
            case 'maintenance' :
              this.$api.maintainexPortName(this.selectedRow.code).then((res) => {
                if (res.code == 200) {
                  console.log('接口成功', res)
                  this.download(res.msg)
                } else {
                  console.log(`接口成功,但接口状态=${res.code}`, res)
                }
              })
              break
            case 'fault' :
              this.$api.faultPortName(this.selectedRow.code).then((res) => {
                if (res.code == 200) {
                  console.log('接口成功', res)
                  this.download(res.msg)
                } else {
                  console.log(`接口成功,但接口状态=${res.code}`, res)
                }
              })
              break
          }

        })
        .catch((err) => {
          console.log('接口失败', err)
        })

    },
  }
}
</script>
<style lang="scss" scoped>
.pagination-container ::v-deep .el-pagination {
  left: 0;
}

.table-box {
  border-spacing: 0;
}

.t-center {
  text-align: center;
}

.t-border {
  border: 1px solid #000;
}

td, tr {
  padding: 10px 20px;
}
</style>
