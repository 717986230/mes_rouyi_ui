<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>出库基础信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="出库类型" prop="InType">
                                    <el-select v-model="form.InType" placeholder="请选择出库类型" clearable  style="width: 90%" >
                                        <el-option v-for="dict in dict.type.instoreroom_type" :key="dict.value" :label="dict.label"
                                                   :value="dict.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="出库单号:" prop="InNumber">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="系统自动生成"
                                        v-model="form.InNumber"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="出库日期:" prop="InDate">
                                    <el-date-picker
                                        v-model="form.InDate"
                                        type="date"
                                        placeholder="请选择出库日期"
                                        style="width: 90%"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="出库操作人:" prop="InPerson">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="系统自动生成"
                                        v-model="form.InPerson"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="关联单号:" prop="AssociatedDocument">
                                    <el-select v-model="form.AssociatedDocument"  placeholder="请选择出库类型" clearable  style="width: 90%">
                                        <el-option v-for="dict in tagList" :key="dict.value" :label="dict.label"
                                                   :value="dict.label" />
                                    </el-select>
                                </el-form-item>
                            </el-col>

                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="normal m20 bold">出库明细</span>
                        </div>
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain icon="el-icon-plus" size="mini"
                                           @click="handleAddRecord">添加</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                           @click="handleDelRecord">移除</el-button>
                            </el-col>
                        </el-row>
                        <el-table :data="form.recodeList" @selection-change="handleSelectionChange">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column type="index" label="序号"></el-table-column>
                            <el-table-column prop="spareName" label="备件名称"></el-table-column>
                            <el-table-column prop="spareCode" label="备件编号"></el-table-column>
                            <el-table-column prop="model" label="规格型号"></el-table-column>
                            <el-table-column prop="SpareType" label="备件类型"></el-table-column>
                            <el-table-column prop="spareUnit" label="单位"></el-table-column>
                            <el-table-column prop="inNum" label="出库数量"></el-table-column>
                            <el-table-column prop="warehouse" label="出库仓库"></el-table-column>
                            <el-table-column prop="position" label="存放位置"></el-table-column>
                            <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
                            <el-table-column prop="supplier" label="供应商"></el-table-column>
                        </el-table>
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
        <!--备件库存新增-->
        <el-dialog :title="recordDialog.title" :visible.sync="recordDialog.open" width="600px" append-to-body>
            <el-form :model="recordDialog.form" :rules="recordDialog.rules" ref="recordDialogform" label-width="100px" size="small">
                <el-form-item label="设备" prop="parentsId">
                    <el-select v-model="recordDialog.form.parentsId" @change="changeEquipment" value-key="name" placeholder="请选择设备档案" clearable  style="width: 90%" :disabled="!!isEdit">
                        <el-option v-for="dict in equipmentTreeList" :key="dict.id" :label="dict.name"
                                   :value="dict" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备件名称" prop="spareName">
                    <el-input v-model="recordDialog.form.spareName"  placeholder="请输入备件名称" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="备件编号:" prop="spareCode">
                    <el-input
                        disabled
                        style="width: 90%"
                        placeholder="请选择设备档案"
                        v-model="recordDialog.form.spareCode"
                    />
                </el-form-item>
                <el-form-item label="规格型号:" prop="model">
                    <el-input
                        style="width: 90%"
                        placeholder="请输入规格型号"
                        v-model="recordDialog.form.model"
                    />
                </el-form-item>
                <el-form-item label="单位:" prop="spareUnit">
                    <el-select v-model="recordDialog.form.spareUnit" placeholder="请选择单位" style="width: 90%" >
                        <el-option v-for="(item, index) in spareUnitOptions" :key="index" :label="item.label"
                                   :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库数量" prop="inNum">
                    <el-input-number v-model="recordDialog.form.inNum" :min="1" placeholder="请输出库存数量" style="width: 90%"></el-input-number>
                </el-form-item>
                <el-form-item label="仓库" prop="warehouse">
                    <el-select v-model="recordDialog.form.warehouse" placeholder="请选择仓库" style="width: 90%">
                        <el-option v-for="item in warehouseOptions" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="存放位置" prop="position">
                    <el-select v-model="recordDialog.form.position" placeholder="请选择存放位置" style="width: 90%">
                        <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生产厂家" >
                    <el-input v-model="recordDialog.form.manufacturer"  placeholder="请输入生产厂家" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="供应商" >
                    <el-input v-model="recordDialog.form.supplier"  placeholder="请输入供应商" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="w-100 flex justify-center">
                    <el-button type="primary" @click="handleAddRecordSubmit">新增</el-button>
                    <el-button @click="recordDialog.open = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";

export default {
    name: "addOrEdit",
    dicts:['instoreroom_type'],
    data() {
        return {
            //需求部门下拉列表
            tagList:[],
            //设备类型下拉数据
            deviceTypeOption:[],
            //设备模型下拉数据
            equipmentTreeList: [],
            //单位下拉数据
            spareUnitOptions:[],
            //仓库下拉数据
            warehouseOptions:[],
            //存放位置下拉数据
            positionOptions:[],
            rules: {
                InType: [
                    { required: true, message: "请选择出库类型", trigger: "change" },
                ],
                InNumber: [
                    { required: true, message: "请选择出库单号", trigger: "change" },
                ],
                InDate: [
                    { required: true, message: "请选择出库日期", trigger: "change" },
                ],
                InPerson: [
                    { required: true, message: "请选择出库操作人", trigger: "change" },
                ],
                AssociatedDocument: [
                    { required: false },
                ],
            },
            form: {
                InType:'',
                InNumber:'',
                InDate:'',
                InPerson:'',
                AssociatedDocument:'',
                recodeList:[]
            },
            //出库明细 表单弹窗数据
            recordDialog: {
                ids:[],
                // 是否显示弹出层（用户导入）
                open: false,
                // 弹出层标题（用户导入）
                title: "出库明细",
                // 表单数据
                form: {
                    // 仓库
                    warehouse: '',
                    // 数量
                    num: 1,
                    // 位置
                    position: '',
                },
                // 表单校验规则
                rules: {
                    parentsId:[
                        { required: true, message: "请选择设备档案", trigger: "change" },
                    ],
                    spareName:[
                        { required: true, message: "请输入设备名称", trigger: "change" },
                    ],
                    spareCode:[
                        { required: true, message: "请选择设备档案", trigger: "change" },
                    ],
                    model:[
                        { required: true, message: "请选择规格型号", trigger: "change" },
                    ],
                    spareUnit:[
                        { required: true, message: "请选择单位", trigger: "change" },
                    ],
                    inNum:[
                        { required: true, message: "请输入出库数量", trigger: "change" },
                    ],
                    warehouse:[
                        { required: true, message: "请选择仓库", trigger: "change" },
                    ],
                    position:[
                        { required: true, message: "请选择存放位置", trigger: "change" },
                    ],
                }
            },
        };
    },
    created() {
        this.form.InNumber = new Date().getTime()
        this.form.InPerson ='admin'
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
                InType:'1',
                InNumber:'2000',
                InDate:'2023-01-23',
                InPerson:'admin',
                AssociatedDocument:'',
                recodeList:[
                    {
                        id:'456',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-2',
                        SpareType:'备件类型',
                        spareUnit:'个',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                    {
                        id:'4567',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-3',
                        SpareType:'备件类型',
                        spareUnit:'吨',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                    {
                        id:'4568',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-4',
                        SpareType:'备件类型',
                        spareUnit:'架',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                ],

            }
        }
    },
    methods: {
        //获取其他需求数据
        getOtherData() {
            //获取关联单号
            this.tagList = [
                {
                    label: "采购单号1",
                    value: "1",
                },
                {
                    label: "申领单号2",
                    value: "2",
                },
                {
                    label: "调拨单号3",
                    value: "3",
                },
                {
                    label: "采购单号4",
                    value: "4",
                },
            ];
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
            //获取单位下拉数据
            this.spareUnitOptions = [
                {
                    value: '1',
                    label: '吨',
                },
                {
                    value: '2',
                    label: '台',
                },
                {
                    value: '3',
                    label: '个',
                },
                {
                    value: '4',
                    label: '套',
                },
                {
                    value: '5',
                    label: '架',
                },
                {
                    value: '6',
                    label: '盒',
                },
            ]
            //获取仓库列表
            this.warehouseOptions = [
                {
                    value: '1',
                    label: '北1区仓库',
                },
                {
                    value: '2',
                    label: '北2区仓库',
                },
                {
                    value: '3',
                    label: '南1区仓库',
                },
                {
                    value: '4',
                    label: '南2区仓库',
                },
            ]
            //获取存放位置列表
            this.positionOptions = [
                {
                    value: '1',
                    label: '5-4架',
                },
                {
                    value: '2',
                    label: '1-4架',
                },
                {
                    value: '3',
                    label: '5-5架',
                },
                {
                    value: '4',
                    label: '1-5架',
                },
            ]
        },


        //提交
        onSubmit(status) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success("出库保存成功");
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
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.recordDialog.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //备件库存明细 增加 展示弹窗
        handleAddRecord(){
            this.recordDialog.title = "新增备件库存明细";
            this.recordDialog.form = {
                // 仓库
                warehouse: '',
                // 数量
                num: '',
                // 位置
                position: '',
            }
            this.recordDialog.open = true
        },
        //备件库存明细 移除  移除列表数据
        handleDelRecord(){
            const idx = this.recordDialog.ids;
            this.form.recodeList = this.form.recodeList.filter(item => {
                return idx.indexOf(item.id) === -1
            })
            this.msgSuccess("移除出库明细成功");
        },
        //备件库存明细 增加 增加数据
        handleAddRecordSubmit(){
            this.$refs.recordDialogform.validate((valid) => {
                if (valid) {
                    this.form.recodeList.push({
                        ...this.recordDialog.form,
                        ...{
                            id:new Date().getTime(),
                        }
                    })
                    this.recordDialog.open = false;
                    this.msgSuccess("新增出库明细成功");
                }
            });

        },
        //备件模型选择后赋值 备件类型
        changeEquipment(e){
            console.log('备件模型选择后赋值 备件类型',e)
            this.recordDialog.form.spareCode = e.code
            this.recordDialog.form.SpareType = e.type
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
