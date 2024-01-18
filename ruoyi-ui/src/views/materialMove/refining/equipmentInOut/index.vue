<template>
    <!-- 炼油装置收付 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
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
            <el-form-item label="装置:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择装置" clearable>
                    <el-option v-for="dict in SJtype" :key="dict.value" :label="dict.label" :value="dict.value" />
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
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                           @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">关闭</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">保存</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" align="center" sortable type="index"
                             v-if="columns[0].visible" />
            <el-table-column label="收付类型" align="center" sortable key="UnitRdTypeName" prop="UnitRdTypeName"
                             v-if="columns[1].visible" :show-overflow-tooltip="true" />
            <el-table-column label="付方节点名称" align="center" sortable key="DlvNodeName" prop="DlvNodeName"
                             v-if="columns[2].visible" :show-overflow-tooltip="true" />
            <el-table-column label="收方节点名称" align="center" sortable key="RcvNodeName" prop="RcvNodeName"
                             v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="收付开始时间" align="center" sortable key="BegRdTime" prop="BegRdTime" v-if="columns[4].visible"
                             :show-overflow-tooltip="true" />
            <el-table-column label="收付结束时间" sortable align="center" key="EndRdTime" prop="EndRdTime" v-if="columns[5].visible"/>
            <el-table-column label="创建人" align="center" sortable key="CrtUserName" prop="CrtUserName" width="160" v-if="columns[6].visible">
            </el-table-column>
            <el-table-column label="创建时间" align="center" sortable key="CrtTime" prop="CrtTime" width="120"
                             v-if="columns[7].visible" />
            <el-table-column label="关闭人" align="center" sortable key="ClsUserName" prop="ClsUserName" width="120"
                             v-if="columns[8].visible" />
            <el-table-column label="关闭时间" align="center" sortable key="ClsTime" prop="ClsTime" width="120"
                             v-if="columns[9].visible" />
            <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                    @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="操作类型:" prop="UnitRdType">
                            <el-select v-model="form.UnitRdTypeName" placeholder="请选择操作类型" @change="form.UnitRdType=$event,operationChange($event)">
                                <el-option v-for="dict in operationType" :key="dict.value" :label="dict.label"
                                           :value="dict"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item>
                            <el-checkbox v-model="form.checked" @change="checkedChange">使用拓扑结构</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="本方节点:" prop="DlvNode">
                            <el-select v-model="form.DlvNodeName" placeholder="请选择本方节点" @change="form.DlvNode=$event,DlvNodeChange($event)">
                                <el-option v-for="dict in ourNode" :key="dict.value" :label="dict.label"
                                           :value="dict"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="对方节点" prop="RcvNode">
                            <el-select v-model="form.RcvNodeName" placeholder="请选择对方节点">
                                <el-option v-for="dict in othersNode" :key="dict.value" :label="dict.label"
                                           :value="dict"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="开始时间:" prop="BegRdTime">
                            <el-date-picker
                                v-model="form.BegRdTime"
                                type="datetime"
                                placeholder="选择开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束时间:">
                            <el-date-picker
                                disabled
                                v-model="form.EndRdTime"
                                type="datetime"
                                placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10"/>
                    <el-col :span="10">
                        <el-form-item label="进出厂物料:">
                            <el-select style="width: 70%" v-model="form.mesWspId" placeholder="请选择进出厂物料" disabled>
                                <el-option v-for="dict in CJtypeList" :key="dict.value" :label="dict.label"
                                           :value="dict.value"></el-option>
                            </el-select>
                            <el-button size="mini" >组分</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="创建时间:">
                            <el-date-picker
                                disabled
                                v-model="form.CrtTime"
                                type="datetime"
                                placeholder="选择创建时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="关闭时间:">
                            <el-date-picker
                                disabled
                                v-model="form.ClsTime"
                                type="datetime"
                                placeholder="选择关闭时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="创建人:">
                            <el-select v-model="form.ClsUser" placeholder="选择创建人">
                                <el-option v-for="dict in CJtypeList" :key="dict.value" :label="dict.label"
                                           :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="关闭人:">
                            <el-select v-model="form.CrtUser" placeholder="选择关闭人" disabled>
                                <el-option v-for="dict in CJtypeList" :key="dict.value" :label="dict.label"
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
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    name: "equipmentInOut",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: {},
    data() {
        return {
            SJtype:[],
            CJtypeList: [],
            // 列信息
            columns: [
                { key: 0, label: `收付类型`, visible: true },
                { key: 1, label: `付方节点名称`, visible: true },
                { key: 2, label: `收方节点名称`, visible: true },
                { key: 3, label: `收付开始时间`, visible: true },
                { key: 4, label: `收付结束时间`, visible: true },
                { key: 5, label: `创建人`, visible: true },
                { key: 6, label: `创建时间`, visible: true },
                { key: 7, label: `关闭人`, visible: true },
                { key: 8, label: `关闭时间`, visible: true },
                { key: 9, label: `备注`, visible: true },
            ],
            roleOptions: [
                {
                    label: "所有", value: "1"
                },
                {
                    label: "未定义", value: "2"
                },
                {
                    label: "已定义", value: "3"
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
            // 用户表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 表单参数
            form: {
                CrtTime:'',//创建时间
            },
            // 查询参数
            queryParams: {
                "isAsc": "",
                "pageNum": 1,
                "pageSize": 10,
                "mesWspId": "",
                "mesFctrName": "",
                "nodeAreaCode": "",
                "unitAreaName": "",
                "reasonable": true,
                "orderByColumn": "",
                "unitAreaAlias": "",
            },
            // 表单校验
            rules: {
                UnitRdType: [
                    { required: true, message: "请选择操作类型", trigger: "blur" },
                ],
                DlvNode: [
                    { required: true, message: "请选择本方节点", trigger: "blur" }
                ],
                RcvNode: [
                    { required: true, message: "请选择对方节点", trigger: "blur" }
                ],
                BegRdTime: [
                    { required: true, message: "请选择开始时间", trigger: "blur" }
                ],
            },
            //班次类型
            classesList: [],
            //操作类型
            operationType:[],
            //本方节点
            ourNode:[],
            //对方节点
            othersNode:[],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //获取班次
            this.$api.classes().then(res => {
                if (res.code == 200) {
                    this.classesList = res.data
                }
            });
            this.$api.i_mesWorkshopAllLis({ mesWspName: '' }).then(res => {
                if (res.code == 200) {
                    this.CJtypeList = res.data.map(e => {
                        return {
                            label: e.name,
                            value: e.id
                        }
                    })
                }
            });
            //装置
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.SJtype = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //操作类型
            this.$api.operationType().then(res => {
                this.operationType = res.data.map(r => {
                    return {
                        label: r.TypeName,
                        value: r.TypeId,
                    }
                })
            })
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.RecoveryOfRefineryList(this.queryParams).then(res => {
                    if (res.code == 200) {
                        this.userList = res.rows,
                            this.total = res.total;
                        this.loading = false;
                    }
                }
            );
        },
        //获取本方节点
        getOurNodes() {
            //本方节点
            this.$api.ourNode({
                rdTypeId:'',//操作类型 id
                unitId:'',//装置 id
            }).then(res => {
                this.ourNode = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
        },
        //获取对方节点
        getOtherNodes() {
            //本方节点
            this.$api.otherNodes({
                isUsePhyModel:this.form.checked,//是否使用拓朴结构
                rdTypeId:'',//操作类型 id
                nodeId:'',//本方节点id
            }).then(res => {
                this.othersNode = res.data.map(r => {
                    return {
                        label: r.Name,
                        value: r.Key,
                    }
                })
            })
        },
        //操作类型变化
        operationChange(e){
            console.log('操作类型变化',e)
            this.getOurNodes()
        },
        //是否使用拓扑结构
        checkedChange(e){
            console.log('是否使用拓扑结构',e)
          this.getOtherNodes()
        },
        //本方节点发生变化
        DlvNodeChange(e){
            console.log('本方节点发生变化',e)
            this.getOtherNodes()
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
                "useFlag": "1",
                "mesWspId": "",
                "unitAreaNum": "",
                "unitAreaName": "",
                "unitAreaCode": "",
                "unitAreaAlias": "",
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
            this.form.CrtTime = new Date()
            this.title = "装置收付信息录入";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.form = row;
            this.open = true;
            this.title = "修改信息";
        },

        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.$modal.msgSuccess("新增成功");
                    this.open = false;
                    this.getList();
                }
            });
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
        }
    }
};
</script>
<style scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}
</style>
