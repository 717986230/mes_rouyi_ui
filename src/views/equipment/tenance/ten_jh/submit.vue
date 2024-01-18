<template>
  <div class="submit-container flex justify-center">
    <el-form
      ref="tenanceForm"
      :model="tenanceForm"
      :rules="tenancerules"
      label-width="150px"
      style="width: 60%"
    >
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
                    placeholder="请输入计划名称"
                    v-model="tenanceForm.planName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划开始时间：" prop="planStartTime">
                  <el-date-picker
                    :disabled="isSubmit"
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
                    :disabled="isSubmit"
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
                <el-form-item label="钳工：">
                  <el-input
                    :disabled="isSubmit"
                    v-model="tenanceForm.benchwork"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电工：">
                  <el-input
                    :disabled="isSubmit"
                    type="number"
                    v-model="tenanceForm.electrical"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="焊工：">
                  <el-input
                    :disabled="isSubmit"
                    type="number"
                    v-model="tenanceForm.welder"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他工种：">
                  <el-input
                    :disabled="isSubmit"
                    type="number"
                    v-model="tenanceForm.other"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="保养内容：" prop="maintenanceContent">
                  <el-input
                    :disabled="isSubmit"
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
                    :disabled="isSubmit"
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
              <span>保养人员</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="保养负责人：">
                  <el-select
                  filterable
                  :disabled="isSubmit"
                    v-model="tenanceForm.chargePersonId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in maintainPeople"
                      :key="index"
                      :label="item.nickName"
                      :value="item.userId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- <el-form-item label="负责工程师：">
                  <el-select
                   filterable
                    :disabled="isSubmit"
                    v-model="tenanceForm.engineerPersonId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in engineerList"
                      :key="index"
                      :label="item.nickName"
                      :value="item.userId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="负责工程师：" prop="tableName">
                  <el-input
                    v-if="isCreate"
                    disabled
                    v-model="$store.state.user.nickName"
                  />
                  <el-input
                    v-else
                    disabled
                    v-model="tenanceForm.engineerPersonName"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="计划提报人：" prop="tableName">
                  <el-input
                    v-if="isCreate"
                    disabled
                    v-model="$store.state.user.nickName"
                  />
                  <el-input
                    v-else
                    disabled
                    v-model="tenanceForm.createUserName"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>涉及设备</span>
            </div>
            <el-row style="height: 400px; width: 100%; overflow: auto">
              <el-col :span="24">
                <el-form-item label="涉及设备：">
                  <el-tree
                    ref="tree"
                    :data="equipmentTreeList"
                    show-checkbox
                    accordion
                    node-key="id"
                    :default-checked-keys="checkedKeys"
                    @check="handleCheck2"
                  />
                  <!--                  <el-tree ref="tree" :data="equipmentList" node-key="label"-->
                  <!--                           show-checkbox @check-change="handleCheckChange"></el-tree>-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>设备明细</span>
            </div>
            <el-table
              ref="singleTable"
              :data="equipmentDetailList"
              highlight-current-row
            >
              <el-table-column type="index" label="序号" width="50">
              </el-table-column>
              <el-table-column property="equipmentName" label="设备名称">
              </el-table-column>
              <el-table-column property="equipmentNumber" label="设备编号">
              </el-table-column>
              <el-table-column property="model" label="规格型号">
              </el-table-column>
              <el-table-column property="pname" label="关联设备">
              </el-table-column>
              <!--              <el-table-column fixed="right" label="操作" width="120">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-button-->
              <!--                    :disabled="isSubmit"-->
              <!--                    type="danger"-->
              <!--                    @click.native.prevent="-->
              <!--                      deleteRow(scope.$index, equipmentDetailList)-->
              <!--                    "-->
              <!--                    round-->
              <!--                    >删除</el-button-->
              <!--                  >-->
              <!--                </template>-->
              <!--              </el-table-column>-->
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="foot-btn flex justify-center align-center">
        <el-col :span="24" class="flex justify-center align-center">
          <el-form-item>
            <el-button
              v-hasPermi="['equipment:maintenance:add']"
              :disabled="isPreserve"
              type="primary"
              @click="onSubmit(0)"
              >保存
            </el-button>
            <el-button
              v-hasPermi="['equipment:maintenance:add']"
              :disabled="isPreserve && isSubmit"
              type="success"
              @click="onSubmit(1)"
              >保存并提交
            </el-button>
            <el-button @click="onCancel()"
              >{{ isCreate ? "取消" : "关闭" }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import dayjs from "dayjs";

export default {
  name: "submit",
  data() {
    return {
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      tenanceForm: {
        status: 0,
        planName: "",
        planStartTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
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
      equipmentList: [], //设备列表
      equipmentDetailList: [], //设备明细列表
      maintainPeople: [], //人员列表
      engineerList: [], //工程师列表
      isCreate: false, //是否是新增页面
      isPreserve: false, //是否保存完成
      isSubmit: false, //是否提交完成
      equipmentTreeList: [], //设备列表
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkedKeys: [],
      lastKey: [],
      parentIdx: 0,
    };
  },
  mounted() {},
  created() {
    this.getEquipmentList(); //获取设备列表
    this.queryPersonList(); //获取人员列表
    //若是点击修改进入
    if (this.$route.name === "Submit/edit") {
      this.getTenanceDetail(this.$route.query.id); //获取保养计划详情
    } else {
      //新增
      this.isCreate = true;
      // this.tenanceForm.createUser = this.$store.getters.name
    }
  },
  methods: {
    //获取设备列表
    getEquipmentList() {
      this.$api
        .getEquipmentTreeList()
        .then((res) => {
          if (res.code == 200) {
            console.log("获取设备列表树接口成功", res);
            let treeList = res.data;
            this.updateField(treeList);
            console.log("递归调用 增加组件所需参数", treeList);
            //递归调用 增加组件所需参数
            this.equipmentTreeList = treeList;
          } else {
            console.log(`获取设备列表树接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("获取设备列表树接口失败", err);
        });
    },
    //递归调用 增加组件所需参数
    updateField(obj) {
      if (typeof obj === "object" && obj !== null) {
        if ("maintenanceName" in obj) {
          obj.equipmentName = obj.maintenanceName;
          obj.equipmentNumber = obj.maintenanceCode;
          obj.id = obj.maintenanceId;
          obj.model = obj.specification;
          obj.pid = obj.pid;
          obj.label = obj.maintenanceName;
          obj.children = obj.childList;
          if (obj.pid == "0") {
            obj.pid = "parent" + this.parentIdx;
            this.parentIdx++;
          }
          delete obj.maintenanceId;
          delete obj.childList;
        }
        for (let key in obj) {
          this.updateField(obj[key]);
        }
      }
    },
    //获取人员列表
    queryPersonList() {
      this.$api
        .queryPersonList()
        .then((res) => {
          if (res.code == 200) {
            console.log("获取获取人员列表接口成功", res);
            this.engineerList = _.cloneDeep(res.rows).filter((item) => {
              return item.roles.some((r) => r.roleKey == "engineer");
            });
            this.maintainPeople = _.cloneDeep(res.rows).filter((item) => {
              return item.roles.some((r) => r.roleKey == "maintainPlanExecute");
            });
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
            this.equipmentDetailList = _.cloneDeep(res.data.equipmentEntities);
            this.handleCheck();
            this.isPreserve = res.data.statusId == 0 ? false : true;
            this.checkedKeys = res.data.equipmentIdS || [];
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
    //树结构选择
    handleCheckChange(data, checked, indeterminate) {
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      const childNodes = [];
      console.log("checkedNodes", checkedNodes);
      checkedNodes.forEach((node) => {
        if (!node.children) {
          childNodes.push(node);
        } else {
          // 过滤出所有子节点
          node.children.forEach((child) => {
            if (child.checked) {
              childNodes.push(child);
            }
          });
        }
      });
      console.log(childNodes);
      this.equipmentDetailList = childNodes;
    },
    //树结构回显
    handleCheck() {
      console.log("checkedLabels", this.equipmentDetailList);
      const checkedLabels = this.equipmentDetailList.map(
        (node) => node.equipmentName
      );
      console.log("checkedLabels", checkedLabels);
      this.$refs.tree.setCheckedKeys(checkedLabels, true, true);
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
        this.$message.success("保存成功");
        this.$router.go(-1);
        return;
      try {
        await this.$refs["tenanceForm"].validate();
        console.log(this.tenanceForm);
        let formData = this.tenanceForm;
        formData.status = status;
        formData.equipment = this.equipmentDetailList;
        // formData.engineerPerson = formData.engineerPersonId;
        formData.chargePerson = formData.chargePersonId;
        if(this.equipmentDetailList.length<=0)
        {
          this.$message({
            type:"info",
            message:"请选择所涉及到的设备"
          })
          return
        }
        this.$api
          .tenanceAdd(formData)
          .then((res) => {
            if (res.code == 200) {
              console.log("接口成功", res);
              this.$notify({
                title: "提示",
                message: `保养计划${formData.id ? "修改" : "创建"}成功`,
                duration: 1000,
              });
              this.isPreserve = true;
              this.isSubmit = status == 1 ? true : false;
              //发送订阅消息
              if(status == 1){
                this.sendMsg(res.data)
              }
              this.$router.go(-1);
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
    //发送订阅消息
    async sendMsg(param){
      //发送订阅消息
      let { equipmentName,area,createUserName,planStartTime,planEndTime } = param
      const res1 = await this.$api.SendMsgSubmit({
        msgType:'maintenance',
        type:'maintainPlanExecute',
        data:{
          "thing1": {
            "value": equipmentName||'-' //设备名称
          },
          "thing6": {
            "value": area||'-'  //区域
          },
          "thing13": {
            "value": createUserName+'创建'  //备注
          },
          "time7": {
            "value":  this.dayjs(planStartTime).format('YYYY-MM-DD HH:mm') + '~' + this.dayjs(planEndTime).format('YYYY-MM-DD HH:mm'),     //保养时间
          }
        }
      });
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
    //设备树状多选
    handleCheck2(data, node) {
      const { tree } = this.$refs;
      //当前选中的节点
      const nowCheckedNodes = node.checkedNodes;
      //当前选中的子节点
      const nowCheckedNodesChild = nowCheckedNodes.filter((item) => {
        return (
          !item.hasOwnProperty("children") ||
          item.children == undefined ||
          (item.children && item.children.length === 0)
        );
      });
      // 判断选中的子节点 是否是同级别下的
      let isOneClass = true;
      if (nowCheckedNodesChild.length > 1) {
        isOneClass = nowCheckedNodesChild.every((item) => {
          console.log(
            "item",
            item.pid == nowCheckedNodesChild[0].pid && item.pid != "0"
          );
          return item.pid == nowCheckedNodesChild[0].pid && item.pid != "0";
        });
      }

      if (!isOneClass) {
        this.$message({
          type: "error",
          message: "不可跨级选择设备",
        });
        tree.setCheckedKeys(this.lastKey);
      } else {
        this.lastKey = node.checkedKeys;
        if (node.checkedKeys.length > 0) {
          //新增逻辑 返回区域
          if(nowCheckedNodesChild.length == 1){
            // 如果==1条 返回当前id
            this.tenanceForm.equipmentId = nowCheckedNodesChild[0].id
          }else {
            //若多大于1条 返回父id
            this.tenanceForm.equipmentId = nowCheckedNodesChild[0].pid
          }
          this.equipmentDetailList = nowCheckedNodesChild;
          let allNodes = nowCheckedNodes.concat(node.halfCheckedNodes);
          let associatedDevices =
            nowCheckedNodesChild.length == 1
              ? nowCheckedNodesChild[0].pname
              : allNodes.filter((res) => {
                  return nowCheckedNodesChild[0].pid == res.id;
                })[0].maintenanceName || null;
          this.equipmentDetailList = nowCheckedNodesChild.map((item) => {
            return {
              ...item,
              ...{
                pname: associatedDevices,
              },
            };
          });
        } else {
          this.equipmentDetailList = [];
        }
      }
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
