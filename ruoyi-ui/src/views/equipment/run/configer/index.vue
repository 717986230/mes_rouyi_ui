<template>
    <!--    设备测量点组态-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="工厂:" prop="mesFactoryid" style="margin-left: -50px;">
                <el-select size="mini" v-model="queryParams.mesFactoryid" placeholder="工厂" clearable>
                    <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="区域:" prop="department">
                <el-select size="mini" v-model="queryParams.department" placeholder="区域" clearable>
                    <el-option v-for="dict in RequisitionDepartment" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称:" prop="num">
                <el-input type="text" v-model="queryParams.num" maxlength="20" placeholder="设备名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="测量点名称:" prop="num">
                <el-input type="text" v-model="queryParams.num" maxlength="20" placeholder="测量点名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleSave">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUpdate" :disabled="single">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleExport">导出</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="设备名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div :title="scope.row.name" class="column-name" @click="handleToDetail(scope.row.id)">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备编号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="规格型号" align="center" key="Specificationmodel" prop="Specificationmodel"
                :show-overflow-tooltip="true" />
            <el-table-column label="当前状态" align="center" key="status" prop="status" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.status == 1 ? '在役' : scope.row.status == 2 ? '备用' : scope.row.status == 3 ? "停役" :
                        scope.row.status == 4 ? "试用行" : "报废" }}
                </template>
            </el-table-column>
            <el-table-column label="设备类型" align="center" key="Devicetype" prop="Devicetype" :show-overflow-tooltip="true" />
            <el-table-column label="存放位置" align="center" key="department" prop="department" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="所属区域" align="center" key="user" prop="user" :show-overflow-tooltip="true" />
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" /> -->
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
        <el-dialog :title="newtitle" :visible.sync="newOpen" width="50%" append-to-body>
            <el-form ref="formnew" :model="form" :rules="rules" label-width="120px">
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="设备:" prop="mesFactoryid">
                            <el-select v-model="form.mesFactoryid" placeholder="设备" clearable style="width: 230px;">
                                <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="设备编码:" prop="num">
                            <el-input type="text" v-model="form.num" maxlength="20" placeholder="设备编码" clearable
                                style="width: 230px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="设备名称:" prop="name">
                            <el-input type="text" v-model="form.name" maxlength="30" placeholder="设备名称" clearable
                                style="width: 230px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="设备类型:" prop="Devicetype">
                            <el-select v-model="form.Devicetype" placeholder="设备类型" clearable style="width: 230px;">
                                <el-option v-for="dict in DevicetypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="关联测点:" prop="correlationpoint">
                            <el-select multiple v-model="form.correlationpoint" placeholder="关联测点" clearable
                                style="width: 230px;">
                                <el-option v-for="dict in correlationpointList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="规格型号:" prop="Specificationmodel">
                            <el-input type="text" v-model="form.Specificationmodel" maxlength="30" placeholder="规格型号"
                                clearable style="width: 230px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleOK">确 定</el-button>
                <el-button @click="newOpen = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    name: "configer",
    components: {},
    data() {
        return {
            DevicetypeList: [
                {
                    value: '1',
                    label: '维护类型'
                },
                {
                    value: '2',
                    label: '备用类型'
                },
                {
                    value: '3',
                    label: '维修类型'
                },
            ],
            correlationpointList: [{
                value: '1',
                label: '测量点1'
            },
            {
                value: '2',
                label: '测量点2'
            },
            {
                value: '3',
                label: '测量点3'
            },
            {
                value: '4',
                label: '测量点4'
            }],
            mesFactory: [],
            dataList: [
                {
                    id: 1,    //id
                    name: "液压控制器",
                    Devicetype: "主要部件",
                    Specificationmodel: "PM-20022",
                    correlationpoint: "测量点1,测量点2",
                    num: "QG-20023", // 订单编号
                    status: 1, // 审核状态
                    statustext: "在役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月21日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    name: "聚乙烯检测模块",
                    correlationpoint: "测量点1",
                    Specificationmodel: "PM-500",

                    Devicetype: "模块部件",
                    num: "QG-20024", // 订单编号
                    status: 2, // 审核状态
                    statustext: "备用",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月20日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    name: "液压销售样品",
                    Specificationmodel: "PM-500",

                    correlationpoint: "测量点1,测量点2",
                    Devicetype: "销售样品",
                    num: "QG-20025", // 订单编号
                    status: 3, // 审核状态
                    statustext: "停役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月25日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    name: "打印机配件",
                    Devicetype: "行政备件",
                    Specificationmodel: "PM-2002",

                    num: "QG-20026", // 订单编号
                    status: 4, // 审核状态
                    statustext: "试运行",
                    correlationpoint: "测量点1,测量点2",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月17日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    name: "记录档案",
                    Specificationmodel: "PM-2002",

                    Devicetype: "行政备件",
                    correlationpoint: "测量点2",
                    num: "QG-20027", // 订单编号
                    status: 5, // 审核状态
                    statustext: "报废",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月19日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ],
            RequisitionDepartment: [ // 请购部门
                {
                    label: "全部",
                    value: "0"
                },
                {
                    label: "技术部",
                    value: "技术部"
                }, {
                    label: "行政部",
                    value: "行政部"
                }, {
                    label: "总裁办",
                    value: "总裁办"
                }, {
                    label: "销售部",
                    value: "销售部"
                }
            ],
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            title: "",
            // 是否显示弹出层
            open: false,
            newOpen: false,
            newtitle: "测量点组态信息",
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
                url: process.env.VUE_APP_BASE_API + ""
            },
            // 查询参数
            queryParams: {
                department: "0",
                num: "",
                status: "0",
                mesFactoryid: "0"
            },
            rules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
                mesFactoryid: [{ required: true, message: "请选择设备", trigger: "change" }],
                num: [{ required: true, message: "请输入编号", trigger: "blur" }],
                Devicetype: [{ required: true, message: "请选择设备类型", trigger: "change" }],
                correlationpoint: [{ required: true, message: "请选择测量点", trigger: "change" }]
            },
            form: {},
            updatanew: {},//修改筛选数据
        };
    },
    watch: {},
    created() {
        this.getOther()
    },
    methods: {
        close() {
            done()
        },
        handleOK() {
            this.$refs["formnew"].validate(valid => {
                if (valid) {
                    this.dataList.unshift({
                        Specificationmodel: this.form.Specificationmodel,
                        id: this.dataList.length + 1,    //id
                        name: this.form.name,
                        Devicetype: this.form.Devicetype,
                        num: this.form.num,
                        status: 0, // 审核状态
                        correlationpoint: this.form.correlationpoint
                    })
                    this.newOpen = false
                    this.$message.success("新增成功!")
                }
            })
        },
        getOther() {
            //工厂下拉数据
            this.$api.i_MESFactoryAllList().then(res => {
                this.mesFactory = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.mesFactory.unshift({
                    label: "全部",
                    value: "0"
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
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            let nowData
            if (this.queryParams.department != "0") {
                nowData = this.dataList.filter((item) => {
                    return item.department == this.queryParams.department;
                });
            }
            if (this.queryParams.status != "0") {
                nowData = this.dataList.filter((item) => {
                    //接收新数组
                    return item.status == this.queryParams.status;
                });
            }
            if (this.queryParams.num) {
                nowData = this.dataList.filter((item) => {
                    return item.num == this.queryParams.num;
                });
            }
            if (this.queryParams.department == "0" && this.queryParams.status == "0" && this.queryParams.num == "") {
                return this.dataList
            }
            this.dataList = nowData;
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            let data = [
                {
                    id: 1,    //id
                    name: "液压控制器",
                    Devicetype: "主要部件",
                    correlationpoint: "测量点1,测量点2",
                    num: "QG-20023", // 订单编号
                    status: 1, // 审核状态
                    statustext: "在役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月21日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    name: "聚乙烯检测模块",
                    correlationpoint: "测量点1",
                    Devicetype: "模块部件",
                    num: "QG-20024", // 订单编号
                    status: 2, // 审核状态
                    statustext: "备用",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月20日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    name: "液压销售样品",
                    correlationpoint: "测量点1,测量点2",
                    Devicetype: "销售样品",
                    num: "QG-20025", // 订单编号
                    status: 3, // 审核状态
                    statustext: "停役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月25日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    name: "打印机配件",
                    Devicetype: "行政备件",
                    num: "QG-20026", // 订单编号
                    status: 4, // 审核状态
                    statustext: "试运行",
                    correlationpoint: "测量点1,测量点2",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月17日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    name: "记录档案",
                    Devicetype: "行政备件",
                    correlationpoint: "测量点2",
                    num: "QG-20027", // 订单编号
                    status: 5, // 审核状态
                    statustext: "报废",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月19日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ]
            this.dataList = data
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //修改
        handleUpdate() {
            let iiid = this.ids[0]
            this.updatanew = this.dataList.find(m => m.id == iiid)
            this.form = this.updatanew
            this.newOpen = true
        },
        /*跳转去详情*/
        handleToDetail(id) {
            this.$router.push({
                path: "/equipment/configerdetail",
                query: {
                    id: id,
                },
            });
        },
        handleSave() {
            this.form = {}
            this.newOpen = true
        },
        /** 删除按钮操作 */
        handleDelete() {
            // Show a confirmation dialog
            this.$confirm('确认删除选中的数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // Filter out the selected items from the dataList
                this.dataList = this.dataList.filter(item => !this.ids.includes(item.id));
                // Provide feedback
                this.$message.success('删除成功');
                // Reset the selection
                this.ids = [];
            }).catch(() => {
                // User canceled the deletion
                this.$message.info('已取消删除');
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/basicCalculateUnit/export', {
                ...this.queryParams
            }, `设备采购需求提报_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/basicCalculateUnit/export', {
            }, `设备采购需求提报_${new Date().getTime()}.xlsx`)
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
<style scope>
.column-name {
    color: #00c6ff;
    cursor: pointer;
}
</style>