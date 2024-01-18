<template>
    <!--设备运行监控-->
    <div class="app-container">
        <div style="margin: 15px; font-size: 24px;font-weight: bold;">
            设备运行监控
        </div>
        <el-row :style="{ height: bodyHeight + 'px' }">
            <el-col :span="6" style="height: 100%;overflow: auto">
                <el-input v-model="queryParams.search" placeholder="请输入工厂/车间/区域"
                    style="width: 230px;margin-right: 20px;"></el-input>
                <el-button type="success" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
                <el-tree style="height: calc(100% - 80px);overflow: auto" class="filter-tree" :data="storageTree"
                    :props="defaultProps" highlight-current accordion :filter-node-method="filterNode"
                    @node-click="treeNodeClick" ref="tree">
                </el-tree>
            </el-col>
            <el-col :span="18" style="height: 100%;overflow: auto">
                <el-table ref="multipleTable" border v-loading="loading" :data="dataList">
                    <el-table-column label="序号" align="center" type="index" />
                    <el-table-column label="库位" align="center" key="LocationName" :show-overflow-tooltip="true" width="200"
                        prop="LocationName" />
                    <el-table-column label="物料" align="center" key="MtrlName" :show-overflow-tooltip="true" width="200"
                        prop="MtrlName" />
                    <el-table-column label="等级" align="center" key="Rank" prop="Rank" />
                    <el-table-column label="单件重量(KG)" align="center" width="150" key="WgtPerPack" prop="WgtPerPack" />
                    <el-table-column label="单位" align="center" key="WgtDim" prop="WgtDim" />
                    <el-table-column label="批次" align="center" width="150" key="Batch" prop="Batch" />
                    <el-table-column label="库存件数" align="center" key="AmntOld" prop="AmntOld" />
                    <el-table-column label="库存重量" align="center" key="WgtOld" prop="WgtOld" />
                    <el-table-column label="确认件数" align="center" key="AmntAftBook" prop="AmntAftBook" />
                    <el-table-column label="确认重量" align="center" key="WgtAftBook" prop="WgtAftBook" />
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "monitor",
    components: { Treeselect },
    data() {
        return {
            bodyHeight: 500,
            //仓库树列表
            storageTree: [],
            //树结构筛选
            filterText: '',
            //仓库树列表 参数配置
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            ids: [],
            // 遮罩层
            loading: false,
            // 表格数据
            dataList: null,
            // 查询参数
            queryParams: {
                "isAsc": "",
                "pageNum": 1,
                "pageSize": 10,
                search: "",
            },
            // 表单校验
            rules: {},
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 180; // 减去 100px 的边距
        this.bodyHeight = maxDivHeight
    },
    methods: {
        getOther() {
            // 递归函数，用于构建树形结构
            function buildTree(data, parentId) {
                const tree = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ParentId === parentId) {
                        const node = {
                            label: data[i].Text,
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

            //仓库树列表
            this.$api.GetTrees().then(res => {
                // 构建树形结构
                const departmentData = res.data;
                const treeData = buildTree(departmentData, -1);
                this.storageTree = treeData
            })

        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.GetCheckStockLists(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.dataList = res.data
                    this.loading = false;
                }
            }
            );
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.queryParams = {}
            this.handleQuery();
        },
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        treeNodeClick(node) {
            if (node.children && node.children.length > 0) {
                // 如果点击的是父节点，则不执行选择操作
                return;
            }
            // 执行选择操作
            this.queryParams.LocationId = node.id
            this.queryParams.LocationName = node.label
            //获取库位下的盘点记录
            this.getList()
        },
        /** 查询部门下拉树结构 */
        getDeptTree() {
            deptTreeSelect().then(response => {
                this.deptOptions = response.data;
            });
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
</style>


