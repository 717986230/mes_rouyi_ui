<template>
  <div class="p-container flex flex-direction align-center justify-center">
    <div style="width: 60%">
      <!--    头部-->
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card style="position: relative">
            <el-row>
              <el-col
                :sapn="24"
                class="flex align-center"
                style="position: relative"
              >
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
                <h2>{{ tasksDeatilForm.planName }}</h2>
              </el-col>
            </el-row>
            <el-descriptions>
              <el-descriptions-item label="日期">{{
                  dayjs(tasksDeatilForm.jobTime).format('YYYY年MM月DD日')
                }}
              </el-descriptions-item>
              <el-descriptions-item label="区域">{{
                  tasksDeatilForm.area
                }}
              </el-descriptions-item>
              <el-descriptions-item label="设备名称">{{
                  tasksDeatilForm.equipmentName
                }}
              </el-descriptions-item>
              <el-descriptions-item label="设备编号">{{
                  tasksDeatilForm.equipmentNumber
                }}
              </el-descriptions-item>
              <el-descriptions-item label="巡检类型">{{
                tasksDeatilForm.planModle == 0 ? '机械点检' : '电气点检'
                }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="svg-icon2">
              <type-box :text="text" :status="tasksDeatilForm.stata"></type-box>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" tab-position="center">
        <el-tab-pane label="巡检任务详情" name="0" >
          <el-row>
            <el-col :span="24" class="card-box">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>巡检任务详情</span>
                </div>
                <el-table
                  :data="inspectionContentList"
                  height="400"
                  style="width: 100%"
                >
                  <el-table-column
                  align="center"
                    type="index"
                    label="序号"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="equipmentName"
                    label="巡检设备"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="equipmentModel"
                    label="设备编号"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="content"
                    label="巡检内容"
                  ></el-table-column>
                  <el-table-column prop="lysum" label="巡检结果" align="center" width="130">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.result" :disabled="true" placeholder="请选择">
                        <el-option
                          v-for="item in resultOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="巡检执行" name="1" >
          <el-row>
            <el-col :span="24" class="card-box">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>巡检执行</span>
                  <div>
                    <el-button
                      type="success"
                      size="mini"
                      @click="handleAllNormal"
                      :disabled="tasksDeatilForm.isSave"
                    >全部正常
                    </el-button>
                    <!-- <el-button
                      type="success"
                      size="mini"
                      @click="handleAllNormal"
                    >全部正常
                    </el-button> -->
                  </div>
                </div>
                <el-table
                  :data="inspectionContentList"
                  height="400"
                  style="width: 100%"
                >
                  <el-table-column
                  align="center"
                    type="index"
                    label="序号"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="equipmentName"
                    label="巡检设备"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="equipmentModel"
                    label="设备编号"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                  align="center"
                    prop="content"
                    label="巡检内容"
                  ></el-table-column>
                  <el-table-column prop="lysum" label="巡检结果" align="center" width="130">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.result" :disabled="scope.row.isSave" placeholder="请选择">
                        <!-- <el-select v-model="scope.row.result" placeholder="请选择"> -->
                        <el-option
                          v-for="item in resultOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-button
                        @click="handleMaintenance_link(tasksDeatilForm)"
                        type="warning"
                        size="mini"
                        v-if="tasksDeatilForm.stata>1 && scope.row.result=='2' && scope.row.isSave"
                      >维修提报
                      </el-button>
                      <el-button
                        @click="handleMaintenance(scope.row)"
                        type="warning"
                        size="mini"
                        v-if="tasksDeatilForm.stata>1 && scope.row.result=='3' && scope.row.isSave"
                      >保养提报
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="工程师验收" name="3"   >
          <el-card>
            <div slot="header" class="headerbox">
              <span>工程师验收</span>
            </div>
            <el-form
              ref="basicInfoForm"
              :model="remakeInfo"
              :rules="rules"
              label-width="150px"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="确认人：" prop="tableName">
                    <el-input
                      placeholder="admin"
                      disabled
                      v-model="remakeInfo.leaderName"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理意见：" prop="tableName">
                    <el-input
                      :disabled="tasksDeatilForm.stata>=5"
                      placeholder="请输入处理意见"
                      v-model="remakeInfo.checkOpinion"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="拟定处理时间：" prop="tableName">
                    <el-input
                      v-if="tasksDeatilForm.stata>=5"
                      type="text"
                      :disabled="tasksDeatilForm.stata>=5"
                      v-model="remakeInfo.monitortime"
                    />
                    <el-date-picker
                      v-else
                      v-model="remakeInfo.leadertime"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="验收意见：" prop="checkRemark">
                    <el-input
                      type="textarea"
                      :disabled="tasksDeatilForm.stata>=5"
                      placeholder="请输入验收意见"
                      v-model="remakeInfo.checkRemark"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="7">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in operateList" :key="index"
                :timestamp="dayjs(item.createTime).format('YYYY-MM-DD')"
                placement="top"
              >
                <el-card style="background: #eefaf5">
                  <div class="flex flex-direction align-start justify-around">
                    <h4>{{ item.flowPath }}</h4>
                    <p>{{ item.dept }}</p>
                    <div class="w-100 flex align-center justify-between">
                      <span>{{ item.createUser }}</span>
                      <span>{{ item.createTime }}</span>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button style="margin-right: 10px" @click="onCancel()">关闭</el-button>
        <!--执行按钮-->
        <div v-show="activeName == 1">
          <el-button  :disabled="tasksDeatilForm.stata != 1"  v-hasPermi="['equipment:inspection:implement']" style="margin-right: 10px" type="success" @click="onSave(0)">保存</el-button>
          <el-button  :disabled="tasksDeatilForm.stata != 1"  v-hasPermi="['equipment:inspection:implement']" style="margin-right: 10px" type="success" @click="onSubmit(0)">巡检完成</el-button>
        </div>
        <!--工程师验收-->
        <div v-show="activeName == 3">
          <el-button
            :disabled="tasksDeatilForm.stata != 2"
            v-hasPermi="['equipment:inspection:acceptance']"
            type="success"
            @click="onSubmitRemake()">
            提交
          </el-button>
          <el-button
            :disabled="tasksDeatilForm.stata != 2"
            v-hasPermi="['equipment:inspection:acceptance']"
            type="danger"
            @click="handleReject()">
            驳回
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TypeBox from "@/views/equipment/tenance/ten_rw/module/type-box";

import {mapGetters} from "vuex";

export default {
  name: "inspectionTasksHandle",
  components: {TypeBox},
  data() {
    return {
      value1: "",
      resultOptions: [],
      value: "",
      radio: "1",
      disabled: false,
      // 选中选项卡的 name
      activeName: "1",
      // 表详细信息
      remakeInfo: {},
      rules: {
        inspectionSerial: [{required: true, message: '巡检编号不能为空', trigger: 'blur'}],
        inspectionContent: [{required: true, message: '巡检内容不能为空', trigger: 'blur'}],
        dicOrderId: [{required: true, message: '任务类型未选择', trigger: 'blur'}],
      },
      tasksDeatilForm:{},//详情数据
      inspectionContentList:[],//执行页签巡检执行列表
      operateList: [], //操作记录
    };
  },
  computed:{
    ...mapGetters(["name", "userInfo","nickName"]),
    //右上角状态图标文本
    text() {
      let text = "";
      switch (this.tasksDeatilForm.stata) {
        case 0:
          text = "待执行";
          break;
        case 1:
          text = "执行中";
          break;
        case 2:
          text = "巡检完成";
          break;
        // case 3:
        //   text = "已逾期";
        //   break;
        // case 4:
        //   text = "班长确认";
        //   break;
        // case 5:
        //   text = "设备主管" + "\n" + "检查";
        //   break;
        case 7:
          text = "验收完成";
          break;
      }
      return text;
    },
  },
  created() {
    console.log('当前巡检任务 id=',this.$route.query.id , 'type=',this.$route.query.type)
    this.activeName = this.$route.query.type
    this.getInspectionTasksHandle()
    this.getOtherData();
    this.getOperateList();
  },
  methods: {
    /*获取巡检任务操作页面详情*/
    getInspectionTasksHandle(){
      let id = this.$route.query.id
      this.$api.getInspectionTasksDetail({
        jobId:id
      }).then((res) => {
        if (res.code == 200) {
          console.log('接口成功', res)
          let data = res.data
          //巡检内容列表
          let equipmentContentVOS = res.data.equipmentContentVOS
          //总数据
          this.tasksDeatilForm = data
          let isSave = equipmentContentVOS.every((e)=>{
            //查看是否所有的数据都保存了 巡检结果了， 否则无法点击 保养提报按钮
            return e.hasOwnProperty('result')
          })
          console.log('是否全部保存',isSave)
          // 赋值 isSave
          // this.tasksDeatilForm.isSave = isSave
          this.tasksDeatilForm.isSave=res.data.stata>1 ? true : false

          equipmentContentVOS = equipmentContentVOS.map((item)=>{
            return {
              ...item,
              ...{
                result:item.hasOwnProperty('result')? item.result: '',
                // isSave:item.hasOwnProperty('result')? true: false,
                isSave:res.data.stata>1 ? true : false,
              }
            }
          })
          this.inspectionContentList = equipmentContentVOS
          //赋值 班长 工段长 领导 等数据
          this.remakeInfo = {
            monitorName:data.monitorName,
            monitorOpinion:data.monitorOpinion,
            leaderOpinion:data.leaderOpinion,
            leaderhandleOpinion:data.leaderhandleOpinion,
            checkName:data.checkName,
            monitortime:this.dayjs(data.monitortime).format('YYYY-MM-DD HH:mm:ss'),
            leadertime:this.dayjs(data.leadertime).format('YYYY-MM-DD HH:mm:ss'),
            remark:data.remark,//工程师验收反馈意见
            checkOpinion:data.checkOpinion,//工程师验收处理意见
            checkRemark:data.checkRemark,//工程师验收意见
          }
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    /*获取其他参数*/
    getOtherData(){
      //获取巡检任务结果
      this.$api.inspection_result("inspection_result").then((response) => {
        this.resultOptions = response.data
        console.log('获取字典完成')
      });
    },
     //获取操作记录
     getOperateList() {
      setTimeout(() => {
        this.$api
          .getXJOperateList({
            id: this.$route.query.id,
          })
          .then((res) => {
            if (res.code == 200) {
              console.log("获取操作记录接口成功", res);
              this.operateList = res.data;
            } else {
              console.log(`接口成功,但接口状态=${res.code}`, res);
            }
          })
          .catch((err) => {
            console.log("接口失败", err);
          }, 1500);
      });
    },
    /*全部正常按钮操作*/
    handleAllNormal(){
      this.inspectionContentList = this.inspectionContentList.map((item)=>{
        return {
          ...item,
          ...{
            result:'1'
          }
        }
      })
      console.log('修复巡检结果',this.inspectionContentList )
    },
    onCancel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //保存按钮
    onSave(stats){
      this.$api.inspectionTasksSave({
        "equipmentContentVOS": this.inspectionContentList,
        "inspectionJobId": this.tasksDeatilForm.inspectionJobId,
        "stata": 1
      }).then((res) => {
        if (res.code == 200) {
          console.log('保存巡检任务接口成功', res)
          this.msgSuccess('巡检执行保存成功')
          this.getInspectionTasksHandle()
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //提交按钮
    onSubmit(stats){
      this.$api.inspectionTasksSave({
        "equipmentContentVOS": this.inspectionContentList,
        "inspectionJobId": this.tasksDeatilForm.inspectionJobId,
        "stata": 2
      }).then((res) => {
        if (res.code == 200) {
          console.log('保存巡检任务接口成功', res)
          this.msgSuccess('巡检执行保存成功')
          this.getInspectionTasksHandle()
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    /*提交意见按钮*/
    onSubmitRemake(){
      let status = this.tasksDeatilForm.stata
      if(status == 2){
        this.$api.inspectionTasksLeaderCheck({
          planId:[this.tasksDeatilForm.inspectionJobId],
          remark: this.remakeInfo.checkRemark,
          status: "7",
          time:this.dayjs(this.remakeInfo.leadertime).format('YYYY-MM-DD HH:mm:ss'),
          opinion: this.remakeInfo.checkOpinion,
        }).then((res) => {
          if (res.code == 200) {
            console.log('接口成功', res)
            this.msgSuccess('工程师验收成功')
            this.getInspectionTasksHandle()
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res)
          }
        })
          .catch((err) => {
            console.log('接口失败', err)
          })
      }

    },
    /*驳回*/
    handleReject(){
      this.$api.inspectionTasksBack({
        planId:[this.tasksDeatilForm.inspectionJobId],
        status: "1",
      }).then((res) => {
        if (res.code == 200) {
          console.log('接口成功', res)
          this.msgSuccess('驳回巡检任务成功')
          //发送驳回 订阅消息
          this.sendMsg();
          this.getInspectionTasksHandle()
        } else {
          console.log(`接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
        })
    },
    //发送驳回 订阅消息
    async sendMsg(){
      //发送驳回订阅消息
      let reason = this.remakeInfo.checkOpinion
      const res1 = await this.$api.SendMsgReject({
        msgType:'workStatus',
        data:{
          "thing9": {
            "value": "设备巡检" //工单类型   设备维修驳回  巡检驳回  保养驳回
          },
          "phrase1": {
            "value": "工程师驳回"  //状态    驳回
          },
          "thing2": {
            "value": reason || '未输入原因'  //驳回原因
          },
          "thing15": {
            "value": this.nickName
          },
          "time16": {
            "value": this.dayjs(new Date()).format('YYYY-MM-DD HH:mm')  //时间
          },
        },
        usetId:this.tasksDeatilForm.checkUserId //负责人id
      });
    },
    /*维修跳转*/
    handleMaintenance_link(row){
      this.$router.push({
        path: "/equipment/addinfo",
        query: {
          remark:'巡检转维修',
          facilityName:row.equipmentName,
          facilityNumber:row.equipmentNumber,
          sizeModel:row.model,
          facilityCategory:row.maintenanceType,
          area:row.area,
        },
      });
    },
    /*保养提交*/
    handleMaintenance(row) {
      console.log(row);
      console.log(this.tasksDeatilForm);
      let { equipmentId,inspectionPlanId,jobTime,planName} = this.tasksDeatilForm
      let { content:maintenanceConten} = row
      this.$confirm('是执行保养提交？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$api.submitMaintenance({
          equipmentId,
          inspectionPlanId,
          jobTime,
          maintenanceConten,
          planName,
          "state": 1,
          "remark":"巡检保养"
        }).then((res) => {
          if (res.code == 200) {
            console.log('接口成功', res)
            this.msgSuccess("保养任务创建成功");
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res)
          }
        })
          .catch((err) => {
            console.log('接口失败', err)
          })
      })

    },
  },
};
</script>
<style scoped lang="scss">
.topboxheader {
  display: flex;
  align-items: center;
  font-size: 30px;
}

.topbox {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topbox0 {
    flex: 2;

    > .topbox1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    > .topbox2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .topimg {
    flex: 1;
  }
}

.box-card {
  margin: 2% auto;
  width: 80%;
}

.app-container {
  width: 100%;
  height: calc(1050px - 10px);
  position: relative;
}

.headerbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-tabs__nav-scroll {
  width: 100% !important;
}

::v-deep .el-tabs__nav {
  flex: none !important;
  text-align: center;
  left: 30%;
}

.inputbox {
  display: flex;

  > .inpu {
    width: 100px;
  }
}

.foot-btn {
  z-index: 2;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px #a0a8a0;
}
</style>
