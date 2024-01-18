<template>
    <!--采购计划-->
    <div class="content">
        <el-card>
            <el-row :gutter="10" class="mb8">
                <el-col :span="14">
                    <div>{{ "采购单" }}</div>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="success" plain @click="handleAdd">新增</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-select v-model="queryParams.page" placeholder="显示页数/页" @change="handlePageChange">
                        <el-option v-for="item in PageList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="dataList">
                <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                <el-table-column label="采购单号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="供应商" align="center" key="Productcode" prop="Productcode"
                    :show-overflow-tooltip="true" />
                <el-table-column label="供货日期" align="center" key="Deliverytime" prop="Deliverytime"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ dayjs(scope.row.Deliverytime).format("YYYY-MM-DD") }}
                    </template>
                </el-table-column>
                <el-table-column label="交货日期" align="center" key="Deliverydate" prop="Deliverydate"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ dayjs(scope.row.Deliverydate).format("YYYY-MM-DD") }}
                    </template>
                </el-table-column>
                <el-table-column label="联系人" align="center" key="Contactperson" prop="Contactperson"
                    :show-overflow-tooltip="true" />
                <el-table-column label="联系电话" align="center" key="Contactnumber" prop="Contactnumber"
                    :show-overflow-tooltip="true" />
                <el-table-column label="运输方式" align="center" key="Modetransport" prop="Modetransport"
                    :show-overflow-tooltip="true" />
                <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleView(scope.row)">明细</el-button>
                        <el-button type="text" @click="handleEditTable(scope.row)">修改</el-button>
                        <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增 -->
        <el-dialog title="创建采购单" :visible.sync="openadd" width="66%" append-to-body>
            <div slot="header" class="clearfix">
                <span>采购单信息:</span>
            </div>
            <el-form ref="formnew" :model="form" :rules="rules" label-width="100px">
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="采购单号:" prop="num">
                            <el-input type="text" v-model="form.num" maxlength="20" placeholder="采购单号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="客户编码:" prop="Customercode">
                            <el-input type="text" v-model="form.Customercode" maxlength="20" placeholder="客户编码"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="供应商:" prop="Productcode">
                            <el-input type="text" v-model="form.Productcode" maxlength="20" placeholder="供应商"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="供货联系人:" prop="Contactperson">
                            <el-input type="text" v-model="form.Contactperson" maxlength="20" placeholder="供货联系人"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="交货日期:" prop="Deliverydate">
                            <el-date-picker v-model="form.Deliverydate" format="yyyy-MM-dd" type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="供货日期:" prop="Deliverytime">
                            <el-date-picker v-model="form.Deliverytime" type="datetime" format="yyyy-MM-dd"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="联系电话:" prop="Contactnumber">
                            <el-input type="text" v-model="form.Contactnumber" maxlength="20" placeholder="联系电话"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="运输方式:" prop="Modetransport">
                            <el-select v-model="form.Modetransport">
                                <el-option v-for="item in ModetList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="20">
                        <el-form-item label="收货地点:" prop="Placereceipt">
                            <el-input type="text" v-model="form.Placereceipt" maxlength="20" placeholder="收货地点"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="20">
                        <el-form-item label="备注:" prop="remack">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="form.remack"
                                maxlength="20" placeholder="备注" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row :gutter="40" style="margin: 10px 0;">
                <el-col :span="10" style="text-align: right;">
                    <el-button type="primary" @click="handleUpSumbit">提交</el-button>
                </el-col>
                <el-col :span="4" style="text-align: center;">
                    <el-button @click="openadd = false">取 消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'procurePlan',
    data() {
        return {
            dataList: [
                {
                    id: 1,
                    Customercode: "RTR-10021",
                    Placereceipt: "北京",
                    Productcode: "虎卡",
                    num: "TYH-1009",
                    Specificationunit: "",
                    Colournumber: "乳白色",
                    Specificationquantity: '22',
                    Ordernumber: "卡西利亚",
                    Deliverydate: "2020-01-01",
                    Deliverytime: "2020-01-12",
                    Contactperson: "雷混",
                    Contactnumber: "15934256876",
                    remack: "乳白色-火车-北京",
                    Customername: "KG",
                    Modetransport: "火车",
                },
                {
                    id: 2, Customercode: "RTR-10031",
                    Productcode: "虎卡",
                    Placereceipt: "上海",
                    Specificationquantity: '2',
                    Colournumber: "岩红色",
                    num: "TYH-1011",
                    Ordernumber: "西利亚",
                    Deliverydate: "2024-01-01",
                    Deliverytime: "2024-01-05",
                    Contactperson: "混辊",
                    Contactnumber: "15934222876",
                    Customername: "KG",
                    remack: "岩红色-汽车-上海",
                    Modetransport: "汽车",
                },
                {
                    id: 3, Customercode: "RTR-10041",
                    Productcode: "虎卡",
                    Placereceipt: "北京",
                    num: "TYH-10012",
                    Specificationquantity: '43',
                    Colournumber: "乳白色",
                    Ordernumber: "利亚",
                    Deliverydate: "2024-01-02",
                    Deliverytime: "2024-01-05",
                    Contactperson: "雷是",
                    Contactnumber: "15933336876",
                    Customername: "KG",
                    remack: "乳白色-轮船-北京",
                    Modetransport: "轮船",
                },
                {
                    id: 4, Customercode: "RTR-10051",
                    Productcode: "虎卡",
                    Placereceipt: "陕西",
                    Specificationquantity: '12',
                    Colournumber: "白色",
                    num: "TYH-1014",
                    Ordernumber: "亚计价",
                    Deliverydate: "2024-01-02",
                    Deliverytime: "2024-01-20",
                    Contactperson: "胡室",
                    Contactnumber: "13934256877",
                    Customername: "KG",
                    Modetransport: "火车",
                    remack: "白色-火车-陕西"
                },
                {
                    id: 5, Customercode: "RTR-100341",
                    Productcode: "虎卡",
                    Placereceipt: "山西",
                    num: "TYH-1033",
                    Specificationquantity: '52',
                    Colournumber: "红色",
                    Ordernumber: "卧东",
                    Deliverydate: "2024-02-01",
                    Deliverytime: "2024-02-11",
                    Contactperson: "阿吖出",
                    Contactnumber: "15934258888",
                    Customername: "KG",
                    Modetransport: "火车",
                    remack: "红色-火车-山西"

                }
            ],
            ModetList: [
                {
                    value: "火车",
                    label: "火车"
                },
                {
                    value: "汽车",
                    label: "汽车"
                },
                {
                    value: "轮船",
                    label: "轮船"
                },
                {
                    value: "飞机",
                    label: "飞机"
                }

            ],
            loading: false,
            title: "",//明细弹窗标题
            form: {

            },
            queryParams: {},
            openadd: false,
            PageList: [
                {
                    value: 5,
                    label: '5'
                },
                {
                    value: 10,
                    label: '10'
                },
                {
                    value: 15,
                    label: '15'
                },
                {
                    value: 20,
                    label: '20'
                }
            ],
            rules: {
                Contactnumber: [{
                    required: true,
                    message: '请输入联系电话',
                    trigger: 'blur'
                },
                {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '请输入有效的手机号码',
                    trigger: 'blur',
                },
                ]
            },
        }
    },
    created() { },
    methods: {
        handleAdd() {
            this.form = {
                Deliverytime: new Date(),
                Deliverydate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            }
            this.openadd = true
        },
        handleView(row) {
            this.$router.push({
                path: "/plan/procurePlandetail",
                query: {
                    id: row.id
                },
            });
        },
        handleUpSumbit() {
            //提交
            this.$refs["formnew"].validate(valid => {
                if (valid) {
                    this.dataList.unshift({
                        ...this.form,
                        id: this.dataList.length + 1
                    })
                    this.$message.success("保存成功")
                    this.openadd = false
                }
            })
        },
        handlePageChange() {

        },
        handleDelete(row) {
            this.$confirm('确认删除选中的数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dataList = this.dataList.filter(item => item.id !== row.id);
                this.$message.success('删除成功');
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        handleEditTable(row) {
            //修改
            let newD = this.dataList.find(item => item.id === row.id)
            this.form = newD
            this.openadd = true
        },
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
}
</style>