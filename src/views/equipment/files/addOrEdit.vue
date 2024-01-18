<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>设备基础信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="设备" prop="parentsId">
                                    <el-select v-model="form.parentsId" @change="changeEquipment" value-key="name" placeholder="请选择设备" clearable  style="width: 90%" :disabled="!!isEdit">
                                        <el-option v-for="dict in equipmentTreeList" :key="dict.id" :label="dict.name"
                                                   :value="dict" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="设备编号:" prop="DeviceNumber">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="系统自动生成"
                                        v-model="form.DeviceNumber"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="设备名称:" prop="DeviceName">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入设备名称"
                                        v-model="form.DeviceName"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="设备类型:" prop="DeviceType">
                                    <el-select v-model="form.DeviceType" placeholder="请选择设备模型" style="width: 90%" disabled>
                                        <el-option v-for="(item, index) in deviceTypeOption" :key="index" :label="item.label"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="位号:" prop="tagNumber">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入位号"
                                        v-model="form.tagNumber"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="规格型号:" prop="model">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入规格型号"
                                        v-model="form.model"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>设备使用信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="当前状态:" prop="CurrentStatusId">
                                    <el-select v-model="form.CurrentStatusId" placeholder="请选择状态" clearable  style="width: 90%">
                                        <el-option v-for="(dict,index) in dict.type.equipment_files_status" :key="index" :label="dict.label"
                                                   :value="dict.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="区域:" prop="areaID">
                                    <el-select v-model="form.areaID" placeholder="请选择区域" style="width: 90%">
                                        <el-option v-for="(dict,index) in FormJQtype" :key="index" :label="dict.label"
                                                   :value="dict.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="存放位置:" prop="StorageLocation">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="存放位置"
                                        v-model="form.StorageLocation"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="启用时间:" prop="startTime">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="启用时间"
                                        v-model="form.startTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="负责人:" prop="ResponsiblePerson">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入负责人"
                                        v-model="form.ResponsiblePerson"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="负责电话:" prop="PhoneNumber">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入负责电话"
                                        v-model="form.PhoneNumber"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>设备购置信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="需求关联:" prop="demandId">
                                    <el-select
                                        style="width: 90%"
                                        v-model="form.demandId"
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
                                <el-form-item label="需求部门:" prop="demandDeptId">
                                    <el-cascader style="width: 90%" @change="demandDeptChaneg" clearable v-model="form.demandDeptId" :options="deptOptions" :show-all-levels="false"></el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="供应商:" prop="supplier">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入供应商"
                                        v-model="form.supplier"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="采购时间:" prop="PurchaseTime">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="请输入采购时间"
                                        v-model="form.PurchaseTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="生产厂家:" prop="Manufacturer">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入生产厂家"
                                        v-model="form.Manufacturer"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="生产时间:" prop="ProductionTime">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="请输入生产时间"
                                        v-model="form.ProductionTime"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="使用寿命:" prop="ServiceLife">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入使用寿命"
                                        v-model="form.ServiceLife"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="购买价格:" prop="price">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入购买价格"
                                        v-model="form.price"
                                        type="number"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>

                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>设备图片</span>
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
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>关联文档</span>
                        </div>
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleUploadFile">上传文档</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                           @click="handleDeleteFile">删除</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                               <el-table :data="form.files" @selection-change="handleSelectionChange">
                                   <el-table-column fixed="left" type="selection" width="50" align="center" />
                                   <el-table-column type="index" label="序号"></el-table-column>
                                   <el-table-column prop="fileName" label="文件名"></el-table-column>
                                   <el-table-column prop="fileUPTime" label="上传时间"></el-table-column>
                                   <el-table-column prop="fileUPUser" label="上传者"></el-table-column>
                                   <el-table-column prop="fileSize" label="文档大小(kb)"></el-table-column>
                               </el-table>
                            </el-col>
                        </el-row>
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
        <!-- 用户导入文档对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload
                ref="fileUpload"
                :limit="2"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="fileUploadSuccess"
                :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <!--          <div class="el-upload__tip" slot="tip">-->
                    <!--            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据-->
                    <!--          </div>-->
                    <span>仅允许导入xls、xlsx格式文件。</span>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";

export default {
    name: "addOrEdit",
    dicts: ['equipment_files_status'],
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
                parentsId: [
                    { required: true, message: "请选择设备模型", trigger: "change" },
                ],
                DeviceName: [
                    { required: true, message: "请输入设备名称", trigger: "change" },
                ],
                DeviceType: [
                    { required: true, message: "请选择设备模型", trigger: "change" },
                ],
                CurrentStatusId: [
                    { required: true, message: "请选择状态", trigger: "change" },
                ],
                areaID: [
                    { required: true, message: "请选择所属区域", trigger: "change" },
                ],
                StorageLocation: [
                    { required: true, message: "请输入存放位置", trigger: "change" },
                ],
                ResponsiblePerson: [
                    { required: true, message: "请输入负责人", trigger: "change" },
                ],
                PhoneNumber: [
                    { required: true, message: "请输入负责电话", trigger: "change" },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: "请输入正确的手机号码",
                        trigger: "blur",
                    },
                ],
                PurchaseTime: [
                    { required: true, message: "请选择采购时间", trigger: "change" },
                ],
                Manufacturer: [
                    { required: true, message: "请输入生产厂家", trigger: "change" },
                ],
                ProductionTime: [
                    { required: true, message: "请选择生产时间", trigger: "change" },
                ],
                ServiceLife: [
                    { required: false,validator: checkAge,  trigger: "change" },
                ],
            },
            accessors: [],
            form: {
                DeviceType:'',
                imgs:[],
                files:[],

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
                DeviceName: "6缸起动机",
                DeviceNumber: "D001",
                ProductionTime: "2021-01-01",
                PhoneNumber: "13245678900",
                ResponsiblePerson: "张三",
                Manufacturer: "制造商A",
                PurchaseTime: "2020-12-01",
                StorageLocation: "存放位置1",
                DeviceType: "1",
                CurrentStatus: "在役",
                CurrentStatusId: "1",
                Remarks: "备注信息",
                parentsId:1,
                tagNumber:12,
                model:"z-6-1002",
                area:'',
                areaID:'1710940819244048384',
                startTime:'2023-01-01',
                demandId:1,
                demand:'需求1',
                demandDept:'',
                demandDeptId:'',
                supplier:'供应商111',
                ServiceLife:'7',
                price:25000,
                accessor:[
                    {
                        url: 'http://192.168.8.59:10300/statics/2023/12/27/立罐3_20231227155738A001.png',
                        pictureName: '立罐3.png',
                        pictureType: 0,
                        imgSize: 15953,
                    }
                ],
                files:[
                    {
                        timeStamp:new Date('1703664174153').getTime(),
                        fileName:'设备档案1.word',
                        fileUPTime:this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser:'admin',
                        fileSize:16568
                    },
                    {
                        timeStamp:new Date('1703664174153').getTime(),
                        fileName:'设备档案2.xlsc',
                        fileUPTime:this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser:'admin',
                        fileSize:865645
                    }
                ]
            }
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
            //获取设备模型列表
            this.$api.e_deviceListList({
                pageNum:1,
                pageSize:1000
            }).then(response => {
                this.equipmentTreeList = response.rows
            });
        },
        //设备模型选择后赋值 设备类型
        changeEquipment(e){
            console.log('设备模型选择后赋值 设备类型',e)
            this.form.DeviceType = e.type
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
