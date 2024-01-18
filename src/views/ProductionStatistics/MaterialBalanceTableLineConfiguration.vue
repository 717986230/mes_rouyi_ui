<template>
    <!-- 物料平衡表行组态 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="upperId">
                <el-select v-model="queryParams.upperId" placeholder="MES工厂" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="平衡表:" prop="configId">
                <el-select v-model="queryParams.configId" placeholder="平衡表" clearable>
                    <el-option v-for="dict in configIdList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="primary" plain size="mini" @click="handleSave">保存</el-button>
                <el-button type="success" plain size="mini" @click="handleAdd">添加物料</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete">删除</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24">
                <div v-if="currentSelectNode">
                    当前选中节点名称 {{ currentSelectNode.label }}
                </div>
                <div v-for="item in checkedNodes">
                    当前勾选节点名称 {{ item.id + item.label + item.$treeNodeId }}
                </div>
            </el-col>
            <el-col :span="24">
                <div v-if="dialog.currentSelectNode">
                    弹窗当前选中节点名称 {{ dialog.currentSelectNode.label }}
                </div>
                <div v-for="item in dialog.checkedNodes">
                    弹窗当前勾选节点名称 {{ item.id + item.label + item.$treeNodeId }}
                </div>
            </el-col>
        </el-row>
        <el-table :data="[]" :height="800">
            <el-table-column label="物料名称"></el-table-column>
            <el-table-column label="物料等级" align="center" width="300"></el-table-column>
            <el-table-column label="序号" align="center" width="300"></el-table-column>
            <template slot="empty">
                <el-tree height="350" :data="treeData" show-checkbox node-key="id" ref="mainTree"
                    :expand-on-click-node="false" :show-checkbox="true" :check-strictly="true" :accordion="true"
                    :highlight-current="true" :check-on-click="true" @check="checkChange"
                    @current-change="currentCheckChange">
                    <span class="custom-tree-node " slot-scope="{ node, data }">
                        <div class="label flex align-center h100 " style="flex: 1">
                            <div class="icon folder " :class="{
                                'son': !data.children || data.children.length == 0,
                                'folder': data.children && data.children.length > 0,
                                'folder-off': node.expanded,
                                'folder-on': !node.expanded,
                            }"></div>
                            <div @click.stop="mainTreeClick(node, data)"> {{ node.label }}</div>
                            <div v-if="data.isNew" style="color:greenyellow">新数据</div>
                            <div v-if="data.isUpdate" style="color:red">修改未保存</div>
                        </div>
                        <div class="other flex">
                            <div class="marl flex align-center justify-center" style="width: 300px; ">
                                <div class=" flex align-center justify-center" @click.stop="data.rankEditable = true"
                                    v-if="!data.rankEditable" style="width: 100%;height: 30px;">
                                    {{ data.RankName }}
                                </div>
                                <el-select :popper-append-to-body="true" v-else v-model="data.RankName" placeholder="请选择"
                                    size="mini" style="width: 100%;">
                                    <el-option v-for="(option, index) in materialGrade" :key="index" :label="option.label"
                                        :value="option.value"></el-option>
                                </el-select>
                            </div>
                            <div class="flex align-center justify-center " style="width: 300px;">
                                <div @click=" data.sortEditable = true" v-if="!data.sortEditable">
                                    {{ data.DisplayOrder }}
                                </div>
                                <el-input v-else v-model="data.DisplayOrder" type="number" maxlength="11" size="mini">
                                </el-input>
                            </div>
                        </div>
                    </span>
                </el-tree>
            </template>
        </el-table>
        <el-dialog :title="dialog.title" :visible.sync="dialog.open" width="30%">
            <div style="display: flex;justify-content: center;">
                <div style="line-height: 25px;">
                    物料名称:
                </div>
                <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" type="tel" maxlength="11" size="mini"
                    style="width:200px"></el-input>
                <el-button @click="handelTreeFilTer" type="success" size="mini">查询</el-button>
                <el-button @click="handelTreeFilTerReset" type="info" size="mini">重置</el-button>
            </div>
            <div class="treeboxflex">
                <el-tree :key="treeKey" style="height: 500px;overflow: auto;width: 100%;padding: 20px 40px" :data="MtrlTree"
                    :props="defaultProps" :expand-on-click-node="false"
                    :show-checkbox="dialog.type == 'update' ? false : true" :check-strictly="true"
                    :filter-node-method="filterNode" ref="MtrlTree" node-key="id" highlight-current @check="dialogCheck"
                    @node-click="dialogNodeClick" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel" size="mini">取 消</el-button>
                <el-button type="primary" :disabled="dialogSubmitDisabled" @click="verify" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

import treeTable from "./comment/treeTable";
export default {
    name: "MaterialBalanceTableLineConfiguration",
    components: { treeTable },
    data() {
        return {
            configIdList: [
                {
                    value: 1,
                    label: "原油原料表石炼化"
                },
                {
                    value: 2,
                    label: "半成品石炼化"
                },
                {
                    value: 3,
                    label: "成品石炼化"
                },
                {
                    value: 4,
                    label: "原料平衡表"
                },
                {
                    value: 5,
                    label: "产品产量收,支,存平衡表"
                }
            ],
            // 显示搜索条件
            showSearch: true,
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "mtrlId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                upperId: "",
                configId: ""
            },
            FactoryList: [],//工厂下拉列表
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            //主数据
            treeData: [],
            //当前选中节点
            currentSelectNode: null,
            //当前勾选节点 id
            checkedKeys: [],
            //当前勾选节点 data
            checkedNodes: [],
            //弹窗参数
            dialog: {
                open: false,
                type: 'update',
                title: '',
                //当前选中节点
                currentSelectNode: null,
                //当前勾选节点 id
                checkedKeys: [],
                //当前勾选节点 data
                checkedNodes: [],
            },
            MtrlTree: [],//物料下拉列表
            treeKey: 0,//弹窗树 refkey 用于重置 tree 组件
            filterText: '',//弹窗筛选
            //物料等级
            materialGrade: [{
                label: "(空)",
                value: "(空)"
            }, {
                label: "破包料",
                value: "破包料"
            }, {
                label: "扫地料",
                value: "扫地料"
            }, {
                label: "等外品",
                value: "等外品"
            }, {
                label: "优等品",
                value: "优等品"
            }, {
                label: "一级品",
                value: "一级品"
            }, {
                label: "合格品",
                value: "合格品"
            }, {
                label: "废料",
                value: "废料"
            },
            {
                label: "无等级",
                value: "无等级"
            },
            {
                label: "未指定",
                value: "未指定"
            },

            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
        };
    },
    computed: {
        dialogSubmitDisabled() {
            if (this.dialog.type == 'add') {
                return this.dialog.checkedNodes.length == 0
            } else {
                return !this.dialog.currentSelectNode && this.dialog.checkedNodes.length == 0
            }
        }
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        /** 查询列表 */
        getList() {
            // 递归函数，用于构建树形结构
            function buildTree(data, ParentId) {
                const tree = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ParentId == ParentId) {
                        const node = {
                            id: data[i].Id,
                            label: data[i].Name,
                            ParentId: data[i].ParentId,
                            DisplayOrder: data[i].DisplayOrder,
                            RankId: data[i].RankId,
                            RankName: data[i].RankName,
                            rankEditable: false,
                            sortEditable: false,
                            isNew: false,
                            isUpdate: false
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
            this.$api.QueryBalanceSheetRow({}).then((res) => {
                if (res.code == 200) {
                    console.log('查询列表接口成功', res)
                    let data = res.data
                    this.treeData = buildTree(data, 0);
                    console.log('主数据=', this.treeData)
                } else {
                    console.log(`查询列表接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('查询列表接口失败', err)
                })
        },

        getOther() {
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
            //物料下拉数据
            this.$api.LoadTreeData().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    // 递归函数，用于构建树形结构
                    function buildTree(data, parentId) {
                        const tree = [];
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].UpperMtrlCode == parentId) {
                                const node = {
                                    id: data[i].MtrlId,
                                    label: data[i].MtrlName,
                                    parentId: data[i].UpperMtrlCode,
                                };
                                const children = buildTree(data, data[i].MtrlCode);
                                if (children.length > 0) {
                                    node.children = children;
                                }
                                tree.push(node);
                            }
                        }
                        return tree;
                    }
                    this.MtrlTree = buildTree(res.data, 0);
                    console.log('物料树结构', this.MtrlTree)
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //主树名称点击
        mainTreeClick(node, data) {
            console.log('主树名称点击 node=', node)
            console.log('主树名称点击 data=', data)
            this.$refs.mainTree.setCurrentKey(null);
            this.$refs.mainTree.setCurrentKey(data.id);
            //保存当前选中信息
            this.currentSelectNode = data

            this.dialog.open = true
            this.dialog.type = 'update'
            this.dialog.title = '修改物料'
        },
        // 节点选中状态发生变化时的回调
        checkChange(data, checked) {
            console.log('当前点击check的节点数据=', data)
            console.log('被选中的数据们=', checked)
            let { checkedKeys, checkedNodes } = checked
            this.checkedKeys = checkedKeys
            this.checkedNodes = checkedNodes
        },
        //当前选中节点变化时触发的事件
        currentCheckChange(data, node) {
            console.log('当前选中节点变化时触发的事件=', data)
            console.log('当前选中节点变化时触发的事件 Node 对象', node)
            //监听选中节点 保存当前选中信息
            this.currentSelectNode = data
        },
        //弹窗 筛选
        handelTreeFilTer() {
            this.$refs.MtrlTree.filter(this.filterText);
        },
        //弹窗 重置
        handelTreeFilTerReset() {
            this.filterText = ''
            this.$refs.MtrlTree.filter();
        },
        //弹窗取消
        Cancel() {
            this.dialog = {
                open: false,
                type: 'update',
                title: '',
                //当前选中节点
                currentSelectNode: null,
                //当前勾选节点 id
                checkedKeys: [],
                //当前勾选节点 data
                checkedNodes: [],
            }
        },
        //弹窗确认
        verify() {
            //更新物料名称
            if (this.dialog.type == 'update') {
                //更新主数据 节点名称 id
                let { ParentId, id } = this.currentSelectNode
                console.log('更新主数据节点名称', ParentId, this.currentSelectNode)
                //最外层节点  直接赋值
                if (ParentId == 0) {
                    this.treeData = this.treeData.map(e => {
                        if (e.id == id) {
                            return {
                                ...e,
                                ...{
                                    label: this.dialog.currentSelectNode.label,
                                    isUpdate: true
                                }
                            }
                        } else {
                            return e
                        }
                    })
                    this.resetTree(); // 重新加载el-tree组件
                } else {
                    const currentParentNode = this.$refs.mainTree.getNode(ParentId);
                    console.log('主数据的父node=', currentParentNode)
                    let childNodes = currentParentNode.childNodes.map(e => {
                        console.log(e.data.id + e.data.label)
                        if (e.data.id == id) {
                            return {
                                ...e.data,
                                ...{
                                    label: this.dialog.currentSelectNode.label,
                                    isUpdate: true
                                }
                            }
                        } else {
                            return e.data
                        }
                    })
                    console.log('主数据被更新的数据=', childNodes)
                    //更新操作
                    this.$refs.mainTree.updateKeyChildren(ParentId, childNodes);
                    this.$refs.MtrlTree.setCheckedKeys([]);
                    this.resetTree(); // 重新加载el-tree组件
                }
                this.dialog.open = false
            } else {
                //添加物料
                //两种情况  1. 已选择主数据节点 2.未选择主数据节点
                console.log('弹窗参数', this.dialog)
                let checkedNodes = this.dialog.checkedNodes.map((e, index) => {
                    return {
                        "id": new Date().getTime() + index, //todo1 后续调接口看逻辑咋写,目前为了绑定父子级别,故选用时间戳
                        "label": e.label,
                        "isNew": true,
                        "isUpdate": false,
                        "rankEditable": false,
                        "sortEditable": false,
                        "DisplayOrder": 0,
                        "RankId": 0,
                        "RankName": '',
                        "children": []
                    }
                })
                //未勾选
                if (this.checkedKeys.length == 0) {
                    for (let item of checkedNodes) {
                        item.ParentId = 0
                        this.$refs.mainTree.append(item, 0);
                    }
                    this.$refs.MtrlTree.setCheckedKeys([]);
                    this.resetTree(); // 重新加载el-tree组件
                    this.dialog.open = false
                } else if (this.checkedKeys.length == 1) {
                    for (let item of checkedNodes) {
                        item.ParentId = this.checkedKeys[0]
                        this.$refs.mainTree.append(item, this.checkedKeys[0]);
                    }
                    this.$refs.MtrlTree.setCheckedKeys([]);
                    this.resetTree(); // 重新加载el-tree组件
                    this.dialog.open = false
                } else {
                    this.msgError('最多勾选一个节点添加数据')
                }
            }
        },
        //为清空选中状态
        resetTree() {
            this.treeKey += 1;
        },
        dialogCheck(data, checked) {
            console.log('弹窗点击check的节点数据=', data)
            console.log('弹窗被选中的数据们=', checked)
            let { checkedKeys, checkedNodes } = checked
            this.dialog.checkedKeys = checkedKeys
            this.dialog.checkedNodes = checkedNodes
        },
        dialogNodeClick(row) {
            console.log('弹窗参数', this.dialog)
            this.dialog.currentSelectNode = row
        },
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "mtrlId": undefined,
                "temperature": "",
                "vcfVal": "",
                mtrlName: ""
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.$message.success("查询成功")
            this.queryParams.pageNum = 1;
            this.getList();
        },
        //保存
        handleSave() {
            this.$message.success("保存成功")
            console.log('===============保存参数=================')
            //保存参数  查询树结构中    isNEW 和 isUpdate
            function treeToArrayDFS(node, result = []) {
                if (node) {
                    result.push(node); // 将当前节点的值存入数组
                    if (node.children) {
                        for (let child of node.children) {
                            treeToArrayDFS(child, result); // 递归处理子节点
                        }
                    }
                }
                return result;
            }
            let result = this.treeData.map(tree => treeToArrayDFS(tree)).flat(); // 对每棵树进行转换，并将结果扁平化
            console.log('树结构扁平化', result)
            let newList = result.filter(e => e.isNew) //数据为新创建
            let updateList = result.filter(e => e.isUpdate && !e.isNew) //数据为旧数据需要更新的
            console.log('数据为新创建', newList)
            console.log('数据为旧数据需要更新的', updateList)
            console.log('===============保存参数=================')
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            console.log()
            this.queryParams = {
                ...this.queryParams,
                ...{
                    id: '',
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.dialog.open = true
            this.dialog.type = 'add'
            this.dialog.title = '添加物料'
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            if (this.checkedNodes.length == 0) {
                this.msgError('未勾选数据')
                return false
            } else {
                for (let item of this.checkedNodes) {
                    this.$refs.mainTree.remove(item);
                }
                this.msgSuccess('删除成功')
            }
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}

::v-deep .el-card__body {
    padding: 0 !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}

.treeboxflex {
    margin: 10px auto;
    width: 100%;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .label {
        .icon {
            margin: 2px 6px 0 1px;
            width: 16px;
            height: 16px;
            display: inline-block;
            padding: 0;
            border: 0 none;
            background-color: transparent;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-image: url("comment/zTreeStandard.png");
            background-position: 20px 20px;
        }

        .folder-off {
            background-position: -110px -16px;
        }

        .folder-on {
            background-position: -110px 0px;
        }

        .son {
            background-position: -110px -32px;
        }


    }

    .other {
        .marl {}
    }
}

::v-deep .el-tree-node__content {
    height: 40px;
    /*margin-bottom: -0.5px;*/
}

::v-deep .is-current>.el-tree-node__content {
    background-color: rgba(64, 158, 255, .5) !important;
}



::v-deep .el-table__empty-block {
    width: 100%;
    height: 100%;

    .el-table__empty-text {
        width: 100%;
        height: 100%;
    }
}

/*::v-deep .el-tree-node__children{*/

/*    margin-top: -0.5px;*/
/*}*/
</style>
