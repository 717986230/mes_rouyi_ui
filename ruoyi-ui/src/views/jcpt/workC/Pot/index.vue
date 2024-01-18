<template>
    <!-- 罐 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="编码:" prop="tankCode" style="margin-left: -50px;">
                <el-input v-model="queryParams.tankCode" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="tankName">
                <el-input v-model="queryParams.tankName" placeholder="请输入名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="类型:" prop="tankTypeId">
                <el-select v-model="queryParams.tankTypeId" placeholder="类型">
                    <el-option v-for="(dict, index) in wqlgList" :key="index" :label="dict.name"
                        :value="dict.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="罐区:" prop="tankAreaId">
                <el-select v-model="queryParams.tankAreaId" placeholder="罐区" clearable>
                    <el-option v-for="(dict, index) in areaList" :key="dict.id" :label="dict.name" :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
                    @click="handleUpdate">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编号" align="center" key="tankNum" prop="tankNum" fixed="left"
                v-if="columns[0].visible" />
            <el-table-column label="编码" align="center" key="tankCode" prop="tankCode" :show-overflow-tooltip="true"
                v-if="columns[1].visible" />
            <el-table-column label="名称" width="200" align="center" key="tankName" prop="tankName"
                :show-overflow-tooltip="true" v-if="columns[2].visible" />
            <el-table-column label="别名" width="200" align="center" key="tabkAlias" prop="tabkAlias"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="精度" align="center" key="accuracy" prop="accuracy" width="120"
                v-if="columns[4].visible" />
            <el-table-column label="启用标识" align="center" key="useFalg" prop="useFalg" v-if="columns[5].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFalg"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="类型" align="center" key="tankTypeName" prop="tankTypeName" width="160"
                v-if="columns[6].visible"></el-table-column>
            <el-table-column label="罐区" align="center" key="tankAreaName" prop="tankAreaName" width="160"
                v-if="columns[7].visible" />
            <el-table-column label="料仓标识" align="center" key="material" prop="material" v-if="columns[8].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.material"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="浮盘质量" align="center" key="fltPlatWgt" prop="fltPlatWgt" :show-overflow-tooltip="true"
                v-if="columns[9].visible" />
            <el-table-column label="罐高" align="center" key="tall" prop="tall" :show-overflow-tooltip="true"
                v-if="columns[10].visible" />
            <el-table-column label="是否为保温罐" align="center" key="htPretTank" prop="htPretTank" v-if="columns[11].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.htPretTank"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="起伏高度" align="center" key="fltPlatPerHgt" prop="fltPlatPerHgt" width="120"
                v-if="columns[12].visible" />
            <el-table-column label="罐公称容积" align="center" key="tankTotlCuba" prop="tankTotlCuba" v-if="columns[13].visible">
            </el-table-column>
            <el-table-column label="浮顶最低点" align="center" key="fltTipLst" prop="fltTipLst" width="160"
                v-if="columns[14].visible">
            </el-table-column>
            <el-table-column label="罐安全高低" align="center" key="maxTankHgt" prop="maxTankHgt" width="160"
                v-if="columns[15].visible"></el-table-column>
            <el-table-column label="罐底高度" align="center" prop="minTankHgt" key="minTankHgt" width="160"
                v-if="columns[16].visible"></el-table-column>
            <el-table-column label="显示顺序" align="center" prop="orderNum" key="orderNum" width="160"
                v-if="columns[17].visible"></el-table-column>
            <el-table-column label="备注" align="center" key="remark" prop="remark" width="160"
                v-if="columns[18].visible"></el-table-column>
            <el-table-column label="板块" align="center" key="sectorName" prop="sectorName" width="160"
                v-if="columns[19].visible"> </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body center>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="tankNum">
                            <el-input v-model="form.tankNum" placeholder="请输入编号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="tankCode">
                            <el-input v-model="form.tankCode" placeholder="编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="tankName">
                            <el-input v-model="form.tankName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="tabkAlias">
                            <el-input v-model="form.tabkAlias" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型:" prop="tankTypeId">
                            <el-select v-model="form.tankTypeId" placeholder="类型" @change="tankChange">
                                <el-option v-for="(dict, index) in wqlgList" :key="index" :label="dict.name"
                                    :value="dict.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐区:" prop="tankAreaId">
                            <el-select v-model="form.tankAreaId" placeholder="罐区">
                                <el-option v-for="(dict, index) in GQtype" :key="index" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="节点精度:" prop="accuracy">
                            <el-input v-model="form.accuracy" placeholder="节点精度" maxlength="30" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="启用标识:" prop="useFalg">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFalg"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="料仓标识:" prop="material">
                            <el-checkbox true-label="1" false-label="0" v-model="form.material"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否保温罐:" prop="htPretTank">
                            <el-checkbox true-label="1" false-label="0" v-model="form.htPretTank"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐高:" prop="tall">
                            <el-input v-model="form.tall" placeholder="罐高" maxlength="30" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="浮盘质量:" prop="fltPlatWgt">
                            <el-input v-model="form.fltPlatWgt" placeholder="浮盘质量" maxlength="30" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="起伏高度:" prop="fltPlatPerHgt">
                            <el-input v-model="form.fltPlatPerHgt" placeholder="起伏高度" maxlength="30"
                                type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="浮顶最低点:" prop="fltTipLst">
                            <el-input v-model="form.fltTipLst" placeholder="浮顶最低点" maxlength="30" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="安全高度:" prop="maxTankHgt">
                            <el-input v-model="form.maxTankHgt" placeholder="安全高度" maxlength="30" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐底高度:" prop="minTankHgt">
                            <el-input v-model="form.minTankHgt" placeholder="罐底高度" maxlength="30" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="公称容积:" prop="tankTotlCuba">
                            <el-input v-model="form.tankTotlCuba" placeholder="公称容积" maxlength="30"
                                type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="orderNum">
                            <el-input v-model="form.orderNum" placeholder="显示顺序"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="remark">
                            <el-input v-model="form.remark" placeholder="备注"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="板块:" prop="sectorId">
                            <el-select v-model="form.sectorId" placeholder="板块">
                                <el-option v-for="(dict, index) in sectorOption" :key="index" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增/修改弹窗 -->
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
        <!-- 公式验证编辑 -->
        <varPop :openGS="openGS" @close="handleClose"></varPop>
    </div>
</template>

<script>
import { getUser, } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "Pot",
    dicts: ['work_c', 'pot_type'],
    components: { varPop },
    data() {
        return {
            GQtype: [],//罐区
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `精度`, visible: true },
                { key: 5, label: `启用标识`, visible: true },
                { key: 6, label: `类型`, visible: true },
                { key: 7, label: `罐区`, visible: true },
                { key: 8, label: `料仓标识`, visible: true },
                { key: 9, label: `浮盘质量`, visible: true },
                { key: 10, label: `罐高`, visible: true },
                { key: 11, label: `是否为保温罐`, visible: true },
                { key: 12, label: `起伏高度`, visible: true },
                { key: 13, label: `罐公称容积`, visible: true },
                { key: 14, label: `浮顶最低点`, visible: true },
                { key: 15, label: `罐安全高度`, visible: true },
                { key: 16, label: `罐底高度`, visible: true },
                { key: 17, label: `显示顺序`, visible: true },
                { key: 18, label: `备注`, visible: true },
                { key: 19, label: `板块`, visible: true },
            ],
            wqlgList: [],//罐类型
            sectorOption: [],//板块列表
            roleOptions: [
                {
                    label: "未定", value: "1"
                },
                {
                    label: "已定", value: "2"
                },
                {
                    label: "所有", value: "3"
                }
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
            // 罐表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            openGS: false,

            // 表单参数
            form: {},
            // 罐导入参数
            upload: {
                // 是否显示弹出层（罐导入）
                open: false,
                // 弹出层标题（罐导入）
                title: "",
                // 是否禁用上传
                isUploading: false,
                // 是否更新已经存在的罐数据
                updateSupport: 0,
                // 设置上传的请求头部
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址
                url: process.env.VUE_APP_BASE_API + "/mes/tank/import",

            },
            // 查询参数
            queryParams: {
                "pageNum": 1,
                "pageSize": 10,
                "tankAreaId": "",
                "tankCode": "",
                "tankName": "",
                "tankTypeId": ""
            },
            // 表单校验
            rules: {
                tankNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                ],
                tankCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                tankName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                tabkAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
                sectorId: [
                    { required: true, message: "请选择板块", trigger: "blur" }
                ],
                tankTypeId: [
                    { required: true, message: "请选择类型", trigger: "blur" }
                ],
                tankAreaId: [
                    { required: true, message: "请选择罐区", trigger: "blur" }
                ],
            },
            areaList: [],//罐区列表
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },
    methods: {
        getOther() {
            this.$api.i_tankAreaAll().then(res => {
                this.GQtype = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //获取罐区列表
            this.$api.i_tankAreaAll().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.areaList = res.data;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            //获取罐类型列表
            this.$api.i_tankType().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.wqlgList = res.data;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            //获取板块数据
            this.$api.i_sectorOption().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.sectorOption = res.data.map(e => {
                        return {
                            value: e.id,
                            label: e.sectorName
                        }
                    })
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
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
        /** 查询罐列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankList(this.queryParams).then(response => {
                this.userList = response.rows;
                this.total = response.total;
                this.loading = false;
            }
            ).catch(error => {
                this.loading = false;
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "accuracy": "",
                "fltPlatPerHgt": "",
                "fltPlatWgt": "",
                "fltTipLst": "",
                "htPretTank": "0",
                "material": "0",
                "id": undefined,
                "maxTankHgt": "",
                "minTankHgt": "",
                "orderNum": "",
                "remark": "",
                "sectorId": "",
                "tabkAlias": "",
                "tall": "",
                "tankAreaId": "",
                "tankCode": "",
                "tankName": "",
                "tankNum": "",
                "tankTotlCuba": "",
                "tankTypeId": "",
                "useFalg": "1"
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
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
            getUser().then(response => {
                this.open = true;
                this.title = "添加信息";
            });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_tankByid({ id: userId }).then(response => {
                this.form = response.data;
                this.$set(this.form, "postIds", response.postIds);
                this.$set(this.form, "roleIds", response.roleIds);
                this.open = true;
                this.title = "修改罐";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_tankOrUpdata({
                            "accuracy": this.form.accuracy,
                            "fltPlatPerHgt": this.form.fltPlatPerHgt,
                            "fltPlatWgt": this.form.fltPlatWgt,
                            "fltTipLst": this.form.fltTipLst,
                            "htPretTank": this.form.htPretTank,
                            "id": this.form.id,
                            "material": this.form.material,
                            "maxTankHgt": this.form.maxTankHgt,
                            "minTankHgt": this.form.minTankHgt,
                            "orderNum": this.form.orderNum,
                            "remark": this.form.remark,
                            "sectorId": this.form.sectorId,
                            "tabkAlias": this.form.tabkAlias,
                            "tall": this.form.tall,
                            "tankAreaId": this.form.tankAreaId,
                            "tankCode": this.form.tankCode,
                            "tankName": this.form.tankName,
                            "tankNum": this.form.tankNum,
                            "tankTotlCuba": this.form.tankTotlCuba,
                            "tankTypeId": this.form.tankTypeId,
                            "useFalg": this.form.useFalg,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankOrUpdata({
                            "accuracy": this.form.accuracy,
                            "fltPlatPerHgt": this.form.fltPlatPerHgt,
                            "fltPlatWgt": this.form.fltPlatWgt,
                            "fltTipLst": this.form.fltTipLst,
                            "htPretTank": this.form.htPretTank,
                            "id": this.form.id,
                            "material": this.form.material,
                            "maxTankHgt": this.form.maxTankHgt,
                            "minTankHgt": this.form.minTankHgt,
                            "orderNum": this.form.orderNum,
                            "remark": this.form.remark,
                            "sectorId": this.form.sectorId,
                            "tabkAlias": this.form.tabkAlias,
                            "tall": this.form.tall,
                            "tankAreaId": this.form.tankAreaId,
                            "tankCode": this.form.tankCode,
                            "tankName": this.form.tankName,
                            "tankNum": this.form.tankNum,
                            "tankTotlCuba": this.form.tankTotlCuba,
                            "tankTypeId": this.form.tankTypeId,
                            "useFalg": this.form.useFalg,
                        }).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_tankDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        //罐类型选择
        tankChange(e) {
            this.form.tankTypeName = this.wqlgList.filter(e => e.id == e)[0].name;
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/tank/export', {
                ...this.queryParams
            }, `罐_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/tank/export', {
            }, `罐_${new Date().getTime()}.xlsx`)
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
        }
    }
};
</script>
