<template>
    <!-- 盘点管理 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
            <el-form-item label="盘点单号:" prop="num">
                <el-input type="text" v-model="queryParams.num" placeholder="请输入盘点单号"></el-input>
            </el-form-item>
            <el-form-item label="备件名称:" prop="Plannedparts">
                <el-input type="text" v-model="queryParams.Plannedparts" placeholder="请输入备件名称"></el-input>
            </el-form-item>
            <el-form-item label="盘点时间:" prop="Actualstarttime">
                <el-date-picker v-model="queryParams.Actualstarttime" type="datetimerange" :picker-options="pickerOptions"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUpdate" :disabled="single">修改</el-button>
            </el-col>

            <el-col :span="1.5">
                <el-button type="danger" plain size="mini" :disabled="multiple" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleSubmit">执行</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleRevocation">完成</el-button>
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
            <el-table-column label="盘点单号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div :title="scope.row.num" class="column-name" @click="handleToDetail(scope.row.id)">
                        {{ scope.row.num }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" key="status" prop="status" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.status == 0 ? '未开始' : scope.row.status == 1 ? '执行中' : scope.row.status == 2 ? "已完成" : "已逾期"
                    }}
                </template>
            </el-table-column>
            <el-table-column label="盘点规则" align="center" key="Inventoryrule" prop="Inventoryrule"
                :show-overflow-tooltip="true" />
            <el-table-column label="仓库" align="center" key="Stash" prop="Stash" :show-overflow-tooltip="true" />
            <el-table-column label="计划盘点备件" align="center" key="Plannedparts" prop="Plannedparts"
                :show-overflow-tooltip="true" />
            <el-table-column label="计划开始时间" align="center" key="Scheduledstarttime" prop="Scheduledstarttime"
                :show-overflow-tooltip="true" />
            <el-table-column label="计划结束时间" align="center" key="Scheduledendtime" prop="Scheduledendtime"
                :show-overflow-tooltip="true" />
            <el-table-column label="实际开始时间" align="center" key="Actualstarttime" prop="Actualstarttime"
                :show-overflow-tooltip="true" />
            <el-table-column label="实际结束时间" align="center" key="Actualendtime" prop="Actualendtime"
                :show-overflow-tooltip="true" />
            <el-table-column label="是否循环" align="center" key="isLoop" prop="isLoop" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isLoop" false-label="0" true-label="1" disabled></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="盘点进度" align="center" width="200" key="user" prop="user" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div style="width: 100%; height: 40px;">
                        <div>{{ scope.row.user }}%</div>
                        <el-progress type="line" :show-text="false" :percentage="scope.row.user" :stroke-width="10"
                            :text-inside="true" :color="ColorType(scope.row.user)" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="盘点负责人" align="center" key="auditor" prop="auditor" :show-overflow-tooltip="true" />
            <el-table-column label="备注" align="center" key="remark" prop="remark" :show-overflow-tooltip="true" />
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" /> -->
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
    name: "inventory",
    components: {},
    data() {
        return {
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
            PopwindowDate: [
                {
                    id: 1,    //id
                    name: "设备名称1", // 设备名称
                    modelValue: "规格型号1", // 规格型号
                    manufacturer: "生产厂家1",//生产厂家
                    unit: "个",
                    quantity: ""
                }, {
                    id: 2,    //id
                    name: "设备名称2", // 设备名称
                    modelValue: "规格型号2", // 规格型号
                    manufacturer: "生产厂家2",//生产厂家
                    unit: "套",
                    quantity: ""
                }, {
                    id: 3,    //id
                    name: "设备名称3", // 设备名称
                    modelValue: "规格型号3", // 规格型号
                    manufacturer: "生产厂家3",//生产厂家
                    unit: "米",
                    quantity: ""
                }, {
                    id: 4,    //id
                    name: "设备名称4", // 设备名称
                    modelValue: "规格型号4", // 规格型号
                    manufacturer: "生产厂家4",//生产厂家
                    unit: "盒",
                    quantity: ""
                }
            ],
            dataList: [
                {
                    id: 1,    //id
                    num: "PD-100020", // 订单编号
                    status: "0", // 审核状态
                    statustext: "未开始",
                    Inventoryrule: "自由规则",
                    Stash: "配件仓库",
                    Plannedparts: "液压缸",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 0,
                    auditor: "李海",
                    remark: "石杜-备注"
                }, {
                    id: 2,    //id
                    num: "PD-100022", // 订单编号
                    status: "1", // 审核状态
                    statustext: "执行中",
                    Inventoryrule: "生产规则",
                    Stash: "生产仓库",
                    Plannedparts: "柴油机液压阀",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 56,
                    auditor: "杜海波",
                    remark: "王宁-备注"
                }, {
                    id: 3,    //id
                    num: "PD-100024", // 订单编号
                    status: "2", // 审核状态
                    statustext: "已完成",
                    Inventoryrule: "准确挑选",
                    Stash: "备件仓库",
                    Plannedparts: "后遥感控件",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 100,
                    auditor: "杨南",
                    remark: "时圣博-备注"
                }, {
                    id: 4,    //id
                    num: "PD-100028", // 订单编号
                    status: "3", // 审核状态
                    statustext: "已逾期",
                    Inventoryrule: "快速规则",
                    Stash: "临时仓库",
                    Plannedparts: "快插拨打火头",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 71,
                    auditor: "诺楠",
                    remark: "亚月-备注"
                },
                {
                    id: 5,    //id
                    num: "PD-100029", // 订单编号
                    status: "3", // 审核状态
                    statustext: "已逾期",
                    Inventoryrule: "标准规则",
                    Stash: "行政物品仓库",
                    Plannedparts: "打印机",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 29,
                    auditor: "图卡罗",
                    remark: "哈雅-备注"
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
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            userList: [],
            // 弹出层标题
            title: "",
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
                url: process.env.VUE_APP_BASE_API + ""
            },
            // 查询参数
            queryParams: {
                Plannedparts: "",
                Actualstarttime: [new Date(), new Date().getTime() + 24 * 60 * 60 * 1000],
                num: ""
            },
            // 表单校验
            rules: {}
        };
    },
    watch: {},
    created() {
        this.total = this.dataList.length
    },
    computed: {

    },
    methods: {
        ColorType(row) {
            if (row < 40) {
                return "#F56C6C";
            } else if (row >= 40 && row < 70) {
                return "#1890FF";
            } else {
                return "#67C23A";
            }
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
            if (this.queryParams.num) {
                nowData = this.dataList.filter((item) => {
                    //接收新数组
                    return item.num == this.queryParams.num;
                });
            }
            if (this.queryParams.Plannedparts) {
                nowData = this.dataList.filter((item) => {
                    //接收新数组
                    return item.Plannedparts == this.queryParams.Plannedparts;
                });
            }
            if (this.queryParams.num == "" && this.queryParams.Plannedparts == "") {
                return this.dataList
            }
            this.dataList = nowData;
            // this.queryParams.pageNum = 1;
            // this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            // this.handleQuery();
            let data = [
                {
                    id: 1,    //id
                    num: "PD-100020", // 订单编号
                    status: "0", // 审核状态
                    statustext: "未开始",
                    Inventoryrule: "自由规则",
                    Stash: "配件仓库",
                    Plannedparts: "液压缸",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 0,
                    auditor: "李海",
                    remark: "石杜-备注"
                }, {
                    id: 2,    //id
                    num: "PD-100022", // 订单编号
                    status: "1", // 审核状态
                    statustext: "执行中",
                    Inventoryrule: "生产规则",
                    Stash: "生产仓库",
                    Plannedparts: "柴油机液压阀",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 56,
                    auditor: "杜海波",
                    remark: "王宁-备注"
                }, {
                    id: 3,    //id
                    num: "PD-100024", // 订单编号
                    status: "2", // 审核状态
                    statustext: "已完成",
                    Inventoryrule: "准确挑选",
                    Stash: "备件仓库",
                    Plannedparts: "后遥感控件",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 100,
                    auditor: "杨南",
                    remark: "时圣博-备注"
                }, {
                    id: 4,    //id
                    num: "PD-100028", // 订单编号
                    status: "3", // 审核状态
                    statustext: "已逾期",
                    Inventoryrule: "快速规则",
                    Stash: "临时仓库",
                    Plannedparts: "快插拨打火头",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 71,
                    auditor: "诺楠",
                    remark: "亚月-备注"
                },
                {
                    id: 5,    //id
                    num: "PD-100029", // 订单编号
                    status: "4", // 审核状态
                    statustext: "未开始",
                    Inventoryrule: "标准规则",
                    Stash: "行政物品仓库",
                    Plannedparts: "打印机",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 29,
                    auditor: "图卡罗",
                    remark: "哈雅-备注"
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
        /** 新增按钮操作 */
        handleAdd() {
            this.$router.push("/equipment/inventoryadd");
        },
        //修改
        handleUpdate() {
            let nowData = this.dataList.filter((item) => {
                //接收新数组
                return item.id == this.ids[0];
            })[0];
            //只有未提交才能修改
            // if (nowData.statusId !== 0) {
            //     this.$message({
            //         type: "error",
            //         message: "已提交，不可修改",
            //     });
            //     return false;
            // }
            this.$router.push({
                path: "/equipment/inventoryadd",
                query: {
                    id: nowData.id,
                },
            });
        },
        //弹窗失焦事件
        handleBlur() { },
        /*跳转去详情*/
        handleToDetail(id) {
            this.$router.push({
                path: "/equipment/inventorydetail",
                query: {
                    id: id,
                },
            });
        },

        handleSubmit() {
            let isid = this.ids[0]
            // 执行
            this.$router.push({
                path: "/equipment/inventorydetail",
                query: {
                    id: isid,
                },
            });
        },
        handleRevocation() {
            // {
            //     label: "未开始",
            //     value: "0"
            // }, {
            //     label: "执行中",
            //     value: "1"
            // }, {
            //     label: "已完成",
            //     value: "2"
            // }, {
            //     label: "已逾期",
            //     value: "3"
            // }
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = "2"
            //完成
            this.$message.success("表单完成")
        },
        handleTurndown() {
            //驳回
            this.$message.success("驳回成功")
        },
        /** 删除按钮操作 */
        handleDelete() {
            if (this.ids.length === 0) {
                this.$message.warning('请选择要删除的数据');
                return;
            }

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
            }, `盘点管理_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/basicCalculateUnit/export', {
            }, `盘点管理_${new Date().getTime()}.xlsx`)
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