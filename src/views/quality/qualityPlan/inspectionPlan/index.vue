<template>
    <!--质量检测(来料检测)-->
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
                    <el-form-item label="方案编号" prop="numbers">
                        <el-input v-model="queryParams.numbers" placeholder="请输入方案编号" clearable style="width: 240px"
                        />
                    </el-form-item>
                    <el-form-item label="方案名称" prop="numbers">
                        <el-input v-model="queryParams.name" placeholder="请输入方案名称" clearable style="width: 240px"
                        />
                    </el-form-item>
                    <el-form-item label="检验日期:" prop="date">
                        <el-date-picker v-model="queryParams.date" type="datetimerange" :picker-options="pickerOptions"
                                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
                    <el-col :span="1.5">
                        <el-button type="primary"  icon="el-icon-copy-document" size="mini"  :disabled="single" @click="handleCopy">复制</el-button>
                    </el-col>
                    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
                </el-row>
                <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column fixed="left" label="序号"  type="index" width="50" align="center" />
                    <el-table-column fixed="left" label="方案编号" align="center" sortable>
                        <template slot-scope="scope">
                            <div class="table-operation">
                                <b @click="handleDetail(scope.$index,scope.row)" class="primary cs">{{scope.row.inspectionNumber}}</b>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="方案名称" align="center" sortable key="name" prop="name"/>
                    <el-table-column label="建立日期" align="center" sortable key="establish" prop="establish"/>
                    <el-table-column label="检验项目数量(项)" align="center" sortable key="inspectionItemCount" prop="inspectionItemCount"/>
                    <el-table-column label="提交人" align="center" sortable key="submitter" prop="submitter"/>
                    <el-table-column label="提交时间" align="center" sortable key="submissionTime" prop="submissionTime"/>
                    <el-table-column label="更新时间" align="center" sortable key="updateTime" prop="updateTime"/>
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

    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import _ from 'lodash';
import { getToken } from "@/utils/auth";
export default {
    name: "incoming",
    data() {
        return {
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
        };
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {

        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.inspectionPlan(this.queryParams).then(response => {
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
        /** 新增按钮操作 */
        handleAdd() {
            this.$router.push("/quality/qualityPlan/inspectionPlan/add");
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.$router.push({
                path: "/quality/qualityPlan/inspectionPlan/edit",
                query: {
                    id: 1,
                },
            });
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
                path: '/quality/qualityPlan/inspectionPlan/detail',
                query: {
                    id: 1
                }
            })
        },
        //复制按钮操作
        handleCopy(){
            this.$modal.msgSuccess("复制成功");
        }
    }
};
</script>
<style lang="scss" scoped>

</style>