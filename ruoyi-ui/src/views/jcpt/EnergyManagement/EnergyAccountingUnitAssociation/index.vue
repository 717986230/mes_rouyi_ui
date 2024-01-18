<template>
    <!-- 能源核算单元关联 -->
    <div class="Fac-con">
        <div class="fac-left">
            <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
                <el-form-item label="复合核算单元:" prop="unitName">
                    <el-input size="mini" v-model="queryParams.unitName" placeholder="复合核算单元" type="text"> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="cyan" size="mini" @click="handleQuery">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table style="height: 100%" border v-loading="loading" :data="sideLineList"
                @row-click="handleTopItemSelected">
                <el-table-column fixed="left" type="selection" width="50" align="center" />
                <el-table-column label="复合核算单元名称" align="center" key="unitName" prop="unitName" />
            </el-table>
        </div>
        <div class="fac-right">
            <div class="fac-ch-le">
                <el-form :model="queryParamsDown" ref="queryForm" :inline="true" v-show="showSearch">
                    <el-form-item label="基本核算单元:" prop="name">
                        <el-input size="mini" v-model="queryParamsDown.name" placeholder="基本核算单元" type="text" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="cyan" size="mini" @click="handleQueryleft">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table style="height: 100%;" border v-loading="loadingDown" :data="AssignedList"
                    @selection-change="handleLeftItemSelected">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="备选基本核算单元名称" align="center" key="name" prop="name" />
                </el-table>
            </div>
            <div class="fac-mod">
                <div class="fac-btn">
                    <el-button class="btn-iteml" type="info" @click="rightMod" :disabled="singleR">←</el-button>
                    <el-button class="btn-itemr" type="info" @click="leftMod" :disabled="singleL">→</el-button>
                </div>
            </div>
            <div class="fac-ch-rg">
                <el-form :model="queryParamsDownright" ref="queryForm" :inline="true" v-show="showSearch">
                    <el-form-item label="基本核算单元:" prop="name">
                        <el-input size="mini" v-model="queryParamsDownright.name" placeholder="基本核算单元" type="text"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="cyan" size="mini" @click="handleQueryright">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table border style="height: 100%;" v-loading="loadingDown" :data="rightList"
                    @selection-change="handleRightItemSelected">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="已选基本核算单元名称" align="center" key="name" prop="name" />
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EnergyAccountingUnitAssociation',
    data() {
        return {
            loading: false,
            loadingDown: false,
            // 选中数组
            idsL: [],
            idsR: [],
            total: 0,
            // 非单个禁用
            singleL: true,
            // 非多个禁用
            multipleL: true,
            singleR: true,
            // 非多个禁用
            multipleR: true,
            showSearch: true,
            queryParams: {
                useFlag: '',
                "pageNum": 1,
                "pageSize": 10,
            },
            queryParamsDown: {
                name: "",
                "basicId": undefined,
                "compositeId": undefined,
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                // "pageNum": 1,
                // "pageSize": 10,
                "reasonable": true,
                "useFlag": "",
            },
            queryParamsDownright: {
                name: "",
                "basicId": undefined,
                "compositeId": undefined,
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                // "pageNum": 1,
                // "pageSize": 10,
                "reasonable": true,
                "useFlag": "",
            },

            defaultProps: {
                children: 'children',
                label: 'label'
            },
            sideLineList: [],//复合
            //左列表
            AssignedList: [],//基本
            //右列表
            rightList: [],//关联
            //左
            currentSideLine: null,
            //中
            currentAssigned: null,
            //右
            currentNotAssigned: null,
        }
    },
    created() {
        this.getOther()
        this.deviceChange()
    },
    methods: {
        // 左侧表格选中事件处理
        handleLeftItemSelected(selection) {
            this.idsL = selection.map((item) => item.id);
            this.singleL = selection.length != 1;
            this.multipleL = !selection.length;
        },
        // 右侧表格选中事件处理
        handleRightItemSelected(selection) {
            this.idsR = selection.map((item) => item.id);
            this.singleR = selection.length != 1;
            this.multipleR = !selection.length;
        },
        // 左移
        leftMod() {
            this.$api.e_compositeBasicSU(
                {
                    basicId: this.idsL[0],//基本
                    compositeId: this.currentSideLine.id,//复合
                }
            ).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.$nextTick(() => {
                        let NotAssigned = this.rightList.filter(e => {
                            return !e.use && e.id != this.currentNotAssigned.id
                        })
                        this.currentNotAssigned = NotAssigned[0];
                    })
                    this.$message.success("右移成功");
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        // 右移
        rightMod() {
            //左 转 右
            this.$api.e_compositeBasicDel({ id: this.idsR[0] }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.currentAssigned = null;
                    this.currentNotAssigned = null;
                    this.$message.success("左移成功");
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            }).catch((err) => {
                console.log('接口失败', err)
            })
        },
        deviceChange() {
            this.querySideLine(this.queryParams)
        },
        querySideLine(param) {
            console.log(param, 'param');
            //复合
            this.$api.e_compositeCalculateUnitList(param).then((res) => {
                if (res.code == 200) {
                    // 源节点列表
                    this.sideLineList = res.rows
                    this.total = res.total
                    this.loading = false
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        handleTopItemSelected(item) {
            console.log(item, "参数湖北");
            this.currentSideLine = item
            //左
            this.loadingDown = true
            //基本
            const promise1 = this.$api.e_basicCalculateUnitList(
                this.queryParamsDown
            )
            //右
            //关联列表
            const promise2 = this.$api.e_compositeBasicList(
                this.queryParamsDownright
            )
            Promise.all([promise1, promise2])
                .then((res) => {
                    console.log('promise all执行完成', res)
                    let AssignedList = res[0].rows
                    let rightList = res[1].data
                    console.log("数据", AssignedList, rightList);
                    console.log(AssignedList, rightList, 'rightList数据');
                    this.AssignedList = AssignedList
                    this.rightList = rightList.map(e => {
                        return {
                            ...e,
                            ...{
                                use: AssignedList.some(e1 => e1.srNodeId == e.id) //用于判断为非配是否显示该数据,若已分配不显示
                            }
                        }
                    })
                    this.loadingDown = false

                })
                .catch((err) => {
                })
        },
        getOther() {
            this.$api.i_MESFactoryAllList().then(res => {
                this.JCtype = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
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
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.deviceChange();
        },
        handleQueryleft() {
            this.handleTopItemSelected(this.currentSideLine);
        },
        handleQueryright() {
            this.handleTopItemSelected(this.currentSideLine);
        },
        resetQuery() { },
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
    height: 770px;
    padding: 20px;
    display: flex;

    .fac-left {
        height: 100%;
        width: 30%;
        margin-right: 10px;

        .card1 {
            margin-right: 20px;
            height: 100%;
        }
    }

    .fac-right {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 69%;

        .fac-ch-le {
            height: 100%;
            flex: 3;
        }

        .fac-mod {
            position: relative;
            height: 100%;
            flex: 1;
            text-align: center;
            margin: 0 auto;

            .fac-btn {
                position: absolute;
                top: 40%;
                left: 0;

                .btn-iteml {
                    margin: 20px;
                }

                .btn-itemr {
                    margin: 0px;
                }
            }
        }

        .fac-ch-rg {
            flex: 3;
            height: 100%;
        }
    }
}
</style>
