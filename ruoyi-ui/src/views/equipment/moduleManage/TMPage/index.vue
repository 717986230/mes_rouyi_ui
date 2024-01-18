<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="计划名称:" prop="planName">
        <el-input
          v-model="queryParams.planName"
          placeholder="请输入计划名称"
          clearable
          size="small"
          style="width: 170px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称:" prop="deviceName">
        <el-input
          v-model="queryParams.deviceName"
          placeholder="请输入设备名称"
          clearable
          size="small"
          style="width: 170px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划时间:">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 200px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="选择年月:">
        <div class="block">
          <el-date-picker
            v-model="dateRange2"
            type="month"
            placeholder="选择年月"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleQuery"
          >查询</el-button
        >
        <el-button type="primary" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      border
      style="margin-bottom: 20px"
      :data="tableData"
      :row-key="generateRowKey"
      :expand-row-keys="tableData.map((item) => item.inspectionId)"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 子表格内容 -->
          <el-table
            @selection-change="handleSelectionChange"
            :data="scope.row.exportQueryVOS"
            style="width: 100%"
            border
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              prop="planName"
              label="计划名称"
              align="center"
            ></el-table-column>
            <el-table-column prop="planModle" label="计划类型" align="center">
              <template v-slot="scope">
                {{
                  scope.row.planModle == "1"
                    ? "电器类任务巡检"
                    : "机械类任务巡检"
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="beginTime"
              label="计划开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="计划结束时间"
              align="center"
            ></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="maintenanceName"
        label="设备名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="useDept"
        label="使用班组"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="engineer"
        label="主管工程师"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        prop="maintainTime"
        width="170px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleLook(scope)"
            >预览</el-button
          >
          <el-button type="primary" size="mini" @click="handleExport(scope)"
            >打印</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--设备保养-->
    <el-dialog width="100%" :visible="showPopup" @close="handlePopupClose">
      <TemplatePage :excelData="LOOKlist"></TemplatePage>
    </el-dialog>
  </div>
</template>

<script>
import TemplatePage from "./TemplatePage.vue";
import {
  listType,
  getType,
  delType,
  addType,
  updateType,
  exportType,
  clearCache,
} from "@/api/system/dict/type";
import dayjs from "dayjs";
export default {
  name: "TMPage",
  components: { TemplatePage },
  data() {
    const currentDate = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(currentDate.getDate() - 1);
    return {
      showPopup: false,

      tableData: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      dateRange2: "", //选择年月
      // 日期范围
      dateRange: [oneDayAgo, currentDate],
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      queryParams: {
        deviceEndTime: "",
        deviceName: "",
        planName: "",
        planStartTime: "",
      },
      LOOKlist: [],
      LOOKlistName: [],
      dislist: [], //选择的数组对象  一个电器一个机械
    };
  },
  computed: {},
  created() {
    this.getTableData();
    //任务类型字典值
    this.getDicts("maintain_task_status").then((response) => {
      console.log("计划状态 字典=", response);
      this.statusOptions = response.data;
    });
  },
  methods: {
    handleLook(scope) {
      if (this.ids.length == 2) {
        let is1 = this.dislist[0].planModle !== this.dislist[1].planModle;
        let engineer = scope.row.engineer;
        if (is1) {
          this.getLookDate(engineer);
          this.showPopup = true;
        } else {
          this.showPopup = false;
          this.$message.warning("选择有误，请检查选中项");
        }
      } else {
        this.$message.error("请勾选预览条目,注:(电气类和机械类任务各一条)");
      }
    },
    handlePopupClose() {
      this.showPopup = false;
    },
    generateRowKey(row) {
      // Return a unique key for the row
      // For example, return row.id if you have an id field in your data
      return row.id;
    },
    getDowName() {
      this.$api
        .MBexportName({
          electricalPlanId: dqid,
          engineer: engineer,
          machineryPlanId: jxid,
          month: month,
          year: year,
        })
        .then((res) => {
          if (res.code === 200) {
            this.LOOKlistName = res.data;
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    getLookDate(engineer) {
      let year;
      let month;
      if (this.dateRange2) {
        let date = new Date(this.dateRange2);
        year = date.getFullYear() + "";
        month = date.getMonth() + 1 + "";
      } else {
        year = "";
        month = "";
      }
      let dqid, jxid;

      try {
        if (this.dislist.length == 2) {
          dqid = this.dislist.find((e) => e.planModle == "1").inspectionId;
          jxid = this.dislist.find((e) => e.planModle == "0").inspectionId;
        } else {
          dqid = "";
          jxid = "";
        }
      } catch (error) {}

      this.$api
        .MBexport({
          electricalPlanId: dqid,
          engineer: engineer,
          machineryPlanId: jxid,
          month: month,
          year: year,
        })
        .then((res) => {
          if (res.code === 200) {
            this.LOOKlist = res.data;
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    handleExpandChange() {},
    /** 查列表 */
    getTableData() {
      //补0  的方法
      // let paddedMonth = String(month).padStart(2, "0");
      let [startTime, endTime] = this.dateRange;
      endTime = dayjs(endTime).format("YYYY-MM-DD");
      startTime = dayjs(startTime).format("YYYY-MM-DD");

      this.$api
        .MBexportQuery({
          deviceEndTime: endTime,
          deviceName: this.queryParams.deviceName,
          planName: this.queryParams.planName,
          planStartTime: startTime,
        })
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data;
            this.pagination.total = res.total;
            this.tableLoading = false;
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getTableData();
      this.getLookDate();
    },
    /** 重置按钮操作 */
    resetQuery() {
      const currentDate = new Date();
      const oneDayAgo = new Date();
      oneDayAgo.setDate(currentDate.getDate() - 1);
      this.queryParams = {
        deviceEndTime: "",
        deviceName: "",
        planName: "",
        planStartTime: "",
      };

      this.dateRange = [oneDayAgo, currentDate];
      this.dateRange2 = "";
      this.handleQuery();
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.dislist = selection;
      console.log(this.dislist);
      this.ids = selection.map((item) => item.inspectionId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    //导出
    handleExport(scope) {
      let engineer = scope.row.engineer;
      let year;
      let month;
      if (this.dateRange2) {
        let date = new Date(this.dateRange2);
        year = date.getFullYear() + "";
        month = date.getMonth() + 1 + "";
      } else {
        year = "";
        month = "";
      }
      let dqid, jxid;
      try {
        if (this.dislist.length == 2) {
          dqid = this.dislist.find((e) => e.planModle == "1").inspectionId;
          jxid = this.dislist.find((e) => e.planModle == "0").inspectionId;
          this.$confirm("是否确认导出所选模板?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$api
                .MBexportName({
                  electricalPlanId: dqid,
                  engineer: engineer,
                  machineryPlanId: jxid,
                  month: month,
                  year: year,
                })
                .then((res) => {
                  if (res.code == 200) {
                    console.log("接口成功", res);
                    this.download(res.msg);
                  } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res);
                  }
                });
            })
            .catch((err) => {
              console.log("接口失败", err);
            });
        } else {
          dqid = "";
          jxid = "";
          this.$message.warning("请检查选中的打印项!")
        }
      } catch (error) {}
    },
    /** 清理缓存按钮操作 */
    handleClearCache() {
      clearCache().then((response) => {
        this.msgSuccess("清理成功");
      });
    },
  },
};
</script>
<style scoped></style>
