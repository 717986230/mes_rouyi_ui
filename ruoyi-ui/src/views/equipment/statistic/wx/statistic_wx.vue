<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
      <el-row>
        <el-col :span="10">
          <el-form-item label="设备名称:" prop="facilityName">
            <el-input v-model="queryParams.facilityName" placeholder="请输入设备名称" clearable size="small"
              style="width: 240px" />
          </el-form-item>
          <el-form-item label="故障类型:" prop="faultStatus">
            <el-select v-model="queryParams.faultStatus" placeholder="故障类型" clearable size="small" style="width: 250px">
              <el-option v-for="dict in FaultStatus" :key="dict.dictValue" :label="dict.dictLabel"
                :value="dict.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="工单状态:" prop="status_wx">
            <el-select v-model="queryParams.status" placeholder="请选择工单状态" clearable size="small" style="width: 240px">
              <el-option v-for="dict in status_wx" :key="dict.dictValue" :label="dict.dictLabel"
                :value="dict.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="区域:" label-width="70px">
            <el-select style="width: 250px" v-model="queryParams.area" placeholder="请选择区域" clearable size="small"
              @change="areaChange($event, areaOptions)">
              <el-option v-for="(d, index) in areaOptions" :key="index" :label="d.label" :value="d.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="故障日期" class="flex align-center" label-width="100px">
            <el-date-picker style="width: 425px" v-model="dateRange" value-format="yyyy-MM-dd" type="daterange"
              :clearable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="工位" label-width="100px">
            <el-select style="width: 425px" v-model="queryParams.station" placeholder="请先选择区域" clearable size="small">
              <el-option v-for="(d, index) in statusOptions" :key="index" :label="d.postName" :value="d.postName" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询
            </el-button>
            <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" style="margin-top: 30px;">
      <el-row>统计结果</el-row>
      <el-row>
        <el-form-item label="工单数量合计:" prop="workOrders">
          <el-input v-model="formData.workOrders" :disabled="true" placeholder="" clearable size="small"
            style="width: 160px" />
        </el-form-item>
        <el-form-item label="故障时长合计:" prop="faultCount">
          <el-input v-model="formData.faultCount" :disabled="true" placeholder="" clearable size="small"
            style="width: 230px" />
        </el-form-item>
        <el-form-item label="维修时长合计:" prop="maintenanceCount">
          <el-input v-model="formData.maintenanceCount" :disabled="true" placeholder="" clearable size="small"
            style="width: 230px" />
        </el-form-item>
        <el-form-item label="更换零部件的工单数:" prop="partCount">
          <el-input v-model="formData.partCount" :disabled="true" placeholder="" clearable size="small"
            style="width: 160px" />
        </el-form-item>
        <el-form-item label="导致停线的工单数:" prop="lineStopOrders">
          <el-input v-model="formData.lineStopOrders" :disabled="true" placeholder="" clearable size="small"
            style="width: 160px" />
        </el-form-item>
      </el-row>
    </el-form>
    <div>详细信息</div>
    <el-table v-loading="tableLoading" :data="tableData" style="margin-top: 10px;">
      <el-table-column label="序号" align="center" type="index" width="50" />
      <el-table-column label="设备名称" align="center" prop="facilityName" />
      <el-table-column label="故障类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.faultStatus == 0 ? '机械故障' : '电气故障' }}
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center" prop="area" :show-overflow-tooltip="true" />
      <el-table-column label="工位" align="center" prop="station" :show-overflow-tooltip="true" />
      <el-table-column label="工单状态" align="center">
        <template slot-scope="scope">
          {{ (scope.row.workStatus == 5 || scope.row.workStatus == 6) ? '已完成' : '未完成' }}
        </template>
      </el-table-column>
      <el-table-column label="故障开始时间" align="center" prop="breakdownTime" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{
              dayjs(scope.row.breakdownTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="故障结束时间" align="center" prop="breakdownEndTime" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{
              dayjs(scope.row.breakdownEndTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="故障时长" align="center" prop="duration" />
      <el-table-column label="维修开始时间" align="center" prop="repairsStartTime" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{
              dayjs(scope.row.repairsStartTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="维修结束时间" align="center" prop="repairsEndTime" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{
              dayjs(scope.row.repairsEndTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="维修时长" align="center" prop="maintainTime" />
      <el-table-column label="是否停线" align="center">
        <template slot-scope="scope">
          {{ scope.row.whetherLineStop == 0 ? '是' : '否' }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :page-sizes="queryParams.sizes"
      :limit.sync="queryParams.pageSize" position="left" @pagination="getTableData" />
  </div>
</template>

<script>

export default {
  name: "statistic_wx",
  data() {
    const currentDate = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(currentDate.getDate() - 1);
    return {
      tableData: [],
      tableLoading: false,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      FaultStatus: [], //故障类型
      status_wx: [], //工单状态
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 汇总的四个数据
      formData: {},
      areaOptions: [], //区域下拉数据
      statusOptions: [], //工位下拉数据
      dateRange: [oneDayAgo, currentDate],
      queryParams: {
        "area": "",
        "facilityName": "",
        "faultStatus": "",
        "pageNum": 1,
        "pageSize": 10,
        'repairsStartTime': '',
        'repairsEndTime': '',
        "station": "",
        "status": null,
      }
    };
  },
  created() {
    const currentDate = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(currentDate.getDate() - 1);
    this.dateRange = [oneDayAgo, currentDate];
    this.getOtherData();
    this.getTableData();
  },
  methods: {
    /** 获取列表 */
    getTableData() {
      this.tableLoading = true;
      let [startTime, endTime] = this.dateRange;
      this.$api
        .getStatisticFacilityAll(
          {
            ...this.queryParams,
            repairsStartTime: startTime,
            repairsEndTime: endTime
          }
        )
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.facilityMaintainlist;
            this.total = res.data.total;
            this.formData = res.data;
            this.tableLoading = false;
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
          this.tableLoading = false;
        });
    },
    //获取页面其他数据
    getOtherData() {
      //获取故障类型Fault_Status
      this.getDicts("Fault_Status").then((response) => {
        this.FaultStatus = response.data.map((item) => {
          return {
            ...item,
            ...{
              dictValue: Number(item.dictValue),
            },
          };
        });
      });
      //获取工单状态status_wx
      this.getDicts("status_wx").then((response) => {
        this.status_wx = response.data.map((item) => {
          return {
            ...item,
            ...{
              dictValue: Number(item.dictValue),
            },
          };
        });
      });
      //区域字典值 和 工位数据
      this.$api
        .TEselPostAreas()
        .then((res) => {
          if (res.code == 200) {
            console.log("区域字典值 和 工位数据接口成功", res);
            let list = res.data;
            for (const [key, value] of Object.entries(list)) {
              this.areaOptions.push({
                label: key,
                value: key,
                child: value,
              });
            }
          } else {
            console.log(
              `区域字典值 和 工位数据接口成功,但接口状态=${res.code}`,
              res
            );
          }
        })
        .catch((err) => {
          console.log("区域字典值 和 工位数据接口失败", err);
        });

    },
    //区域选择
    areaChange(e, list) {
      this.statusOptions = list.filter((item) => {
        return item.label == e;
      })[0].child;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getTableData();
    },

    /** 导出按钮操作 */
    handleExport() {
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        return this.$api.DCExport(
          this.queryParams
        )
      }).then(response => {
        console.log('response', response)
        this.download(response.msg);
      })
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 11px !important;
  margin-top: 11px !important;
}
</style>
