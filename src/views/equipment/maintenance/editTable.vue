<template>
  <div>
    <el-row v-model="editInfo">
      <el-card class="box-card" v-model="Headtitle">
        <div class="topboxheader">
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
          <p>{{ Headtitle.facilityName + Headtitle.facilityNumber }}</p>
          <div class="svg-icon2">
            <type-box
              :text="text"
              :status="Number(this.$route.query.workStatus)"
            ></type-box>
          </div>
        </div>
        <el-descriptions>
          <el-descriptions-item label="设备名称">
            {{ Headtitle.facilityName }}
          </el-descriptions-item>
          <el-descriptions-item label="设备编号">
            {{ Headtitle.facilityNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="规格型号">
            {{ Headtitle.sizeModel }}
          </el-descriptions-item>
          <el-descriptions-item label="设备类别"
            >{{ Headtitle.facilityCategory == "1" ? "一般设备" : "重型设备" }}
          </el-descriptions-item>
          <el-descriptions-item label="区域">
            {{ Headtitle.area }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-col :span="24">
        <el-card body-style="margin: auto 5%">
          <el-tabs v-model="activeName" tab-position="center">
            <el-tab-pane label="故障信息" name="basic">
              <div class="app-container">
                <div class="wxtitle">设备维修</div>
                <el-row>
                  <el-col :span="24" class="card-box">
                    <el-card>
                      <div slot="header">
                        <span>维修信息</span>
                      </div>
                      <el-form
                        ref="basicInfoForm"
                        :model="editInfo.facilityMaintain"
                        label-width="150px"
                      >
                        <el-row>
                          <el-col :span="12">
                            <el-form-item
                              label="报修单号："
                              prop="maintainOrderNumber"
                            >
                              {{
                                editInfo.facilityMaintain.maintainOrderNumber
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="报修人：" prop="repairsPeople"
                              >{{ editInfo.facilityMaintain.repairsPeople }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="维修人："
                              prop="maintainPeople"
                            >
                              {{
                                editInfo.facilityMaintain.maintainPeople ||
                                "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="存在问题："
                              prop="existProblem"
                            >
                              {{ editInfo.facilityMaintain.existProblem }}
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </el-card>
                  </el-col>
                  <el-col :span="24" class="card-box">
                    <el-card>
                      <div slot="header">
                        <span>故障信息</span>
                      </div>
                      <el-form
                        ref="basicInfoForm"
                        :model="editInfo.facilityMaintain"
                        :rules="rules"
                        label-width="150px"
                      >
                        <el-row>
                          <el-col :span="12">
                            <el-form-item
                              label="故障开始时间："
                              prop="breakdownTime"
                            >
                              {{
                                dayjs(
                                  editInfo.facilityMaintain.breakdownTime
                                ).format("YYYY-MM-DD HH:mm:ss") || "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="故障结束时间："
                              prop="breakdownEndTime"
                            >
                              {{
                                editInfo.facilityMaintain.breakdownEndTime
                                  ? dayjs(
                                      editInfo.facilityMaintain
                                        .breakdownEndTime || "暂无"
                                    ).format("YYYY-MM-DD HH:mm:ss")
                                  : "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="故障时长：" prop="duration">
                              {{ editInfo.facilityMaintain.duration || "暂无" }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="维修时长："
                              prop="maintainTime"
                            >
                              {{
                                editInfo.facilityMaintain.maintainTime || "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item
                                label="运行状态："
                                prop="facilityId"
                              >
                                {{
                                  editInfo.facilityMaintain.facilityId == 0
                                    ? "带病运行"
                                    : "正常"
                                }}
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item
                                label="故障类型："
                                prop="faultStatus"
                              >
                                {{
                                  editInfo.facilityMaintain.faultStatus == 0
                                    ? "机械类故障"
                                    : "电气类故障"
                                }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-col :span="12">
                            <el-form-item
                              label="故障详情："
                              prop="faultDetails"
                            >
                              {{
                                editInfo.conditionEntity.faultDetails || "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="是否更换零部件："
                              prop="changePart"
                            >
                              {{
                                editInfo.conditionEntity.changePart == 0
                                  ? "是"
                                  : "否"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="是否停线："
                              prop="whetherLineStop"
                            >
                              {{
                                editInfo.facilityMaintain.whetherLineStop == 0
                                  ? "是"
                                  : "否"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="处理方式：" prop="processMode">
                              {{
                                editInfo.conditionEntity.processMode || "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </el-card>
                  </el-col>

                  <el-col :span="24" class="card-box">
                    <el-card>
                      <div slot="header">
                        <span>故障图片</span>
                      </div>
                      <div style="padding-bottom: 20px">
                        <p>最多上传10张图片</p>
                        <el-upload
                          list-type="picture-card"
                          ref="upload"
                          :limit="10"
                          disabled
                          accept=".png, .jpg"
                          :headers="upload.headers"
                          :on-preview="handlePictureCardPreview"
                          :action="
                            upload.url +
                            '?updateSupport=' +
                            upload.updateSupport
                          "
                          :on-success="handleFileSuccess"
                          :file-list="editInfo.imgList"
                          :auto-upload="true"
                          drag
                        >
                          <span>点击或者将图片拖拽到这里上传</span>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                      </div>
                    </el-card>
                  </el-col>
                  <equipment-list
                    class="card-box"
                    title="涉及设备"
                    :list="Headtitle.equipmentEntities"
                  ></equipment-list>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="维修处理" name="cloum">
              <el-row>
                <el-col :span="24" class="card-box">
                  <el-card>
                    <div slot="header" class="headerbox">
                      <p>维修情况</p>
                      <div>
                        <i
                          class="el-icon-edit"
                          style="cursor: pointer"
                          @click="openedit"
                          >编辑</i
                        >
                      </div>
                    </div>
                    <el-form
                      :model="form.conditionEntity"
                      :rules="rules"
                      label-width="150px"
                    >
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="工单单号：">
                            {{
                              form.conditionEntity.maintainOrderNumber ||
                              "系统自动生成"
                            }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="故障分析："
                            >{{ form.conditionEntity.faultAnalysis || "暂无" }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="故障类型：">
                            {{
                              form.faultType == 0 ? "机械类故障" : "电器类故障"
                            }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="故障详情：" prop="faultDetails"
                            >{{ form.conditionEntity.faultDetails || "暂无" }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="维修班组："
                            >{{ form.conditionEntity.deptName || "暂无" }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="维修负责人："
                            >{{ form.conditionEntity.nickName || "暂无" }}
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="处理方式：" prop="processMode">
                              {{ form.conditionEntity.processMode }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="是否停线：" prop="whetherLine">
                              {{
                                form.conditionEntity.whetherLine == 0
                                  ? "是"
                                  : "否"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="是否更换零部件："
                              prop="changePart"
                            >
                              {{
                                form.conditionEntity.changePart == 0
                                  ? "是"
                                  : "否"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="开始时间：">
                              {{
                                form.conditionEntity.crateTime
                                  ? dayjs(
                                      form.conditionEntity.crateTime
                                    ).format("YYYY-MM-DD HH:mm")
                                  : "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="结束时间：" prop="fulfillTime">
                              {{
                                form.conditionEntity.fulfillTime
                                  ? dayjs(
                                      form.conditionEntity.fulfillTime
                                    ).format("YYYY-MM-DD HH:mm")
                                  : "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="维修总时长："
                              prop="maintainTime"
                              >{{ form.conditionEntity.maintainTime || "暂无" }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12"></el-col>
                          <el-col :span="12">
                            <el-form-item label="完成情况：" prop="accomplish"
                              >{{ form.conditionEntity.accomplish || "暂无" }}
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-form>
                  </el-card>
                </el-col>

                <el-dialog
                  title=" "
                  :visible.sync="dialogShow"
                  append-to-body
                  @close="cancel"
                >
                  <el-button
                    :disabled="!maintenance"
                    type="primary"
                    @click="addRow"
                    >新增行
                  </el-button>
                  <el-table :data="form.parcsVOS" stripe style="width: 100%">
                    <el-table-column
                      label="序号"
                      type="index"
                    ></el-table-column>
                    <el-table-column prop="partsName" label="零部件名称">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.partsName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="partsType" label="规格型号">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.partsType"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="partsUnits" label="单位">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.partsUnits"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="receiveAmount" label="领用数量">
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.receiveAmount"
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
                  <div slot="footer" style="text-align: center">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="success" @click="submitForm"
                      >确定
                    </el-button>
                  </div>
                </el-dialog>

                <el-dialog title="维修情况" :visible.sync="dialogTableVisible">
                  <el-card>
                    <el-form
                      ref="Rules1111"
                      :model="TCform.conditionEntity"
                      :rules="rules1111"
                      label-width="150px"
                    >
                      <el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item
                              label="工单单号："
                              prop="maintainOrderNumber	"
                            >
                              <el-input
                                placeholder="系统自动生成"
                                v-model="
                                  TCform.conditionEntity.maintainOrderNumber
                                "
                                :disabled="true"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="故障分析："
                              prop="faultAnalysis"
                            >
                              <el-input
                                placeholder="故障分析"
                                v-model="TCform.conditionEntity.faultAnalysis"
                                :disabled="false"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="故障类型：" prop="faultType">
                              <el-input
                                placeholder="故障类型"
                                v-model="TCform.conditionEntity.faultType"
                                disabled
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="故障详情:" prop="faultDetails">
                              <template slot-scope="scope">
                                <div class="input_select flex">
                                  <el-input
                                    v-model="
                                      TCform.conditionEntity.faultDetails
                                    "
                                    @input="handleFocus(scope.$index)"
                                    placeholder="请输入或选择"
                                  >
                                    <el-select
                                      slot="append"
                                      v-model="
                                        TCform.conditionEntity.faultDetails
                                      "
                                      @change="
                                        handleChange($event, scope.$index)
                                      "
                                    >
                                      <el-option
                                        v-for="dict in FaultDetails"
                                        :key="dict.dictValue"
                                        :label="dict.dictLabel"
                                        :value="dict.dictValue"
                                      ></el-option>
                                    </el-select>
                                  </el-input>
                                </div>
                              </template>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="维修班组：" prop="deptName">
                              <el-input
                                :disabled="true"
                                placeholder="维修班组"
                                v-model="TCform.conditionEntity.deptName"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="维修人："
                              prop="maintainPeople"
                            >
                              <el-input
                                :disabled="true"
                                placeholder="维修人"
                                v-model="TCform.conditionEntity.nickName"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-row>
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="处理方式：" prop="processMode">
                              <el-input
                                placeholder="请输入内容"
                                v-model="TCform.conditionEntity.processMode"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="是否停线：" prop="whetherLine">
                              <el-radio
                                v-model="TCform.conditionEntity.whetherLine"
                                label="0"
                                >是
                              </el-radio>
                              <el-radio
                                v-model="TCform.conditionEntity.whetherLine"
                                label="1"
                                >否
                              </el-radio>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item
                              label="是否更换零部件："
                              prop="changePart"
                            >
                              <el-radio
                                v-model="TCform.conditionEntity.changePart"
                                label="0"
                                >是
                              </el-radio>
                              <el-radio
                                v-model="TCform.conditionEntity.changePart"
                                label="1"
                                >否
                              </el-radio>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <!-- <el-form-item label="开始时间:" prop="crateTime">
                              {{
                                TCform.conditionEntity.crateTime
                                  ? dayjs(
                                    TCform.conditionEntity.crateTime
                                  ).format("YYYY-MM-DD HH:mm")
                                  : "暂无"
                              }}
                            </el-form-item> -->
                            <el-form-item label="开始时间:" prop="crateTime">
                              <el-date-picker
                                format="yyyy-MM-dd HH:mm"
                                style="width: 100%"
                                v-model="TCform.conditionEntity.crateTime"
                                type="datetime"
                                placeholder="选择开始时间"
                              ></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <!-- <el-form-item label="结束时间：" prop="endTime">
                              {{
                                dayjs(TCform.conditionEntity.endTime).format(
                                  "YYYY-MM-DD HH:mm"
                                )
                              }}
                            </el-form-item>-->
                            <el-form-item label="结束时间:">
                              <el-date-picker
                                format="yyyy-MM-dd HH:mm"
                                style="width: 100%"
                                v-model="TCform.conditionEntity.fulfillTime"
                                type="datetime"
                                placeholder="选择日期时间"
                              ></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label="维修总时长："
                              prop="maintainTime"
                            >
                              {{
                                TCform.conditionEntity.maintainTime || "暂无"
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12"></el-col>
                          <el-col :span="24">
                            <el-form-item label="完成情况：" prop="accomplish">
                              <el-input
                                v-model="TCform.conditionEntity.accomplish"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-form>
                  </el-card>

                  <div style="text-align: center; margin-top: 10px">
                    <el-button @click="handleGB">关闭</el-button>
                    <el-button type="success" @click="handleQR">确认</el-button>
                  </div>
                </el-dialog>

                <el-col :span="24" class="card-box">
                  <el-card>
                    <div slot="header">
                      <span>更换零部件</span>
                      <el-button
                        :disabled="ishandleQR"
                        class="el-icon-edit"
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="handleEdit"
                        >编辑
                      </el-button>
                    </div>

                    <el-table
                      ref="multipleTable"
                      :data="form.parcsVOS"
                      tooltip-effect="dark"
                    >
                      <el-table-column label="序号" type="index" />
                      <el-table-column
                        prop="partsName"
                        label="零部件名称"
                      ></el-table-column>
                      <el-table-column
                        prop="partsType"
                        label="规格型号"
                      ></el-table-column>
                      <el-table-column
                        prop="partsUnits"
                        label="单位"
                      ></el-table-column>
                      <el-table-column
                        prop="receiveAmount"
                        label="领用数量"
                      ></el-table-column>
                    </el-table>
                  </el-card>
                </el-col>

                <el-col :span="24" class="card-box">
                  <el-card>
                    <div slot="header">
                      <span>维修图片</span>
                    </div>
                    <div style="padding-bottom: 20px">
                      <p>最多上传10张图片</p>
                      <el-upload
                        list-type="picture-card"
                        ref="uploadwx"
                        :limit="10"
                        accept=".png, .jpg"
                        :headers="upload.headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :action="
                          upload.url + '?updateSupport=' + upload.updateSupport
                        "
                        :before-upload="beforeAvatarUpload"
                        :on-success="WXhandleFileSuccess"
                        :file-list="form.accessoryVOS"
                        drag
                      >
                        <!-- :auto-upload="false" -->

                        <span>点击或者将图片拖拽到这里上传</span>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                      </el-dialog>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="操作人员确认" name="genInfo">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>操作人员确认</span>
                </div>
                <el-form
                  :rules="basicInfoForm1"
                  ref="basicInfoForm"
                  :model="selOperatedPeopleByList"
                  label-width="150px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="确认人：" prop="peopleName">
                        <el-input
                          :disabled="true"
                          v-model="selOperatedPeopleByList.peopleName"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="满意度：" prop="satisfy">
                        <el-input
                          :min="0"
                          :max="100"
                          type="number"
                          placeholder="请输入"
                          v-model="selOperatedPeopleByList.satisfy"
                        >
                          <template slot="append">%</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col></el-col>
                    <el-col :span="12">
                      <el-form-item label="故障结束时间:" prop="faultEndTime">
                        <el-date-picker
                          format="yyyy-MM-dd HH:mm"
                          style="width: 100%"
                          v-model="selOperatedPeopleByList.faultEndTime"
                          type="datetime"
                          placeholder="选择日期时间"
                          :default-value="new Date()"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="反馈意见：" prop="feedback">
                        <el-input
                          type="textarea"
                          placeholder="请输入反馈意见"
                          v-model="selOperatedPeopleByList.feedback"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="工程师验收" name="genInfo1">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>工程师验收</span>
                </div>
                <el-form
                  ref="basicInfoForm"
                  :model="EngineerAcceptanceList"
                  label-width="150px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="确认人：">
                        <el-input
                          v-model="EngineerAcceptanceList.leadName"
                          disabled
                          placeholder
                        />
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="验收意见：">
                        <el-input
                          v-model="EngineerAcceptanceList.checkIdea"
                          type="textarea"
                          placeholder="请输入验收意见"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="设备主管抽检" name="genInfo2">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>设备主管抽检</span>
                </div>
                <el-form
                  ref="basicInfoForm"
                  :model="selStopByList"
                  :rules="rules"
                  label-width="150px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="确认人：" prop="spotTestName">
                        <el-input
                          placeholder
                          v-model="selStopByList.spotTestName"
                          :disabled="true"
                        />
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="抽检意见：" prop="spotTestIdea">
                        <el-input
                          v-model="selStopByList.spotTestIdea"
                          type="textarea"
                          placeholder="请输入抽检意见"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="操作记录" name="genInfo3">
              <el-card>
                <div slot="header" class="headerbox">
                  <span>操作记录</span>
                </div>
                <div class="block">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(e, index) in RecordAllVOInfo"
                      :timestamp="dayjs(e.starTime).format('YYYY/MM/DD')"
                      placement="top"
                      :key="index"
                    >
                      <el-card style="background: #eefaf5">
                        <div
                          class="flex flex-direction align-start justify-around"
                        >
                          <h4>{{ e.title }}</h4>
                          <p>{{ e.deptName }}</p>
                          <div class="w-100 flex align-center justify-between">
                            <span>{{ e.nickName }}</span>
                            <span>
                              {{
                                dayjs(e.starTime).format("YYYY.MM.DD HH:mm:ss")
                              }}
                            </span>
                          </div>
                        </div>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="foot-btn flex justify-center align-center">
      <el-col :span="24" class="flex justify-center align-center">
        <el-button @click="onCancel()" style="margin-right: 12px"
          >{{ isCreate ? "取消" : "关闭" }}
        </el-button>

        <!--维修人员操作按钮-->
        <div v-show="activeName == 'cloum'">
          <el-button
            v-hasPermi="['equipment:repair:claim']"
            :disabled="isWorkStatus !== '2'"
            type="success"
            @click="onSubmit3(3)"
          >
            维修完成
          </el-button>
          <el-button
            v-hasPermi="['equipment:repair:claim']"
            :disabled="isWorkStatus !== '2'"
            type="success"
            @click="onSubmit3(2)"
          >
            保存
          </el-button>
        </div>
        <!--操作人员操作按钮-->
        <div v-show="activeName == 'genInfo'">
          <!--      操作人员提交-->
          <el-button
            v-hasPermi="['equipment:repair:add']"
            :disabled="isWorkStatus == '6' || isWorkStatus !== '3'"
            type="success"
            @click="onSubmit4(4)"
            >提交
          </el-button>
          <!-- 驳回按钮状态为2时不可以驳回 状态为6时不可驳回 -->
          <el-button
            v-hasPermi="['equipment:repair:add']"
            @click="BHhandler"
            :disabled="isWorkStatus == '6' || isWorkStatus <= 2"
            type="danger"
          >
            驳回
          </el-button>
        </div>
        <!--工程师-->
        <div v-show="activeName == 'genInfo1'">
          <el-button
            v-hasPermi="['equipment:repair:acceptance']"
            :disabled="isWorkStatus == '6' || isWorkStatus !== '4'"
            type="success"
            @click="onSubmit5(5)"
          >
            提交
          </el-button>
          <el-button
            v-hasPermi="['equipment:repair:acceptance']"
            @click="BHhandler"
            :disabled="isWorkStatus == '6' || isWorkStatus !== '4'"
            type="danger"
          >
            驳回
          </el-button>
        </div>

        <!--      设备主管抽检-->
        <div v-show="activeName == 'genInfo2'">
          <el-button
            v-hasPermi="['equipment:repair:check']"
            :disabled="isWorkStatus == '6' || isWorkStatus !== '5'"
            type="success"
            @click="onSubmit6(6)"
          >
            提交
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TypeBox from "../tenance/ten_rw/module/type-box.vue";
import { getToken } from "@/utils/auth";
import EquipmentList from "@/views/equipment/common/equipmentList";

export default {
  name: "GenEdit",
  components: {
    EquipmentList,
    TypeBox,
  },
  data() {
    return {
      FaultDetails: [], //弹窗故障详情
      isWorkStatus: null,
      Headtitle: {}, //标题数据
      dateRange: [],
      TCform: {
        conditionEntity: {
          fulfillTime: new Date(),
          whetherLine: "1",
          changePart: "1",
        },
      },
      form: {
        accessoryVOS: [],
        conditionEntity: {
          fulfillTime: null,
          whetherLine: "1",
          changePart: "1",
        },
        facilityMaintain: {},
        facilityId: "",
        parcsVOS: [],
      },
      rules1111: {
        faultDetails: [
          { required: true, message: "请输入故障详情", trigger: "blur" },
        ],
      },
      rules: {},
      basicInfoForm1: {
        faultEndTime: [
          { required: true, message: "请输入故障结束时间", trigger: "blur" },
        ],
      },
      options: [
        {
          status: "0",
          label: "带病运行",
        },
        {
          status: "1",
          label: "停机",
        },
      ],
      // 用户导入参数
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
      radio: "1",
      dialogTableVisible1: false,
      dialogTableVisible: false,
      dataList: [],
      active: 0,

      loading: true,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      activeName: "basic",
      dialogShowForm: {},
      dialogShow: false,
      //路由判断是否可修改
      isINPUT: true,
      //故障信息
      editInfo: {
        imgList: [],
        operatedPeopleEntity: {},
        leadCheckEntity: {},
        facilityMaintain: {},
        conditionEntity: {},
        facilityMaintainL: {},
        maintainSpotTestEntity: {},
      },
      isCreate: false, //是否是新增页面
      isSubmit: false, //是否提交完成
      selOperatedPeopleByList: {
        faultEndTime: null,
      }, //操作人员确认
      selStopByList: {}, //抽检记录
      EngineerAcceptanceList: {}, //工程师验收
      RecordAllVOInfo: [], //操作记录
      leader: false, //领导
      generalWorkers: false, //普工
      manager: false, //主管
      monitor: false, //班长
      maintenance: false, //维修人员
      engineer: false, //工程师
      isNowLeader: false, //是否是当前登录的领导
      isNowGeneralWorkers: false, //是否是当前登录的普工
      isNowManager: false, //是否是当前登录的主管
      isNowMonitor: false, //是否是当前登录的班长
      isNowMaintenance: false, //是否是当前登录的维修人员
      isNowEngineer: false, //是否是当前登录的工程师
      dictLabel: "",
      dictValue: "",
      Value: "",
      Label: "",
      ishandleQR: false,
    };
  },

  created() {
    // this.getUserIdentity();
    this.getWXselAllById();
    // this.getOtherData();
    //工程师验收信息

    this.$api
      .WXselCheckById(this.$route.query.id)
      .then((res) => {
          console.log('工程师验收信息',res)
        if (res.code == 200 && res.data !== undefined) {
          this.EngineerAcceptanceList = res.data;
        } else {
          this.EngineerAcceptanceList = {};
          this.EngineerAcceptanceList.leadName = this.name;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //ID查询抽检记录 WXselStopById
    this.$api
      .WXselStopById(this.$route.query.id)
      .then((res) => {
        if (res.code == 200 && res.data !== undefined) {
          this.selStopByList = res.data;
        } else {
          this.selStopByList = {};
          this.selStopByList.spotTestName = this.name;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //人员操作记录信息如果有操作过操作人员确认的信息就有信息，没有的话就返回200
    this.$api
      .WXselOperatedPeopleById(this.$route.query.id)
      .then((res) => {
          console.log('人员操作记录信息',res)
        if (res.code == 200 && res.data !== undefined) {
          this.selOperatedPeopleByList = res.data;
        } else {
          this.selOperatedPeopleByList.faultEndTime = new Date();
          this.selOperatedPeopleByList.peopleName = this.name;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // 根据id查询维修情况;
    this.getWXselRecordByID(this.$route.query.id);
    //查询故障信息详情
    this.$api
      .WXselMalfunctionByIdDTO({ facilityId: this.$route.query.id })
      .then((res) => {
          console.log('查询故障信息详情',res)
        if (res.code == 200 && res.data !== undefined) {
          let row = res.data;
          let imgList;
          if (row.accessoryVOS && row.accessoryVOS.length > 0) {
            imgList = res.data.accessoryVOS.map((img) => {
              return {
                ...img,
                ...{
                  url: img.picturePath,
                  name: img.pictureName,
                },
              };
            });
          }
          this.editInfo = {
            imgList: imgList || [],
            facilityMaintain: row.facilityMaintain || {},
            operatedPeopleEntity: row.operatedPeopleEntity || {},
            leadCheckEntity: row.leadCheckEntity || {},
            conditionEntity: row.conditionEntity || {},
            maintainSpotTestEntity: row.maintainSpotTestEntity || {},
          };
          this.editInfo.conditionEntity.faultDetails = this.FaultDetails.filter(
            (e, index) => {
              return e.dictValue == this.editInfo.conditionEntity.faultDetails;
            }
          )[0].dictLabel;
        } else {
          this.editInfo = {
            imgList: [],
            facilityMaintain: {},
            operatedPeopleEntity: {},
            leadCheckEntity: {},
            conditionEntity: {
              maintainPeople: this.name,
            },
            maintainSpotTestEntity: {},
          };
          this.editInfo.conditionEntity.faultDetails = this.FaultDetails.filter(
            (e, index) => {
              return e.dictValue == this.editInfo.conditionEntity.faultDetails;
            }
          )[0].dictLabel;
        }
      })
      .catch((e) => {});

    //查操作记录
    this.$api
      .WXRecordAllVO(this.$route.query.id)
      .then((res) => {
        if (res.code == 200 && res.data !== undefined) {
          this.RecordAllVOInfo = res.data;
        } else {
          this.RecordAllVOInfo = [];
        }
      })
      .catch((e) => {});
    this.activeName = this.$route.query.cjtype || "basic";
    this.isWorkStatus = this.$route.query.workStatus;
  },
  watch: {
    "selOperatedPeopleByList.satisfy": function (newVal) {
      if (newVal > 100) {
        this.selOperatedPeopleByList.satisfy = 100;
      }
    },
  },
  computed: {
    ...mapGetters(["name", "userInfo","nickName"]),
    userIdentity() {
      //用户身份
    },
    bohuiHandle() {
      if (this.$route.query.workStatus == "") {
        return true;
      } else {
        return false;
      }
    },
    isedit() {
      if (this.dialogTableVisible == false) {
        return;
      } else {
      }
    },
    //右上角状态图标文本
    text() {
      let text = "";
      switch (Number(this.$route.query.workStatus)) {
        case 0:
          text = "未提交";
          break;
        case 1:
          text = "未认领";
          break;
        case 2:
          text = "维修中";
          break;
        case 3:
          text = "操作人员" + "\n" + "未确认";
          break;
        case 4:
          text = "工程师" + "\n" + "未确认";
          break;
        case 5:
          text = "未抽检";
          break;
        case 6:
          text = "已抽检";
          break;
      }
      return text;
    },
  },
  mounted() {
    if (this.$route.query.isInput == 0) {
      this.isINPUT = false;
    }
  },

  methods: {
    handleChange(value, index) {
      // 处理 el-select 的选择事件
      console.log("el-select 选择事件：", value, index);
      this.handleFocus(index);
    },
    //主数据输入框 input焦点事件
    handleFocus(idx) {
      console.log("主数据输入框 input焦点事件", idx);
      this.nowIndex = idx;
      //通过下标 修改 列表 参数   canUpdate
      // this.tableData = this.tableData.map((item, index) => {
      //   return idx != index
      //     ? {
      //         ...item,
      //         ...{
      //           canUpdate: false,
      //         },
      //       }
      //     : {
      //         ...item,
      //         ...{
      //           canUpdate: true,
      //         },
      //       };
      // });
    },
    openedit() {
      console.log(this.form, "222弹窗数据");
      let ishan = this.form.conditionEntity.fulfillTime;
      console.log(ishan, "ishan");
      if (ishan == undefined) {
        this.dialogTableVisible = true;
        this.TCform = this.form;
        this.TCform.conditionEntity.fulfillTime = new Date();
        this.TCform.conditionEntity.whetherLine = "1";
        this.TCform.conditionEntity.changePart = "1";
      } else {
        this.dialogTableVisible = true;
        this.TCform = this.form;
      }
    },
    //获取其他需求数据
    getOtherData() {
      // this.getDicts("Fault_Details").then((response) => {
      //   this.FaultDetails = response.data.map((item) => {
      //     return {
      //       ...item,
      //       ...{
      //         dictValue: item.dictValue,
      //       },
      //     };
      //   });
      // });
      this.$api.WXfaultDetails().then((res) => {
        if (res.code == 200) {
          let filteredData = res.data.map((item) => {
            return {
              dictValue: item.faultDetails,
              dictLabel: item.faultDetails,
            };
          });
          this.FaultDetails = filteredData.filter(
            (obj) =>
              obj.dictValue !== "" &&
              Object.keys(obj).length > 0 &&
              obj.dictValue !== undefined
          );
          console.log(this.FaultDetails, "this.FaultDetails");
        }
      });
    },

    //计算维修时长
    getTimeXL(endtime, statustime) {
      // 定义起始时间和结束时间
      var statustimes = new Date(statustime);
      var endtimes = new Date(statustime);
      // 计算时间差（以毫秒为单位）
      var timeDiff = endtimes - statustimes;
      // 将时间差转换为小时和分钟
      var hours = Math.floor(timeDiff / (1000 * 60 * 60));
      var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      // 输出结果
      return hours + "时 " + minutes + "分";
    },
    //获取当前用户得身份
    getUserIdentity() {
      let userInfoRoles = this.userInfo.roles;
      this.leader =
        userInfoRoles.includes("leader") || userInfoRoles.includes("admin"); //领导
      this.generalWorkers =
        userInfoRoles.includes("generalWorkers") ||
        userInfoRoles.includes("admin"); //普工
      this.manager =
        userInfoRoles.includes("manager") || userInfoRoles.includes("admin"); //管理人员
      this.monitor =
        userInfoRoles.includes("monitor") || userInfoRoles.includes("admin"); //班长
      this.maintenance =
        userInfoRoles.includes("maintenance") ||
        userInfoRoles.includes("admin"); //维修人员
      this.engineer =
        userInfoRoles.includes("engineer") || userInfoRoles.includes("admin"); //工程师
      this.isNowLeader =
        userInfoRoles.includes("leader") || userInfoRoles.includes("admin"); //是否是当前登录的领导
      this.isNowMonitor =
        userInfoRoles.includes("monitor") || userInfoRoles.includes("admin"); //是否是当前登录的班长
    },
    //标题数据
    getWXselAllById() {
        console.log('查询顶部参数')
      // this.$api.titleData().then((res) => {
      //   if (res.code == 200 && res.data) {
      //       console.log('顶部参数',data)
      //     this.Headtitle = res.data;
      //   }
      // });
    },

    addRow() {
      if (this.form.parcsVOS) {
        this.form.parcsVOS.push({
          partsType: "",
          receiveAmount: 0,
          partsName: "",
          partsUnits: "",
        });
      } else {
        this.form.parcsVOS = [];
        this.form.parcsVOS.push({
          partsType: "",
          receiveAmount: 0,
          partsName: "",
          partsUnits: "",
        });
      }
    },

    cancel() {
      this.dialogShow = false;
      this.dialogType = 0;
    },
    handleEdit(type) {
      this.dialogShow = true;
      this.dialogType = type;
      switch (type) {
        case 1:
          break;
      }
    },
    //更换零部件 删除行
    delRow(index) {
      this.form.parcsVOS.splice(index, 1);
    },

    handleGB() {
      this.dialogTableVisible = false;
    },

    handleQR() {
      this.$refs["Rules1111"].validate((valid) => {
        if (valid) {
          this.dialogTableVisible = false;
          this.form.conditionEntity = this.TCform.conditionEntity;
          if (this.TCform.conditionEntity.changePart == 1) {
            this.ishandleQR = true;
          } else {
            this.ishandleQR = false;
          }
          this.dictValue = this.form.conditionEntity.faultDetails;
          this.dictLabel = this.form.conditionEntity.faultDetails;
          // this.dictValue = this.FaultDetails.filter((e, index) => {
          //   return e.dictValue == this.form.conditionEntity.faultDetails;
          // })[0].dictValue;
          // this.dictLabel = this.FaultDetails.filter((e, index) => {
          //   return e.dictValue == this.form.conditionEntity.faultDetails;
          // })[0].dictLabel;
          console.log(this.dictLabel, "修改数据");
          this.form.conditionEntity.faultDetails = this.dictLabel;
        } else {
          return false;
        }
      });
    },
    //故障信息图片上传成功
    handleFileSuccess(res, file, filelist) {
      let imageInfo = {
        url: res.data.url,
        name: res.data.fileName,
        picturePath: res.data.url,
        pictureName: res.data.fileName,
        pictureSize: res.data.size / 1024,
        pictureType: 1,
      };
      this.editInfo.imgList.push(imageInfo);
    },
    //wx图片上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 2MB!");
      // }
      return isJPG;
    },
    //维修处理图片上传成功
    WXhandleFileSuccess(res, file, filelist) {
      let WXimageInfo = {
        url: res.data.url,
        name: res.data.fileName,
        picturePath: res.data.url,
        pictureName: res.data.fileName,
        pictureSize: res.data.size / 1024,
        pictureType: 1,
      };
      this.form.accessoryVOS.push(WXimageInfo);
    },
    onSubmit3(status) {
      this.$refs.uploadwx.submit();
      this.getWXupdateSituationBySituationVO(status); //维修完成
      this.onCancel();
    },
    onSubmit4(status) {
      this.getWXaddOperatedPeople(); //操作人员确认完成
      this.onCancel();
    },
    onSubmit5(status) {
      this.getWXaddLeadCheck(); //工程师
      this.onCancel();
    },
    onSubmit6(status) {
      this.getWXaddMaintainSpotTest(); //主管抽检
      this.onCancel();
    },
    getWXaddMaintainSpotTest() {
      this.$api
        .WXaddMaintainSpotTest({
          facilityIds: [this.$route.query.id],
          ...this.selStopByList,
          workStatus: 6,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("设备主管抽检完成");
          }
        });
    },

    getWXaddLeadCheck() {
      this.$api
        .WXaddLeadCheck({
          ...this.EngineerAcceptanceList,
          workStatus: 5,
          facilityIds: [this.$route.query.id],
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("工程师提交完成");
          }
        });
    },
    getWXaddOperatedPeople() {
      this.$api
        .WXaddOperatedPeople({
          ...this.selOperatedPeopleByList,
          workStatus: 4,
          facilityId: this.$route.query.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作人员确认维修完成");
          }
        });
    },
    //维修完成保存
    getWXupdateSituationBySituationVO(workStatus) {
      this.form.conditionEntity.faultDetails = this.dictValue;
      this.form.conditionEntity.maintainTime = undefined;
      this.form.conditionEntity.changePart =
        this.form.conditionEntity.changePart == "undefined"
          ? 1
          : this.form.conditionEntity.changePart;
      this.form.conditionEntity.whetherLine =
        this.form.conditionEntity.whetherLine == "undefined"
          ? 1
          : this.form.conditionEntity.whetherLine;
      this.$api
        .WXupdateSituationBySituationVO({
          ...this.form,
          facilityId: this.$route.query.id,
          workStatus: workStatus,
          parcsVOS: this.form.parcsVOS,
        })
        .then((res) => {
          if (res.code == 200) {
            if (workStatus == 2) {
              this.$message.success("维修保存成功");
            } else {
              this.$message.success("维修完成");
            }
          }
        });
    },

    getWXselRecordByID(id) {
      this.$api
        .WXselRecordByID(id)
        .then((res) => {
          if (res.code == 200 && res.data !== undefined) {
            let row = res.data;
            let imgList;
            if (row.accessoryVOS && row.accessoryVOS.length > 0) {
              imgList = row.accessoryVOS.map((img) => {
                return {
                  ...img,
                  ...{
                    url: img.picturePath,
                    name: img.pictureName,
                  },
                };
              });
              this.form = {
                accessoryVOS: imgList || [],
                conditionEntity:
                  {
                    ...row.conditionEntity,
                    fulfillTime: row.conditionEntity.fulfillTime,
                    whetherLine: row.conditionEntity.whetherLine + "",
                    changePart: row.conditionEntity.changePart + "",
                  } || {},
                endMaintenanceEntity: row.endMaintenanceEntity || {},
                facilityMaintain: row.facilityMaintain || {},
                parcsVOS: row.parcsVOS || [],
              };

              this.form.conditionEntity.faultDetails = this.FaultDetails.filter(
                (e, index) => {
                  return e.dictValue == this.form.conditionEntity.faultDetails;
                }
              )[0].dictLabel;

              console.log(this.TCform, "数据生产1");

              if (this.TCform.conditionEntity.changePart == 1) {
                this.ishandleQR = true;
              } else {
                this.ishandleQR = false;
              }
            } else {
              this.form = {
                accessoryVOS: imgList || [],
                conditionEntity:
                  {
                    ...row.conditionEntity,
                    fulfillTime: row.conditionEntity.fulfillTime,
                    whetherLine: row.conditionEntity.whetherLine + "",
                    changePart: row.conditionEntity.changePart + "",
                  } || {},
                endMaintenanceEntity: row.endMaintenanceEntity || {},
                facilityMaintain: row.facilityMaintain || {},
                parcsVOS: row.parcsVOS || [],
              };
              this.form.conditionEntity.faultDetails = this.FaultDetails.filter(
                (e, index) => {
                  return e.dictValue == this.form.conditionEntity.faultDetails;
                }
              )[0].dictLabel;
              this.TCform = this.form;
              console.log(this.TCform, "数据生产2");

              if (this.TCform.conditionEntity.changePart == 1) {
                this.ishandleQR = true;
              } else {
                this.ishandleQR = false;
              }
            }
          } else {
            this.form = {
              accessoryVOS: [],
              conditionEntity: {
                fulfillTime: null,
              },
              endMaintenanceEntity: {},
              facilityMaintain: {},
              parcsVOS: [],
            };
            this.TCform = this.form;
            console.log(this.TCform, "数据生产3");
          }
          console.log("接口成功", res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //取消
    onCancel() {
      // 调用全局挂载的方法，关闭当前页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //图片上传删除
    handleRemove(file, fileList) {
      // 获取要删除的图片的信息
      for (let i = 0; i < this.form.accessoryVOS.length; i++) {
        if (this.form.accessoryVOS[i].picturePath === file.picturePath) {
          this.form.accessoryVOS.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
          i--; // 如果不减，将漏掉一个元素
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    submitForm() {
      this.dialogShow = false;
      this.dialogShowForm = {};
    },
    /** 关闭按钮 */
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/tool/gen", query: { t: Date.now() } });
    },
    //驳回
    BHhandler() {
      let workst = Number(this.$route.query.workStatus);
      if (workst < 2) {
        this.$message.error("驳回失败，保修单未认领");
        this.onCancel();
        return;
      }
      let addOperatedPeopleInfo;
      switch (workst) {
        case 3:
          addOperatedPeopleInfo = this.selOperatedPeopleByList;
          console.log(addOperatedPeopleInfo, "222");

          break;
        case 4:
          addOperatedPeopleInfo = this.EngineerAcceptanceList;
          console.log(addOperatedPeopleInfo, "3333");
          break;
        case 5:
          addOperatedPeopleInfo = this.selStopByList;
          break;
        default:
          break;
      }
      this.$api
        .WXaddOperatedPeople({
          ...addOperatedPeopleInfo,
          facilityId: this.$route.query.id,
          workStatus: 2,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作驳回成功");
            //驳回发送订阅消息
            this.sendMsg(addOperatedPeopleInfo)
          } else {
            this.$message.error("操作驳回失败");
          }
        })
        .catch((e) => {
          return e;
        });
      this.onCancel();
    },
    //发送驳回 订阅消息
    async sendMsg(param){
      console.log('驳回订阅消息参数=',param)
      //发送驳回订阅消息
      let { feedback,checkIdea } = param
      //获取操作人类型
      let handlePeople = this.isWorkStatus ==  3 ?  '操作人' :'工程师'
      let reason = this.isWorkStatus ==  3 ?  feedback : checkIdea

      const res1 = await this.$api.SendMsgReject({
        msgType:'workStatus',
        data:{
          "thing9": {
            "value": "设备维修" //工单类型   设备维修驳回  巡检驳回  保养驳回
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
        usetId:this.Headtitle.maintainPeopleId,//负责人id
      });
    }
  },
};
</script>
<style scoped lang="scss">
.wxtitle {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.topboxheader {
  position: relative;
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
  position: relative;
}

.headerbox {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > :nth-child(2) {
    color: #1890ff;
  }
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
  box-shadow: 0 0 10px #a0a8a0;
}

::v-deep .el-upload--picture-card {
  width: 15.6875rem !important;
  font-size: 14px;
}

::v-deep .equipment-list .el-card {
  margin: auto 5%;
}

::v-deep .el-tabs {
  padding-bottom: 100px;
}
</style>
