<template>
  <div class="submit-container flex flex-direction align-center justify-center">
    <el-form
      ref="tenanceForm"
      :model="tenanceForm"
      :rules="tenancerules"
      label-width="150px"
      style="width: 60%"
    >
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card style="position: relative">
            <el-row>
              <el-col :sapn="24" class="flex align-center">
                <svg
                  style="margin-right: 10px"
                  t="1680244345903"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1092"
                  width="36"
                  height="36"
                >
                  <path
                    d="M802.194286 853.668571a87.497143 87.497143 0 0 1-10.148572 61.44L781.897143 932.571429a88.594286 88.594286 0 0 1-27.977143 29.622857l-67.748571 44.8a88.685714 88.685714 0 0 1-48.822858 14.72A88.685714 88.685714 0 0 1 548.571429 927.817143l4.845714-81.097143a89.508571 89.508571 0 0 1 11.702857-39.04l10.148571-17.645714a89.234286 89.234286 0 0 1 49.645715-39.862857 122.88 122.88 0 0 1 16-71.862858L853.12 310.857143V151.68A151.68 151.68 0 0 0 701.44 0H151.68A151.68 151.68 0 0 0 0 151.68v720.64A151.68 151.68 0 0 0 151.68 1024h549.76a151.68 151.68 0 0 0 151.68-151.68v-61.714286a122.88 122.88 0 0 1-50.925714 43.062857zM182.857143 204.251429h493.714286a36.571429 36.571429 0 0 1 0 73.142857H182.857143a36.571429 36.571429 0 0 1 0-73.142857z m225.737143 567.497142H182.857143a36.571429 36.571429 0 0 1 0-73.142857h225.737143a36.571429 36.571429 0 0 1 0 73.142857z m97.28-246.857142H182.857143a36.571429 36.571429 0 0 1 0-73.142858h323.017143a36.571429 36.571429 0 0 1 0 73.142858z"
                    p-id="1093"
                    fill="#1afa29"
                  />
                  <path
                    d="M999.68 310.857143l-3.291429-1.92a50.102857 50.102857 0 0 0-68.388571 18.285714l-223.542857 387.657143a50.102857 50.102857 0 0 0 18.285714 68.388571l3.2 1.828572a50.011429 50.011429 0 0 0 68.388572-18.285714l223.542857-387.2a50.102857 50.102857 0 0 0-18.194286-68.754286zM638.811429 826.605714l-10.148572 17.645715a14.902857 14.902857 0 0 0-2.011428 6.857142L621.714286 932.571429a15.542857 15.542857 0 0 0 24.137143 13.897142l67.84-44.708571a16.822857 16.822857 0 0 0 4.937142-5.76l10.148572-17.645714a15.634286 15.634286 0 0 0-5.76-21.302857l-62.902857-36.571429a15.634286 15.634286 0 0 0-21.302857 6.125714z"
                    p-id="1094"
                    fill="#1afa29"
                  />
                </svg>
                <h2>{{ tenanceForm.planName }}{{ tenanceForm.planNumber }}</h2>
              </el-col>
            </el-row>
            <el-descriptions>
              <el-descriptions-item label="计划提报人">{{
                tenanceForm.createUserName
              }}</el-descriptions-item>
              <el-descriptions-item label="保养负责人">{{
                tenanceForm.chargePersonName
              }}</el-descriptions-item>
              <el-descriptions-item label="保养工程师">{{
                tenanceForm.engineerPersonName
              }}</el-descriptions-item>
            </el-descriptions>
            <div class="svg-icon2">
              <type-box :text="text" :status="tenanceForm.statusId"></type-box>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>计划信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="计划编号：">
                  <el-input
                    disabled
                    placeholder="系统自动生成"
                    v-model="tenanceForm.id"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划名称：" prop="planName">
                  <el-input
                    disabled
                    placeholder="请输入计划名称"
                    v-model="tenanceForm.planName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划开始时间：" prop="planStartTime">
                  <el-date-picker
                    disabled
                    v-model="tenanceForm.planStartTime"
                    :picker-options="startDatePicker"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划结束时间" prop="planEndTime">
                  <el-date-picker
                    disabled
                    v-model="tenanceForm.planEndTime"
                    :picker-options="endDatePicker"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="钳工：" prop="benchwork">
                  <el-input disabled v-model="tenanceForm.benchwork">
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电工：" prop="electrical">
                  <el-input
                    disabled
                    type="number"
                    v-model="tenanceForm.electrical"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="焊工：" prop="welder">
                  <el-input disabled type="number" v-model="tenanceForm.welder">
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他工种：" prop="other">
                  <el-input disabled type="number" v-model="tenanceForm.other">
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="保养内容：" prop="maintenanceContent">
                  <el-input
                    disabled
                    placeholder="请输入保养内容"
                    type="textarea"
                    :rows="3"
                    v-model="tenanceForm.maintenanceContent"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                  <el-input
                    disabled
                    placeholder="请输入备注"
                    type="textarea"
                    :rows="3"
                    v-model="tenanceForm.remark"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>保养设备</span>
            </div>
            <el-table
              ref="singleTable"
              :data="equipmentDetailList"
              highlight-current-row
            >
              <el-table-column type="index" label="序号" width="50">
              </el-table-column>
              <el-table-column
                property="equipmentName"
                label="设备名称"
              >
              </el-table-column>
              <el-table-column
                property="equipmentNumber"
                label="设备编号"
              >
              </el-table-column>
              <el-table-column property="model" label="规格型号">
              </el-table-column>
              <el-table-column property="pname" label="关联设备">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="foot-btn flex justify-center align-center">
        <el-col :span="24" class="flex justify-center align-center">
          <el-form-item>
            <el-button @click="onCancel()">关闭</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import dayjs from "dayjs";
import TypeBox from "@/views/equipment/tenance/ten_rw/module/type-box";

export default {
  name: "detail",
  data() {
    return {
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      tenanceForm: {
        status: 0,
        planName: "",
        planStartTime: "",
        planEndTime: "",
        benchwork: 0,
        welder: 0,
        electrical: 0,
        other: 0,
        maintenanceContent: "",
        remark: "",
        chargePerson: "2",
        engineerPerson: "1",
        equipment: [
          {
            area: "",
            createTime: "",
            equipmentName: "",
            equipmentNumber: "",
            id: 0,
            model: "",
            pid: 0,
          },
        ],
      }, //设备form
      tenancerules: {
        planName: [
          { required: true, message: "请选择计划名称", trigger: "change" },
        ],
        planEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        planStartTime: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        benchwork: [
          { required: true, message: "请填写钳工人数", trigger: "change" },
        ],
        welder: [
          { required: true, message: "请填写焊工人数", trigger: "change" },
        ],
        electrical: [
          { required: true, message: "请填写电工人数", trigger: "change" },
        ],
        other: [
          { required: true, message: "请填写其他工种人数", trigger: "change" },
        ],
        maintenanceContent: [
          { required: true, message: "请填写保养内容", trigger: "change" },
        ],
        chargePerson: [
          { required: true, message: "请选择保养负责人", trigger: "change" },
        ],
        engineerPerson: [
          { required: true, message: "请选择负责工程师", trigger: "change" },
        ],
        equipmentName: [
          { required: true, message: "请选择设计设备", trigger: "change" },
        ],
      }, //表单验证规则
      equipmentDetailList: [], //设备明细列表
      maintainPeople: [], //人员列表
      engineerList: [], //工程师列表
      isCreate: false, //是否是新增页面
      isPreserve: false, //是否保存完成
      isSubmit: false, //是否提交完成
    };
  },
  mounted() {},
  components: {
    TypeBox,
  },
  computed: {
    //右上角状态图标文本
    text() {
      let text = "";
      switch (this.tenanceForm.statusId) {
        case 0:
          text = "未提交";
          break;
        case 1:
          text = "未认领";
          break;
        case 2:
          text = "保养中";
          break;
        case 3:
          text = "班长" + "\n" + "未确认";
          break;
        case 4:
          text = "未验收";
          break;
        case 5:
          text = "保养完成";
          break;
        case 6:
          text = "未抽检";
          break;
        case 7:
          text = "已抽检";
          break;
      }
      return text;
    },
  },
  created() {
    this.queryPersonList(); //获取人员列表
    this.getTenanceDetail(this.$route.query.id); //获取保养计划详情
  },
  methods: {
    //获取人员列表
    queryPersonList() {
      this.$api
        .queryPersonList()
        .then((res) => {
          if (res.code == 200) {
            console.log("获取获取人员列表接口成功", res);
            this.engineerList = _.cloneDeep(res.rows);
            this.maintainPeople = _.cloneDeep(res.rows);
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //获取保养计划详情
    getTenanceDetail(id) {
      this.$api
        .tenanceDetail({ id })
        .then((res) => {
          if (res.code == 200) {
            console.log("获取保养计划详情接口成功", res);
            this.tenanceForm = res.data;
            console.log(this.tenanceForm, " this.tenanceForm");
            this.equipmentDetailList = _.cloneDeep(res.data.equipmentEntities);
            this.isPreserve = res.data.statusId == 0 ? false : true;
          } else {
            console.log(`获取保养计划详情接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("获取保养计划详情接口失败", err);
        });
    },
    //设备选择 赋值设备详细
    selectEquipment(e) {
      let arr = [];
      let child = e.childList;
      let name = e.equipmentName;
      e.forEach((item) => {
        arr.push({
          ...item,
          ...{
            createTime: dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
          },
        });
      });
      console.log(arr);
      this.equipmentName = name;
      this.equipmentDetailList = arr;
    },
    //删除设备明细
    deleteRow(idx) {
      this.$confirm("是否确认删除选中的设备明细数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.equipmentDetailList.splice(idx, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //提交
    async onSubmit(status) {
      try {
        await this.$refs["tenanceForm"].validate();
        console.log(this.tenanceForm);
        let formData = this.tenanceForm;
        formData.status = status;
        formData.equipment = this.equipmentDetailList;
        formData.engineerPerson = formData.engineerPersonId;
        formData.chargePerson = formData.chargePersonId;
        this.$api
          .tenanceAdd(formData)
          .then((res) => {
            if (res.code == 200) {
              console.log("接口成功", res);
              this.$notify({
                title: "提示",
                message: "保养计划创建成功",
                duration: 1000,
              });
              this.isPreserve = true;
              this.isSubmit = status == 1 ? true : false;
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res);
            }
          })
          .catch((err) => {
            console.log("接口失败", err);
          });
      } catch (e) {
        console.log("提交发生错误", e);
        return;
      }
    },
    //取消
    onCancel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //设置起始时间不能大于结束时间1
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.tenanceForm.planEndTime) {
            //如果结束时间不为空，则小于结束时间
            return (
              new Date(self.tenanceForm.planEndTime).getTime() < time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },
    //设置起始时间不能大于结束时间2
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.tenanceForm.planStartTime) {
            //如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.tenanceForm.planStartTime).getTime() >
              time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.submit-container {
  padding-bottom: 80px;

  .foot-btn {
    z-index: 3;
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px #a0a8a0;
  }
}

::v-deep .el-form-item {
  .el-select,
  .el-input {
    width: 100%;
  }
}
::v-deep .foot-btn {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
