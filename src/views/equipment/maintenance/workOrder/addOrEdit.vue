<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>报修工单基础信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="设备" prop="DeviceName">
                                    <el-select v-model="form.DeviceName" @change="changeEquipment" value-key="ailas" placeholder="请选择设备" clearable  style="width: 90%" :disabled="!!isEdit">
                                        <el-option v-for="dict in equipmentTreeList" :key="dict.id" :label="dict.name"
                                                   :value="dict" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="设备编号:" prop="code">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="请选择设备"
                                        v-model="form.code"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="设备类型:" prop="DeviceType">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="请选择设备"
                                        v-model="form.DeviceType"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="规格型号:" prop="model">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="请选择设备"
                                        v-model="form.model"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="报修部门:" prop="dept">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        v-model="form.dept"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="报修人:" prop="repairApplicant">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        v-model="form.repairApplicant"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="报修时间:" prop="repairTime">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="报修时间"
                                        v-model="form.repairTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>报修工单故障信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="目前状态:" prop="currentStatus">
                                    <el-select v-model="form.currentStatus" placeholder="请选择目前状态" clearable  style="width: 90%">
                                        <el-option v-for="(dict,index) in dict.type.work_order_run_status" :key="index" :label="dict.label"
                                                   :value="dict.label" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="故障时间:" prop="downTime">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="故障时间"
                                        v-model="form.downTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="备注:" prop="remark">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="备注"
                                        v-model="form.remark"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="故障描述:" prop="desc">
                                    <el-input
                                        type="textarea"
                                        style="width: 90%"
                                        placeholder="请输入故障描述"
                                        v-model="form.desc"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>现场图片</span>
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
                        {{ isEdit ? "关闭" : "取消" }}
                    </el-button>
                    <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(0)">保存</el-button>
                    <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(1)">保存并提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";

export default {
    name: "addOrEdit",
    dicts: ['work_order_run_status'],
    data() {
        var checkAge = (rule, value, callback) => {
            if (value !== '' && value < 0) {
                callback(new Error('寿命不能小于0'));
            } else {
                callback();
            }
        };
        return {
            //需求部门下拉列表
            deptOptions:[],
            //区域下拉数据
            FormJQtype:[],
            //设备类型下拉数据
            deviceTypeOption:[],
            //设备模型下拉数据
            equipmentTreeList: [],
            //
            checkedKeys: [],
            //需求下拉数据
            options: [
                {
                    status: 0,
                    label: "需求1",
                },
                {
                    status: 1,
                    label: "需求2",
                },
            ],

            rules: {
                DeviceName: [
                    { required: true, message: "请选择设备", trigger: "blur" },
                ],
                DeviceType: [
                    { required: true, message: "请选择设备", trigger: "change" },
                ],
                code: [
                    { required: true, message: "请选择设备", trigger: "change" },
                ],
                model: [
                    { required: true, message: "请选择设备", trigger: "change" },
                ],
                dept: [
                    { required: true, message: "请选择报修部门", trigger: "change" },
                ],
                repairApplicant: [
                    { required: true, message: "请选择报修人", trigger: "change" },
                ],
                repairTime: [
                    { required: true, message: "请选择报修部门", trigger: "change" },
                ],
                desc: [
                    { required: true, message: "请输入故障描述", trigger: "change" },
                ],
                currentStatus: [
                    { required: true, message: "请选择目前状态", trigger: "change" },
                ],
                downTime: [
                    { required: true, message: "请选择故障", trigger: "change" },
                ],

            },
            accessors: [],
            form: {
                DeviceName:'',
                DeviceType:'',
                code:'',
                model:'',
                dept:'',
                repairApplicant:'',
                repairTime:'',
                currentStatus:'',
                downTime:'',
                desc:'',
                imgs:[],
            },
            //图片预览参数  url
            dialogImageUrl: "",
            //图片预览参数  显隐控制
            dialogVisible: false,
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
                url: process.env.VUE_APP_BASE_API + "file/upload",
            },
            filesids:[]
        };
    },
    created() {
        this.getOtherData();


    },
    computed: {
        isEdit(){
            return this.$route.query && this.$route.query.id
        },
    },
    mounted() {
        //修改判断
        if(this.isEdit){
            this.form = {
                DeviceName:'起重机',
                DeviceType:'w-1200',
                code:'23-001-w-1200',
                model:'120nm',
                dept:'开发',
                repairApplicant:'admin',
                repairTime:'2024-01-02 12:56:21',
                currentStatus:'运行',
                downTime:'2024-01-02 10:56:21',
                desc:'启动异响',
                accessor:[
                    {
                        url: 'http://192.168.8.59:10300/statics/2023/12/27/立罐3_20231227155738A001.png',
                        pictureName: '立罐3.png',
                        pictureType: 0,
                        imgSize: 15953,
                    }
                ],
            }
        }else {
            this.form.dept = '开发部'
            this.form.repairApplicant = 'admin'
        }
    },
    methods: {
        //获取其他需求数据
        getOtherData() {
            //获取部门列表
            deptTreeSelect({
                pageNum: 1,
                pageSize: 1000,
            }).then((res) => {
                if (res.code == 200) {
                    this.deptOptions = res.data;
                }
            });
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({ nodeAreaType: "2" }).then(res => {
                this.FormJQtype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            //设备模型的类型
            this.$api.e_deviceTypeList(
                {
                    pageNum:1,
                    pageSize:1000
                }
            ).then(res => {
                this.deviceTypeOption = res.rows.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //获取设备列表 equipmentTreeList
            this.$api.e_deviceListList({
                pageNum:1,
                pageSize:1000
            }).then(response => {
                this.equipmentTreeList = response.rows
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
        //设备模型选择后赋值 设备类型
        changeEquipment(e){
            console.log('设备',e)
            this.form.DeviceName = e.ailas
            this.form.code = e.code
            this.form.DeviceType = e.typeName
            this.form.model = e.num
        },
        //部门选择变化
        demandDeptChaneg(e){
            console.log('部门选择变化',e)
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
        //提交
        onSubmit(status) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success("设备档案保存成功");
                    this.$router.go(-1);
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
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //文档上传 按钮操作
        handleUploadFile(){
            this.upload.title = "关联文档";
            this.upload.open = true;
        },
        //删除文档操作
        handleDeleteFile(row){
            const idx = this.filesids;
            this.form.files = this.form.files.filter(item => {
                return idx.indexOf(item.timeStamp) === -1
            })
        },
        // 关联文档 多选框选中数据
        handleSelectionChange(selection) {
            this.filesids = selection.map(item => item.timeStamp);
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.fileUpload.submit();
        },
        fileUploadSuccess(res, file, filelist) {
            console.log(res, "上传");
            let {name,originalFilename,size,type,url} = res.data
            this.form.files.unshift({
               timeStamp:new Date().getTime(),
               fileName:originalFilename,
               fileUPTime:this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
               fileUPUser:'admin',
               fileSize:size
            })
            this.upload.open = false
        },
        handleCheck(node,row){
            console.log(node,row)
            this.form.DeviceName = node.maintenanceName
            this.form.code = node.maintenanceCode
            this.form.DeviceType = node.maintenanceType
            this.form.model = node.maintenanceCode
        }
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
