<template>
    <!-- 工厂生产物料分类配置 -->
    <div class="Fac-con flex flex-direction">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="工厂:" prop="mesFactId">
                <el-select v-model="queryParams.mesFactId" placeholder="请选择工厂" clearable size="small">
                    <el-option v-for="dict in GCtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                <el-button type="danger" size="mini" @click="handleDelect">删除</el-button>
            </el-form-item>
        </el-form>
        <div class="flex-d">
            <el-card class="card1">
                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
                    <el-form-item label="物料:" prop="mtrlName">
                        <el-input v-model="queryParams.mtrlName" placeholder="请输入物料" style="width: 100%;" clearable
                                  @keyup.enter.native="handleQueryLeft" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQueryLeft">查询</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryLeft">重置</el-button>
                    </el-form-item>
                </el-form>
                <div id="treebox">
                    <el-tree height="500" :data="treeListLeft" show-checkbox default-expand-all node-key="mtrlId" ref="tree"
                             highlight-current check-strictly  @check="handleNodeClickLeft"
                             :props="defaultProps1">
                    </el-tree>
                </div>
            </el-card>
            <el-button class="btn-itemr" type="info" @click="handleCBtn">→</el-button>
            <el-card class="card1">
                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
                    <el-form-item label="工厂物料配置:" prop="mtrlName2">
                        <el-input v-model="queryParams.mtrlName2" style="width: 150px;" placeholder="工厂物料配置" clearable
                            @keyup.enter.native="handleQueryRight" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQueryRight">查询</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryRight">重置</el-button>
                    </el-form-item>
                </el-form>
                <div id="treebox2">
                    <el-tree :data="treeListRight" show-checkbox default-expand-all node-key="id" ref="tree"
                             highlight-current  check-strictly @check="handleNodeClickRight"
                        :props="defaultProps2">
                    </el-tree>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FactoryClassification',
    dicts: ["work_c"],
    data() {
        return {
            GCtype: [],//工厂
            GCWLType: [],
            showSearch: true,
            queryParams: {
                mesFactId: '',
                mtrlName: '',
                mtrlName2: '',
            },
            treeListRight: [],
            treeListLeft: [],
            defaultProps1: {
                children: 'childList',
                label: 'mtrlName'
            },
            defaultProps2: {
                children: 'childList',
                label: 'name'
            },
            //左侧树结构选中的key
            checkedKeysLeft:[],
            //右侧树结构选中的key
            checkedKeysRight:[],
            //右侧树结构选中的Nodes
            checkedNodesRight:[],
        }
    },
    created() {
        this.getOther()
        this.getList()
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 300; // 减去 100px 的边距
        // 设置 <div> 的高度
        var divElement = document.getElementById("treebox");
        var divElement2 = document.getElementById("treebox2");
        console.log('=======divElement=======',divElement)
        divElement.style.maxHeight = maxDivHeight + "px";
        divElement2.style.maxHeight = maxDivHeight + "px";
    },
    methods: {
        getOther() {
            this.$api.i_factMtrlGroupList().then(res => {
                this.GCWLType = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                let GCtype = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.GCtype = GCtype
                if(GCtype.length > 0){
                    this.queryParams.mesFactId = GCtype[0].value
                }
            })
        },
        getList() {
            // todo  (树结构未做 禁用限制)
            //左边树状
            this.getLeftList();
            //右边树状
            this.getRightList();
        },
        //左侧树结构
        getLeftList(){
            this.$api.i_mtrlTree({
                "mtrlName": this.queryParams.mtrlName, //物料名称
            }).then((res) => {
                if (res.code == 200) {
                    console.log('左边树状接口成功', res)
                    let treeListLeft = res.data
                    this.treeListLeft = treeListLeft
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        getRightList(){
            this.$api.i_factMtrlTree({
                "mesFactId": this.queryParams.mesFactId,
                "mtrlNmae": this.queryParams.mtrlName2
            }).then((res) => {
                if (res.code == 200) {
                    console.log('右边树状接口成功', res)
                    let treeListRight = res.data.filter(e=>e.id!=-1)
                    this.treeListRight = treeListRight
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //选中改变获取新数据
        handleChange(e) {
            // 根据工厂id获取车间,装置,侧线，加工方案,界区 /common/getByFctrId
            this.$api.i_commonGetFc({ mesFctrId: e }).then(res => {
                const mapData = (data) => data.map(e => ({ label: e.name, value: e.id }));
                this.SanvList1 = mapData(res.data.mesWorkshopByIdVOs);
                this.SanvList2 = mapData(res.data.pmNodeAreaGetByIdVOS);
                this.SanvList3 = mapData(res.data.pmSideLineGtByIdVOs);
                this.SanvList4 = mapData(res.data.schemeGetByIdVOs);
                this.form.schemeName = this.SanvList4.length > 0 ? this.SanvList4[0].value : "";
                this.form.sideLineAlias = this.SanvList2.length > 0 ? this.SanvList2[0].value : "";
            });
        },
        //右移按钮
        handleCBtn() {
            //判断节点选择
            if( !this.nodeSelect()){
                return false
            }else {
                //未分配 转 已分配
                this.$api.i_factMtrlSU({
                    mesFactId: this.queryParams.mesFactId, //	工厂id
                    groupId: this.checkedNodesRight[0].groupId, //	分类ID
                    mtrlId: this.checkedKeysLeft[0], //	物料id
                    upperMtrlId: this.checkedKeysRight[0], //上级物料id
                    useFlag: 1, //启用标识0否1是
                    smtId: 1, //	进出厂点：0 否 1 是
                }).then((res) => {
                    if (res.code == 200) {
                        this.getList()
                        this.$message.success("物料配置成功");
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                    .catch((err) => {
                        console.log('接口失败', err)
                    })
            }
        },
        //节点选择验证
        nodeSelect(){
            if(this.checkedKeysLeft.length == 0){
                this.$message.error("未选择物料");
                return false
            }else if(this.checkedKeysLeft.length > 1){
                this.$message.error("仅能选择一个物料");
                return false
            }else if(this.checkedKeysRight.length == 0){
                this.$message.error("未选择工厂物料");
                return false
            }else if(this.checkedKeysRight.length > 1){
                this.$message.error("仅能选择工厂一个物料");
                return false
            }else {
                return true
            }
        },
        handleQuery() {
            this.getList()
        },
        resetQuery() {
            this.queryParams.mtrlName = ''
            this.queryParams.mtrlName2 = ''
            this.getList()
        },
        handleDelect() {
            if(this.checkedKeysRight.length == 0){
                this.$message.error("未选择工厂物料");
                return false
            }else if(this.checkedKeysRight.length>1){
                this.$message.error("仅能选择工厂一个物料");
                return false
            }else {
                //未分配  删除
                this.$api.i_factMtrlDel({
                    id: this.checkedKeysRight[0], //	工厂物料id
                }).then((res) => {
                    if (res.code == 200) {
                        this.getList()
                        if(res.data){
                            this.$message.success(`工厂物料删除成功` );
                        }else {
                            this.$message.error(`工厂物料删除失败` );
                        }
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                    .catch((err) => {
                        console.log('接口失败', err)
                    })
            }


        },
        handleQueryLeft() {
            this.getLeftList()
        },
        resetQueryLeft() {
            this.queryParams.mtrlName = ''
            this.getLeftList()
        },
        handleQueryRight() {
            this.getRightList()
        },
        resetQueryRight() {
            this.queryParams.mtrlName2 = ''
            this.getRightList()
        },
        handleDelete(row) {
            const inspectionIds = this.ids
            this.$confirm('是否确认删除为"' + inspectionIds + '"的数据项?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$api.i_factMtrlDel({ id: inspectionIds }).then((res) => {
                        if (res.code == 200) {
                            console.log('接口成功', res)
                            this.$message({
                                showClose: true,
                                message: '删除数据成功',
                                type: 'success'
                            });
                            this.getTableData()
                        } else {
                            console.log(`接口成功,但接口状态=${res.code}`, res)
                        }
                    })
                        .catch((err) => {
                            console.log('接口失败', err)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
        },
        //左侧节点 点击回调
        handleNodeClickLeft(data,node){
            console.log('左侧节点 点击回调',data,node)
            this.checkedKeysLeft = node.checkedKeys
        },
        //右侧节点 点击回调
        handleNodeClickRight(data,node){
            console.log('左侧节点 点击回调',data,node)
            this.checkedKeysRight = node.checkedKeys
            this.checkedNodesRight = node.checkedNodes
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 9,
                label: '三级 1-1-1'
            }]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        }
    }
}
</script>
<style lang="scss" scoped>
.Fac-con {
    width: 100%;
    height: calc(100vh - 90px) !important;
    padding: 10px;

    .flex-d {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1; /* 占满剩余空间 */

        .card1 {
            flex: 8;
            border: 1px solid #333;
            height: 100%;
            overflow: auto;
        }

        .btn-itemr {
            margin: 0 10px;
        }



        .card2 {
            flex: 8;
            border: 1px solid #333;
            height: 100%;
            overflow: auto;
        }
    }
    #treebox {
        overflow: auto;
    }

}
</style>
