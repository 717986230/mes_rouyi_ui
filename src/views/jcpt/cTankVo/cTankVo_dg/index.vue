<template>
    <!-- 单罐配置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
            <el-form-item label="罐区:">
                <el-select v-model="queryParams.tankAreaId" placeholder="请选择罐区" clearable>
                    <el-option v-for="mtr in areaList" :key="mtr.value" :label="mtr.name" :value="mtr.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐名称:">
                <el-input v-model="queryParams.tankName" placeholder="请输入罐名称" clearable></el-input>
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
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <!--            <el-col :span="3">-->
            <!--                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleSave">保存</el-button>-->
            <!--            </el-col>-->
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编码" sortable align="center" key="tankNum" prop="tankNum" v-if="columns[0].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="罐" sortable align="center" key="tankName" prop="tankName" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="罐类型id" sortable align="center" key="tankTypeId" prop="tankTypeId"
                v-if="columns[2].visible" :show-overflow-tooltip="true" width="100" />
            <el-table-column label="罐类型" sortable align="center" key="tankTypeName" prop="tankTypeName"
                v-if="columns[3].visible" :show-overflow-tooltip="true" width="100" />
            <el-table-column label="标准密度" sortable align="center" key="stdDen" prop="stdDen" v-if="columns[4].visible"
                :show-overflow-tooltip="true" width="100" />
            <el-table-column label="VTF" sortable align="center" key="vtf" prop="vtf" v-if="columns[0].visible"
                :show-overflow-tooltip="true" width="100" />
            <el-table-column label="修正检尺公式" sortable align="center" key="modChkForm" prop="modChkForm"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="150" />
            <el-table-column label="总尺VPF" sortable align="center" key="totlChkVpf" prop="totlChkVpf"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="水尺VPF" sortable align="center" key="wtrChkVpf" prop="wtrChkVpf"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="液化产品系数（体积温度系数）" sortable align="center" key="cubaTempCoef" prop="cubaTempCoef"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="250" />
            <el-table-column label="VCF" sortable align="center" key="vcf" prop="vcf" v-if="columns[0].visible"
                :show-overflow-tooltip="true" width="120" />
            <el-table-column label="VCF小数位" sortable align="center" key="vcfDecFraDgt" prop="vcfDecFraDgt"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="罐公式" sortable align="center" key="tnkForm" prop="tnkForm" v-if="columns[0].visible"
                :show-overflow-tooltip="true" width="120" />
            <el-table-column label="罐气体公式" sortable align="center" key="tnkGasForm" prop="tnkGasForm"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="管空气密度" sortable align="center" key="tnkAirDen" prop="tnkAirDen"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="罐体积公式" sortable align="center" key="tnkFormMode" prop="tnkFormMode"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column label="罐标准体积公式" sortable align="center" key="stdCubaForm" prop="stdCubaForm"
                v-if="columns[0].visible" :show-overflow-tooltip="true" width="120" />
            <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加或修改用户配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐:" prop="tnkCode">
                            <el-select v-model="form.tankId" placeholder="请选择罐" clearable @change="areaChange">
                                <el-option v-for="tank in tankList" :key="tank.id" :label="tank.name" :value="tank.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐编码:">
                            <el-input disabled v-model="form.code" placeholder="请选择罐" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐类型id:">
                            <el-input disabled v-model="form.typeId" placeholder="请选择罐" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐类型:">
                            <el-input disabled v-model="form.typeName" placeholder="请选择罐" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="标准密度:">
                            <el-input v-model="form.stdDen" placeholder="请输入标准密度" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="VTF:">
                            <el-input v-model="form.vtf" placeholder="请输入VTF" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="修正检尺公式:">
                            <el-input v-model="form.modChkForm" placeholder="请输入修正检尺公式" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总尺VPF:">
                            <el-input v-model="form.totlChkVpf" placeholder="请输入总尺VPF" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="水尺VPF:">
                            <el-input v-model="form.wtrChkVpf" placeholder="请输入水尺VPF" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="液化产品系数:">
                            <el-input v-model="form.cubaTempCoef" placeholder="请输入液化产品系数" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="VCF:">
                            <el-input v-model="form.vcf" placeholder="请输入VCF" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="VCF小数位:">
                            <el-input v-model="form.vcfDecFraDgt" placeholder="请输入VCF小数位" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐公式:">
                            <el-input v-model="form.tnkForm" placeholder="请输入罐公式" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐气体公式:">
                            <el-input v-model="form.tnkGasForm" placeholder="请输入罐气体公式" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐空气密度:">
                            <el-input v-model="form.tnkAirDen" placeholder="请输入罐空气密度" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐体积公式:">
                            <el-input v-model="form.tnkFormMode" placeholder="请输入罐体积公式" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐标准体积公式:">
                            <el-input v-model="form.stdCubaForm" placeholder="请输入罐标准体积公式" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                </el-row>
            </el-form>
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
                    <div class="el-upload__tip" slot="tip">
                        <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>
                    <span>仅允许导入xls、xlsx格式文件。</span>
                    <!--                    <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"-->
                    <!--                        @click="importTemplate">下载模板</el-link>-->
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
    name: "cTankVo_wdbz",
    data() {
        return {
            // 列信息
            columns: [
                { key: 0, label: `编码`, visible: true },
                { key: 1, label: `罐`, visible: true },
                { key: 2, label: `罐类型id`, visible: true },
                { key: 3, label: `罐类型`, visible: true },
                { key: 4, label: `标准密度`, visible: true },
                { key: 5, label: `VTF`, visible: true },
                { key: 6, label: `修正检尺公式`, visible: true },
                { key: 7, label: `总尺VPF`, visible: true },
                { key: 8, label: `水尺VPF`, visible: true },
                { key: 9, label: `液化产品系数（体积温度系数）`, visible: true },
                { key: 10, label: `VCF`, visible: true },
                { key: 11, label: `VCF小数位`, visible: true },
                { key: 12, label: `罐公式`, visible: true },
                { key: 13, label: `罐气体公式`, visible: true },
                { key: 14, label: `管空气密度`, visible: true },
                { key: 15, label: `罐体积公式`, visible: true },
                { key: 16, label: `罐标准体积公式`, visible: true },
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

            // 用户表格数据
            dataList: null,
            // 弹出层标题
            title: "",
            formType: "add",
            // 是否显示弹出层
            open: false,
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
                url: process.env.VUE_APP_BASE_API + "mes/tankCnfg/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "tankAreaId": "",
                "tankName": ""
            },
            //新增 from
            form: {
                mtrlCode: '', //物料编码
                mtrlName: '', //物料名称
                mtrlAlias: '', //物料别名
                temp: '', //温度
                vcfVal: '', //vcf值
            },
            //表单验证
            rules: {
                mtrlCode: [
                    { required: true, message: "请选择物料", trigger: "change" },
                ],
                cubaTempCofe: [
                    { required: true, message: "请输入体积温度系数（温度）", trigger: "blur" },
                ],
                den: [
                    { required: true, message: "请输入密度", trigger: "blur" },
                ],
            },
            //罐区列表
            areaList: [],
            //罐列表
            tankList: [],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getAreaList();
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankCnfgList(this.queryParams).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.dataList = res.rows;
                    this.total = res.total;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            }).catch((err) => {
                console.log('接口失败', err)
            })
            this.loading = false;
        },
        //获取罐区列表
        getAreaList() {
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
            this.$api.i_tankAllList({}).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.tankList = res.data;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },

        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            this.queryParams = {
                ...this.queryParams,
                ...{
                    tankAreaId: '',
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_tankCnfgSU({
                            "cubaTempCoef": this.form.cubaTempCoef,
                            "id": this.form.id,
                            "modChkForm": this.form.modChkForm,
                            "stdCubaForm": this.form.stdCubaForm,
                            "stdDen": this.form.stdDen,
                            "tankId": this.form.tankId,
                            "tnkAirDen": this.form.tnkAirDen,
                            "tnkForm": this.form.tnkForm,
                            "tnkFormMode": this.form.tnkFormMode,
                            "tnkGasForm": this.form.tnkGasForm,
                            "totlChkVpf": this.form.totlChkVpf,
                            "vcf": this.form.vcf,
                            "vcfDecFraDgt": this.form.vcfDecFraDgt,
                            "vtf": this.form.vtf,
                            "wtrChkVpf": this.form.wtrChkVpf,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankCnfgSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },

        //数据保存
        handleSave() {
            this.$message({
                message: '假数据数据保存成功',
                type: 'success'
            });
        },
        // 表单重置
        reset() {
            this.form = {
                "cubaTempCoef": "",
                "id": undefined,
                "modChkForm": "",
                "stdCubaForm": "",
                "stdDen": "",
                "tankId": "",
                "tnkAirDen": "",
                "tnkForm": "",
                "tnkFormMode": "",
                "tnkGasForm": "",
                "totlChkVpf": "",
                "vcf": "",
                "vcfDecFraDgt": "",
                "vtf": "",
                "wtrChkVpf": ""
            };
            this.resetForm("form");
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset()
            this.open = true;
            this.title = "新增信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_tankCnfgByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.i_tankCnfgDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/tankCnfg/export', {
                ...this.queryParams
            }, `单罐配置_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/tankCnfg/export', {
            }, `单罐配置_${new Date().getTime()}.xlsx`)
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
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        //表单区域选择
        areaChange(e) {
            let nowData = this.areaList.filter((item) => item.id == e)[0]
            console.log(nowData)
            // todo 替换成对应的数据
            let { code, id, name, tankNum, typeId, typeName } = nowData
            this.form.code = nowData.code;
            this.form.typeId = nowData.typeId;
            this.form.typeName = nowData.typeName;
        }
    }
};
</script>

