<!-- 修改生产计划 -->
<template>
    <div>
        <div style="margin:20px;font-size:24px">{{ routerId ? "修改生产计划" : "新增生产计划" }}</div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>生产计划单信息：</span>
            </div>
            <el-form ref="formnew" :model="form" :rules="rules" label-width="120px">
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="订单编号:" prop="Ordernumber">
                            <el-input type="text" v-model="form.Ordernumber" maxlength="20" placeholder="订单编号"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="客户名称:" prop="Customername">
                            <el-input type="text" v-model="form.Customername" maxlength="20" placeholder="客户名称"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="联系人:" prop="Contactperson">
                            <el-input type="text" v-model="form.Contactperson" maxlength="20" placeholder="联系人"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="交货日期:" prop="Plannedtime">
                            <el-date-picker v-model="form.Plannedtime" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="联系电话:" prop="Contactnumber">
                            <el-input type="text" v-model="form.Contactnumber" maxlength="30" placeholder="联系电话"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="20">
                        <el-form-item label="生产要点:" prop="Keyproduction">
                            <el-input type="textarea" v-model="form.Keyproduction" maxlength="30" placeholder="生产要点"
                                clearable :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="20">
                        <el-form-item label="备注:" prop="remark">
                            <el-input type="textarea" v-model="form.remark" maxlength="30" placeholder="备注" clearable
                                :autosize="{ minRows: 2, maxRows: 2 }"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-row :gutter="40" style="margin: 10px 0;">
            <el-col :span="10" style="text-align: right;">
                <el-button type="primary" @click="handleOK">确 定</el-button>
            </el-col>
            <el-col :span="4" style="text-align: center;">
                <el-button @click="handleClose">取 消</el-button>
            </el-col>
        </el-row>
        <el-card>
            <div slot="header" class="clearfix">
                <span>添加附件:</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="6" style="margin-bottom:10px">
                    <el-input v-model="form.filetitle" type="text" placeholder="附件名称" @focus="handleImport"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain @click="handleImportClick">上传</el-button>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="uploadFileList">
                <el-table-column label="文件名称" align="center" key="name" prop="name" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="日期" align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ dayjs(scope.row.raw.lastModifiedDate).format("YYYY-MM-DD HH:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleViewTc(scope.row)">查询</el-button>
                        <el-button size="mini" type="text" @click="handledeleteTC(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 上传文件列表查询弹窗 -->
        <el-dialog title="报工验收与审核明细" :visible.sync="openTC" width="70%" append-to-body>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>派工单信息:</span>
                </div>
                <el-form ref="formnew" :model="form" :rules="rules" label-width="120px">
                    <el-row :gutter="40">
                        <el-col :span="7">
                            <el-form-item label="订单编码:" prop="Ordernumber">
                                <el-input type="text" v-model="form.Ordernumber" maxlength="20" placeholder="订单编码"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="产品名称:" prop="Productspecification">
                                <el-input type="text" v-model="form.Productspecification" maxlength="20" placeholder="产品名称"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="规格型号:" prop="Specificationmodel">
                                <el-input type="text" v-model="form.Specificationmodel" maxlength="20" placeholder="规格型号"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="7">
                            <el-form-item label="工序名称:" prop="Processname">
                                <el-input type="text" v-model="form.Processname" maxlength="20" placeholder="工序名称"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="计件单价:" prop="Orderquantity">
                                <el-input type="text" v-model="form.Orderquantity" maxlength="20" placeholder="计件单价"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="扣除单价:" prop="Plannedproduction">
                                <el-input type="text" v-model="form.Plannedproduction" maxlength="20" placeholder="扣除单价"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="7">
                            <el-form-item label="交接人:" prop="successor">
                                <el-input type="text" v-model="form.successor" maxlength="20" placeholder="交接人"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="20">
                            <el-form-item label="确认日期:" prop="remark">
                                <el-input type="text" v-model="form.Plannedproduction" maxlength="20" placeholder="确认日期"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>报工信息:</span>
                </div>
                <el-form ref="formnew" :model="form" :rules="rules" label-width="120px">
                    <el-row :gutter="40">
                        <el-col :span="6">
                            <el-form-item label="良品数:" prop="Goodscore">
                                <el-input type="text" v-model="form.Goodscore" maxlength="20" placeholder="良品数"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="工废数:" prop="Publicexpense">
                                <el-input type="text" v-model="form.Publicexpense" maxlength="20" placeholder="工废数"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="料废数:" prop="Scrapcount">
                                <el-input type="text" v-model="form.Scrapcount" maxlength="20" placeholder="料废数"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="返修数:" prop="Numberrepairs">
                                <el-input type="text" v-model="form.Numberrepairs" maxlength="20" placeholder="返修数"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="6">
                            <el-form-item label="验收人:" prop="auditor">
                                <el-input type="text" v-model="form.auditor" maxlength="20" placeholder="验收人"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="验收时间:" prop="Acceptancetime">
                                <el-date-picker v-model="form.Acceptancetime" type="datetime" format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="6">
                            <el-form-item label="审核人:" prop="successor">
                                <el-input type="text" v-model="form.successor" maxlength="20" placeholder="审核人"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="审核时间:" prop="Audittime">
                                <el-date-picker v-model="form.Audittime" type="datetime" format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer clearfixfooter">
                <el-button type="primary" @click="handleSaveTc">保 存</el-button>
                <el-button @click="openTC = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 上传 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-change="handleFileChange" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess"
                :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <span>仅允许导入xls、xlsx格式文件。</span>
                    <!-- <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                        @click="importTemplate">下载模板</el-link> -->
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script >
import { getToken } from "@/utils/auth";

export default ({
    name: "productionPlandetail",
    data() {
        return {
            dataList: [
                {
                    Goodscore: 22,
                    Publicexpense: 33,
                    Numberrepairs: 18,
                    Scrapcount: 20,
                    Processname: "成型",
                    Keyproduction: "1.生产物料质量保证,2.生产流程清晰",
                    Productionvolume: "79",
                    Unitaccount: "100",
                    Specificationmodel: "UUD-1202",
                    Ordernumber: "YUK-1202",//订单编号
                    Customername: "李尔",//客户名称
                    Purchasetime: "2023年11月31日",
                    Contactperson: "锦原",//联系人
                    Contactnumber: "15369816545",
                    id: 1,    //id
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    num: "PNQG-20023", // 订单编号
                    Productname: "橡胶气管",
                    Productspecification: "bmh25*25",
                    Orderquantity: 55,
                    Plannedproduction: "100",
                    status: 1, // 审核状态
                    statustext: "未提交", // 审核状态
                    Plannedtime: "2023-12-01",
                    Audittime: "2023-12-11",
                    Acceptancetime: "2023-12-01",
                    department: "技术部",
                    successor: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    Goodscore: 22,
                    Publicexpense: 33,
                    Acceptancetime: "2023-12-01",
                    Numberrepairs: 28,
                    Scrapcount: 200,
                    Keyproduction: "1.生产物料质量保证,2.生产流程清晰",
                    Processname: "铸压",
                    Specificationmodel: "UUD-15",
                    Productionvolume: "28",
                    Unitaccount: "100",
                    Customername: "锦原生",//客户名称
                    Contactperson: "海东升",//联系人
                    Contactnumber: "13678767656",
                    Ordernumber: "YUK-1302",//订单编号
                    id: 2,    //id
                    Productname: "水平带",
                    Productspecification: "bmh25*25",
                    Orderquantity: 25,
                    Plannedproduction: "50",
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号2",
                    num: "PNQG-20024", // 订单编号
                    status: 5, // 审核状态
                    statustext: "未审核", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-11-20",
                    Audittime: "2023-12-11",
                    department: "行政部",
                    successor: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    Goodscore: 22,
                    Publicexpense: 33,
                    Numberrepairs: 9,
                    Scrapcount: 40,
                    Acceptancetime: "2023-12-01",
                    Processname: "组装",
                    Specificationmodel: "UUD-15",
                    Keyproduction: "1.生产物料质量保证,2.生产流程清晰",
                    Productionvolume: "9",
                    Unitaccount: "100",
                    Productname: "杯盖",
                    Productspecification: "bmh25*25",
                    Orderquantity: 28,
                    Plannedproduction: "80",
                    Customername: "来亚门",//客户名称
                    Contactperson: "胡萨",//联系人
                    Contactnumber: "13678767890",
                    Ordernumber: "YUK-1402",//订单编号
                    id: 3,    //id
                    num: "PNQG-20025", // 订单编号
                    status: 3, // 审核状态
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号3",
                    statustext: "已撤回", // 审核状
                    Purchasetime: "2023年12月23日",
                    Plannedtime: "2023-12-23",
                    Audittime: "2023-12-11",
                    department: "销售部",
                    successor: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    Goodscore: 22,
                    Publicexpense: 33,
                    Numberrepairs: 55,
                    Scrapcount: 100,
                    Acceptancetime: "2023-12-01",
                    Processname: "组装",
                    Specificationmodel: "UHK-19",
                    Productionvolume: "19",
                    Unitaccount: "100",
                    Productname: "杯盖",
                    Productspecification: "bmh25*25",
                    Orderquantity: 28,
                    Plannedproduction: "80",
                    Customername: "王都",//客户名称
                    Contactperson: "法林",//联系人
                    Contactnumber: "15978766556",
                    Ordernumber: "YUK-1502",//订单编号
                    id: 4,    //id
                    num: "PNQG-20026", // 订单编号
                    status: 2, // 审核状态
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    statustext: "审核通过", // 审核状态
                    Plannedtime: "2023-12-25",
                    Audittime: "2023-12-11",
                    department: "行政部",
                    successor: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    Goodscore: 22,
                    Publicexpense: 33,
                    Numberrepairs: 10,
                    Scrapcount: 50,
                    Acceptancetime: "2023-12-01",
                    Specificationmodel: "UHK-22",
                    Processname: "质检",
                    Productionvolume: "29",
                    Unitaccount: "100",
                    Productname: "二级密封条",
                    Productspecification: "bmh25*25",
                    Orderquantity: 59,
                    Plannedproduction: "59",
                    Customername: "王都",//客户名称
                    Contactperson: "史莱欧",//联系人
                    Contactnumber: "15978763333",
                    Ordernumber: "YUK-1604",//订单编号
                    id: 5,    //id
                    Claimtype: "备用领用",
                    Associatedorder: "维修单号4",
                    num: "PNQG-20027", // 订单编号
                    status: 4, // 审核状态
                    statustext: "驳回", // 审核状态
                    Purchasetime: "2023年12月13日",
                    Plannedtime: "2023-12-25",
                    Audittime: "2023-12-11",
                    department: "总裁办",
                    successor: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ],
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
            openTC: false,
            loading: false,
            form: {
                filetitle: ""
            },
            uploadFileList: [],//上传文件列表
            changefile: {},//选中文件数据
            rules: {},
            queryParams: {},
            routerId: undefined
        };
    },
    created() {
        this.routerId = this.$route.query.id
        this.routerId ? this.form = this.dataList.find(item => item.id == this.routerId) : this.form = {}
        if (this.routerId) {
            this.uploadFileList = [
                {
                    name: "设备生产计划表.xlsx",
                    raw: {
                        uid: "12",
                        lastModifiedDate: "Fri Jan 06 2023 13:50:15 GMT+0800 (GMT+08:00)"
                    },
                    uid: "1"
                },
                {
                    name: "设备规划表.xlsx",
                    raw: {
                        uid: "11",
                        lastModifiedDate: "Fri Jan 06 2023 18:50:15 GMT+0800 (GMT+08:00)"
                    },
                    uid: "2"
                }
            ]//上传文件列表
        } else {
            this.uploadFileList = []//上传文件列表
        }
    },
    methods: {
        handleClose() {
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.go(-1);
        },
        handleOK() {
            this.$message.success("保存成功");
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.go(-1);
        },
        handleSaveTc() {
            //保存
            this.$message.success("保存成功");
        },
        handleViewTc(row) {
            //查询
            this.openTC = true
        },
        handledeleteTC(row) {
            this.$confirm('确认删除选中的数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.uploadFileList = this.uploadFileList.filter(item => !row.uid.includes(item.uid));
                this.$message.success('删除成功');
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        //上传按钮
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        handleImportClick() {
            this.uploadFileList.unshift(this.changefile);
            console.log(this.changefile);
            this.$refs.upload.submit();
        },

        handleFileChange(file, fileList) {
            console.log(file, fileList, '文件数据');
            this.changefile = file
            this.form.filetitle = file.name
        },
        // 文件上传中处理
        handleFileUploadProgress(event, file, fileList) {
            console.log(file, fileList, '文件上传中数据');
            this.upload.isUploading = true;
        },
        // 文件上传成功处理
        handleFileSuccess(response, file, fileList) {
            console.log(response, file, fileList, '上传成功数据');
            this.upload.open = false;
            this.upload.isUploading = false;
            this.$refs.upload.clearFiles();
            this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
            this.getList();
        },
        // 提交上传文件
        submitFileForm() {
            this.upload.open = false
        },
    }
});
</script>

<style></style>
