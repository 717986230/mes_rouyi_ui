<template>
    <!--维护任务-->
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
                    <el-form-item label="维护完成时间:" prop="Plannedtime" label-width="120px">
                        <el-date-picker
                            v-model="queryParams.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="区域" prop="numbers">
                        <el-select v-model="queryParams.areaID" placeholder="请选择区域" style="width: 90%">
                            <el-option v-for="(dict,index) in areaOptions" :key="index" :label="dict.label"
                                       :value="dict.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务状态" prop="numbers">
                        <el-select v-model="queryParams.areaID" placeholder="请选择任务状态" style="width: 90%">
                            <el-option v-for="(dict,index) in dict.type.tenance_task_status" :key="index" :label="dict.label"
                                       :value="dict.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备名称" prop="numbers">
                        <el-input v-model="queryParams.name" placeholder="请输入设备名称" clearable style="width:90%"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
                                   @click="handleEdit">修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="primary" plain icon="el-icon-check" size="mini" :disabled="single"
                                   @click="handleFinish">完成</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="success" plain icon="el-icon-check" size="mini" :disabled="single"
                                   @click="handleAdopt">通过</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="danger" plain icon="el-icon-close" size="mini" :disabled="single"
                                   @click="handleReject">驳回</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
                    </el-col>
                    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
                </el-row>
                <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column fixed="left" label="序号"  type="index" width="50" align="center" />
                    <el-table-column fixed="left" label="维护任务名称" align="center" sortable>
                        <template slot-scope="scope">
                            <div class="table-operation">
                                <b @click="handleDetail(scope.$index,scope.row)" class="primary cs">{{scope.row.item1}}</b>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="维护任务单号" align="center" sortable key="item2" prop="item2"/>
                    <el-table-column label="任务状态" align="center" sortable key="item3" prop="item3"/>
                    <el-table-column label="关联计划" align="center" sortable key="item4" prop="item4"/>
                    <el-table-column label="所属区域" align="center" sortable key="item5" prop="item5"/>
                    <el-table-column label="设计设备" align="center" sortable key="item6" prop="item6"/>
                    <el-table-column label="维护内容" align="center" sortable key="item7" prop="item7"/>
                    <el-table-column label="计划开始时间" align="center" sortable key="item8" prop="item8"/>
                    <el-table-column label="计划结束时间" align="center" sortable key="item9" prop="item9"/>
                    <el-table-column label="实际开始时间" align="center" sortable key="item10" prop="item10"/>
                    <el-table-column label="实际结束时间" align="center" sortable key="item11" prop="item11"/>
                    <el-table-column label="维护负责人" align="center" sortable key="item12" prop="item12"/>
                    <el-table-column label="维护验证人" align="center" sortable key="item13" prop="item13"/>
                    <el-table-column label="保养规程" align="center" >
                        <template slot-scope="scope">
                            <i class="el-icon-folder-opened large primary" @click="handleDocument(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" sortable key="item16" prop="item15"/>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getList" />
            </el-col>
        </el-row>
        <!-- 用户导入对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                       :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                       :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <!--          <div class="el-upload__tip" slot="tip">-->
                    <!--            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据-->
                    <!--          </div>-->
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
        <el-dialog :title="filesDialog.title" :visible.sync="filesDialog.visible" :width="filesDialog.width" append-to-body>
            <!--设备图片-->
            <el-row >
                <el-col :span="12" v-for="(file,index) in filesDialog.data" :key="index" style="margin-bottom: 10px;">
                    <el-row class="flex align-center">
                        <el-col :span="15" class="flex align-center justify-start p10" >
                            <svg-icon class-name="svg-icon large" :icon-class="file.type+'2'" />
                            <div class="name m20">{{file.name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <svg-icon v-if="file.type != 'ppt'" class-name="svg-icon medium cs mr10" icon-class="look" @click="handlePreview(file)"/>
                            <svg-icon class-name="svg-icon medium cs" icon-class="download2" @click="handleDownload(file)"/>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
        <file-preview :dialog-visible="fileDialogVisible" :file="file" @close="fileDialogVisible = false"></file-preview>
    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import _ from 'lodash';
import { getToken } from "@/utils/auth";
import filePreview from "@/views/equipment/mixins/filePreview.js";

export default {
    name: "index",
    mixins: [filePreview],
    dicts:['tenance_task_status'],
    data() {
        return {
            areaOptions:[],
            // 双项绑定search
            queryParams: {
                numbers:'',
                name:'',
                date: [new Date(), new Date().getTime() + 24 * 60 * 60 * 1000],
                result:'',
                pageNum: 1,
                pageSize: 10,
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            resultOptions:[
                {
                    label: '合格',
                    value: '1'
                },
                {
                    label: '不合格',
                    value: '0'
                }
            ],//检验结果
            //遮罩层
            loading: false,
            // 是否显示搜索
            showSearch: true,
            //列表数据
            tableData: [],

            total: 0,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 弹出层标题
            title: "", //
            // 是否显示弹出层
            open: false,
            // 用户导入参数
            upload: {
                // 是否显示弹出层（用户导入）
                open: false,
                // 弹出层标题（用户导入）
                title: "", //
                // 是否禁用上传
                isUploading: false,
                // 是否更新已经存在的用户数据
                updateSupport: 0,
                // 设置上传的请求头部
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址
                url: process.env.VUE_APP_BASE_API + "/mes/pminnsmtnode/import"
            },
            //弹窗数据 文件 图片
            filesDialog:{
                type:'imgs', // files || imgs
                data:[],
                title:'设备关联文档',
                visible:false,
                width:'800px',
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({ nodeAreaType: "2" }).then(res => {
                this.areaOptions = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.tenanceTasksList(this.queryParams).then(response => {
                    this.tableData = response.data
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery: _.debounce(function () {
            this.queryParams.pageNum = 1;
            this.getList();
        }, 1000),
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.queryParams.deptId = undefined;
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.nodeId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            this.$modal.msgSuccess("删除成功");
            return false
            const userIds = row.nodeId || this.ids[0];
            console.log(userIds);
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_PminnsmtNodeDel({ nodeIds: [userIds] })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/pminnsmtnode/export', {
                ...this.queryParams
            }, `互供点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/pminnsmtnode/export', {
            }, `互供点_${new Date().getTime()}.xlsx`)
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
        //备件名称进详情
        handleDetail(idx,row){
            this.$router.push({
                path: '/equipment/tenance/task/detail',
                query: {
                    id: 1
                }
            })
        },
        handlePicture(row){
            this.filesDialog = {
                type:'imgs', // files || imgs
                data:row,
                title:'设备图片',
                visible:true,
                width:'800px',
            }
        },
        /** 修改按钮操作 */
        handleEdit(row) {
            this.$router.push({
                path: '/equipment/tenance/task/detail',
                query: {
                    id: 1,
                }
            })
        },
        /** 完成按钮操作 */
        handleFinish(row) {
            this.$modal.msgSuccess("完成成功");
        },
        // 通过操作按钮
        handleAdopt(){
            this.$modal.msgSuccess("通过成功");
        },
        //驳回按钮操作
        handleReject(){
            this.$modal.msgSuccess("驳回成功");
        },
        /** 文档按钮 */
        handleDocument(){
            this.filesDialog = {
                type:'files', // files || imgs
                data:[
                    {
                        type:'word',
                        name:'Word文档1',
                        url:require('@/assets/images/equipment/img.png'),
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/测试word文档_20240104154542A006.docx',
                        fileType:'docx',
                        fileName:'测试word文档_20240104154542A006.docx'
                    },
                    {
                        type:'excel',
                        name:'excel文档1',
                        url:require('@/assets/images/equipment/img.png'),
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/设备管理工作安排_20240104145038A003.xlsx',
                        fileType:'excel',
                        fileName:'设备管理工作安排_20240104145038A003.xlsx'
                    },
                    {
                        type:'ppt',
                        name:'ppt文档1',
                        url:require('@/assets/images/equipment/img.png'),
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType:'pdf',
                        fileName:'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
                    },
                    {
                        type:'pdf',
                        name:'pdf文档1',
                        url:require('@/assets/images/equipment/img.png'),
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType:'pdf',
                        fileName:'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
                    }
                ],
                title:'设备关联文档',
                visible:true,
                width:'800px',
            }
        },
    }
};
</script>
<style lang="scss" scoped>

</style>