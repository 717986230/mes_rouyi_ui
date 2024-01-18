<template>
    <!-- 装置指标配置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择工厂" clearable @change="mesFactoryChange">
                    <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="装置:" prop="mesWspId">
                <el-select v-model="queryParams.unitsId" placeholder="请选择装置" clearable>
                    <el-option v-for="dict in Units" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="flex align-center justify-between">
                        <span>
                            装置指标
                        </span>
                        <div>
                            <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                       @click="handleDel">删除</el-button>
                            <el-button type="success" plain icon="el-icon-edit" size="mini"
                                       @click="handleSave">保存</el-button>
                        </div>
                    </div>
                    <el-table :data="indicatorList"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="指标名称" prop="name" key="name" >
                            <template slot-scope="scope">
                                <input-and-text inputType="text" @input='scope.row.IdctDes = $event' :value="scope.row.IdctDes"></input-and-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="显示顺序" prop="sort" key="sort" width="80px">
                            <template slot-scope="scope">
                                <input-and-text inputType="text" @input='scope.row.DisplayOrder = $event' :value="scope.row.DisplayOrder"></input-and-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="启用标识" prop="useFlags" key="useFlags" width="80px">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.Enabled"
                                    active-color="#13ce66"
                                    inactive-color="#707B7C">
                                </el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form class="indicatorForm" :model="indicatorForm" ref="indicatorForm" size="small" :inline="true" label-width="60px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="名称:" class="flex flex-direction">
                                    <el-input v-model="indicatorForm.name" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="顺序:">
                                    <el-input v-model="indicatorForm.sort" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item>
                                    <el-button type="success" size="mini" @click="addIndicator">添加</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <div slot="header">
                        <span>
                            指标定义
                        </span>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-card class="mr10">
                                    <div slot="header">
                                        <span>分子</span>
                                    </div>
                                    <div>
                                        <el-select v-model="attributeForm.sonSelect" @change="sonSelectChaneg">
                                            <el-option v-for="dict in IoType" :key="dict.value" :label="dict.label" :value="dict.value" />
                                        </el-select>
                                        <el-table :data="sonTableData" height="400">
                                            <el-table-column label="进出" prop="NodeIoName"></el-table-column>
                                            <el-table-column label="系数" prop="Factor"></el-table-column>
                                            <el-table-column label="节点" prop="NodeName"></el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card class="ml10">
                                    <div slot="header">
                                        <span>分母</span>
                                    </div>
                                    <div>
                                        <el-select v-model="attributeForm.parentSelect" @change="parentSelctChaneg">
                                            <el-option v-for="dict in IoType" :key="dict.value" :label="dict.label" :value="dict.value" />
                                        </el-select>
                                        <el-table :data="parentTableData" height="400">
                                            <el-table-column label="进出" prop="NodeIoName"></el-table-column>
                                            <el-table-column label="系数" prop="Factor"></el-table-column>
                                            <el-table-column label="节点" prop="NodeName"></el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-card class="mtb10">
                                    <div slot="header">
                                        <span>属性</span>
                                    </div>
                                    <el-form :model="attributeForm" label-width="100px">
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="等级" prop="input64684">
                                                    <el-input v-model="attributeForm.grade" type="text" clearable></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="权重" prop="input57548">
                                                    <el-input v-model="attributeForm.weight" type="text" clearable></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" :offset="1">
                                                <div class="static-content-item">
                                                    <el-button type="success">保存</el-button>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="最大值" prop="input34980">
                                                    <el-input v-model="attributeForm.max" type="text" clearable></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="最小值" prop="input21881">
                                                    <el-input v-model="attributeForm.min" type="text" clearable></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" :offset="1">
                                                <div class="static-content-item">
                                                    <el-button type="primary">查看表达式</el-button>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-card class="mtb10">
                                    <div slot="header">
                                        <span>表达式</span>
                                    </div>
                                    <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="attributeForm.textarea">
                                    </el-input>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getIndicatorsDefineList, GetUnitsByUserId } from '../../../api/materialMove/mock'
import inputAndText from '../../../components/InputAndText'
export default {
    name: "EquipmentMetricsSetup",
    data() {
        return {
            //mes工厂下拉列表
            mesFactory: [],
            //装置下拉数据
            Units: [],
            //进出类型下拉数据
            IoType:[],
            //表格多选
            ids:[],
            //原始数据
            originalTableData:[],
            //分子表格
            sonTableData:[],
            //分母表格
            parentTableData:[],
            //属性参数
            attributeForm:{
                sonSelect:'',//分子下拉选择
                parentSelect:'',//分母下拉选择
                grade:'',//等级
                weight:'',//权重
                max:'',//最大
                min:'',//最小
                textarea:'',//表达式
            },
            //装置指标新增 form属性
            indicatorForm:{
                name:'',
                sort:1000
            },
            //指标列表
            indicatorList:[],
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
            //tabs 高度
            tabsHeight:500,

        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 180; // 减去 100px 的边距
        this.tabsHeight = maxDivHeight
    },
    methods: {
        //工厂选择 动态获取装置数据
        mesFactoryChange(e){
            console.log('动态获取装置数据',e)
            this.$api.GetUnitsByUserId({
                factoryID:e
            }).then((res) => {
                 if (res.code == 200) {
                      console.log('接口成功', res)
                     this.Units = res.data.map(e=>{
                         return {
                             label:e.Value,
                             value:e.Key
                         }
                     })
                    } else {
                      console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //指标多选
        handleSelectionChange(selection){
            console.log(selection)
            this.ids = selection.map(item => item.id || item.time);
        },
        //指标删除
        handleDel(){
            //todo 判断删除逻辑   旧数据调接口删除,新数据直接用javascript方法删除
            let indexes = this.ids.map(id => this.indicatorList.findIndex(item => item.id === id || item.time === id));
            console.log('需要删除的下标=',indexes)
            indexes.forEach(e=>{
                this.indicatorList.splice(e,1)
            })
        },
        //指标保存
        handleSave(){

        },
        // 添加指标数据
        addIndicator() {
            const { name, sort } = this.indicatorForm;
            if (name && sort) {
                this.indicatorList.push({
                    time: this.getCurrentTime(),
                    isNew: true,
                    isEdit: false,
                    name,
                    sort,
                    useFlags: true,
                    nameEditable:false,
                    sortEditable:false,
                });
            }
        },
        // 获取当前时间戳
        getCurrentTime() {
            return new Date().getTime();
        },
        //分子下拉数据选择
        sonSelectChaneg(id){
            if(id == -1){
                this.sonTableData = this.originalTableData
                return false
            }
            //获取数据
            this.sonTableData = this.originalTableData.filter(e=>e.NodeIoId == id)
        },
        //分母下拉数据选择
        parentSelctChaneg(id){
            if(id == -1){
                this.parentTableData = this.originalTableData
                return false
            }
            //获取数据
            this.parentTableData = this.originalTableData.filter(e=>e.NodeIoId == id)
        },
        getOther() {
            //工厂下拉数据
            this.$api.LoadMesFactorys().then(res => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.mesFactory = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
            .catch((err) => {
                console.log('接口失败', err)
            })

            //进出类型下拉数据
            this.$api.GetIoType().then(res => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.IoType = res.data.map(e => ({ value: e.IoTypeId, label: e.IoTypeName }));
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
            .catch((err) => {
                console.log('接口失败', err)
            })

            this.$api.getIndicatorsDefineList().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.originalTableData = _.cloneDeep(res.data)
                    this.sonTableData = _.cloneDeep(res.data)
                    this.parentTableData = _.cloneDeep(res.data)
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
            .catch((err) => {
                console.log('接口失败', err)
            })

        },
        /** 查询列表 */
        getList() {
            this.$api.getIndicatorsList().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.indicatorList = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
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
::v-deep .el-tabs__content{
    height: calc(100% - 60px);
}
::v-deep .indicatorForm .el-form-item__content{
    width: calc(100% - 60px);
}
</style>

