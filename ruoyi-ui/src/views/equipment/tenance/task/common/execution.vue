<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>维修情况</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="实际开始时间:" >
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        v-model="form.repairStartTime"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="实际结束时间:">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        v-model="form.repairEndTime"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="存在问题:" prop="model">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入存在问题"
                                        v-model="form.faultAnalysis"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="处理方式:" prop="faultHandling">
                                    <el-input
                                        placeholder="请输入处理方式"
                                        style="width: 90%"
                                        v-model="form.faultHandling"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="是否更换配件:" prop="replaceAccessories">
                                    <el-radio-group v-model="form.replaceAccessories">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box" v-if="form.replaceAccessories">
                    <el-card>
                        <div slot="header">
                            <span>更换配件明细</span>
                        </div>
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="standbyDialogVisible = true">添加</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                           @click="handleDeleteAccessories">删除</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-table :data="accessories" @selection-change="handleSelectionChange">
                                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                                    <el-table-column type="index" label="序号"></el-table-column>
                                    <el-table-column prop="spareName" label="备件名称"></el-table-column>
                                    <el-table-column prop="code" label="备件编码"></el-table-column>
                                    <el-table-column prop="model" label="规格型号"></el-table-column>
                                    <el-table-column prop="unit" label="单位"></el-table-column>
                                    <el-table-column prop="total" label="库存"></el-table-column>
                                    <el-table-column label="使用数量">
                                       <template slot-scope="scope">
                                           <el-input-number :min="1" :max="scope.row.total" v-model="scope.row.num"/>
                                       </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" style="height: 100px"></el-col>
            </el-row>
        </el-form>
        <!--选择备用配件-->
        <el-dialog @close="standbyDialogVisible = false"  title="选择备用配件" :visible.sync="standbyDialogVisible" width="800px" append-to-body>
            <standbyDialog @selectStandby="selectStandby" @cancel="standbyDialogVisible = false"></standbyDialog>
        </el-dialog>

    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";

import standbyDialog from './standbyDialog'

export default {
    name: "execution",
    components:{standbyDialog},
    dicts: ['work_order_run_status','fault_type'],
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
                faultType: [
                    { required: true, message: "请选择故障类型", trigger: "blur" },
                ],
                faultHandling: [
                    { required: true, message: "请输入处理方式", trigger: "blur" },
                ],
                replaceAccessories: [
                    { required: true, message: "请选择是否更换零部件", trigger: "blur" },
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
                //维修开始时间
                repairStartTime:'2024-01-12 12:12:56',
                //维修结束时间
                repairEndTime:'2024-01-16 10:20:16',
                //维修总时长
                repairTotalTime:'4天02时20分',
                //故障分析
                faultAnalysis:'可能是气管破裂',
                //故障类型
                faultType:'电气故障',
                //故障详情
                faultDetail:'气管破裂 导致漏气,发生异响',
                //故障处理方式
                faultHandling:'更换气管',
                //维修负责人
                repairHead:'张工',
                //是否更换配件
                replaceAccessories:1,
                //更换配件的列表数据
                accessories:[],
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
            accessories:[
                {
                    spareName:'备件1',
                    code:'C-001',
                    model:'Z-2022-01',
                    SpareType:'备件类型1',
                    unit:'个',
                    num:200,
                    manufacturer:'华东制造厂',
                    supplier:'华北平原总销'
                },
                {
                    spareName:'备件2',
                    code:'C-002',
                    model:'Z-2022-02',
                    SpareType:'备件类型2',
                    unit:'个',
                    num:50,
                    manufacturer:'华东制造厂',
                    supplier:'华北平原总销'
                },
                {
                    spareName:'备件3',
                    code:'C-003',
                    model:'Z-2022-03',
                    SpareType:'备件类型3',
                    unit:'架',
                    num:80,
                    manufacturer:'华东制造厂',
                    supplier:'华北平原总销'
                },
                {
                    spareName:'备件4',
                    code:'C-004',
                    model:'Z-2022-04',
                    SpareType:'备件类型4',
                    unit:'盒',
                    num:10,
                    manufacturer:'华东制造厂',
                    supplier:'华北平原总销'
                },
            ],
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
            filesids:[],
            standbyDialogVisible:false
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
        },
        //添加 配件按钮
        handleAddAccessories(){

        },
        //删除文档操作
        handleDeleteAccessories(row){
            const idx = this.filesids;
            this.accessories = this.accessories.filter(item => {
               return  idx.indexOf(item.timeStamp) == -1
            })
        },
        // 关联文档 多选框选中数据
        handleSelectionChange(selection) {
            this.filesids = selection.map(item => item.timeStamp);
        },
        //选择了备品备件
        selectStandby(e){
            let newAccessories = e.map((e,index)=>{
                return {
                    ...e,
                    num:1,
                    timeStamp:new Date().getTime()+''+index
                }
            })
            this.accessories = this.accessories.concat(newAccessories);
            this.standbyDialogVisible = false ;
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
