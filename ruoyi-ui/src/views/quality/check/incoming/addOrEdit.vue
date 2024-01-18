<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="检验单号:" prop="inspectionNumber">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="系统自动生成"
                                        v-model="form.inspectionNumber"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="保质期:" prop="isLoop">
                                    <el-radio v-model="form.isLoop" label="1">有</el-radio>
                                    <el-radio v-model="form.isLoop" label="0">无</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="送检员:" prop="inspector">
                                    <el-select v-model="form.inspector" :disabled="!form.department" placeholder="请选择部门" style="width: 90%" value-key="nickName">
                                        <el-option v-for="(item, index) in inspectorOptions" :key="index" :label="item.nickName"
                                                   :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="部门:" prop="department">
                                    <el-cascader
                                        style="width: 90%"
                                        @change="departmentChaneg"
                                        clearable
                                        v-model="form.department"
                                        :options="deptOptions"
                                        :show-all-levels="false"
                                        :props="{ label: 'label', value: 'id', children: 'children'}"
                                    >
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="收料仓库:" prop="receivingWarehouse">
                                    <el-select v-model="form.receivingWarehouse" placeholder="请选择收料仓库" style="width: 90%" >
                                        <el-option v-for="(item, index) in warehouseOptions" :key="index" :label="item.nodeAreaName"
                                                   :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="仓位:" prop="location">
                                    <el-select v-model="form.location" placeholder="请选择仓位" style="width: 90%" >
                                        <el-option v-for="(item, index) in positionOptions" :key="index" :label="item.label"
                                                   :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="物品类型:" prop="itemType">
                                    <el-select v-model="form.itemType" placeholder="请选择物品类型" style="width: 90%" >
                                        <el-option v-for="(item, index) in itemTypeOptions" :key="index" :label="item.label"
                                                   :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="物品名称:" prop="itemName">
                                    <el-input
                                        placeholder="请选择物品名称"
                                        style="width: 90%"
                                        v-model="form.itemName"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="物品编码:" prop="itemCode">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入物品编码"
                                        v-model="form.itemCode"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="规格型号:" prop="specification">
                                    <el-input
                                        style="width: 90%"
                                        placeholder="请输入规格型号"
                                        v-model="form.specification"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="单位:" prop="unit">
                                    <el-select v-model="form.unit" placeholder="请选择检验员" style="width: 90%" >
                                        <el-option v-for="(item, index) in spareUnitOptions" :key="index" :label="item.label"
                                                   :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="供应商:" prop="location">
                                    <el-input v-model="form.location" placeholder="请输入供应商" style="width: 90%"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="批号:" prop="batchNumber">
                                    <el-input
                                        placeholder="请输入批号"
                                        style="width: 90%"
                                        v-model="form.batchNumber"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>检验信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="报检数量:" prop="inspectionQuantity">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入报检数量"
                                        v-model="form.inspectionQuantity"
                                        :min="0"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="检验员:" prop="inspector2">
                                    <el-select v-model="form.inspector2" placeholder="请选择检验员" style="width: 90%" >
                                        <el-option v-for="(item, index) in inspector2Options" :key="index" :label="item.nickName"
                                                   :value="item.userId"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="检验日期:" prop="inspectionDate">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="请选择检验日期"
                                        v-model="form.inspectionDate"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="检验方式:" prop="inspectionMethod">
                                    <el-select v-model="form.inspectionMethod" placeholder="请选择检验方式" style="width: 90%" >
                                        <el-option v-for="(item, index) in inspectionMethodOptions" :key="index" :label="item.label"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--有保质期抽检表单 begin-->
                            <span v-if="form.isLoop == 1">
                                <el-col :span="12">
                                    <el-form-item label="抽样标准:" prop="standards">
                                        <el-select v-model="form.standards" placeholder="请选择抽样标准" style="width: 90%" >
                                            <el-option v-for="(item, index) in standardsOptions" :key="index" :label="item.label"
                                                       :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="批量大小:" prop="batch">
                                        <el-select v-model="form.batch" placeholder="请选择抽样标准" style="width: 90%" >
                                            <el-option v-for="(item, index) in batchOptions" :key="index" :label="item.label"
                                                       :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="检验水平:" prop="inspectionLevel">
                                        <el-select v-model="form.inspectionLevel" placeholder="请选择抽样标准" style="width: 90%" >
                                            <el-option v-for="(item, index) in inspectionLevelOptions" :key="index" :label="item.label"
                                                       :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="AQL:" prop="AQL">
                                        <el-select v-model="form.AQL" placeholder="请选择抽样标准" style="width: 90%" >
                                            <el-option v-for="(item, index) in AQLOptions" :key="index" :label="item.label"
                                                       :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="样品数:" prop="samplesNum">
                                        <el-input-number
                                            style="width: 90%"
                                            placeholder="请输入样品数"
                                            v-model="form.samplesNum"
                                            :min="0"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="允收数:" prop="acceptanceNum">
                                        <el-input-number
                                            style="width: 90%"
                                            placeholder="请输入允收数"
                                            v-model="form.acceptanceNum"
                                            :min="0"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="拒收数:" prop="rejectionNum">
                                        <el-input-number
                                            style="width: 90%"
                                            placeholder="请输入拒收数"
                                            v-model="form.rejectionNum"
                                            :min="0"
                                        />
                                    </el-form-item>
                                </el-col>
                            </span>
                            <!--有保质期抽检表单 end-->
                            <el-col :span="12">
                                <el-form-item label="检验数量:" prop="inspectionQuantity2">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入检验数量"
                                        v-model="form.inspectionQuantity2"
                                        :min="0"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="样品破坏数:" prop="sampleDestructionCount">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入样品破坏数"
                                        v-model="form.sampleDestructionCount"
                                        :min="0"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="不合格数量:" prop="nonconformingQuantity">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入不合格数量"
                                        v-model="form.nonconformingQuantity"
                                        :min="0"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="合格数量:" prop="conformingQuantity">
                                    <el-input-number
                                        style="width: 90%"
                                        placeholder="请输入合格数量"
                                        v-model="form.conformingQuantity"
                                        :min="0"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="检验结果:" prop="inspectionResult">
                                    <el-select v-model="form.inspectionResult" placeholder="请选择检验结果" style="width: 90%" >
                                        <el-option v-for="(item, index) in inspectionResultOptions" :key="index" :label="item.label"
                                                   :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>

                <el-col :span="24" class="card-box">
                    <el-card class="box-card">
                        <div slot="header">
                            <span>质检方案</span>
                        </div>
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain icon="el-icon-plus" size="mini"
                                           @click="handleAddRecord">添加行</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                           @click="handleDelRecord">移除</el-button>
                            </el-col>
                        </el-row>
                        <el-table :data="form.planList" @selection-change="handleSelectionChange">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column type="index" label="序号" fixed></el-table-column>
                            <el-table-column prop="item" label="检验项目"  fixed width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item1" label="检验项目类别" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item1"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item2" label="分析方法" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item2"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item3" label="检验方法" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item3"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item4" label="目标值" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item4"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item5" label="规格下限" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item5"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item6" label="下公差" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item6"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item7" label="规格上限" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item7"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item8" label="上公差" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item8"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item9" label="样本值" width="80">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item9"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item10" label="不良数量" width="80">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item10"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item11" label="合格数量" width="80">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item11"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item12" label="检验结果" width="150">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.item12" placeholder="请选择检验结果" style="width: 90%" >
                                        <el-option v-for="(item, index) in inspectionResultOptions" :key="index" :label="item.label"
                                                   :value="item.label"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item13" label="备注"  width="200">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item13"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item14" label="不良图片"  width="150">
                                <template slot-scope="scope">
                                    <el-button v-if="!scope.row.poor" type="text" size="small" class="primary" @click="handleUploadPoor(scope.$index)">上传图片</el-button>
                                   <img v-else style="width: 150px;" :src="scope.row.poor"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作"  width="200">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" class="danger" @click="handlePlanDel(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" class="primary" @click="handlePlanCopy(scope.row)">复制</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--不良品图片上传组件-->
                        <el-upload
                            style="display: none"
                            list-type="picture-card"
                            ref="uploadImg"
                            :limit="1"
                            accept=".png, .jpg"
                            :headers="upload.headers"
                            :action="upload.url + '?updateSupport=' + upload.updateSupport"
                            :disabled="upload.isUploading"
                            :on-progress="handleFileUploadProgress"
                            :on-success="ImghandleFileSuccess"
                            :auto-upload="true"
                            :file-list="form.accessor"
                            drag
                        >

                            <el-button ref="UploadPoorBtn" style="position:relative;left: -100px;" size="small" type="primary">上传图片</el-button>
                        </el-upload>
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


import { listUser,deptTreeSelect } from "@/api/system/user";
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
            //送检人员列表
            inspectorOptions:[],
            //需求部门下拉列表
            deptOptions:[],
            //收料仓库
            warehouseOptions:[],
            //仓位
            positionOptions:[],
            //物料类型下拉数据
            itemTypeOptions:[],
            //检验员下拉列表
            inspector2Options:[],
            //校验方式 下拉列表
            inspectionMethodOptions:[],
            //抽检标准
            standardsOptions:[],
            //批量大小
            batchOptions:[],
            //检验水平
            inspectionLevelOptions:[],
            //AQL
            AQLOptions:[],
            //检验结果下拉列表
            inspectionResultOptions:[],
            //单位下拉数据
            spareUnitOptions:[],
            rules: {
                inspectionNumber: [
                    { required: true, message: "请输入检验单号", trigger: "change" },
                ],
                inspector: [
                    { required: true, message: "请选择送检员", trigger: "change" },
                ],
                itemType: [
                    { required: true, message: "请选择物品类型", trigger: "change" },
                ],
                itemName: [
                    { required: true, message: "请输入物品名称", trigger: "change" },
                ],
                inspectionQuantity: [
                    { required: true, message: '请输入报检数量', trigger: 'change' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                inspectionQuantity2: [
                    { required: true, message: '请输入检验数量', trigger: 'change' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                sampleDestructionCount: [
                    { required: true, message: '请输入样品破坏数', trigger: 'change' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                nonconformingQuantity: [
                    { required: true, message: '请输入不合格数量', trigger: 'change' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                conformingQuantity: [
                    { required: true, message: '请输入合格数量', trigger: 'change' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                inspector2: [
                    { required: true, message: "请选择检验员", trigger: "change" },
                ],
                inspectionResult: [
                    { required: true, message: "请选择检验结果", trigger: "change" },
                ],
                upperLimit: [
                    { required: false, message: '请输入整数', trigger: 'blur' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                samplesNum: [
                    { required: false, message: '请输入整数', trigger: 'blur' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                acceptanceNum: [
                    { required: false, message: '请输入整数', trigger: 'blur' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
                rejectionNum: [
                    { required: false, message: '请输入整数', trigger: 'blur' },
                    { type: 'number', message: '请输入整数', trigger: 'blur' },
                    { validator: ((rule, value, callback)=>{
                            if (value < 0) {
                                callback(new Error('请输入不小于0的整数'));
                            } else if (!Number.isInteger(value)) {
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }), trigger: 'blur' }
                ],
            },
            form: {
                DeviceType:'',
                imgs:[],
                files:[],
                planList:[]
            },
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
            //质检方案 多选id暂存
            planListIDS:[],
            //当前选中的 上传图片下标
            planUploadPoorIndex:0


        };
    },
    watch:{
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
            this.form = {"DeviceType":"","imgs":[],"files":[],"planList":[{"id":1704766981308,"item":"辛烷值检测","item1":"燃爆辛烷值","item2":"","item4":"95","item5":"92","item6":"3","item7":"97","item8":"2","item9":"95","item10":"0","item11":"5","item12":"合格","item13":"合格"}],"inspectionQuantity":100,"inspectionQuantity2":50,"sampleDestructionCount":2,"nonconformingQuantity":3,"conformingQuantity":45,"isLoop":"1","samplesNum":50,"acceptanceNum":40,"rejectionNum":5,"department":[100,101,111],"inspector":{"createBy":"admin","createTime":"2024-01-08 14:06:28","updateBy":null,"updateTime":null,"remark":null,"userId":106,"deptId":111,"userName":"sc001","nickName":"春昀","email":"","phonenumber":"13101089556","sex":"0","avatar":"","password":null,"status":"0","delFlag":"0","loginIp":"","loginDate":null,"dept":{"createBy":null,"createTime":null,"updateBy":null,"updateTime":null,"remark":null,"deptId":111,"parentId":null,"ancestors":null,"deptName":"生产部门","orderNum":null,"leader":"春昀","phone":null,"email":null,"status":null,"delFlag":null,"parentName":null,"children":[]},"roles":[],"roleIds":null,"postIds":null,"roleId":null,"admin":false},"receivingWarehouse":"1737702697148190720","location":"5-4架","itemType":"产品","itemName":"95号成品油","itemCode":"2535-1256","specification":"95#","unit":"吨","batchNumber":"20240109","inspector2":102,"inspectionDate":"[native Date Wed Jan 10 2024 00:00:00 GMT+0800 (中国标准时间)]","inspectionMethod":1,"standards":"GB-2012","batch":"9-15","inspectionLevel":"特殊(S-1)","AQL":"0.40","inspectionResult":"合格"}
        }
    },
    methods: {
        //获取其他需求数据
        getOtherData() {
            //获取质检部门人员
            listUser({
                pageNum: 1,
                pageSize: 1000,
                deptId: 110,
            }).then(response => {
                    this.inspector2Options = response.rows;
                }
            );
            //获取部门列表
            deptTreeSelect({
                pageNum: 1,
                pageSize: 1000,
            }).then((res) => {
                if (res.code == 200) {
                    this.deptOptions = res.data;
                }
            });
            //获取收料仓库
            this.$api.i_stockList({
                pageNum:1,
                pageSize:1000
            }).then(response => {
                    this.warehouseOptions = response.rows
                }
            );
            //获取存放位置列表  (仓位)
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
            //物料类型
            this.itemTypeOptions = [
                {
                    value: 1,
                    label: "物料"
                },
                {
                    value: 2,
                    label: "产品"
                }
            ]
            this.inspectionMethodOptions = [
                {
                    value: 1,
                    label: "全检"
                },
                {
                    value: 2,
                    label: "抽检"
                },
            ]
            //抽检标准
            this.standardsOptions = [
                {
                    value: 1,
                    label: "GB-2012"
                },
                {
                    value: 2,
                    label: "GB-2020"
                },
            ]
            //批量大小
            this.batchOptions = [
                {
                    value: 1,
                    label: "2-8"
                },
                {
                    value: 2,
                    label: "9-15"
                },
                {
                    value: 3,
                    label: "16-25"
                },
                {
                    value: 4,
                    label: "26-50"
                },
                {
                    value: 5,
                    label: "50-100"
                },
                {
                    value: 6,
                    label: "100-200"
                },
            ]
            //检验水平
            this.inspectionLevelOptions = [
                {
                    value: 1,
                    label: "特殊(S-1)"
                },
                {
                    value: 2,
                    label: "特殊(S-2)"
                },
                {
                    value: 3,
                    label: "特殊(S-3)"
                },
                {
                    value: 4,
                    label: "特殊(S-4)"
                },
                {
                    value: 5,
                    label: "一般(Ⅰ)"
                },
                {
                    value: 6,
                    label: "一般(Ⅱ)"
                },
                {
                    value: 7,
                    label: "一般(Ⅲ)"
                },
            ]
            //AQL
            this.AQLOptions = [
                {
                    value: 1,
                    label: "0.25"
                },
                {
                    value: 2,
                    label: "0.40"
                },
                {
                    value: 3,
                    label: "0.65"
                },
                {
                    value: 4,
                    label: "1.00"
                },
                {
                    value: 5,
                    label: "1.50"
                },
                {
                    value: 6,
                    label: "2.00"
                },
            ]
            this.inspectionResultOptions = [
                {
                    value: 1,
                    label: "合格"
                },
                {
                    value: 2,
                    label: "不合格"
                },
                {
                    value: 2,
                    label: "保留"
                },
            ]
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
        },
        //获取送检人员列表
        getInspectorOptions(deptId){
            listUser({
                pageNum: 1,
                pageSize: 1000,
                deptId,
            }).then(response => {
                    this.inspectorOptions = response.rows;
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        //部门选择变化
        departmentChaneg(e){
            console.log('部门选择变化',e)
            this.getInspectorOptions(e[2])
        },
        ImghandleFileSuccess(res, file, filelist) {
            console.log(res, "上传");
            let {name,originalFilename,size,type,url} = res.data
            this.$set(this.form.planList[this.planUploadPoorIndex], 'poor', url);
        },
        handleFileUploadProgress(row) {},
        //提交
        onSubmit(status) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success("质检方案保存成功");
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
            this.planListIDS = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //质检方案 增加 展示弹窗
        handleAddRecord(){
           this.form.planList.push({id:new Date().getTime()})
            this.msgSuccess("新增质检方案成功");
        },
        //质检方案 移除  移除列表数据
        handleDelRecord(){
            const idx = this.planListIDS;
            this.form.planList = this.form.planList.filter(item => {
                return idx.indexOf(item.id) === -1
            })
            this.msgSuccess("移除质检方案成功");
        },
        //上传不良品 图片
        handleUploadPoor(index){
            console.log('上传不良品点击',index)
            this.planUploadPoorIndex = index;
            this.$refs.UploadPoorBtn.$el.click()
        },
        //质检方案删除
        handlePlanDel(row){
            this.form.planList = this.form.planList.filter((e)=>e.id!=row.id)
        },
        //质检方案复制
        handlePlanCopy(row){
            this.form.planList.push({...row,id:new Date().getTime()})
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
