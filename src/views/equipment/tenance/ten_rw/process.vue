<template>
  <div class="p-container flex flex-direction align-center justify-center">
    <!--流程页面-->
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
                <h2>{{ tenanceForm.planName }}{{ tenanceForm.planNumber }}</h2>
              </el-col>
            </el-row>
            <el-descriptions>
              <el-descriptions-item label="计划提报人"
                >{{ tenanceForm.createUserName }}
              </el-descriptions-item>
              <el-descriptions-item label="保养负责人"
                >{{ tenanceForm.chargePersonName }}
              </el-descriptions-item>
              <el-descriptions-item label="保养工程师"
                >{{ tenanceForm.engineerPersonName }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="svg-icon2">
              <type-box :text="text" :status="tenanceForm.statusId"></type-box>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!--    导航菜单-->
      <el-tabs
        style="padding-bottom: 100px"
        v-model="activeTab"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="保养内容"
          name="0"
        >
          <el-form ref="tenanceForm" :model="tenanceForm" label-width="150px">
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
                        <el-input
                          disabled
                          type="number"
                          v-model="tenanceForm.welder"
                        >
                          <template slot="append">个</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="其他工种：" prop="other">
                        <el-input
                          disabled
                          type="number"
                          v-model="tenanceForm.other"
                        >
                          <template slot="append">个</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        label="保养内容："
                        prop="maintenanceContent"
                      >
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
                    <el-table-column property="equipmentName" label="设备名称">
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
        </el-tab-pane>
        <el-tab-pane
          label="保养处理"
          name="1"
        >
          <el-form ref="form" :model="tenanceForm" label-width="80px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>保养情况</span>
                <el-button
                  v-show="isNowMaintenance && tenanceForm.statusId == 2"
                  class="el-icon-edit"
                  style="float: right; padding: 3px 0"
                  @click="handleEdit(1)"
                  type="text"
                  >编辑
                </el-button>
              </div>
              <el-descriptions>
                <el-descriptions-item label="存在问题"
                  >{{ tenanceForm.question }}
                </el-descriptions-item>
                <el-descriptions-item label="保养执行人"
                  >{{ tenanceForm.chargePersonName }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>处理情况</span>
                <el-button
                  v-show="isNowMaintenance && tenanceForm.statusId == 2"
                  class="el-icon-edit"
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="handleEdit(2)"
                  >编辑
                </el-button>
              </div>
              <el-descriptions :column="2">
                <el-descriptions-item label="保养内容"
                  >{{ tenanceForm.maintenanceContent }}
                </el-descriptions-item>
                <el-descriptions-item label="是否更换零部件"
                  >{{
                    tenanceForm.renewal
                      ? tenanceForm.renewal == 1
                        ? "是"
                        : "否"
                      : "否"
                  }}
                </el-descriptions-item>
                <el-descriptions-item label="开始时间"
                  >{{ tenanceForm.drawStartTime }}
                </el-descriptions-item>
                <el-descriptions-item label="结束时间"
                  >{{
                    tenanceForm.drawEndTime
                      ? dayjs(tenanceForm.drawEndTime).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      : ""
                  }}
                </el-descriptions-item>
                <el-descriptions-item :span="2" label="总时长"
                  >{{ tenanceForm.countTime }}
                </el-descriptions-item>
                <el-descriptions-item :span="2" label="完成情况"
                  >{{ tenanceForm.circumstances }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>更换零部件</span>
                <el-button
                  v-show="isNowMaintenance && tenanceForm.statusId == 2"
                  class="el-icon-edit"
                  style="float: right; padding: 3px 0"
                  type="text"
                  :disabled="tenanceForm.renewal != '1'"
                  @click="handleEdit(3)"
                  >编辑
                </el-button>
              </div>
              <el-table
                ref="multipleTable"
                :data="tenanceForm.usePartEntities"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column label="序号" width="55" type="index" />
                <el-table-column prop="partName" label="零部件名称">
                </el-table-column>
                <el-table-column prop="partModel" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="quantity"
                  label="领用数量"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <div slot="header">
                <span>故障图片</span>
              </div>
              <div style="padding-bottom: 20px" class="upload-box">
                <p>最多上传10张图片</p>
                <el-upload
                  list-type="picture-card"
                  ref="uploadImg"
                  multiple
                  :limit="10"
                  accept=".png, .jpg"
                  :headers="upload.headers"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :action="
                    upload.url + '?updateSupport=' + upload.updateSupport
                  "
                  :disabled="upload.isUploading"
                  :on-progress="handleFileUploadProgress"
                  :on-success="ImghandleFileSuccess"
                  :auto-upload="true"
                  :file-list="tenanceForm.partImgEntities"
                  drag
                >
                  <span>点击或者将图片拖拽到这里上传</span>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </div>
            </el-card>
          </el-form>
          <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogShow"
            width="50%"
            append-to-body
            @close="cancel"
          >
            <el-form
              ref="dialogShowForm"
              :model="dialogShowForm"
              label-width="80px"
              :rules="dialogShowFormRules"
            >
              <div v-if="dialogType == 1">
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="存在问题"
                      label-width="120px"
                      prop="area"
                    >
                      <el-input
                        type="textarea"
                        :rows="2"
                        v-model="dialogShowForm.question"
                        placeholder="请填写存在问题"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="保养执行人"
                      label-width="120px"
                      prop="area"
                    >
                      <el-input
                        disabled
                        v-model="dialogShowForm.chargePersonName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="dialogType == 2">
                <el-row class="flex flex-wrap">
                  <el-col :span="12">
                    <el-form-item label="保养内容" label-width="120px" prop="">
                      <el-input
                        v-model="dialogShowForm.maintenanceContent"
                        placeholder="请填写保养内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="是否更换零部件"
                      label-width="120px"
                      prop=""
                    >
                      <el-radio-group v-model="dialogShowForm.renewal">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开始时间" label-width="120px" prop="">
                      <el-input
                        disabled
                        v-model="dialogShowForm.drawStartTime"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="结束时间:"
                      label-width="120px"
                      prop="drawEndTime"
                    >
                      <el-date-picker
                        v-model="dialogShowForm.drawEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="总时长" label-width="120px" prop="">
                        <el-input
                          disabled
                          v-model="dialogShowForm.countTime"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="完成情况" label-width="120px" prop="">
                      <el-input
                        type="textarea"
                        v-model="dialogShowForm.circumstances"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="dialogType == 3">
                <el-button type="primary" @click="addRow">新增行</el-button>
                <el-table
                  :data="dialogShowForm.usePartDTOS"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column label="序号" type="index"></el-table-column>
                  <el-table-column prop="partName" label="零部件名称">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.partName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="partModel" label="规格型号">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.partModel"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unit" label="单位">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.unit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="领用数量">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.quantity"
                        :min="0"
                        oninput="if(value<0)value=0"
                        type="number"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="danger" @click="delRow(scope.$index)"
                        >删除行
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
            <div slot="footer" style="text-align: center">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="success" @click="submitForm">确定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane
          label="班长确认"
          name="2"
        >
          <el-form ref="form" label-width="150px">
            <el-form-item label="确认人" style="width: 60%">
              <el-input disabled v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="反馈意见">
              <el-input
                type="textarea"
                :disabled="tenanceForm.statusId != 3"
                placeholder="请输入反馈意见"
                v-model="tenanceForm.monitorOpinion"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="工程师验收"
          name="3"
        >
          <el-form ref="form" label-width="150px">
            <el-form-item label="确认人" style="width: 60%">
              <el-input disabled v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="验收意见">
              <el-input
                :disabled="tenanceForm.statusId != 4"
                type="textarea"
                placeholder="请输入验收意见"
                v-model="tenanceForm.leaderOpinion"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="设备主管抽检" name="4" >
          <el-form ref="form" label-width="150px">
            <el-form-item label="确认人" style="width: 60%">
              <el-input disabled v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="抽检意见">
              <el-input
                type="textarea"
                placeholder="请输入抽检意见"
                :disabled="tenanceForm.statusId != 5"
                v-model="tenanceForm.checkOpinion"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="5">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in operateList"
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
      <!--底部按钮-->
      <el-row class="foot-btn flex justify-center align-center">
        <el-col :span="24" class="flex justify-center align-center">
          <el-button @click="handleClose" style="margin-right: 10px"
            >关闭
          </el-button>
          <div v-show="activeTab == 1">
            <!--          维修人员按钮-->
            <el-button
              v-hasPermi="['equipment:maintenance:claim']"
              type="success"
              v-show="isNowMaintenance"
              :disabled="tenanceForm.statusId != 2"
              @click="handleSave"
              >保存
            </el-button>
            <el-button
              v-hasPermi="['equipment:maintenance:claim']"
              type="success"
              v-show="isNowMaintenance"
              :disabled="tenanceForm.statusId != 2"
              @click="maintenanceSave"
              >保养完成
            </el-button>
          </div>
          <div v-show="activeTab == 2">
            <!--          班长按钮-->
            <el-button
              v-hasPermi="['equipment:maintenance:confirm']"
              type="success"
              :disabled="tenanceForm.statusId != 3"
              @click="handleSave_monitor"
              >提交
            </el-button>
            <el-button
              v-hasPermi="['equipment:maintenance:confirm']"
              type="danger"
              :disabled="tenanceForm.statusId != 3"
              @click="handleReject(tenanceForm.monitorOpinion)"
              >驳回
            </el-button>
          </div>
          <div v-show="activeTab == 3">
            <!--          工程师按钮-->
            <el-button
              v-hasPermi="['equipment:maintenance:acceptance']"
              type="success"
              :disabled="tenanceForm.statusId != 4"
              @click="handleSave_leader"
              >提交
            </el-button>
            <el-button
              v-hasPermi="['equipment:maintenance:acceptance']"
              type="danger"
              :disabled="tenanceForm.statusId != 4"
              @click="handleReject(tenanceForm.leaderOpinion)"
              >驳回
            </el-button>
          </div>
          <div v-show="activeTab == 4">
            <!--          主管按钮-->
            <el-button
              v-hasPermi="['equipment:maintenance:check']"
              type="success"
              :disabled="tenanceForm.statusId != 5"
              @click="handleSave_manager"
              >提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import pTextarea from "@/views/equipment/tenance/ten_rw/module/pTextarea";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import TypeBox from "@/views/equipment/tenance/ten_rw/module/type-box";

export default {
  name: "process",
  data() {
    return {
      tenanceForm: {},
      equipmentDetailList: [],
      activeTab: "1",
      multipleSelection: [],
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/maintenance/tasks/common/upload",
      },
      dialogVisible: false,
      dialogImageUrl: "",
      dialogShow: false,
      dialogTitle: "保养情况",
      dialogType: 1, //1,2,3  分别指弹窗 1 2 3
      dialogShowForm: {},
      isNowMaintenance: false, //是否是当前登录的维修人员
      isNowEngineer: false, //是否是当前登录的工程师
      operateList: [], //操作记录
      dialogShowFormRules: {
        drawEndTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    pTextarea,
    TypeBox,
  },
  computed: {
    ...mapGetters(["name", "userInfo","nickName"]),
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
    this.activeTab = this.$route.query.activeTab;
    this.getTenanceDetail(this.$route.query.id); //获取保养计划详情
    this.getOperateList();
  },
  methods: {
    //获取保养计划详情
    getTenanceDetail(id) {
      this.$api
        .TasksDetail({ id })
        .then((res) => {
          if (res.code == 200) {
            console.log("获取保养计划详情接口成功", res);
            this.tenanceForm = res.data;
            this.equipmentDetailList = _.cloneDeep(res.data.equipmentEntities);
            let userInfo = this.userInfo.user;
            this.isNowGeneralWorkers =
              this.tenanceForm.createUserId == userInfo.userId; //是否是当前登录的普工
            this.isNowManager =
              this.tenanceForm.engineerPersonId == userInfo.userId; //是否是当前登录的主管
            this.isNowMaintenance =
              this.tenanceForm.chargePersonId == userInfo.userId; //是否是当前登录的维修人员
            this.isNowEngineer =
              this.tenanceForm.engineerPersonId == userInfo.userId; //是否是当前登录的工程师
          } else {
            console.log(`获取保养计划详情接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("获取保养计划详情接口失败", err);
        });
    },
    //获取操作记录
    getOperateList() {
      setTimeout(() => {
        this.$api
          .getOperateList({
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
    //导航切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    bangzhangTextChange(e) {
      console.log(e);
    },
    lingdaoTextChange() {
      console.log(e);
    },
    zhuguanTextChange() {
      console.log(e);
    },
    handleEdit(type) {
      this.dialogShow = true;
      this.dialogType = type;
      switch (type) {
        case 1:
          this.dialogShowForm = {
            question: this.tenanceForm.question,
            chargePersonName: this.tenanceForm.chargePersonName,
          };
          this.dialogTitle = "保养情况";
          break;
        case 2:
          this.dialogShowForm = {
            maintenanceContent: this.tenanceForm.maintenanceContent, //保养内容
            renewal: this.tenanceForm.renewal
              ? this.tenanceForm.renewal == "1"
                ? 1
                : 0
              : 0, //是否更换零部件0否1是
            drawStartTime: this.tenanceForm.drawStartTime, //处理开始时间
            drawEndTime: this.tenanceForm.drawEndTime, //处理结束时间

            countTime: this.tenanceForm.countTime, //总时长
            circumstances: this.tenanceForm.circumstances, //完成情况
          };
          this.dialogTitle = "处理情况";
          break;
        case 3:
          this.dialogShowForm = {
            usePartDTOS: this.tenanceForm.usePartEntities,
          };
          this.dialogTitle = "零部件新增";
          break;
        case 4:
          this.dialogShowForm = {
            partImgDTOS: this.tenanceForm.partImgEntities,
          };
          this.dialogTitle = "图片上传";
          break;
      }
    },
    cancel() {
      this.dialogShow = false;
      this.dialogType = 0;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片删除
    handleRemove(file) {
      this.tenanceForm.partImgEntities =
        this.tenanceForm.partImgEntities.filter((item) => {
          return item.imgPath != file.imgPath;
        });
    },
    handleFileUploadProgress(row) {},
    ImghandleFileSuccess(res, file, filelist) {
      console.log("上传图片完成", res);
      let imageInfo = {
        url: res.data.url,
        name: res.data.fileName,
        imgPath: res.data.url,
        imgName: res.data.fileName,
        type: 0,
        imgSize: res.data.size / 1024,
      };
      if (
        this.tenanceForm.hasOwnProperty("partImgEntities") &&
        this.tenanceForm.partImgEntities.length
      ) {
        this.tenanceForm.partImgEntities.push(imageInfo);
      } else {
        this.tenanceForm.partImgEntities = [];
        this.tenanceForm.partImgEntities.push(imageInfo);
      }
    },
    //保养任务处理
    submitForm() {
      console.log("当前是弹窗", this.dialogType);
      let dialogType = this.dialogType;
      console.log("当前数据=", this.tenanceForm);
      switch (dialogType) {
        case 1:
          this.tenanceForm.question = this.dialogShowForm.question;
          console.log("tenanceForm =======", this.tenanceForm);
          this.dialogShow = false;
          break;
        case 2:
          this.$refs["dialogShowForm"].validate((valid) => {
            if (valid) {
              this.tenanceForm.maintenanceContent =
                this.dialogShowForm.maintenanceContent;
              this.tenanceForm.drawEndTime = this.dialogShowForm.drawEndTime;
              this.tenanceForm.renewal = this.dialogShowForm.renewal;
              this.tenanceForm.circumstances =
                this.dialogShowForm.circumstances;
              console.log("tenanceForm =======", this.tenanceForm);
              this.dialogShow = false;
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          break;
        case 3:
          let isCanSub = this.dialogShowForm.usePartDTOS.every((item) => {
            return item.quantity > 0;
          });
          if (isCanSub) {
            this.tenanceForm.usePartEntities = this.dialogShowForm.usePartDTOS;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "表单验证失败，请检查领用数量值",
            });
            return false;
          }
          console.log("tenanceForm =======", this.tenanceForm);
          this.dialogShow = false;
          break;
        case 4:
          break;
      }

      //  planId:this.$route.query.id,
      // id:this.tenanceForm.id,
      // this.$api.TasksDetailSaveOrUpdate(param).then((res) => {
      //   if (res.code == 200) {
      //     console.log('接口成功', res)
      //   } else {
      //     console.log(`接口成功,但接口状态=${res.code}`, res)
      //   }
      // })
      //   .catch((err) => {
      //     console.log('接口失败', err)
      //   })
    },
    //更换零部件 增加行
    addRow() {
      if (this.dialogShowForm.usePartDTOS) {
        this.dialogShowForm.usePartDTOS.push({
          partModel: "",
          partName: "",
          quantity: 0,
          unit: "",
        });
      } else {
        this.dialogShowForm.usePartDTOS = [];
        this.dialogShowForm.usePartDTOS.push({
          partModel: "",
          partName: "",
          quantity: 0,
          unit: "",
        });
      }
    },
    //更换零部件 删除行
    delRow(index) {
      this.dialogShowForm.usePartDTOS.splice(index, 1);
    },
    //关闭详情页面
    handleClose() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //任务处理保存 handleSave
    async handleSave() {
      this.tenanceForm.drawEndTime = new Date(this.tenanceForm.drawEndTime);
      this.$api
        .TasksDetailSaveOrUpdate({
          ...this.tenanceForm,
          ...{
            planId: this.$route.query.id,
            id: this.tenanceForm.maintenanceRecordsId,
            renewal:
              this.tenanceForm.usePartEntities &&
              this.tenanceForm.usePartEntities.length > 0
                ? 1
                : 0,
            status: 2,
          },
          ...{
            partImgDTOS: this.tenanceForm.partImgEntities?.map((item) => {
              return {
                imgName: item.imgName,
                imgPath: item.imgPath,
                imgSize: item.imgSize,
                type: item.type,
              };
            }),
            usePartDTOS: this.tenanceForm.usePartEntities,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "保存数据成功",
            });
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //任务处理完成 maintenanceSave
    async maintenanceSave() {
      this.$api
        .TasksDetailSaveOrUpdate({
          ...this.tenanceForm,
          ...{
            planId: this.$route.query.id,
            id: this.tenanceForm.maintenanceRecordsId,
            renewal:
              this.tenanceForm.usePartEntities &&
              this.tenanceForm.usePartEntities.length > 0
                ? 1
                : 0,
            status: 3,
          },
          ...{
            partImgDTOS: this.tenanceForm.partImgEntities
              ? this.tenanceForm.partImgEntities.map((item) => {
                  return {
                    imgName: item.imgName,
                    imgPath: item.imgPath,
                    imgSize: item.imgSize,
                    type: item.type,
                  };
                })
              : [],
            usePartDTOS: this.tenanceForm.usePartEntities,
          },
          ...{
            drawEndTime: new Date(this.tenanceForm.drawEndTime),
          },
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "保养完成",
            });
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //班长提交
    handleSave_monitor() {
      this.$api
        .TaskMonitorAffirm({
          planId: [this.$route.query.id],
          remark: this.tenanceForm.monitorOpinion,
          status: 4,
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("班长提交接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "反馈意见提交成功",
            });
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //领导验收
    handleSave_leader() {
      this.$api
        .TaskLeadCheck({
          planId: [this.$route.query.id],
          remark: this.tenanceForm.leaderOpinion,
          status: 5,
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "验收意见提交成功",
            });
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //主管抽检
    handleSave_manager() {
      this.$api
        .TaskSpotCheck({
          planId: [this.$route.query.id],
          remark: this.tenanceForm.checkOpinion,
          status: 7,
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "抽检意见提交成功",
            });
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    //驳回
    handleReject(remark) {
      this.$api
        .TaskReject({
          planId: [this.$route.query.id],
          remark: remark,
          status: 2,
        })
        .then((res) => {
          if (res.code == 200) {
            console.log("驳回接口成功", res);
            this.getTenanceDetail(this.$route.query.id);
            this.getOperateList();
            this.$message({
              showClose: true,
              type: "success",
              message: "已驳回，转到保养处理",
            });
            //驳回发送订阅消息
            this.sendMsg()
            //退回到列表页
            this.handleClose();
          } else {
            console.log(`驳回接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("驳回接口失败", err);
        });
    },
    //发送驳回 订阅消息
    async sendMsg(){
      //发送驳回订阅消息
      let handlePeople = this.tenanceForm.statusId ==  3 ?  '班长' :'工程师'
      let reason = this.tenanceForm.statusId ==  3 ?  this.tenanceForm.monitorOpinion : this.tenanceForm.leaderOpinion
      const res1 = await this.$api.SendMsgReject({
        msgType:'workStatus',
        data:{
          "thing9": {
            "value": "设备保养" //工单类型   设备维修驳回  巡检驳回  保养驳回
          },
          "phrase1": {
            "value": handlePeople + "驳回"  //状态    驳回
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
        usetId:this.tenanceForm.chargePersonId,//负责人id
      });
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-menu-demo {
  display: flex;
  justify-content: space-around;
}

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

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

::v-deep .foot-btn {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
