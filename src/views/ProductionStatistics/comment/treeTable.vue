<template>
    <div>
        <el-table :data="[]" :height="800">
            <el-table-column label="物料名称"></el-table-column>
            <el-table-column label="物料等级" align="center" width="300"></el-table-column>
            <el-table-column label="序号" align="center" width="300"></el-table-column>
            <template slot="empty">
                <el-tree height="350" :data="treeData" show-checkbox node-key="id"
                         :expand-on-click-node="false"
                         :show-checkbox="true"
                         :check-strictly="true"
                         :accordion="true"
                >
					<span class="custom-tree-node " slot-scope="{ node, data }">
						<div class="label flex align-center h100 " style="flex: 1">
							<div class="icon folder " :class="{
								'son':!data.children || data.children.length == 0,
								'folder':data.children && data.children.length > 0,
								'folder-off': node.expanded,
								'folder-on': !node.expanded,
								}"></div>
							<div @click="nodeSHow(node)"> {{ node.label }}</div>
						</div>
						<div class="other flex">
							<div class="marl flex align-center justify-center" style="width: 300px; ">
								<div class=" flex align-center justify-center" @click="data.rankEditable = true"
                                     v-if="!data.rankEditable" style="width: 100%;height: 30px;">
									{{ data.RankId }}
								</div>
								<el-select v-else v-model="data.rank" placeholder="请选择" size="mini" style="width: 100%;"
                                           @blur="data.rankEditable = false">
									<el-option v-for="(option, index) in materialGrade" :key="index"
                                               :label="option.label" :value="option.value"></el-option>
								</el-select>
							</div>
							<div class="flex align-center justify-center " style="width: 300px;">
								<div @click=" data.sortEditable = true" v-if="!data.sortEditable">
									{{ data.DisplayOrder }}
								</div>
								<el-input v-else v-model="data.sort" type="number" maxlength="11" size="mini">
								</el-input>
							</div>
						</div>
					</span>
                </el-tree>
            </template>
        </el-table>
        <el-dialog :title="title" :visible.sync="open" width="30%">
            <div style="display: flex;justify-content: center;">
                <div style="line-height: 25px;">
                    物料名称:
                </div>
                <el-input v-model="input1" type="tel" maxlength="11" size="mini" style="width:200px"></el-input>
                <el-button @click="dialogVisible = false" size="mini">查询</el-button>
            </div>
            <div class="treeboxflex">
                <el-tree :data="MtrlTree" :props="defaultProps" :expand-on-click-node="false"
                         :filter-node-method="filterNode" ref="tree" node-key="id" default-expand-all highlight-current
                         @node-click="handleNodeClick" />
            </div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="Cancel" size="mini">取 消</el-button>
				<el-button type="primary" @click="verify" size="mini">确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>

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
export default {
    name: "tree-table",
    props:{
        treeData:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        const data = [{
            id: 1,
            label: '一级 1',
            rank: 1,
            sort: 0,
            rankEditable: false,
            sortEditable: false,
            children: [{
                id: 4,
                label: '二级 1-1',
                rank: 1,
                sort: 0,
                rankEditable: false,
                sortEditable: false,
                children: [{
                    id: 9,
                    label: '三级 1-1-1',
                    rank: 1,
                    sort: 0,
                    rankEditable: false,
                    sortEditable: false,
                }, {
                    id: 10,
                    label: '三级 1-1-2',
                    rank: 1,
                    sort: 0,
                    rankEditable: false,
                    sortEditable: false,
                }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            rank: 1,
            sort: 56,
            rankEditable: false,
            sortEditable: false,
            children: [{
                id: 5,
                label: '二级 2-1',
                rank: 1,
                sort: 0,
                rankEditable: false,
                sortEditable: false,
            }, {
                id: 6,
                label: '二级 2-2',
                rank: 1,
                sort: 0,
                rankEditable: false,
                sortEditable: false,
            }]
        }, {
            id: 3,
            label: '一级 3',
            rank: 1,
            sort: 0,
            rankEditable: false,
            sortEditable: false,
            children: [{
                id: 7,
                label: '二级 3-1',
                rank: 1,
                sort: 0,
                rankEditable: false,
                sortEditable: false,
            }, {
                id: 8,
                label: '二级 3-2',
                rank: 1,
                sort: 0,
                rankEditable: false,
                sortEditable: false,
            }]
        }];
        return {
            data: JSON.parse(JSON.stringify(data)),
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
            form: {
                label1: "",
                label2: "",
                label3: "",
            },
            // 弹出层标题
            title: "",
            open: false,
            MtrlTree: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            input1:'',
            tabledata:null
        }
    },
    created() {
      this.getOther()
    },
    methods: {
        getOther() {
            this.$api.LoadTreeData().then((res) => {
                 if (res.code == 200) {
                     console.log('接口成功', res)
                     this.MtrlTree = buildTree(res.data,0) ;
                     console.log('物料树结构', this.MtrlTree)
                    } else {
                      console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        Cancel(){
            this.open = false
        },
        verify() {
            this.open = false
            // this.dataListTC.find((e => e.RecId == this.tabledata)).MtrlAlias = this.rowMtrlAlias
            let indexDate = this.dataListTC.find((e => e.RecId == this.tabledata))
            indexDate.MtrlAlias = this.rowMtrlAlias.label
            this.$set(this.dataListTC, this.dataListTC.findIndex((e => e.RecId == this.tabledata)), indexDate)
        },
        handleNodeClick(row) {
            console.log(row);
            this.rowMtrlAlias = row
        },
        handleTCedit(row) {
            console.log(row, "row");
            this.open = true;
            this.title = "选择物料树";
            if (row) {
                this.tabledata = row.RecId
            } else {
                this.tabledata = undefined
            }
        },
        append(data) {
            const newChild = {
                id: id++,
                label: 'testtest',
                children: []
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        nodeSHow(e) {
            console.log('输出node', e)
            this.open = true
        }
    }
}
</script>

<style lang="scss" scoped>
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
    background-image: url("zTreeStandard.png");
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
