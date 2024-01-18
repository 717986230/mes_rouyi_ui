<template>
    <!-- 介质折标系数 -->
    <div class="app-container">
        <div style="margin:10px 5px;font-size: 20px;">介质折标系数</div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <!-- <el-form-item label="系数名称:" prop="typeId">
                <el-select size="mini" v-model="queryParams.typeId" placeholder="板块" clearable>
                    <el-option v-for="dict in discountsCoefficientTypeList" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item label="介质名称:" prop="name">
                <el-input size="mini" v-model="queryParams.name" placeholder="介质名称" maxlength="30" />
            </el-form-item>
            <el-form-item label="板块:" prop="sectorId">
                <el-select size="mini" v-model="queryParams.sectorId" placeholder="板块" clearable>
                    <el-option v-for="dict in sectorOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间:" prop="startTime">
                <el-date-picker size="mini" style="width: 192px;" v-model="queryParams.startTime" type="datetime"
                    format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:" prop="endTime">
                <el-date-picker size="mini" style="width: 192px;" v-model="queryParams.endTime" type="datetime"
                    format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间">
                </el-date-picker>
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
            <el-table-column label="系数名称" align="center" sortable key="name" width="100" prop="name"
                v-if="columns[0].visible" />
            <el-table-column label="开始时间" align="center" sortable key="startTime" width="150" prop="startTime"
                v-if="columns[1].visible" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.startTime).format("YYYY-MM-DD HH:mm") }}
                </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" sortable key="endTime" width="150" prop="endTime"
                v-if="columns[2].visible" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.endTime).format("YYYY-MM-DD HH:mm") }}
                </template>
            </el-table-column>
            <el-table-column label="介质" align="center" sortable key="mtrlName" prop="mtrlName" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="折标系数类型" align="center" sortable width="130" key="typeName" prop="typeName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="折标系数" align="center" sortable width="100" key="coefficient" prop="coefficient"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="板块" align="center" sortable key="sectorName" prop="sectorName" v-if="columns[6].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="描述" align="center" sortable key="des" prop="des" v-if="columns[7].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="排序" align="center" sortable key="displayOrder" prop="displayOrder"
                v-if="columns[8].visible" :show-overflow-tooltip="true" />
            <el-table-column fixed="right" label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 添加或修改用户配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="850px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="系数名称:" prop="name">
                            <el-input v-model="form.name" placeholder="系数名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="开始时间:" prop="startTime">
                            <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="结束时间:" prop="endTime">
                            <el-date-picker v-model="form.endTime" type="datetime" placeholder="开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="介质:" prop="mediumId">
                            <el-select v-model="form.mediumId" placeholder="介质">
                                <el-option v-for="(item, index) in mediumType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="折标系数类型:" prop="typeId">
                            <el-select v-model="form.typeId" placeholder="折标系数类型">
                                <el-option v-for="(item, index) in discountsCoefficientTypeList" :key="item.value"
                                    :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="折标系数:" prop="coefficient">
                            <el-input v-model="form.coefficient" placeholder="折标系数" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="板块:" prop="sectorId">
                            <el-select v-model="form.sectorId" placeholder="折标系数类型">
                                <el-option v-for="(item, index) in sectorOption" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="排序:" prop="displayOrder">
                            <el-input type="number" v-model="form.displayOrder" placeholder="排序"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="描述:" prop="des">
                            <el-input v-model="form.des" placeholder="描述"> </el-input>
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
    name: "DielectricScalingFactor",
    components: {},
    data() {
        return {
            mediumType: [],//介质
            sectorOption: [],//板块
            discountsCoefficientTypeList: [],//折标系数类型
            isStart: [
                {
                    label: "启用",
                    value: "0"
                },
                {
                    label: "未启用",
                    value: "1"
                }
            ],
            // 列信息
            columns: [
                { key: 0, label: `系数名称`, visible: true },
                { key: 1, label: `开始时间`, visible: true },
                { key: 2, label: `结束时间`, visible: true },
                { key: 3, label: `介质`, visible: true },
                { key: 4, label: `折标系数类型`, visible: true },
                { key: 5, label: `折标系数`, visible: true },
                { key: 6, label: `板块`, visible: true },
                { key: 7, label: `描述`, visible: true },
                { key: 8, label: `排序`, visible: true },
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
            userList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 表单参数
            form: {},
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
                url: process.env.VUE_APP_BASE_API + "energy/mediumDiscountsCoefficient/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "mediumId": undefined,
                "name": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "sectorId": undefined,
                // "startTime": new Date(),
                // "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "startTime": "",
                "endTime": "",
            },
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                ],
                endTime: [
                    { required: true, message: "结束时间", trigger: "blur" }
                ],
                startTime: [
                    { required: true, message: "开始时间", trigger: "blur" }
                ]
            },
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.e_mediumDiscountsCoefficientList(this.queryParams).then(response => {
                this.userList = response.rows;
                this.total = response.total;
                this.loading = false;
            }
            );
        },
        getOther() {
            //介质
            this.$api.i_enMediumallList().then(res => {
                this.mediumType = res.data.map(e => {
                    return {
                        value: e.mtrlId,
                        label: e.mtrlName
                    }
                })
            })
            //板块
            this.$api.i_sectorOption().then((res) => {
                if (res.code == 200) {
                    this.sectorOption = res.data.map(e => {
                        return {
                            value: e.id,
                            label: e.sectorName
                        }
                    })
                }
            })
            //上级装置
            this.$api.e_discountsCoefficientTypeList({ unitName: "" }).then(res => {
                this.discountsCoefficientTypeList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
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
                "des": "",
                "name": "",
                "id": undefined,
                "coefficient": "",
                "displayOrder": "1",
                "typeId": undefined,
                "mediumId": undefined,
                "sectorId": undefined,
                "startTime": new Date(),
                "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),

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
            this.title = "添加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.e_mediumDiscountsCoefficientByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.e_mediumDiscountsCoefficientSU({
                            "coefficient": this.form.coefficient,
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "mediumId": this.form.mediumId,
                            "name": this.form.name,
                            "sectorId": this.form.sectorId,
                            "endTime": this.form.endTime,
                            "startTime": this.form.startTime,
                            "typeId": this.form.typeId,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_mediumDiscountsCoefficientSU(this.form).then(response => {
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
                return this.$api.e_mediumDiscountsCoefficientDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/mediumDiscountsCoefficient/export', {
                ...this.queryParams
            }, `介质折标系数_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/mediumDiscountsCoefficient/export', {
            }, `介质折标系数_${new Date().getTime()}.xlsx`)
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
