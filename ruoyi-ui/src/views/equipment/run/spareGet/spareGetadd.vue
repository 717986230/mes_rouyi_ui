<template>
    <!-- 备品备件申领（新增/修改） -->
    <div class="box-card-add">
        <div style="margin: 20px;font-size:24px ;">
            备品备件申领（新增/修改）
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>申领基础信息</span>
            </div>
            <el-form ref="form" :model="dataInfo" :rules="rules" label-width="120px">
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="申领单号:" prop="num">
                            <el-input v-model="dataInfo.num" placeholder="请购单号" maxlength="30" :disabled="routerId" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="申领类型:" prop="Claimtype">
                            <el-select v-model="formForm.Claimtype" multiple placeholder="申领类型" style="width: 100%;">
                                <el-option v-for="item in ClaimtypeList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="关联单号:" prop="Associatedorder">
                            <el-select v-model="formForm.Associatedorder" multiple placeholder="关联单号" style="width: 100%;">
                                <el-option v-for="item in unitoptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="计划领用时间:" prop="Plannedtime">
                            <el-date-picker style="width: 520px;" v-model="dataInfo.Plannedtime" type="datetime"
                                placeholder="选择时间日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="10">
                        <el-form-item label="申领部门:" prop="Applicantdepartment">
                            <el-input :disabled="routerId" v-model="dataInfo.Applicantdepartment" placeholder="申领部门"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="申领人:" prop="claimant">
                            <el-input :disabled="routerId" v-model="dataInfo.claimant" placeholder="申领人" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="申领原因:" prop="remark">
                            <el-input type="textarea" v-model="dataInfo.remark" placeholder="请输入申领原因" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>申领明细</span>
            </div>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="success" size="mini" @click="handleAdd">添加</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" size="mini" :disabled="singlepopw" @click="handleRemove">移除</el-button>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="PopwindowDate" @selection-change="handleSelectionPopwindowDate">
                <el-table-column fixed="left" type="selection" width="50" align="center" />
                <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                <el-table-column label="仓库" align="center" sortable key="Stash" prop="Stash" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="备件名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="备件编码" align="center" sortable key="num" prop="num"
                    :show-overflow-tooltip="true" />
                <el-table-column label="规格型号" align="center" sortable key="manufacturer" prop="manufacturer"
                    :show-overflow-tooltip="true" />
                <el-table-column label="单位" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true" />
                <el-table-column label="申领数量" align="center" sortable key="quantity" prop="quantity"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="routerId">
                            {{ scope.row.quantity }}
                        </div>
                        <el-input v-else type="text" v-model="scope.row.quantity" @blur="Editquantity = false"
                            maxlength="30" style="width: 100px;"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="申领明细" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="formForm" label-width="100px" :rules="rulesForm">
                <el-form-item label="仓库:" prop="Stash">
                    <el-select v-model="formForm.Stash" placeholder="请选择仓库" style="width: 100%;">
                        <el-option
                            v-for="item in [{ value: '仓库1', label: '仓库1' }, { value: '仓库2', label: '仓库2' }, { value: '仓库3', label: '仓库3' }]"
                            :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备件名称:" prop="name">
                    <el-select v-model="formForm.name" placeholder="备件名称" style="width: 100%;">
                        <el-option
                            v-for="item in [{ value: '备件1-液化气', label: '备件1-液化气' }, { value: '备件2-活动螺杆', label: '备件2-活动螺杆' }, { value: '备件3-螺杆', label: '备件3-螺杆' }]"
                            :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备件编号:" prop="num">
                    <el-input v-model="formForm.num" placeholder="备件编号" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="规格型号:" prop="manufacturer">
                    <el-select v-model="formForm.manufacturer" placeholder="规格型号" style="width: 100%;">
                        <el-option
                            v-for="item in [{ value: 'PMO-01', label: 'PMO-01' }, { value: 'PMO-02', label: 'PMO-02' }, { value: 'PMO-03', label: 'PMO-03' }, { value: 'PMO-04', label: 'PMO-04' }]"
                            :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位:" prop="unit">
                    <el-select v-model="formForm.unit" placeholder="请选择单位" style="width: 100%;">
                        <el-option
                            v-for="item in [{ value: '个', label: '个' }, { value: '台', label: '台' }, { value: '套', label: '套' }]"
                            :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申领数量:" prop="quantity">
                    <el-input v-model="formForm.quantity" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer clearfixfooter">
                <el-button type="primary" @click="submitFormFormula">保 存</el-button>
                <el-button @click="cancelFormula">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button type="success" @click="submitForm">保 存</el-button>
                <el-button @click="onCancel" style="margin-right: 12px">{{ "关 闭" }}</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "spareGetadd",
    components: {},
    data() {
        return {
            dataInfo: {
                num: "",
                Plannedtime: new Date(),
                department: "",
                user: "",
                remark: ""
            },
            ClaimtypeList: [
                {
                    value: "1",
                    label: "维修领用"
                },
                {
                    value: "2",
                    label: "维护领用"
                },
                {
                    value: "3",
                    label: "备用领用"
                }
            ],
            dataList: [
                {
                    id: 1,    //id
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    num: "PNQG-20023", // 订单编号
                    status: 0, // 审核状态
                    statustext: "未提交", // 审核状态
                    Purchasetime: "2023年11月31日",
                    Plannedtime: "2023-12-01",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号2",
                    num: "PNQG-20024", // 订单编号
                    status: 1, // 审核状态
                    statustext: "未审核", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-11-20",
                    Actualtime: "2023年12月24日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    num: "PNQG-20025", // 订单编号
                    status: 3, // 审核状态
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号3",
                    statustext: "已撤回", // 审核状
                    Purchasetime: "2023年12月23日",
                    Plannedtime: "2023-12-23",
                    Actualtime: "2023年12月28日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    num: "PNQG-20026", // 订单编号
                    status: 2, // 审核状态
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    statustext: "审核通过", // 审核状态
                    Purchasetime: "2023年12月20日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月29日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    Claimtype: "备用领用",
                    Associatedorder: "维修单号4",
                    num: "PNQG-20027", // 订单编号
                    status: 4, // 审核状态
                    statustext: "驳回", // 审核状态
                    Purchasetime: "2023年12月13日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月29日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ],
            unitoptions: [
                {
                    value: '1',
                    label: '米'
                },
                {
                    value: '2',
                    label: '套'
                },
                {
                    value: '3',
                    label: '项'
                },
                {
                    value: '4',
                    label: '个'
                },
                {
                    value: '5',
                    label: '盒'
                },
                {
                    value: '6',
                    label: '箱'
                }
            ],
            routerId: undefined,
            PopwindowDate: [
                // {
                //     Editquantity: false,
                //     id: 1,    //id
                //     Stash: "配件仓库",
                //     name: "液压后杠", // 设备名称
                //     modelValue: "OUJ-10022", // 规格型号
                //     manufacturer: "海联帆",//生产厂家
                //     unit: "个",
                //     quantity: "12"
                // }, {
                //     Editquantity: false,
                //     id: 2,    //id
                //     Stash: "零部件仓库",
                //     name: "前挡器", // 设备名称
                //     modelValue: "PUJ-10023", // 规格型号
                //     manufacturer: "得利士",//生产厂家
                //     unit: "套",
                //     quantity: "22"
                // }, {
                //     Editquantity: false,
                //     id: 3,    //id
                //     Stash: "工具仓库",
                //     name: "拖动扳手", // 设备名称
                //     modelValue: "OPU-100029", // 规格型号
                //     manufacturer: "施耐德",//生产厂家
                //     unit: "米",
                //     quantity: "14"
                // }, {
                //     Editquantity: false,
                //     id: 4,    //id
                //     Stash: "套件仓库",
                //     name: "全身套条件", // 设备名称
                //     modelValue: "TYP-10089", // 规格型号
                //     manufacturer: "虎卡",//生产厂家
                //     unit: "盒",
                //     quantity: "2"
                // }
            ],
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            idspopw: [],
            singlepopw: true,
            multiplepopw: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            title: "",
            open: false,
            // 表单参数
            form: {},
            formForm: {},
            rules: {
                Claimtype: [{
                    required: true,
                    message: "请输入申领类型",
                    trigger: "blur"
                }],
                num: [{
                    required: true,
                    message: "请输入申领单号",
                    trigger: "blur"
                }],
                Plannedtime: [{
                    required: true,
                    message: "请输入计划领用时间",
                    trigger: "change"
                }],
                Applicantdepartment: [{
                    required: true,
                    message: "请输入申请部门",
                    trigger: "blur"
                }],
                claimant: [{
                    required: true,
                    message: "请输入申领人",
                    trigger: "blur"
                }],
                remark: [{
                    required: true,
                    message: "请输入申领原因",
                    trigger: "blur"
                }],
            },
            // 表单校验
            rulesForm: {
                Stash: [{
                    required: true,
                    message: "请选择仓库",
                    trigger: "change"
                }],
                num: [{
                    required: true,
                    message: "请输入备件编号",
                    trigger: "blur"
                }],
                name: [{
                    required: true,
                    message: "请选择备件名称",
                    trigger: "change"
                }],
                manufacturer: [{
                    required: true,
                    message: "请选择规格型号",
                    trigger: "change"
                }],
                unit: [{
                    required: true,
                    message: "请选择单位",
                    trigger: "change"
                }],
                quantity: [{
                    required: true,
                    message: "请输入数量",
                    trigger: "blur"
                }]
            }
        };
    },
    watch: {},
    created() {
        this.routerId = this.$route.query.id || undefined
        if (this.routerId) {
            let newdata = this.dataList.filter(item => {
                return item.id == this.routerId;
            })[0]
            this.dataInfo = newdata
            this.PopwindowDate = [
                {
                    Editquantity: false,
                    id: 1,    //id
                    Stash: "配件仓库",
                    name: "液压后杠", // 设备名称
                    num: "PNQG-20023", // 订单编号

                    modelValue: "OUJ-10022", // 规格型号
                    manufacturer: "海联帆",//生产厂家
                    unit: "个",
                    quantity: "12"
                }, {
                    Editquantity: false,
                    id: 2,    //id
                    Stash: "零部件仓库",
                    num: "PNQG-200232", // 订单编号

                    name: "前挡器", // 设备名称
                    modelValue: "PUJ-10023", // 规格型号
                    manufacturer: "得利士",//生产厂家
                    unit: "套",
                    quantity: "22"
                }, {
                    Editquantity: false,
                    id: 3,    //id
                    Stash: "工具仓库",
                    name: "拖动扳手", // 设备名称
                    num: "PNQG-33323", // 订单编号

                    modelValue: "OPU-100029", // 规格型号
                    manufacturer: "施耐德",//生产厂家
                    unit: "米",
                    quantity: "14"
                }, {
                    Editquantity: false,
                    id: 4,    //id
                    num: "PNQG-233330023", // 订单编号

                    Stash: "套件仓库",
                    name: "全身套条件", // 设备名称
                    modelValue: "TYP-10089", // 规格型号
                    manufacturer: "虎卡",//生产厂家
                    unit: "盒",
                    quantity: "2"
                }
            ]
        } else {
            this.formForm = {}
        }
    },
    methods: {
        onCancel() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        //添加
        handleAdd() {
            this.open = true;
        },
        close() {
            done();
        },
        cancelFormula() {
            this.open = false
        },
        submitForm() {
            this.$message.success("保存成功")
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        submitFormFormula() {
            this.PopwindowDate.push({
                ...this.formForm,
                id: this.PopwindowDate.length + 1
            }),
                this.$message.success("保存成功")
            this.formForm = {},
                this.open = false

        },
        //失焦事件
        handleBlur() { },
        handleRemove() {
            //移除
            let seleid = this.idspopw[0]
            let newdata = this.PopwindowDate.filter(item => {
                return item.id != seleid;
            })
            this.PopwindowDate = newdata
            this.$message.success("移除成功")

        },
        //选择
        handleSelectionPopwindowDate(selection) {
            this.idspopw = selection.map(item => item.id);
            this.singlepopw = selection.length != 1;
            this.multiplepopw = !selection.length;
        }
    }
};
</script>
<style scoped >
.foot-btn {
    z-index: 9;
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px #a0a8a0;
}

.box-card {
    margin: 30px 0;
}

.box-card-add {
    width: 100%;
    height: 100%;

}

.clearfixfooter {
    margin: 30px;
    text-align: center
}
</style>