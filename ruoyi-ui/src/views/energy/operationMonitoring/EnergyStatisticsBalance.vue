<template>
    <!-- 能源统计平衡 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="工厂:" prop="unitName" style="margin-left: -50px;">
                <el-select v-model="queryParams.nodeAreaId" placeholder="工厂" clearable>
                    <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="能源介质:" prop="unitTypeId">
                <el-select style="width: 100px;" v-model="queryParams.unitTypeId" placeholder="能源介质" clearable>
                    <el-option v-for="dict in zzType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="dateRange">
                <div class="block">
                    <el-date-picker v-model="queryParams.dateRange" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleCompute">分摊</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                    @click="handleDelete">初始化</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleSave">保存</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleSubmit">提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleUnsubmit">取消提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <div style="float: right;">
                <el-radio v-model="radio" label="1">普通分摊</el-radio>
                <el-radio v-model="radio" label="2">公共分摊</el-radio>
            </div>
        </el-row>
        <el-table v-loading="loading" border :data="userList" @selection-change="handleSelectionChange"
            :expand-row-keys="expands">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.childList">
                            <el-table-column label="核算单元名称" align="center" width="150" key="accountingUnit" prop="accountingUnit"/>
                            <el-table-column label="原始值" align="center" width="150" key="originalValue"
                                prop="originalValue" />
                            <el-table-column label="确认值" align="center" width="150" key="confirmedValue"
                                prop="confirmedValue" />
                            <el-table-column label="管网平衡量" align="center" width="150" key="networkBalanceAmount" prop="networkBalanceAmount" />
                            <el-table-column label="核算实际量" align="center" width="150" key="actualAccountingAmount" prop="actualAccountingAmount" />
                            <el-table-column label="普通分摊量" align="center" width="150" key="ordinaryAllocationAmount" prop="ordinaryAllocationAmount" />
                            <el-table-column label="公共分摊量" align="center" width="150" key="commonAllocationAmount" prop="commonAllocationAmount" />
                            <el-table-column label="核算单元结算量" align="center" width="150" key="accountingUnitSettlementAmount" prop="accountingUnitSettlementAmount" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="状态" align="center" sortable>
                <template slot-scope="scope">
                    <span style="color: #0f5132" v-if="scope.row.status == '0'">未提交</span>
                    <span style="color: #0d6efd " v-if="scope.row.status == '1'">已提交</span>
                    <span style="color: #42b983 "  v-if="scope.row.status == '2'">已保存</span>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="核算单元名称" align="center" sortable key="accountingUnit" prop="accountingUnit" />
            <el-table-column label="消耗量" align="center" sortable key="consumptionAmount" prop="consumptionAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="自产量" align="center" sortable key="selfProductionAmount" prop="selfProductionAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="互供进厂量" align="center" sortable key="interSupplyInAmount" prop="interSupplyInAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="互供出厂量" align="center" sortable key="interSupplyOutAmount" prop="interSupplyOutAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="外购量" align="center" sortable key="externalPurchaseAmount" prop="externalPurchaseAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="外供量" align="center" sortable key="externalSupplyAmount" prop="externalSupplyAmount"
                :show-overflow-tooltip="true" />
            <el-table-column label="开始时间" align="center" sortable key="originalValue" prop="startTime"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.startTime).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" sortable key="unitAlias" prop="unitAlias"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.endTime).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column label="原始量" align="center" sortable
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <input-and-text @input='scope.row.originalValue = $event' :value="scope.row.originalValue"></input-and-text>
                </template>
            </el-table-column>
            <el-table-column label="确认量" align="center" sortable
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <input-and-text @input='scope.row.confirmedValue = $event' :value="scope.row.confirmedValue"></input-and-text>
                </template>
            </el-table-column>
            <el-table-column label="计算公式" align="center" sortable key="formula" prop="formula" width="130" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
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
    name: "EnergyStatisticsBalance",
    components: {},
    data() {
        return {
            radio: "",
            isShow: false,//计算
            zzType: [],
            FormJQtype: [],
            // 遮罩层
            loading: false,
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
                url: process.env.VUE_APP_BASE_API + "/mes/unit/import"
            },
            // 查询参数
            queryParams: {
                dateRange: [new Date(), new Date().setDate(new Date().getDate() - 1)],//时间
                "id": "",
                "isAsc": "",
                "nodeAreaId": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "unitCode": "",
                "unitAlias": "",
                "unitName": "",
                "unitTypeId": ""
            },
            // 表单校验
            rules: {}
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_energyStatisticsBalanceList(this.queryParams).then(response => {
                this.userList = response.data.rows
                this.total = response.data.total;
                this.loading = false;
                }
            );
        },
        getOther() {},
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "des": "",
                "capacity": 0,
                "unitNum": "",
                "useFlag": "1",
                "sectorId": "",
                "unitCode": "",
                "unitName": "",
                "unitAlias": "",
                "nodeAreaId": "",
                "unitTypeId": "",
                "upperUnitId": "",
                "displayOrder": "1000",
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
            this.isShow = false
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
            this.$api.i_unitById({ id: userId }).then(response => {
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
                        this.$api.i_unitSU({
                            "id": this.form.id,
                            "des": this.form.des,
                            "unitNum": this.form.unitNum,
                            "sectorId": this.form.sectorId,
                            "unitCode": this.form.unitCode,
                            "unitName": this.form.unitName,
                            "unitAlias": this.form.unitAlias,
                            "nodeAreaId": this.form.nodeAreaId,
                            "displayOrder": this.form.displayOrder,
                            "upperUnitId": this.form.upperUnitId,
                            "unitTypeId": this.form.unitTypeId,
                            "capacity": this.form.capacity,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_unitSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        //提交
        handleSubmit() {
            this.msgSuccess('提交成功')
        },
        handleUnsubmit() {
            this.msgSuccess('取消提交')
        },
        handleSave() {
            this.msgSuccess('保存成功')
        },
        handleCompute() {
            this.getList();
            this.isShow = true
            this.msgSuccess('计算成功')
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
            }).then(() => {
                this.getList();
                this.msgSuccess('删除成功')
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unit/export', {
                ...this.queryParams
            }, `节点量确认_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unit/export', {
            }, `节点量确认_${new Date().getTime()}.xlsx`)
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
