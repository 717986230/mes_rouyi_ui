<template>
    <!--业务单管理-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item label="业务单分类:" prop="orderType">
                <el-select v-model="queryParams.orderType" placeholder="请选择业务单分类" clearable>
                    <el-option v-for="dict in orderTypeList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="date">
                <el-date-picker
                    v-model="queryParams.date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in classesList" :key="dict.value" :label="dict.ShiftText" :value="dict.ShiftValue" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增业务单</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                           @click="handleDel">删除未登账业务单</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="multiple"
                           @click="handleAccounting">登账业务单</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-refresh" size="mini" @click="handleWriteOff">冲销业务单</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <div id="tableBox">
            <el-table :height="tableHeight"  :max-height="tableHeight" v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
                <el-table-column fixed="left" type="selection" width="50" align="center" />
                <el-table-column prop="props" type="expand">
                    <template slot-scope="props">
                        <div style="padding: 4px 20px 4px 50px">
                            <el-table border v-loading="loading" :data="props.row.Boms">
                                <el-table-column prop="records" type="expand">
                                    <template slot-scope="records">
                                        <div style="padding: 4px 20px 4px 50px">
                                            <el-table border v-loading="loading" :data="records.row.MoveRecords">
                                                <el-table-column label="源物料" align="center"  key="SrMtrlName" prop="SrMtrlName"/>
                                                <el-table-column label="目的物料" align="center"  key="TgMtrlName" prop="TgMtrlName"/>
                                                <el-table-column label="源节点" align="center"  key="SrNodeName" prop="SrNodeName"/>
                                                <el-table-column label="目的节点" align="center"  key="TgNodeName" prop="TgNodeName"/>
                                                <el-table-column label="源等级" align="center"  key="SrRankName" prop="SrRankName"/>
                                                <el-table-column label="目的等级" align="center" key="TgRankName" prop="TgRankName"/>
                                                <el-table-column label="源批次" align="center"  key="SrBatch" prop="SrBatch" width="160"/>
                                                <el-table-column label="目的批次" align="center"  key="TgBatch" prop="TgBatch" width="120"/>
                                                <el-table-column label="单件重" align="center"  key="WgtPerPack" prop="WgtPerPack" width="120"/>
                                                <el-table-column label="件数" align="center"  key="Amnt" prop="Amnt" width="120"/>
                                                <el-table-column label="重量" align="center"  key="Weight" prop="Weight" width="120"/>
                                                <el-table-column label="单位" align="center"  key="Dim" prop="Dim" width="120"/>
                                                <el-table-column label="描述" align="center"  key="Des" prop="Des" width="120"/>
                                            </el-table>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="序号" align="center"  type="index"/>
                                <el-table-column label="物料" align="center"  key="MtrlName" prop="MtrlName"/>
                                <el-table-column label="批次" align="center"  key="Batch" prop="Batch"/>
                                <el-table-column label="等级" align="center"  key="RankName" prop="RankName"/>
                                <el-table-column label="单件重" align="center"  key="WgtPerPack" prop="WgtPerPack"/>
                                <el-table-column label="件数" align="center" key="Amnt" prop="Amnt"/>
                                <el-table-column label="重量" align="center"  key="Weight" prop="Weight" width="160"/>
                                <el-table-column label="单位" align="center"  key="WgtDim" prop="WgtDim" width="120"/>
                                <el-table-column label="客户" align="center"  key="Customer" prop="Customer" width="120"/>
                                <el-table-column label="运输类型" align="center"  key="TransTypeId" prop="TransTypeId" width="120"/>
                                <el-table-column label="车牌号" align="center"  key="VehiCode" prop="VehiCode" width="120"/>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="序号" align="center" sortable type="index"
                                 v-if="columns[0].visible" />
                <el-table-column label="业务单编码" align="center" sortable key="OpeBillCode" prop="OpeBillCode"
                                 v-if="columns[1].visible" :show-overflow-tooltip="true" />
                <el-table-column label="操作用户" align="center" sortable key="OpeUserId" prop="OpeUserId"
                                 v-if="columns[2].visible" :show-overflow-tooltip="true" />
                <el-table-column label="创建时间" align="center" sortable key="CrtTime" prop="CrtTime"
                                 v-if="columns[3].visible" :show-overflow-tooltip="true" />
                <el-table-column label="操作类型" align="center" sortable key="OpeTypeName" prop="OpeTypeName" v-if="columns[4].visible"
                                 :show-overflow-tooltip="true" />
                <el-table-column label="总重量(吨)" align="center" key="Weight" prop="Weight" v-if="columns[5].visible"/>
                <el-table-column label="备注" align="center" sortable key="ErpMessage" prop="ErpMessage" width="160" v-if="columns[6].visible">
                </el-table-column>
                <el-table-column label="状态" align="center" sortable key="State" prop="State" width="120"
                                 v-if="columns[7].visible" />
                <el-table-column label="冲销类型" align="center" sortable key="IoFlag" prop="IoFlag" width="120"
                                 v-if="columns[8].visible" />
            </el-table>
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                    @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
            <el-form ref="formDialog" :model="form" :rules="rules" label-width="120px">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                        <el-form-item label="业务单类型:" prop="OpeTypeId">
                            <el-select :value="form.OpeTypeId" value-key="label" @change="form.OpeTypeId=$event" placeholder="请选择业务单类型" clearable size="small">
                                <el-option v-for="dict in OpeTypeList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="success" plain icon="el-icon-plus" size="mini" @click="AddMoveRecord">新增移动记录</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="来源节点:" :prop="formDisable.SrNodeId? '' : 'SrNodeId'">
                            <el-select :disabled="formDisable.SrNodeId" :value="form.SrNodeId" value-key="label" @change="form.SrNodeId=$event" placeholder="请选择来源节点" clearable size="small">
                                <el-option v-for="dict in SrNodeList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="来源物料:" :prop="formDisable.SrMtrlId? '' : 'SrMtrlId'">
                            <el-select :disabled="formDisable.SrMtrlId" :value="form.SrMtrlId" value-key="label" @change="form.SrMtrlId=$event" placeholder="请选择来源物料" clearable size="small">
                                <el-option v-for="dict in SrMtrlList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="来源等级:" :prop="formDisable.SrRankId? '' : 'SrRankId'">
                            <el-select :disabled="formDisable.SrRankId" :value="form.SrRankId" value-key="label" @change="form.SrRankId=$event" placeholder="请选择来源等级" clearable size="small">
                                <el-option v-for="dict in SrRankList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="来源批次:" :prop="formDisable.SrBatch? '' : 'SrBatch'">
                            <el-input :disabled="formDisable.SrBatch" v-model="form.SrBatch" type="number" placeholder="请输入来源批次" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="目标节点:" :prop="formDisable.TgNodeId? '' : 'TgNodeId'">
                            <el-select :disabled="formDisable.TgNodeId" :value="form.TgNodeId" value-key="label" @change="form.TgNodeId=$event" placeholder="请选择目标节点" clearable size="small">
                                <el-option v-for="dict in TgNodeList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="目标物料:" :prop="formDisable.TgMtrlId? '' : 'TgMtrlId'">
                            <el-select :disabled="formDisable.TgMtrlId" :value="form.TgMtrlId" value-key="label" @change="form.TgMtrlId=$event" placeholder="请选择目标物料" clearable size="small">
                                <el-option v-for="dict in TgMtrlList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="目标等级:" :prop="formDisable.TgRankId? '' : 'TgRankId'">
                            <el-select :disabled="formDisable.TgRankId" :value="form.TgRankId" value-key="label" @change="form.TgRankId=$event" placeholder="请选择目标等级" clearable size="small">
                                <el-option v-for="dict in TgRankList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="目标批次:" :prop="formDisable.TgBatch? '' : 'TgBatch'">
                            <el-input :disabled="formDisable.TgBatch" v-model="form.TgBatch" placeholder="请输入目标批次" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="物料规格:" :prop="formDisable.WgtPerPack? '' : 'WgtPerPack'">
                            <el-input :disabled="formDisable.WgtPerPack" v-model="form.WgtPerPack"
                                      type="number" placeholder="请输入物料规格" maxlength="30">
                                <template slot="append">KG/件</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="移动件数:" :prop="formDisable.Amnt? '' : 'Amnt'">
                            <el-input :disabled="formDisable.Amnt" v-model="form.Amnt" type="number" placeholder="请输入移动件数" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="重量单位:" :prop="formDisable.Dim? '' : 'Dim'">
                            <el-select :disabled="formDisable.Dim" :value="form.Dim" value-key="label" @change="form.Dim=$event" placeholder="请选择重量单位" clearable size="small">
                                <el-option v-for="dict in WgtPerPackList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="移动重量:" :prop="formDisable.Weight? '' : 'Weight'">
                            <el-input :disabled="true" v-model="form.Weight" type="number" placeholder="请输入移动重量" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="客户:" :prop="formDisable.Customer? '' : 'Customer'">
                            <el-input :disabled="formDisable.Customer" v-model="form.Customer" placeholder="请输入客户" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="交货单号:" :prop="formDisable.oddNum? '' : 'oddNum'">
                            <el-input :disabled="formDisable.oddNum" v-model="form.oddNum" placeholder="请输入交货单号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="运输类型:" :prop="formDisable.TransTypeId? '' : 'TransTypeId'">
                            <el-select :disabled="formDisable.TransTypeId" :value="form.TransTypeId" value-key="label" @change="form.TransTypeId=$event" placeholder="请选择运输类型" clearable size="small">
                                <el-option v-for="dict in TransTypeList" :key="dict.value" :label="dict.label" :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车牌号:" :prop="formDisable.VehiCode? '' : 'VehiCode'">
                            <el-input :disabled="formDisable.VehiCode" v-model="form.VehiCode" placeholder="请输入车牌号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="领料人:" :prop="formDisable.user? '' : 'user'">
                            <el-input :disabled="formDisable.user" v-model="form.user" placeholder="请输入领料人" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="描述:">
                            <el-input :disabled="formDisable.des" v-model="form.des" placeholder="请输入描述" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-card class="box-card">
                <div slot="header">
                    <span>移动信息</span>
                    <el-button @click="delForm" style="float: right;" size="mini" type="danger"  icon="el-icon-folder-delete" >删除</el-button>
                    <el-button @click="submitForm" style="float: right;margin-right: 20px" size="mini" type="success" icon="el-icon-folder-checked" >保存移动记录</el-button>
                </div>
                <div class="card-body">
                    <el-table border v-loading="loading" :data="MoveRecordList" @selection-change="handleSelectionChange_dialog">
                        <el-table-column fixed="left" type="selection" width="50" align="center" />
                        <el-table-column label="序号" align="center"  type="index"/>
                        <el-table-column label="源物料" align="center"  key="SrMtrlName" prop="SrMtrlName"/>
                        <el-table-column label="目的物料" align="center"  key="TgMtrlName" prop="TgMtrlName"/>
                        <el-table-column label="源节点" align="center"  key="SrNodeName" prop="SrNodeName"/>
                        <el-table-column label="目的节点" align="center"  key="TgNodeName" prop="TgNodeName"/>
                        <el-table-column label="源等级" align="center"  key="SrRankName" prop="SrRankName"/>
                        <el-table-column label="目的等级" align="center" key="TgRankName" prop="TgRankName"/>
                        <el-table-column label="源批次" align="center"  key="SrBatch" prop="SrBatch" width="160"/>
                        <el-table-column label="目的批次" align="center"  key="TgBatch" prop="TgBatch" width="120"/>
                        <el-table-column label="单件重" align="center"  key="WgtPerPack" prop="WgtPerPack" width="120"/>
                        <el-table-column label="件数" align="center"  key="Amnt" prop="Amnt" width="120"/>
                        <el-table-column label="重量" align="center"  key="Weight" prop="Weight" width="120"/>
                        <el-table-column label="单位" align="center"  key="Dim" prop="Dim" width="120"/>
                        <el-table-column label="客户" align="center"  key="Customer" prop="Customer" width="120"/>
                        <el-table-column label="车牌号" align="center"  key="VehiCode" prop="VehiCode" width="120"/>
                        <el-table-column label="描述" align="center"  key="Des" prop="Des" width="120"/>
                    </el-table>
                </div>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 导入弹窗 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                       :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                       :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">

                    <span>仅允许导入xls、xlsx格式文件。</span>
                    <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                             @click="importTemplate">下载模板</el-link>
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
import { getToken } from "@/utils/auth";
export default {
    name: "businessOrder",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: {},
    data() {
        return {
            //业务单分类
            orderTypeList: [],
            //班次类型
            classesList: [],
            // 列信息
            columns: [
                { key: 0, label: `序号`, visible: true },
                { key: 1, label: `业务单编码`, visible: true },
                { key: 2, label: `操作用户`, visible: true },
                { key: 3, label: `创建时间`, visible: true },
                { key: 4, label: `操作类型`, visible: true },
                { key: 5, label: `总重量(吨)`, visible: true },
                { key: 6, label: `备注`, visible: true },
                { key: 7, label: `状态`, visible: true },
                { key: 7, label: `冲销类型`, visible: true },
            ],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 用户表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            openGS: false,

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
                url: process.env.VUE_APP_BASE_API + "/mes/unitArea/import"
            },
            // 查询参数
            queryParams: {
                orderType:'', //业务单类型
                date:'', //日期
                classes:'', //班次
            },
            // 表单参数
            form: {
                OpeTypeId:null,//业务单类型
                SrNodeId:null,//来源节点
                SrMtrlId:null,//来源物料
                SrRankId:null,//来源等级
                SrBatch:null,//来源批次
                TgNodeId:null,//目标节点
                TgMtrlId:null,//目标物料
                TgRankId:null,//目标等级
                TgBatch:null,//目标批次
                WgtPerPack:null,//物料规格
                Dim:null,//重量单位
                Amnt:null,//移动件数
                Weight:null,//移动重量
                Customer:null,//客户
                oddNum:null,//交货单号
                TransTypeId:null,//运输类型
                VehiCode:null,//车牌号
                user:null,//领料人
                des:null,//描述
            },
            // 移动列表
            MoveRecordList:[],
            // 表单属性 禁用 参数
            formDisable: {
                OpeTypeId:false,//业务单类型
                SrNodeId:false,//来源节点
                SrMtrlId:false,//来源物料
                SrRankId:false,//来源等级
                SrBatch:false,//来源批次
                TgNodeId:false,//目标节点
                TgMtrlId:false,//目标物料
                TgRankId:false,//目标等级
                TgBatch:false,//目标批次
                WgtPerPack:false,//物料规格
                Dim:false,//重量单位
                Amnt:false,//移动件数
                Weight:false,//移动重量
                Customer:false,//客户
                oddNum:false,//交货单号
                TransTypeId:false,//运输类型
                VehiCode:false,//车牌号
                user:false,//领料人
                des:false,//描述
            },
            // 表单校验
            rules: {
                SrNodeId: [
                    { required: true, message: "请选择来源节点", trigger: "blur" },
                ],
                SrMtrlId: [
                    { required: true, message: "请选择来源物料", trigger: "blur" }
                ],
                SrRankId: [
                    { required: true, message: "请选择来源物料", trigger: "blur" }
                ],
                SrBatch: [
                    { required: true, message: "请选择来源等级", trigger: "blur" }
                ],
                TgNodeId: [
                    { required: true, message: "请选择目标节点", trigger: "blur" }
                ],
                TgMtrlId: [
                    { required: true, message: "请选择目标物料", trigger: "blur" }
                ],
                TgRankId: [
                    { required: true, message: "请选择目标等级", trigger: "blur" }
                ],
                TgBatch: [
                    { required: true, message: "请输入目标批次", trigger: "blur" }
                ],
                WgtPerPack: [
                    { required: true, message: "请输入物料规格", trigger: "blur" }
                ],
                Dim: [
                    { required: true, message: "请选择重量单位", trigger: "blur" }
                ],
                Amnt: [
                    { required: true, message: "请输入移动件数", trigger: "blur" }
                ],
                Weight: [
                    { required: true, message: "规格与数量未输入", trigger: "blur" }
                ],
                Customer: [
                    { required: true, message: "请输入客户", trigger: "blur" }
                ],
                oddNum: [
                    { required: true, message: "请输入交货单号", trigger: "blur" }
                ],
                TransTypeId: [
                    { required: true, message: "请选择运输类型", trigger: "blur" }
                ],
                VehiCode: [
                    { required: true, message: "请输入车牌号", trigger: "blur" }
                ],
                user: [
                    { required: true, message: "请输入领料人", trigger: "blur" }
                ],
                des: [
                    { required: true, message: "请输入描述", trigger: "blur" }
                ],

            },
            tableHeight:500,//表格高度
            //业务单类型
            OpeTypeList:[],
            //来源节点
            SrNodeList:[],
            //来源物料
            SrMtrlList:[],
            //来源等级
            SrRankList:[],
            //目标节点
            TgNodeList:[],
            //目标物料
            TgMtrlList:[],
            //目标等级
            TgRankList:[],
            //重量单位
            WgtPerPackList:[],
            //运输类型
            TransTypeList:[],
            //公司列表
            DesesList:[],
            //表格多线参数
            ids_dialog:[],
        };
    },
    watch: {
        //表单 业务单类型发生变化
        'form.OpeTypeId': {
            handler(newVal) {
                console.log('表单 业务单类型发生变化',newVal)
                // ==102  属于外购入库
                if(newVal){
                    switch (newVal.value){
                        case 101:
                            //生产入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:false,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:true,//客户
                                oddNum:true,//交货单号
                                TransTypeId:true,//运输类型
                                VehiCode:true,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(1)
                            break;
                        case 102:
                            //外购入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:false,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:false,//客户
                                oddNum:false,//交货单号
                                TransTypeId:false,//运输类型
                                VehiCode:false,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(2)
                            break;
                        case 103:
                            //互供入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:false,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:true,//客户
                                oddNum:true,//交货单号
                                TransTypeId:true,//运输类型
                                VehiCode:true,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(1)
                            break;
                        case 104:
                            //临时入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:true,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:true,//客户
                                oddNum:true,//交货单号
                                TransTypeId:true,//运输类型
                                VehiCode:true,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(1)
                            break;
                        case 105:
                            //寄存入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:true,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:false,//客户
                                oddNum:false,//交货单号
                                TransTypeId:false,//运输类型
                                VehiCode:false,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(1)
                            break;
                        case 106:
                            //退货入库
                            this.formDisable = {
                                OpeTypeId:false,//业务单类型
                                SrNodeId:false,//来源节点
                                SrMtrlId:true,//来源物料
                                SrRankId:true,//来源等级
                                SrBatch:true,//来源批次
                                TgNodeId:false,//目标节点
                                TgMtrlId:false,//目标物料
                                TgRankId:true,//目标等级
                                TgBatch:false,//目标批次
                                WgtPerPack:false,//物料规格
                                Dim:false,//重量单位
                                Amnt:false,//移动件数
                                Weight:false,//移动重量
                                Customer:false,//客户
                                oddNum:false,//交货单号
                                TransTypeId:false,//运输类型
                                VehiCode:false,//车牌号
                                user:false,//领料人
                                des:false,//描述
                            }
                            this.getSrNodeList(1)
                            break;
                        default:
                            this.getSrNodeList(1)
                            break;
                    }
                    //移除该表单项的校验结果
                    this.$refs['formDialog'].clearValidate();
                }
            },
            deep: false, //非递归监听
            immediate: true, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
        //物料规格
        'form.WgtPerPack':{
            handler(newVal){
                if(newVal){
                    if(this.form.WgtPerPack && this.form.Dim && this.form.Amnt){
                        if(this.form.Dim.label == '公斤'){
                            this.form.Weight = Number(this.form.WgtPerPack) * Number(this.form.Amnt)
                        }else if(this.form.Dim.label == '吨'){
                            this.form.Weight = Number(this.form.WgtPerPack) * Number(this.form.Amnt)/1000
                        }
                    } else {
                        this.form.Weight = null
                    }
                }
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
        //重量单位
        'form.Dim':{
            handler(newVal){
                if(newVal){
                    if(this.form.WgtPerPack && this.form.Dim && this.form.Amnt){
                        if(this.form.Dim.label == '公斤'){
                            this.form.Weight = Number(this.form.WgtPerPack) * Number(this.form.Amnt)
                        }else if(this.form.Dim.label == '吨'){
                            this.form.Weight = Number(this.form.WgtPerPack) * Number(this.form.Amnt)/1000
                        }
                    } else {
                        this.form.Weight = null
                    }
                }
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
        //移动件数
        'form.Amnt':{
            handler(newVal){
                if(newVal){
                    if(this.form.WgtPerPack && this.form.Dim && this.form.Amnt){
                        if(this.form.Dim.label == '公斤'){
                            this.form.Weight = Number(this.form.WgtPerPack)  * Number(this.form.Amnt)
                        }else if(this.form.Dim.label == '吨'){
                            this.form.Weight = Number(this.form.WgtPerPack) * Number(this.form.Amnt)/1000
                        }
                    } else {
                        this.form.Weight = null
                    }
                }
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 270; // 减去 100px 的边距
        // 设置 <div> 的高度
        var divElement = document.getElementById("tableBox");
        console.log('=======divElement=======',divElement)
        divElement.style.height = maxDivHeight + "px";
        divElement.style.maxHeight = maxDivHeight + "px";
        this.tableHeight = maxDivHeight
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        onOpen() { },
        onClose() {
            this.$refs['elForm'].resetFields()
        },
        close() {
            this.$emit('update:visible', false)
        },
        getOther() {
            //获取业务单分类
            this.$api.GetOperateCategory().then(res => {
                if (res.code == 200) {
                    this.orderTypeList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //获取业务单分类
            this.$api.classes().then(res => {
                if (res.code == 200) {
                    this.classesList = res.data
                }
            });

            //获取业务单类型
            this.$api.GetOpeTypeByUserAndCate().then(res => {
                if (res.code == 200) {
                    this.OpeTypeList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //目标等级
            this.$api.GetRanks().then(res => {
                if (res.code == 200) {
                    this.TgRankList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //重量单位
            this.$api.GetDims().then(res => {
                if (res.code == 200) {
                    this.WgtPerPackList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //运输类型
            this.$api.GetTransTypes().then(res => {
                if (res.code == 200) {
                    this.TransTypeList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //公司列表
            this.$api.Deses().then(res => {
                if (res.code == 200) {
                    this.DesesList = res.data.map(e => {
                        return {
                            label: e.name,
                            value: e.id
                        }
                    })
                }
            });
            //目标节点
            this.$api.GetLocationsByUserId().then(res => {
                if (res.code == 200) {
                    this.TgNodeList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
            //目标物料
            this.$api.GetUnitsByUserId().then(res => {
                if (res.code == 200) {
                    this.TgMtrlList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });

        },
        //获取 业务单类型为 外购入库 的来源节点下拉数据
        getSrNodeList(type){
            //获取来源节点
            if(type==1){
                this.$api.GetVirtualNode().then(res => {
                    if (res.code == 200) {
                        this.SrNodeList = res.data.map(e => {
                            return {
                                label: e.Value,
                                value: e.Key
                            }
                        })
                    }
                });
            }else{
                this.$api.GetVirtualNode2().then(res => {
                    if (res.code == 200) {
                        this.SrNodeList = res.data.map(e => {
                            return {
                                label: e.Value,
                                value: e.Key
                            }
                        })
                        this.form.SrNodeId = ''
                    }
                });
            }

        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.orderList(this.queryParams).then(res => {
                    if (res.code == 200) {
                        this.userList = res.rows,
                            this.total = res.total;
                        this.loading = false;
                    }
                }
            );
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                OpeTypeId:null,//业务单类型
                SrNodeId:null,//来源节点
                SrMtrlId:null,//来源物料
                SrRankId:null,//来源等级
                SrBatch:null,//来源批次
                TgNodeId:null,//目标节点
                TgMtrlId:null,//目标物料
                TgRankId:null,//目标等级
                TgBatch:null,//目标批次
                WgtPerPack:null,//物料规格
                Dim:null,//重量单位
                Amnt:null,//移动件数
                Weight:null,//移动重量
                Customer:null,//客户
                oddNum:null,//交货单号
                TransTypeId:null,//运输类型
                VehiCode:null,//车牌号
                user:null,//领料人
                des:null,//描述
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },

        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增入库业务单";
        },
        /** 修改按钮操作 */
        handleDel(row) {
            this.$modal.msgSuccess("删除成功");
        },
        /*登账*/
        handleAccounting(row) {
            this.$modal.msgSuccess("登账成功");
        },
        /*冲销*/
        handleWriteOff(row) {
            this.$modal.msgSuccess("冲销业务单成功");
        },
        /** 表单提交提交按钮 */
        submitForm: function () {
            this.$modal.msgSuccess("新增成功");
            this.open = false;
        },
        /** 表单提交删除按钮 */
        delForm: function (index) {
            this.ids_dialog.forEach(e=>{
                this.MoveRecordList.splice(e, 1)
            })
            this.$modal.msgSuccess("删除成功");
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + this.ids + '"的数据项？').then(() => {
                return this.$api.i_nodeAreaDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unitArea/export', {
                ...this.queryParams
            }, `装置界区_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unitArea/export', {
            }, `装置界区_${new Date().getTime()}.xlsx`)
        },
        // 文件上传中处理
        handleFileUploadProgress(event, file, fileList) {
            this.upload.isUploading = true;
        },
        // 文件上传成功处理
        handleFileSuccess(response, file, fileList) {
            this.upload.open = false;
            this.upload.isUploading = false;
            this.$refs.upload.clearFiles();
            this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
            this.getList();
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.upload.submit();
        },
        //弹窗增加 移动记录
        AddMoveRecord(){
            this.$refs["formDialog"].validate(valid => {
                if (valid) {
                    console.log('业务单类型',this.form.OpeTypeId)
                    let nowRecord = {
                        time:new Date().getTime(),
                        SrMtrlName:this.form.SrMtrlId?.label || '',//源物料
                        TgMtrlName:this.form.TgMtrlId?.label || '',//目的物料
                        SrNodeName:this.form.SrNodeId?.label || '',//源节点
                        TgNodeName:this.form.TgNodeId?.label || '',//目的节点
                        SrRankName:this.form.SrRankId?.label || '',//源等级
                        TgRankName:this.form.TgRankId?.label || '',//目的等级
                        SrBatch:this.form.SrBatch?.label || '',//源批次
                        TgBatch:this.form.TgBatch?.label || '',//目的批次
                        WgtPerPack:this.form.WgtPerPack || '',//单件重
                        Amnt:this.form.Amnt || '',//件数
                        Weight:this.form.Weight || '',//重量
                        Dim:this.form.Dim.label || '',//单位
                        Des:this.form.des || '',//描述
                        Customer:this.form.Customer || '',//客户
                        VehiCode:this.form.VehiCode || '',//车牌号
                    }
                    this.MoveRecordList.push(nowRecord)
                    console.log('当前记录=',nowRecord)
                }
            });
        },
        //弹窗中 列表 多选
        handleSelectionChange_dialog(selection) {
            console.log('弹窗列表多选',selection)
            let ids = []
            selection.forEach((val, index) => {
                this.MoveRecordList.forEach((v, i) => {
                    // id 是每一行的数据id
                    if(val.time == v.time){
                        console.log(i);
                        ids.push(i)
                    }

                })
            })
            this.ids_dialog = ids
        },
    }
};
</script>
<style lang="scss" scoped>
.app-container{
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
    .z-iframe{
        width: 100%;
        height:  100%;
    }
    #tableBox{
        overflow: auto;
    }
    .box-card {
        height: 300px;
        width: 100%;
        overflow: auto;
        .card-body{
            width: 100%;
            height: 80%;
            border-radius: 5px;
            border: 1px solid #333;
            overflow: auto;
        }
    }
}
</style>
