<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>设备信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备名称" prop="facilityName">
                  <el-popover placement="bottom" width="600" trigger="click">
                    <el-tree
                      ref="tree"
                      style="height: 500px; overflow: auto"
                      :data="equipmentTreeList"
                      show-checkbox
                      accordion
                      node-key="id"
                      :default-checked-keys="checkedKeys"
                      @check="handleCheck"
                    />
                    <el-input
                      v-model="form.facilityName"
                      style="width: 90%"
                      slot="reference"
                      placeholder="请选择设备"
                      :readonly="true"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备编号:" prop="facilityNumber">
                  <el-input
                    :disabled="true"
                    style="width: 90%"
                    placeholder="请输入设备编号"
                    v-model="form.facilityNumber"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备型号:" prop="sizeModel">
                  <el-input
                    :disabled="true"
                    style="width: 90%"
                    placeholder="请输入设备型号"
                    v-model="form.sizeModel"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备类型:" prop="facilityCategory">
                  <el-input
                    :disabled="true"
                    style="width: 90%"
                    placeholder="请输入设备型号"
                    v-model="form.facilityCategory"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="区域:" prop="area">
                  <el-input
                    :disabled="true"
                    style="width: 90%"
                    placeholder="请输入区域"
                    v-model="form.area"
                  />
                </el-form-item>
                <!-- <el-form-item label="区域:" prop="area">
                  <el-select
                    style="width: 90%"
                    :disabled="true"
                    v-model="form.area"
                    placeholder="请选择区域"
                    @change="handleSelectUserChange"
                  >
                    <el-option
                      v-for="item in TEselStationList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.label"
                      :disabled="item.status == 1"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>报修信息</span>
            </div>

            <el-row>
              <el-col :span="12">
                <el-form-item label="报修单号:" prop="maintainOrderNumber">
                  <el-input
                    style="width: 90%"
                    :disabled="true"
                    placeholder="系统自动生成"
                    v-model="form.maintainOrderNumber"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12" style="float: left">
                <el-form-item label="报修人:" prop="repairsPeople">
                  <el-select
                    :disabled="true"
                    style="width: 90%"
                    v-model="form.repairsPeople"
                    placeholder="请选择报修人"
                    @change="handleSelectUserChange"
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.nickName"
                      :value="item.userId"
                      :disabled="item.status == 1"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系方式:" prop="repairsPeoplePhone">
                    <el-input
                      disabled
                      style="width: 90%"
                      placeholder="联系方式"
                      v-model="form.repairsPeoplePhone"
                      type="number"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="故障类型:" prop="faultStatus">
                    <el-select
                      v-model="form.faultStatus"
                      placeholder="故障类型"
                      clearable
                      size="small"
                      style="width: 90%"
                    >
                      <el-option
                        v-for="dict in FaultStatus"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>故障信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="运行状态:" prop="operatingState">
                  <el-select
                    style="width: 90%"
                    v-model="form.operatingState"
                    placeholder="请选择运行状态"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否停线:" prop="whetherLineStop">
                  <el-radio v-model="form.whetherLineStop" label="0"
                    >是</el-radio
                  >
                  <el-radio v-model="form.whetherLineStop" label="1"
                    >否</el-radio
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="故障开始时间:" prop="breakdownTime">
                  <el-date-picker
                    style="width: 90%"
                    v-model="form.breakdownTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    data-format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    style="width: 90%"
                    placeholder="请输入备注"
                    v-model="form.remark"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="存在问题:" prop="existProblem">
                  <el-input
                    v-model="form.existProblem"
                    style="width: 96%"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入存在问题"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header">
              <span>故障图片</span>
            </div>
            <div style="padding-bottom: 20px" class="upload-box">
              <p>最多上传10张图片</p>
              <el-upload
                list-type="picture-card"
                ref="uploadImg"
                :limit="10"
                accept=".png, .jpg"
                :headers="upload.headers"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :action="upload.url + '?updateSupport=' + upload.updateSupport"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="ImghandleFileSuccess"
                :auto-upload="true"
                :file-list="form.accessor"
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
        <el-col :span="24" style="height: 100px"></el-col>
      </el-row>
      <el-row class="foot-btn flex justify-center align-center">
        <el-col :span="24" class="flex justify-center align-center">
          <el-button @click="onCancel()">
            {{ isCreate ? "关闭" : "取消" }}
          </el-button>
          <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(0)">保存</el-button>
          <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(1)">保存并提交</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 弹窗 -->
    <el-dialog
      title="选择设备"
      :visible.sync="dialogFormVisible"
      :modal="false"
    >
      <div class="herder flex justify-between">
        <el-input
          v-model="SBqueryParams.codeOrName"
          placeholder="请输入设备名称"
          style="width: 200px; margin: 0 0 10px 0"
        ></el-input>
        <div>
          <el-button type="cyan" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </div>
      </div>
      <el-table
        :data="SBlistlist"
        style="width: 100%"
        @row-click="singleElection"
        highlight-current-row
      >
        <el-table-column align="center" width="80" label="选择">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="selectCode" :label="scope.row.id">
              <!-- 加个span空标签是不显示“选择”列展示的内容 -->
              <span></span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column property="index" label="序号" width="55">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          property="equipmentName"
          label="设备名称"
          align="center"
        ></el-table-column>
        <el-table-column
          property="equipmentNumber"
          label="设备编号"
          align="center"
        ></el-table-column>
        <el-table-column
          property="model"
          label="设备型号"
          align="center"
        ></el-table-column>
        <el-table-column property="type" align="center" label="设备类别">
          <template slot-scope="scope">{{
            scope.row.facilityCategory == 0 ? "重要设备" : "一般设备"
          }}</template>
        </el-table-column>
        <el-table-column
          property="area"
          align="center"
          label="区域"
        ></el-table-column>
      </el-table>
      <pagination
        v-show="SBtotal > 0"
        :total="SBtotal"
        :page.sync="SBqueryParams.pageNum"
        :limit.sync="SBqueryParams.pageSize"
        @pagination="SBlistlist"
        :file-list="form.accessor"
        position="left"
        class="pageleft"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTC">取 消</el-button>
        <el-button type="success" @click="handleTcQD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { listUser } from "@/api/system/user";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";

export default {
  components: { Treeselect },
  name: "Addsb",
  data() {
    return {
      TEselStationList: [],
      //用户列表
      userList: [],
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
      total: 0,
      SBtotal: 0,
      options1: [
        {
          status: "0",
          label: "重点设备",
        },
        {
          status: "1",
          label: "一般设备",
        },
      ],
      options: [
        {
          status: 0,
          label: "带病运行",
        },
        {
          status: 1,
          label: "停机",
        },
      ],

      rules: {
        faultStatus: [
          { required: true, message: "请选择故障类型", trigger: "change" },
        ],
        whetherLineStop: [
          { required: true, message: "请选择是否停线", trigger: "change" },
        ],
        breakdownTime: [
          { required: true, message: "请选择故障开始时间", trigger: "change" },
        ],
        existProblem: [
          { required: true, message: "请输入存在问题", trigger: "change" },
        ],
        facilityName: [
          { required: false, message: "请选择设备", trigger: "change" },
        ],
        repairsPeoplePhone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        workStatus: [
          { required: true, message: "选择运行状态", trigger: "change" },
        ],
      },
      //  当前行选中的唯一标识，这里是code
      selectCode: "",
      //   当前行选中的数据row
      checkObj: {},
      queryParams: {
        code: "",
        isAsc: "",
        name: "",
        orderBy: "",
        orderByColumn: "",
        pageNum: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      accessors: [],
      form: {
        breakdownTime: new Date(),
        whetherLineStop: "1",
      },
      isCreate: false, //是否是新增页面
      isSubmit: false, //是否提交完成
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 加载层信息
      loading: [],
      filePath: [],
      pictureName: [],
      filetype: [],
      pictureSize: [],
      SBlistlist: [],
      SBqueryParams: {
        codeOrName: "",
        isAsc: "",
        orderBy: "",
        orderByColumn: "",
        pageNum: 1,
        pageSize: 10,
      },
      FaultStatus: [], //故障详情
      FaultDetails: [],
      equipmentTreeList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkedKeys: [],
      lastKey: [],
      parentIdx: 0,
    };
  },
  created() {
    this.getOtherData();
    this.getList();
    this.getuserList();
    this.getTEselStation();
    this.GETselAllById();
    this.form.repairsPeople = this.userInfo.user.nickName;
    this.form.repairsPeoplePhone = this.userInfo.user.phonenumber;

    /*巡检任务转保修赋值 备注及设备信息*/
    this.inspectionToMaintenance();
  },
  // watch: {
  //   "form.area"(newVal, oldVal) {
  //     this.form.area = this.$refs.treeselect.selectedNodes[0].label;
  //   },
  // },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {},
  methods: {
    /*巡检任务转保修赋值 备注及设备信息*/
    inspectionToMaintenance() {
      if (this.$route.query && this.$route.query.remark) {
        let {
          remark,
          facilityName,
          facilityNumber,
          sizeModel,
          facilityCategory,
          area,
        } = this.$route.query;
        this.form = {
          ...this.form,
          ...{
            remark,
            facilityName,
            facilityNumber,
            sizeModel,
            facilityCategory,
            area,
          },
        };
      }
    },
    //获取其他需求数据
    getOtherData() {
      //巡检计划类型Fault_Status
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
      this.getDicts("Fault_Details").then((response) => {
        this.FaultDetails = response.data.map((item) => {
          return {
            ...item,
            ...{
              dictValue: Number(item.dictValue),
            },
          };
        });
      });
      //获取设备列表 equipmentTreeList
      this.$api
        .treeData()
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
          obj.label = obj.maintenanceName;
          obj.id = obj.maintenanceId;
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
    GETselAllById() {
      if (this.$route.query.id && this.$route.query.id[0]) {
        this.$api.WXselAllById(this.$route.query.id).then((res) => {
          if (res.code == 200 && res.data !== undefined) {
            let row = res.data;
            //赋值树结构回显
            this.checkedKeys = res.data.equipmentIdS;
            let imgList;
            if (row.accessor && row.accessor.length > 0) {
              imgList = res.data.accessor.map((img) => {
                return {
                  ...img,
                  ...{
                    url: img.picturePath,
                    name: img.pictureName,
                  },
                  // ...img,
                };
              });
              this.form = {
                ...res.data,
                accessor: imgList || [],
                whetherLineStop: res.data.whetherLineStop + "",
                faultStatus:
                  row.faultStatus == "0"
                    ? (this.form.faultStatus = " 机械类故障")
                    : (this.form.faultStatus = "电气类故障"),
                facilityCategory:
                  row.facilityCategory == "1"
                    ? (this.form.facilityCategory = " 一般设备")
                    : (this.form.facilityCategory = "重型设备"),
              };
            } else {
              this.form = {
                ...res.data,
                accessor: [],
                whetherLineStop: res.data.whetherLineStop + "",
                faultStatus:
                  row.faultStatus == "0"
                    ? (this.form.faultStatus = " 机械类故障")
                    : (this.form.faultStatus = "电气类故障"),
                facilityCategory:
                  row.facilityCategory == "1"
                    ? (this.form.facilityCategory = " 一般设备")
                    : (this.form.facilityCategory = "重型设备"),
              };
            }
          }
        });
      }
    },
    //获取工位
    getTEselStation() {
      this.$api
        .TEselStation()
        .then((res) => {
          if (res.code == 200) {
            this.TEselStationList = res.data;
            const treeData = [];
            for (const [key, value] of Object.entries(res.data)) {
              const children = value.map((item) => ({
                label: item.postName,
                id: item.postId,
                area: item.area,
                areaId: item.areaId,
                type: item.type,
              }));
              treeData.push({
                label: key,
                id: value[0].areaId,
                children,
              });
            }
            return (this.TEselStationList = treeData);
          } else {
            console.log(`接口成功,但接口状态=${res.code}`, res);
          }
        })
        .catch((err) => {
          console.log("接口失败", err);
        });
    },
    /** 查询用户列表 */
    getuserList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams)).then((response) => {
        if (response.code == 200) {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      });
    },
    //报修人关联手机号
    handleSelectUserChange(e) {
      this.form.repairsPeoplePhone = this.userList.filter((item) => {
        return item.userId == e;
      })[0].phonenumber;
    },
    ImghandleFileSuccess(res, file, filelist) {
      console.log(res, "上传");
      let imageInfo = {
        picturePath: res.data.url,
        pictureName: res.data.fileName,
        pictureType: 0,
        pictureSize: res.data.size / 1024,
      };
      this.accessors.push(imageInfo);
      this.form.accessor = this.accessors;
      console.log("图片上传成功", this.form.accessor, this.accessors);
      console.log("form数据", this.form);
    },
    handleFileUploadProgress(row) {},
    closeTC() {
      this.dialogFormVisible = false;
      this.queryParams = {};
    },
    //弹窗确定
    handleTcQD() {
      this.form.deviceId = this.checkObj.id;
      this.form.facilityName = this.checkObj.equipmentName;
      this.form.facilityNumber = this.checkObj.equipmentNumber;
      this.form.sizeModel = this.checkObj.model;
      this.form.facilityCategory = this.checkObj.typeCode;
      if (this.checkObj.typeCode == 1) {
        this.form.facilityCategory = "一般设备";
      } else {
        this.form.facilityCategory = "重点设备";
      }
      this.form.area = this.checkObj.area;
      this.dialogFormVisible = false;
    },
    handletreelist() {
      this.dialogFormVisible = true;
    },

    getList() {
      this.$api.SBlistlist(this.SBqueryParams).then((res) => {
        if (res.code == 200) {
          this.SBlistlist = res.data;
          this.SBtotal = res.data.length;
        }
      });
    },
    //弹窗表格单选
    singleElection(row) {
      this.selectCode = row.id;
      let list = this.SBlistlist.filter((item) => item.id === row.id);
      this.checkObj = list[0];
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.SBqueryParams.codeOrName = "";
      this.checkObj = {};
      this.selectCode = "";
      this.queryParams = {};
      this.form = {};
      this.getList();
    },
    //提交
    onSubmit(status) {
        this.$message.success("维修单保存成功");
        this.$router.go(-1);
        return;
      this.form.workStatus = status;
      if (this.form.facilityCategory == "一般设备") {
        this.form.facilityCategory = 1;
      } else {
        this.form.facilityCategory = 0;
      }
      if (this.form.faultStatus == " 机械类故障") {
        this.form.faultStatus = "0";
      }
      if (this.form.faultStatus == " 电气类故障") {
        this.form.faultStatus = "1";
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.facilityId) {
            this.$api.WXadd(this.form).then((res) => {
              if (res.code == 200) {
                if (status == 0) {
                  this.$message.success("新增维修单创建成功");
                } else {
                  this.$message.success("新增维修单保存并提交成功");
                  //发送订阅消息
                  this.sendMsg(this.form)
                }
              }
            });
          } else {
            this.$api.WXupdateFaultById(this.form).then((res) => {
              if (res.code == 200) {
                if (status == 0) {
                  this.$message.success("修改新增报修单成功");
                } else {
                  this.$message.success("修改维修单保存并提交成功");
                  //发送订阅消息
                  this.sendMsg(this.form)
                }
              }
            });
          }
          // 调用全局挂载的方法，关闭当前页
          this.$store.dispatch("tagsView/delView", this.$route);
          // 返回上一步路由
          this.$router.go(-1);
          this.getList();
        }
      });
    },
    //发送订阅消息
    async sendMsg(param){
      //发送订阅消息
      let { facilityName,area,repairsPeople,repairsStartTime,faultStatus } = param
      const res1 = await this.$api.SendMsgSubmit({
        msgType:'repair',
        type:'maintenance',
        data:{
          "thing4": {
            "value": facilityName //设备名称
          },
          "thing3": {
            "value": area||'-'  //区域
          },
          "thing6": {
            "value": repairsPeople  //报修人
          },
          "time7": {
            "value": this.dayjs(repairsStartTime).format('YYYY-MM-DD HH:mm'),   //报修时间
          },
          "thing2": {
            "value": faultStatus === '0' ? "机械类故障" : "电气类故障"   //报障类型
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
      this.form = {};
      this.resetQuery();
    },

    //图片删除
    handleRemove(file, fileList) {
      // console.log(file);
      // 获取要删除的图片的信息
      for (let i = 0; i < this.form.accessor.length; i++) {
        if (this.form.accessor[i].picturePath === file.picturePath) {
          this.form.accessor.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
          i--; // 如果不减，将漏掉一个元素
        }
      }
      // this.form.accessor = this.form.accessor.filter(item => {
      //   return item.picturePath != file.picturePath
      // })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //设备树状多选
    handleCheck(data, node) {
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
          if (node.checkedNodes.length == 1) {
            //只有一个子节点 使用当前节点 赋值
            let allNodes = nowCheckedNodes.concat(node.halfCheckedNodes);
            this.form.deviceIds = [nowCheckedNodesChild[0].id];
            let parentEquipment = nowCheckedNodesChild[0];
            this.form = {
              ...this.form,
              ...{
                deviceId: parentEquipment.id,
                facilityName: parentEquipment.maintenanceName,
                facilityNumber: parentEquipment.maintenanceCode,
                sizeModel: parentEquipment.specification,
                facilityCategory:
                  parentEquipment.maintenanceType == 1
                    ? "一般设备"
                    : "重点设备",
                //根据需求区域改为父类的名称
                area: parentEquipment.pname,
              },
            };
          } else {
            //合并 当前选中的节点或者 半选中的节点
            let allNodes = nowCheckedNodes.concat(node.halfCheckedNodes);
            this.form.deviceIds = nowCheckedNodesChild.map((res) => res.id);
            let parentEquipment = allNodes.filter(
              (item) => item.id == nowCheckedNodesChild[0].pid
            )[0];
            this.form = {
              ...this.form,
              ...{
                deviceId: parentEquipment.id,
                facilityName: parentEquipment.maintenanceName,
                facilityNumber: parentEquipment.maintenanceCode,
                sizeModel: parentEquipment.specification,
                facilityCategory:
                  parentEquipment.maintenanceType == 1
                    ? "一般设备"
                    : "重点设备",
                area: parentEquipment.area,
              },
            };
          }
        } else {
          this.form.deviceIds = [];
          this.form.deviceId = "";
          this.form.facilityName = "";
          this.form.facilityNumber = "";
          this.form.sizeModel = "";
          this.form.facilityCategory = "";
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  width: 100%;
  height: calc(1050px - 10px);
  position: relative;
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

::v-deep .el-upload--picture-card {
  width: 15.6875rem !important;
  font-size: 14px;
}

.wx-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
