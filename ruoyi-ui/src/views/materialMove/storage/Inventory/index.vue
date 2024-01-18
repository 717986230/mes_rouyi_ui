<template>
    <!--盘点管理-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in classesList" :key="dict.value" :label="dict.ShiftText"
                        :value="dict.ShiftValue" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="mini" @click="handleBeginInventory">
                    <svg-icon class-name="lock-icon" icon-class="lock-on" size="18" />
                    开始盘点
                </el-button>
                <el-button type="danger" size="mini" @click="handleCancleInventory">
                    <svg-icon class-name="lock-icon" icon-class="lock-off" />
                    取消盘点
                </el-button>
                <el-button type="primary" icon="el-icon-s-custom" size="mini"
                    @click="handleInventoryManage">盘点管理</el-button>
            </el-form-item>
        </el-form>
        <el-row :style="{ height: bodyHeight + 'px' }">
            <el-col :span="6" style="height: 100%;overflow: auto">
                <el-input placeholder="输入关键字进行过滤" clearable style="width:80%" v-model="filterText">
                </el-input>
                <el-tree style="height: calc(100% - 80px);overflow: auto" class="filter-tree" :data="storageTree"
                    :props="defaultProps" highlight-current accordion :filter-node-method="filterNode"
                    @node-click="treeNodeClick" ref="tree">
                </el-tree>

            </el-col>
            <el-col :span="18" style="height: 100%;overflow: auto">
                <el-row type="flex" justify="end" :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="success" plain icon="el-icon-plus" size="mini" :disabled="!queryParams.LocationId"
                            @click="handleAddRecode">新增记录</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="success" plain icon="el-icon-plus" size="mini" :disabled="!queryParams.LocationId"
                            @click="handleSaveRecode">保存修改记录</el-button>
                    </el-col>
                </el-row>
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
        <!--弹窗-->
        <el-dialog :title="dialog.title" :visible.sync="dialog.open" :width="dialog.type == 'user' ? '400px' : '70%'">
            <div v-if="dialog.type == 'user'">
                <div>
                    <el-table :data="inventoryUserList">
                        <el-table-column fixed="left" type="selection" width="50" align="center" />
                        <el-table-column label="用户" prop="userName"></el-table-column>
                        <el-table-column label="结束时间" prop="endTime"></el-table-column>
                    </el-table>
                </div>
                <div slot="footer" class="dialog-footer p20">
                    <el-button type="danger" @click="handleEndInventory">结束盘点</el-button>
                </div>
            </div>
            <div v-if="dialog.type == 'form'">
                <el-form ref="formDialog" :model="form" :rules="rules" label-width="120px">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="3">
                        </el-col>
                        <el-col :span="3">
                            <el-button type="success" plain icon="el-icon-plus" size="mini"
                                @click="AddMoveRecord">新增盘点记录</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="库位:">
                                <el-input disabled v-model="form.Location.LocationName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="物料:">
                                <el-select :value="form.MtrlId" value-key="label" @change="form.MtrlId = $event"
                                    placeholder="请选择物料" clearable size="small">
                                    <el-option v-for="dict in MtrList" :key="dict.value" :label="dict.label"
                                        :value="dict" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="批次:" prop="Batch">
                                <el-input v-model="form.Batch" type="number" placeholder="请输入批次" maxlength="30" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="等级:" prop="RankId">
                                <el-select :value="form.RankId" value-key="label" @change="form.RankId = $event"
                                    placeholder="请选择等级" clearable size="small">
                                    <el-option v-for="dict in TgRankList" :key="dict.value" :label="dict.label"
                                        :value="dict" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="物料规格:" prop="WgtPerPack">
                                <el-input v-model="form.WgtPerPack" type="number" placeholder="请输入物料规格" maxlength="30">
                                    <template v-slot:append>KG/件</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="重量单位:" prop="Dim">
                                <el-select :value="form.Dim" value-key="label" @change="form.Dim = $event"
                                    placeholder="请选择重量单位" clearable size="small">
                                    <el-option v-for="dict in WgtPerPackList" :key="dict.value" :label="dict.label"
                                        :value="dict" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="件数:" prop="AmntOld">
                                <el-input v-model="form.AmntOld" type="number" placeholder="请输入件数" maxlength="30" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="重量:" prop="WgtOld">
                                <el-input v-model="form.WgtOld" placeholder="请输入重量" maxlength="30" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-card class="box-card">
                    <div slot="header">

                        <el-button @click="delForm" style="float: right;" size="mini" type="danger"
                            icon="el-icon-folder-delete">删除</el-button>
                        <el-button @click="submitForm" style="float: right;margin-right: 20px" size="mini" type="success"
                            icon="el-icon-folder-checked">保存盘点库存</el-button>
                    </div>
                    <div class="card-body">
                        <el-table border v-loading="loading" :data="newInventoryList"
                            @selection-change="handleSelectionChange_dialog">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="库位" align="center" key="LocationName" prop="LocationName" width="160" />
                            <el-table-column label="物料" align="center" key="MtrlName" prop="MtrlName" width="120" />
                            <el-table-column label="批次" align="center" key="Batch" prop="Batch" />
                            <el-table-column label="等级" align="center" key="Rank" prop="Rank" />
                            <el-table-column label="单件重" align="center" key="WgtPerPack" prop="WgtPerPack" />
                            <el-table-column label="单位" align="center" key="WgtDim" prop="WgtDim" />
                            <el-table-column label="件数" align="center" key="AmntOld" prop="AmntOld" />
                            <el-table-column label="重量" align="center" key="WgtOld" prop="WgtOld" />
                        </el-table>
                    </div>
                </el-card>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "instructMonitor",
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
            dialog: {
                open: false,
                title: '',
                type: 'user',
            },
            //盘点用户列表
            inventoryUserList: [
                {
                    userName: '小李',
                    endTime: '2023-10-24 15:20:12'
                }
            ],
            //库位下的物料列表
            MtrList: [],
            // 等级
            TgRankList: [],
            //重量单位
            WgtPerPackList: [],
            //弹窗中的 为保存列表
            newInventoryList: [],
            //弹窗列表 多选 ids集合
            ids: [],
            // 列信息
            columns: [
                { key: 0, label: `序号`, visible: true },
                { key: 1, label: `F`, visible: true },
                { key: 2, label: `仪表名称`, visible: true },
                { key: 3, label: `采集时间`, visible: true },
                { key: 4, label: `前读数`, visible: true },
                { key: 5, label: `C`, visible: true },
                { key: 6, label: `RTDB读数`, visible: true },
                { key: 7, label: `RTDB错误读数`, visible: true },
                { key: 8, label: `C`, visible: true },
                { key: 9, label: `后读数`, visible: true },
                { key: 10, label: `净读数`, visible: true },
                { key: 11, label: `回零/开工前值`, visible: true },
                { key: 12, label: `系数`, visible: true },
                { key: 13, label: `虚实标记`, visible: true },
                { key: 14, label: `累计表标示`, visible: true },
                { key: 15, label: `工位号`, visible: true },
                { key: 16, label: `提交人`, visible: true },
                { key: 17, label: `提交时间`, visible: true },
            ],
            // 遮罩层
            loading: false,
            // 表格数据
            dataList: null,
            // 表单参数
            form: {
                CrtTime: '',//创建时间
                MtrlId: null,
                RankId: null,
                Dim: null,
            },
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
            // 表单校验
            rules: {
                UnitRdType: [
                    { required: true, message: "请选择操作类型", trigger: "blur" },
                ],
                DlvNode: [
                    { required: true, message: "请选择本方节点", trigger: "blur" }
                ],
                RcvNode: [
                    { required: true, message: "请选择对方节点", trigger: "blur" }
                ],
                BegRdTime: [
                    { required: true, message: "请选择开始时间", trigger: "blur" }
                ],
            },
            //班次类型
            classesList: [],
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
        console.log('pageHeight: ' + pageHeight)
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
            //获取班次
            this.$api.classes().then(res => {
                if (res.code == 200) {
                    this.classesList = res.data
                }
            });
            //仓库树列表
            this.$api.GetTrees().then(res => {
                console.log('仓库列表', res.data)
                // 构建树形结构
                const departmentData = res.data;
                const treeData = buildTree(departmentData, -1);
                this.storageTree = treeData
                console.log('仓库树列表', treeData)
            })
            //仪表下拉数据
            this.$api.instrList().then(res => {
                this.instrList = res.data.map(r => {
                    return {
                        label: r.PairNodeName,
                        value: r.PairNodeId,
                    }
                })
            })
            //侧线下拉数据
            this.$api.lineList().then(res => {
                this.lineList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
            //物料下拉数据
            this.$api.materielList().then(res => {
                this.materielList = res.data.map(r => {
                    return {
                        label: r.PairNodeName,
                        value: r.PairNodeId,
                    }
                })
            })
            //质量等级下拉数据
            this.$api.rankList().then(res => {
                this.rankList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
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
            //重量单位
            this.$api.GetDims().then(res => {
                if (res.code == 200) {
                    this.WgtPerPackList = res.data.map(e => {
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
                    console.log(' 查询列表', res)
                    this.dataList = res.data
                    console.log('查询主数据成功', this.dataList)
                    this.loading = false;
                }
            }
            );
        },
        /*开始盘点按钮操作*/
        handleBeginInventory() {
            this.msgSuccess("开始盘点按钮操作成功");
        },
        /*取消盘点操作*/
        handleCancleInventory() {
            this.msgSuccess("取消盘点钮操作成功");
        },
        /*盘点管理*/
        handleInventoryManage() {
            this.dialog = {
                open: true,
                title: '盘点用户管理',
                type: 'user',
            }
        },
        /*新增记录*/
        handleAddRecode() {
            this.$api.GetMtrlsByLocation({}).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.MtrList = res.data.map(e => {
                        return {
                            label: e.Value,
                            value: e.Key
                        }
                    })
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            this.form.Location = {
                LocationId: this.queryParams.LocationId,
                LocationName: this.queryParams.LocationName,
            }
            this.dialog = {
                open: true,
                title: '新增盘点记录',
                type: 'form',
            }
        },
        /*结束盘点*/
        handleEndInventory() {
            this.msgSuccess("结束盘点操作成功");

            this.dialog.open = false
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
        /** 提交按钮 */
        submitForm: function () {
            this.dialog.open = false
            this.$modal.msgSuccess("保存成功");
            this.getList();
        },
        /*删除弹窗中的记录*/
        delForm() {
            this.ids.forEach(e => {
                this.newInventoryList.splice(e, 1)
            })
            this.$modal.msgSuccess("删除成功");
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
            console.log('选择了节点:', node);
            this.queryParams.LocationId = node.id
            this.queryParams.LocationName = node.label
            //获取库位下的盘点记录
            this.getList()
        },
        /*新增盘点记录*/
        AddMoveRecord() {
            this.$refs["formDialog"].validate(valid => {
                if (valid) {
                    console.log('业务单类型', this.form)
                    let { MtrlId, Batch, RankId, WgtPerPack, Dim, AmntOld, WgtOld, Location } = this.form
                    let newInventory = {
                        time: new Date().getTime(),
                        "MtrlId": MtrlId.value,
                        "MtrlName": MtrlId.label,
                        "Batch": Batch,
                        "WgtDimId": MtrlId.value,
                        "WgtDim": Dim.label,
                        "WgtPerPack": WgtPerPack,
                        "UserId": "admin",
                        "RankId": RankId.value,
                        "Rank": RankId.label,
                        "CrtTime": "/Date(1698115764000)/",
                        "BegShiftTime": "/Date(946684800000)/",
                        "EndShiftTime": "/Date(946728000000)/",
                        "LocationId": Location.LocationId,
                        "LocationName": Location.LocationName,
                        "AmntOld": AmntOld,
                        "WgtOld": WgtOld
                    }
                    this.newInventoryList.push(newInventory)
                }
            });
        },
        //
        handleSaveRecode() {
            this.dialog.open = false
            this.msgSuccess("保存成功");
        },
        //弹窗中 列表 多选
        handleSelectionChange_dialog(selection) {
            console.log('弹窗列表多选', selection)
            let ids = []
            selection.forEach((val, index) => {
                this.newInventoryList.forEach((v, i) => {
                    // id 是每一行的数据id
                    if (val.time == v.time) {
                        console.log(i);
                        ids.push(i)
                    }

                })
            })
            this.ids = ids
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


