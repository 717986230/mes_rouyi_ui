<template>
    <!-- 能源互共量仲裁确认 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="源工厂:" prop="unitName" style="margin-left: -50px;">
                <el-select v-model="queryParams.nodeAreaId" placeholder="源工厂" clearable>
                    <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="目的工厂:" prop="nodeAreaId">
                <el-select style="width: 100px;" v-model="queryParams.unitTypeId" placeholder="目的工厂" clearable>
                    <el-option v-for="dict in zzType" :key="dict.value" :label="dict.label" :value="dict.value" />
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
                <el-button type="primary" plain size="mini" @click="handleCompute">计算</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                    @click="handleDelete">删除</el-button>
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
                <el-button type="warning" plain icon="el-icon-download" disabled size="mini" @click="handleExport">导出</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" border :data="userList" @selection-change="handleSelectionChange"
            :expand-row-keys="expands">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.childList">
                            <el-table-column label="节点名称" width="200" key="nodeName" prop="nodeName"  align="center" type="index" />
                            <el-table-column label="开始时间" align="center" key="startTime" prop="startTime"
                                             :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    {{ dayjs(scope.row.startTime).format("YYYY-MM-DD HH:mm:ss") }}
                                </template>
                            </el-table-column>
                            <el-table-column label="结束时间" align="center" key="endTime" prop="endTime"
                                             :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    {{ dayjs(scope.row.endTime).format("YYYY-MM-DD HH:mm:ss") }}
                                </template>
                            </el-table-column>
                            <el-table-column label="原始值" align="center" width="200" key="originalValue"
                                             prop="originalValue" />
                            <el-table-column label="确认值" align="center" width="200" key="confirmationValue"
                                             prop="confirmationValue" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="状态" align="center" sortable key="status"
                             v-if="columns[0].visible" >
                <template slot-scope="scope">
                    <span style="color: #0f5132" v-if="scope.row.status == '0'">未提交</span>
                    <span style="color: #0d6efd " v-if="scope.row.status == '1'">已提交</span>
                    <span style="color: #42b983 "  v-if="scope.row.status == '2'">已保存</span>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="源节点" align="center" sortable key="sourceNode" prop="sourceNode"
                v-if="columns[1].visible" />
            <el-table-column label="目的节点" align="center" sortable key="destinationNode" prop="destinationNode" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="源节点量" align="center" sortable key="sourceNodeQuantity" prop="sourceNodeQuantity" v-if="columns[3].visible"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="目的节点量" align="center" sortable key="destinationNodeQuantity" prop="destinationNodeQuantity"
                v-if="columns[4].visible" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="公式量" align="center" sortable key="formulaQuantity" prop="formulaQuantity" v-if="columns[5].visible"
                :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="确认量" align="center" sortable key="confirmationQuantity" prop="confirmationQuantity"
                v-if="columns[6].visible" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="计算公式" align="center" sortable key="calculationFormula" prop="calculationFormula" width="130"
                v-if="columns[7].visible" />
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
    name: "ConfirmationOfEnergyMutualQuantityArbitration",
    components: {},
    data() {
        return {
            isShow: false,//计算
            sectorOption: [],//板块
            SJtype: [],
            zzType: [],
            JQtype: [],
            FormJQtype: [],
            // 列信息
            columns: [
                { key: 0, label: `节点名称`, visible: true },
                { key: 1, label: `节点类型`, visible: true },
                { key: 2, label: `开始时间`, visible: true },
                { key: 3, label: `结束时间`, visible: true },
                { key: 4, label: `原始量`, visible: true },
                { key: 5, label: `确认量`, visible: true },
                { key: 6, label: `每小时消耗`, visible: true },
                { key: 7, label: `计算公式`, visible: true },
                { key: 8, label: `数据状态`, visible: true },
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
            this.$api.i_energyExchangeList(this.queryParams).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                this.loading = false;
            }
            );
        },
        getOther() {
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
            //上级装置
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.SJtype = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //装置类型
            this.$api.i_unitTypeList().then(res => {
                this.zzType = res.data.map(r => {
                    return {
                        label: r.typeName,
                        value: r.id,
                    }
                })
            })
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({ nodeAreaType: "2" }).then(res => {
                this.FormJQtype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            this.$api.i_nodeAreaType().then(res => {
                this.JQtype = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
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
                this.$modal.msgSuccess("删除成功");
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
