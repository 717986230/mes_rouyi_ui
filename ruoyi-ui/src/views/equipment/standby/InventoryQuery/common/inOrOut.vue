<template>
    <!--出入库明细-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">入库明细</span>
                    </div>
                    <el-form :model="spareForm" ref="form" inline size="small">
                        <el-form-item  prop="code">
                            <el-input v-model="spareForm.code" placeholder="请输入入库单号" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQuerySpare" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetSpare" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="inList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="入库单号" align="center" sortable key="code" prop="code" >
                            <template slot-scope="scope">
                                <div class="table-operation">
                                    <b @click="handleOrderDetail(scope.row)" class="primary cs">{{scope.row.code}}</b>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="入库类型" align="center" sortable key="type" prop="type"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="单位" align="center" sortable key="unit" prop="unit"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="入库数量" align="center" sortable key="inNum" prop="inNum"/>
                        <el-table-column label="入库仓库" align="center" sortable key="warehouse" prop="warehouse" />
                        <el-table-column label="存放位置" align="center" sortable key="position" prop="position"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="入库日期" align="center" sortable key="time" prop="time"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="入库操作人" align="center" sortable key="operator" prop="operator"
                                         :show-overflow-tooltip="true" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">出库明细</span>
                    </div>
                    <el-form :model="recordForm" ref="form" inline size="small">
                        <el-form-item  prop="code">
                            <el-input v-model="recordForm.code" placeholder="请输入出库单号" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="handleQueryRecord" size="small">查询</el-button>
                            <el-button type="info" plain @click="handleResetRecord" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table  :data="outList">
                        <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                        <el-table-column label="出库单号" align="center" sortable key="name" prop="name" >
                            <template slot-scope="scope">
                                <div class="table-operation">
                                    <b @click="handleOrderDetail(scope.row)" class="primary cs">{{scope.row.code}}</b>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="出库类型" align="center" sortable key="type" prop="type"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="单位" align="center" sortable key="unit" prop="unit"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="出库数量" align="center" sortable key="inNum" prop="inNum"/>
                        <el-table-column label="出库仓库" align="center" sortable key="warehouse" prop="warehouse" />
                        <el-table-column label="存放位置" align="center" sortable key="position" prop="position"
                                         :show-overflow-tooltip="true" />
                        <el-table-column label="出库日期" align="center" sortable key="time" prop="time" />
                        <el-table-column label="出库操作人" align="center" sortable key="operator" prop="operator" />
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'association',
    props:['deviceId'],
    data(){
        return{
            spareForm:{
                name:''
            },
            recordForm:{
                name:'',
                date:''
            },
            inList:[],
            recordList:[]
        }
    },
    created() {
        this.getInList();
        this.getOutList();
    },
    methods:{
        getInList(){
            this.inList = [
                {
                    code:'D-001',
                    type:'采购入库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-01-01',
                    operator:'admin'
                },
                {
                    code:'D-002',
                    type:'采购入库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-01-01',
                    operator:'admin'
                },
                {
                    code:'D-003',
                    type:'采购入库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-01-01',
                    operator:'admin'
                },
                {
                    code:'D-004',
                    type:'采购入库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-01-01',
                    operator:'admin'
                },
            ]
        },
        getOutList(){
            this.outList = [
                {
                    code:'D-001',
                    type:'销售出库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-06-08',
                    operator:'admin'
                },
                {
                    code:'D-002',
                    type:'领用出库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-06-08',
                    operator:'admin'
                },
                {
                    code:'D-003',
                    type:'更换出库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-06-08',
                    operator:'admin'
                },
                {
                    code:'D-004',
                    type:'调拨出库',
                    unit:'个',
                    inNum:200,
                    warehouse:'北1区仓库',
                    position:'1-4架',
                    time:'2021-06-08',
                    operator:'admin'
                },
            ]
        },
        handleQuerySpare(){
            this.getInList();
        },
        handleResetSpare(){
            this.getInList();
        },
        handleQueryRecord(){
            this.getOutList();
        },
        handleResetRecord(){
            this.getOutList();
        },
        //入库单详情
        handleOrderDetail(row){
            console.log(row);
            // this.$router.push({
            //     path:'/association/inDetail',
            //     query:{
            //         id:row.id
            //     }
            // })
        }
    }
}
</script>

<style scoped>

</style>