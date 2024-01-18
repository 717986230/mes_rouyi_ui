<template>
    <!-- 采购计划明细 -->
    <div class="container">
        <el-form ref="formnew" :model="formCH" :rules="rules" label-width="120px">
            <el-row :gutter="40">
                <el-col :span="7">
                    <el-form-item label="物料编码:" prop="Materialcode">
                        <el-input type="text" v-model="formCH.Materialcode" maxlength="20" placeholder="物料编码"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="物料名称:" prop="name">
                        <el-input type="text" v-model="formCH.name" maxlength="20" placeholder="物料名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="规格型号:" prop="Specificationmodel">
                        <el-input type="text" v-model="formCH.Specificationmodel" maxlength="20" placeholder="规格型号"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="7">
                    <el-form-item label="色号:" prop="Colournumber">
                        <el-input type="text" v-model="formCH.Colournumber" maxlength="20" placeholder="色号"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="规格数量:" prop="Specificationquantity">
                        <el-input type="text" v-model="formCH.Specificationquantity" maxlength="20" placeholder="规格数量"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="规格单位:" prop="Specificationunit">
                        <el-input type="text" v-model="formCH.Specificationunit" maxlength="20" placeholder="规格单位"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="7">
                    <el-form-item label="采购数量:" prop="Purchasequantity">
                        <el-input type="text" v-model="formCH.Purchasequantity" maxlength="20" placeholder="采购数量"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="计价单位:" prop="Unitaccount">
                        <el-input type="text" v-model="formCH.Unitaccount" maxlength="20" placeholder="计价单位"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="采购单价:" prop="Purchaseprice">
                        <el-input type="text" v-model="formCH.Purchaseprice" maxlength="20" placeholder="采购单价"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="7">
                    <el-form-item label="理论重量:" prop="Theoreticalweight">
                        <el-input type="text" v-model="formCH.Theoreticalweight" maxlength="20" placeholder="理论重量"
                            clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="40" style="margin: 10px 0;">
            <el-col :span="10" style="text-align: right;">
                <el-button type="primary" @click="handleUpSumbit">提交</el-button>
            </el-col>
            <el-col :span="4" style="text-align: center;">
                <el-button @click="handleClose">取 消</el-button>
            </el-col>
        </el-row>
        <el-card>
            <el-row :gutter="10" class="mb8">
                <el-col :span="14">
                    <div>{{ "采购单详情" }}</div>
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
                <el-table-column label="物料编码" align="center" key="num" prop="num" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="色号" align="center" key="Colournumber" prop="Colournumber"
                    :show-overflow-tooltip="true" />
                <el-table-column label="规格数量" align="center" key="Specificationquantity" prop="Specificationquantity"
                    :show-overflow-tooltip="true" />
                <el-table-column label="规格单位" align="center" key="Specificationunit" prop="Specificationunit"
                    :show-overflow-tooltip="true" />
                <el-table-column label="采购数量" align="center" key="Purchasequantity" prop="Purchasequantity"
                    :show-overflow-tooltip="true" />
                <el-table-column label="理论重量" align="center" key="Theoreticalweight" prop="Theoreticalweight"
                    :show-overflow-tooltip="true" />
                <el-table-column label="计价单位" align="center" key="Unitaccount" prop="Unitaccount"
                    :show-overflow-tooltip="true" />
                <el-table-column label="采购单价" align="center" key="Purchaseprice" prop="Purchaseprice"
                    :show-overflow-tooltip="true" />
                <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="text" @click="handleDeleteTC(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="修改采购单" :visible.sync="openedit" width="66%" append-to-body>
            <el-form ref="formedit" :model="formEdit" label-width="100px">
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="物料编码:" prop="num">
                            <el-input type="text" v-model="formEdit.num" maxlength="20" placeholder="物料编码"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="色号:" prop="Customercode">
                            <el-input type="text" v-model="formEdit.Customercode" maxlength="20" placeholder="色号"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="规格数量:" prop="Productcode">
                            <el-input type="text" v-model="formEdit.Productcode" maxlength="20" placeholder="规格数量"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="规格单位:" prop="Specificationunit">
                            <el-input type="text" v-model="formEdit.Specificationunit" maxlength="20" placeholder="规格单位"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="采购数量:" prop="Purchasequantity">
                            <el-input type="text" v-model="formEdit.Purchasequantity" maxlength="20" placeholder="采购数量"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="理论重量:" prop="Theoreticalweight">
                            <el-input type="text" v-model="formEdit.Theoreticalweight" maxlength="20" placeholder="理论重量"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="7">
                        <el-form-item label="计价单位:" prop="Unitaccount">
                            <el-input type="text" v-model="formEdit.Unitaccount" maxlength="20" placeholder="计价单位 "
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="采购单价:" prop="Purchaseprice">
                            <el-input type="text" v-model="formEdit.Purchaseprice" maxlength="20" placeholder="采购单价 "
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row :gutter="40" style="margin: 10px 0;">
                <el-col :span="10" style="text-align: right;">
                    <el-button type="primary" @click="handleUpSumbitEdit">提交</el-button>
                </el-col>
                <el-col :span="4" style="text-align: center;">
                    <el-button @click="openedit = false">取 消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script >
export default ({
    name: "procurePlandetail",
    data() {
        return {
            openedit: false,
            dataList: [
                {
                    id: 1,
                    Materialcode: "ERE-1002",
                    name: "乳白卡扣",
                    Specificationmodel: "PPM-LN",
                    Specificationunit: "把",
                    Purchasequantity: 12,
                    Theoreticalweight: 22,
                    Unitaccount: "KG",
                    Purchaseprice: 100,
                    Customercode: "RTR-10021",
                    Placereceipt: "北京",
                    Productcode: "虎卡",
                    num: "TYH-1009",
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
                    Materialcode: "ERE-10022",
                    name: "岩红卡扣",
                    Specificationmodel: "PPM-LN",
                    Specificationunit: "把",
                    Purchasequantity: 33,
                    Theoreticalweight: 122,
                    Unitaccount: "KG",
                    Purchaseprice: 100,
                    id: 2,
                    Customercode: "RTR-10031",
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
                    Materialcode: "ERE-100222",
                    name: "乳白卡套",
                    Specificationmodel: "PPM-LNg",
                    Specificationunit: "套",
                    Purchasequantity: 3,
                    Theoreticalweight: 20,
                    Unitaccount: "KG",
                    Purchaseprice: 50,
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
                    Materialcode: "ERE-1222",
                    name: "白色皮条",
                    Specificationmodel: "PPM-LNgt",
                    Specificationunit: "条",
                    Purchasequantity: 35,
                    Theoreticalweight: 220,
                    Unitaccount: "KG",
                    Purchaseprice: 500,
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
                    Materialcode: "ERE-19822",
                    name: "红皮箱",
                    Specificationmodel: "PPM-LR",
                    Specificationunit: "箱",
                    Purchasequantity: 34,
                    Theoreticalweight: 110,
                    Unitaccount: "KG",
                    Purchaseprice: 20,
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
            loading: false,
            queryParams: {},
            formCH: {},
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
            rules: {},
            formEdit: {}
        }
    },
    created() {
        let rolid = this.$route.query.id;
        this.formCH = this.dataList.find(item => item.id == rolid)
    },
    methods: {
        handleUpSumbit() {
            this.$message.success("保存成功");
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.go(-1);
        },
        handleUpSumbitEdit() {
            this.$message.success("保存成功");
            this.openedit = false
        },
        handleClose() {
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.go(-1);
        },
        handleEdit(row) {
            this.formEdit = this.dataList.find(item => item.id == row.id)
            //修改
            this.openedit = true
        },

        handlePageChange() {
            //搜索改变触发
        },
        handleDeleteTC(row) {
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
    }
});
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    padding: 20px;
}
</style>