<template>
    <!--移动记录查询-->
    <div class="app-container">
        <el-row style="height: 240px">
            <el-col :span="6" style="height: 100%;overflow: auto">
                <el-input
                    placeholder="输入关键字进行过滤"
                    clearable
                    style="width:80%"
                    v-model="filterText">
                </el-input>
                <el-tree
                    style="height: calc(100% - 80px);overflow: auto"
                    class="filter-tree"
                    :data="MtrlTree"
                    :props="defaultProps"
                    highlight-current
                    accordion
                    :filter-node-method="filterNode"
                    @node-click="treeNodeClick"
                    ref="tree">
                </el-tree>
            </el-col>
            <el-col :span="18" style="height: 100%;overflow: auto">
                <el-form :model="queryParams" ref="queryForm"
                         size="mini"
                         label-position="right"
                         label-width="100px">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="类型:">
                                <el-select v-model="queryParams.OpeTyepId" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in OpeType" :key="dict.value" :label="dict.label+dict.value" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开始:" prop="date">
                                <el-date-picker
                                    v-model="queryParams.BegTime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结束:" prop="date">
                                <el-date-picker
                                    v-model="queryParams.EndTime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item >
                                <el-checkbox v-model="queryParams.dateChecked">按日期查询</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="源仓库:" >
                                <el-select v-model="queryParams.SrStockIds" @change="SrStockChange" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in SrStockList" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="源库位:">
                                <el-select v-model="queryParams.SrLocationIds" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in SrPositionList" :key="dict.value" :label="dict.label" v-model="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="源等级:" >
                                <el-select v-model="queryParams.SrRankIds" value-key="label" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in TgRankList" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="源批次:" >
                                <el-input v-model="queryParams.SrBatches"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="仓库:" >
                                <el-select v-model="queryParams.TgStockIds" value-key="label" @change="TgStockIdsChaneg" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in TgStockList" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="库位:" >
                                <el-select v-model="queryParams.TgLocationIds" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in TgPositionList" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="等级:" >
                                <el-select v-model="queryParams.TgRankIds" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in TgRankList" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="批次:" >
                                <el-input v-model="queryParams.TgBatches"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="状态:" >
                                <el-select v-model="queryParams.State" placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in statusOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item>
                                <el-button type="success" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
                                <el-button type="danger" size="mini" @click="handleClearSearch">
                                    <svg-icon class-name="lock-icon" icon-class="lock-off" />
                                    清除查询条件
                                </el-button>
                                <el-button type="success" size="mini" @click="handleSearchRecdeo">
                                    <svg-icon class-name="lock-icon" icon-class="lock-on" size="18"/>
                                    查询移动记录
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-table height="bodyHeight" ref="multipleTable"  border v-loading="loading" :data="dataList">
            <el-table-column label="序号" align="center" type="index" />
            <el-table-column label="移动类型" align="center" key="LocationName" :show-overflow-tooltip="true"  width="200" prop="LocationName" />
            <el-table-column label="来源物料" align="center" key="MtrlName" :show-overflow-tooltip="true"  width="200" prop="MtrlName" />
            <el-table-column label="来源节点" align="center" key="Rank" prop="Rank" />
            <el-table-column label="来源等级" align="center" width="150" key="WgtPerPack" prop="WgtPerPack" />
            <el-table-column label="来源批次" align="center" key="WgtDim" prop="WgtDim" />
            <el-table-column label="目标物料" align="center" width="150" key="Batch" prop="Batch" />
            <el-table-column label="目标节点" align="center" key="AmntOld" prop="AmntOld" />
            <el-table-column label="目标等级" align="center" key="WgtOld" prop="WgtOld" />
            <el-table-column label="单件重(KG)" align="center" key="WgtAftBook" prop="WgtAftBook" />
            <el-table-column label="件数" align="center" key="AmntAftBook" prop="AmntAftBook" />
            <el-table-column label="重量" align="center" key="AmntAftBook" prop="AmntAftBook" />
            <el-table-column label="单位" align="center" key="AmntAftBook" prop="AmntAftBook" />
            <el-table-column label="移动班次" align="center" key="AmntAftBook" prop="AmntAftBook" />
            <el-table-column label="描述" align="center" key="AmntAftBook" prop="AmntAftBook" />
        </el-table>
    </div>
</template>
<script>
export default {
    name: "instructMonitor",
    components: {},
    data() {
        return {
            bodyHeight:500,
            //物料列表
            MtrlTree: [],
            //树结构筛选
            filterText:'',
            //仓库树列表 参数配置
            defaultProps:{
                children: 'children',
                label: 'label'
            },
            //移动类型
            OpeType: [],
            //仓库
            TgStockList: [],
            //源仓库
            SrStockList: [],
            //源仓库下的库位
            SrPositionList:[],
            //仓库下的库位
            TgPositionList:[],
            //状态
            statusOption:[
                {
                    label:'任意状态',
                    value:''
                },{
                    label:'未登账',
                    value:''
                },{
                    label:'已登账',
                    value:''
                },{
                    label:'已冲销',
                    value:''
                },{
                    label:'用于冲销',
                    value:''
                }
            ],

            //库位下的物料列表
            MtrList:[],
            // 等级
            TgRankList:[],
            // 遮罩层
            loading: false,
            // 表格数据
            dataList: null,
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
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 240; // 减去 100px 的边距
        this.bodyHeight = maxDivHeight
    },
    methods: {
        getOther() {
            // 递归函数，用于构建树形结构
            function buildTree(data, parentId) {
                const tree = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ParentId == parentId) {
                        const node = {
                            label:data[i].Text,
                            id: data[i].Id,
                            parentId: data[i].ParentId,
                        };
                        const children = buildTree(data, data[i].Id);
                        if (children.length > 0) {
                            node.children = children;
                        }
                        tree.push(node);
                    }
                }
                return tree;
            }
            //获取移动类型
            this.$api.GetOpeTypeByUser().then(res => {
                if (res.code == 200) {
                    this.OpeType = res.data.map(r => {
                        return {
                            label: r.Value,
                            value: r.Key,
                        }
                    })
                }
            });
            //物料树列表
            this.$api.GetMtrlTrees().then(res => {
                // 构建树形结构
                const departmentData = res.data;
                const treeData = buildTree(departmentData, -1);
                this.MtrlTree = treeData
            })
            //源仓库下拉数据
            this.$api.GetStocksByUserId().then(res => {
                this.SrStockList = res.data.map(r => {
                    return {
                        label: r.Value,
                        value: r.Key,
                    }
                })
            })
            //仓库下拉数据
            this.$api.GetStocksByUserId().then(res => {
                this.TgStockList = res.data.map(r => {
                    return {
                        label: r.Value,
                        value: r.Key,
                    }
                })
            })
            //目标等级
            this.$api.GetRanks().then(res => {
                if (res.code == 200) {
                    this.TgRankList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                }
            });
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.GetCheckStockLists(this.queryParams).then(res => {
                    if (res.code == 200) {
                        console.log(' 查询列表',res)
                        this.dataList = res.data
                        console.log('查询主数据成功',  this.dataList )
                        this.loading = false;
                    }
                }
            );
        },
        //源仓库选择
        SrStockChange(e){
            //获取仓库下的库位
            this.$api.GetLocationsByStockId().then(res => {
                this.SrPositionList = res.data.map(r => {
                    return {
                        label: r.Value,
                        value: r.Key,
                    }
                })
            })
        },
        TgStockIdsChaneg(e){
            //获取仓库下的库位
            this.$api.GetLocationsByStockId().then(res => {
                this.TgPositionList = res.data.map(r => {
                    return {
                        label: r.Value,
                        value: r.Key,
                    }
                })
            })
        },
        /*开始盘点按钮操作*/
        handleSearchRecdeo(){
            this.msgSuccess("开始盘点按钮操作成功");
        },
        /*导出按钮操作*/
        handleExport(){

        },
        /*清除查询条件操作*/
        handleClearSearch(){
            this.queryParams = {

            }
            this.msgSuccess("清除查询条件成功");
        },
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        treeNodeClick(node){
            if (node.children && node.children.length > 0) {
                // 如果点击的是父节点，则不执行选择操作
                return;
            }
            // 执行选择操作
            console.log('选择了节点:', node);
            this.queryParams.LocationId = node.id
            this.queryParams.LocationName = node.label
            //获取库位下的盘点记录
            this.getList()
        },
    }
};
</script>
<style lang="scss" scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}
/*使表单输入框宽度一致*/
::v-deep .el-form-item {
    .el-input{
        width: 100%;
    }
}
</style>


