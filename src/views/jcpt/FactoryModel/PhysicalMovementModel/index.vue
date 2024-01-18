<template>
    <!-- 物理移动模型 -->
    <div class="jcc-con">
        <div class="jcc-left flex flex-direction align-center justify-between">
            <div class="jcc-top">
                <el-card class="box-card">
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="50">
                        <el-form-item label="工厂:" prop="mesFactId">
                            <el-select v-model="queryParams.mesFactId" style="width: 100%;" placeholder="请选择工厂" clearable>
                                <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="节点类型:" prop="nodeType">
                            <el-select v-model="queryParams.nodeType" style="width: 100%;" placeholder="请选择节点类型" clearable>
                                <el-option v-for="dict in WLtypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="源节点:" prop="nodeName">
                            <el-input v-model="queryParams.nodeName" style="width: 100%;" placeholder="源节点" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!--源节点列表-->
                    <div class="card-body">
                        <table class="ulcss">
                            <tr class="cs" v-for="e in sideLineList" @click="handleTopItemSelected(e)"
                                :class="{ selectedtop: currentSideLine === e }" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.nodeName }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-card>
            </div>
            <div class="jcc-bto">
                <div style="padding: 0 0 10px 15px;"> 移动类型:<el-select v-model="queryParams.moveTypeId" style="width: 200px;"
                        placeholder="移动类型" clearable>
                        <el-option v-for="dict in YDtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select></div>
                <el-card class="box-card">
                    <div slot="header">
                        目标节点:<el-input style="width: 200px;margin-right: 10px;" v-model="nodeName">
                        </el-input>
                        <el-button type="primary" size="mini" @click="ModehandleQuery">查询</el-button>
                        <el-button size="mini" @click="resetQuery">重置</el-button>
                    </div>
                    <div class="card-body">
                        <table class="ulcss">
                            <tr v-for="(e, index) in AssignedList" :key="index" @click="handleBtoItemSelected(e)"
                                :class="{ selectedbtm: currentAssigned === e }" class="cs"
                                style="display: block;width: 100%;height: 25px;text-align: center">
                                <td style="float: left;">
                                    {{ e.tgNodeName }}
                                </td>
                                <td style="float: right;">
                                    <el-radio-group v-model="e.useFlag" @input="useFlagChange">
                                        <el-radio :label="0">未启用</el-radio>
                                        <el-radio :label="1">已启用</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="jcc-mod">
            <el-button class="btn-iteml" type="info" @click="leftMod">←</el-button>
            <el-button class="btn-itemr" type="info" @click="rightMod">→</el-button>
        </div>
        <div class="jcc-right">
            <el-card class="box-card">
                <div slot="header">
                    <span>可配置的节点</span>
                </div>
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="50">
                    <el-form-item label="工厂:" prop="mesFactId">
                        <el-select v-model="queryParams.mesFactId" style="width: 100%;" placeholder="请选择工厂" clearable>
                            <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点类型:" prop="nodeType">
                        <el-select v-model="queryParams.nodeType" style="width: 150px;" placeholder="物料类型" clearable>
                            <el-option v-for="dict in WLtypeList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="目的节点:" prop="nodeName">
                        <el-input v-model="queryParams.nodeName" style="width: 150px;" placeholder="目的节点" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="handleQuery2">搜索</el-button>
                        <el-button size="mini" @click="resetQuery2">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--未分配料仓-->
                <div class="card-body">
                    <table class="ulcss">
                        <span v-for="e in rightList" @click="handleRightItemSelected(e)">
                            <tr v-if="!e.use"
                                :class="{ selecright: currentNotAssigned && currentNotAssigned.nodeId === e.nodeId }"
                                class="cs" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.nodeName }}
                                </td>
                            </tr>
                        </span>
                    </table>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    name: "PhysicalMovementModel",
    data() {
        return {
            YDtype: [],//移动类型
            WLtypeList: [],// 物料类型
            //工厂列表下拉数据
            factoryList: [],
            //装置列表下拉数据
            deviceList: [],
            //源节点列表
            sideLineList: [],
            //目标节点列表
            AssignedList: [],
            //未分配列表
            rightList: [],
            // 显示搜索条件
            showSearch: true,
            nodeName: "",//目标节点
            // 查询参数
            queryParams: {
                mesFactId: " ",
                nodeType: " ",
                nodeName: "",
                unnodeName: "",
                moveTypeId: 1,
            },
            //源节点
            currentSideLine: null,
            //目标节点
            currentAssigned: null,
            //目的节点
            currentNotAssigned: null,
        }
    },
    watch: {
        'queryParams.nodeType': {
            handler(newVal) {
                this.deviceChange()
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        }
    },
    created() {
        this.getOther()
        this.deviceChange()
    },
    methods: {
        getOther() {
            //工厂
            this.$api.i_MESFactoryAllList().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '全部', value: " " };
                // 将 "全部" 选项添加到数组的开头
                this.factoryList = [allOption, ...res.data.map(e => ({
                    label: e.mesFctrName,
                    value: e.mesFctrId
                }))];
                this.queryParams.mesFactId = this.factoryList[0].value
            });
            //工厂 i_factMtrlGroupList
            this.$api.i_nodeTypeList().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '所有', value: ' ' };
                // 将 "全部" 选项添加到数组的开头
                this.WLtypeList = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.nodeType = this.WLtypeList[0].value
                this.queryParams.nodeType = " "
            });
            //移动类型
            this.$api.i_moveTypeList().then(res => {
                this.YDtype = res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }));
            })
        },
        //装置切换 查询装置下的侧线
        deviceChange() {
            this.querySideLine({
                "nodeType": this.queryParams.nodeType,
                "mesFctrId": this.queryParams.mesFactId,
                "nodeName": this.queryParams.nodeName,
            })
        },
        //querySideLine
        querySideLine(param) {
            this.$api.i_nodeNodeList(param).then((res) => {
                if (res.code == 200) {
                    // 源节点列表
                    this.sideLineList = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        // 查询罐区分配数据
        handleTopItemSelected(item) {
            console.log(item, "参数湖北");
            this.currentSideLine = item
            //已分配
            const promise1 = this.$api.i_phyMoveModList({
                "id": item.nodeId,
                "nodeName": item.nodeName
            })
            //未分配
            const promise2 = this.$api.i_nodeNodeList({
                "nodeType": this.queryParams.nodeType,
                "mesFctrId": this.queryParams.mesFctrId,
                "nodeName": this.queryParams.nodeName,
            })
            Promise.all([promise1, promise2])
                .then((res) => {
                    console.log('promise all执行完成', res)
                    let AssignedList = res[0].data
                    console.log(AssignedList, "idcanhus");
                    let rightList = res[1].data
                    console.log(AssignedList, rightList, 'rightList数据');
                    this.AssignedList = AssignedList
                    this.rightList = rightList.map(e => {
                        return {
                            ...e,
                            ...{
                                use: AssignedList.some(e1 => e1.tgNodeId == e.nodeId) //用于判断为非配是否显示该数据,若已分配不显示
                            }
                        }
                    })
                })
                .catch((err) => {
                    console.log('查询侧线 分配 未 分配错误')
                })
        },
        handleBtoItemSelected(item) {
            //目标节点
            this.currentAssigned = item;
        },
        handleRightItemSelected(item) {
            console.log(item, "餐宿");
            //目的节点
            this.currentNotAssigned = item
        },
        // 左移
        leftMod() {
            //判断是否选择料仓
            if (!this.currentNotAssigned) {
                this.$message.error("未选择未分配料仓");
                return false
            }
            // 未分配转已分配
            this.$api.i_phyMoveModSU({
                // "des": "",
                // "displayOrder": 0,
                // "fraq": 0,
                "useFlag": this.queryParams.useFlag,
                // "id": undefined, //目的节点
                "moveTypeId": this.queryParams.moveTypeId,
                "srNodeId": this.currentSideLine.nodeId, //源节点
                "tgNodeId": this.currentNotAssigned.nodeId, //目标节点id
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.$nextTick(() => {
                        console.log(this.rightList, "右侧参数");
                        let NotAssigned = this.rightList.filter(e => {
                            return !e.use && e.nodeId != this.currentNotAssigned.nodeId
                        })
                        this.currentNotAssigned = NotAssigned[0];
                    })
                    this.$message.success("分配料仓成功");
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
            //判断是否选择料仓
            if (!this.currentAssigned) {
                this.$message.error("未选择已分配料仓");
                return false
            }
            //已分配 转 未分配
            this.$api.i_phyMoveModDel({
                "id": this.currentAssigned.id, //侧线id 必传
                "nodeName": "",
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.currentAssigned = null;
                    this.currentNotAssigned = null;
                    this.$message.success("料仓移除成功");
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            }).catch((err) => {
                console.log('接口失败', err)
            })
        },
        //启用 未启用 变化
        useFlagChange(e) {
            console.log(this.currentAssigned, "目标");
            this.$api.i_phyMoveModSU({
                "useFlag": e,
                "id": this.currentAssigned.id,
                "moveTypeId": this.queryParams.moveTypeId,
                "srNodeId": this.currentSideLine.nodeId, //源节点
                "tgNodeId": this.currentAssigned.tgNodeId, //目标节点id
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.$message.success(`料仓${e == 1 ? '启用' : '停用'}成功`);
                    this.currentAssigned = null;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //目标节点查询
        ModehandleQuery() {
            this.$api.i_phyMoveModList({
                "id": undefined,
                "nodeName": this.nodeName
            }).then(res => {
                this.AssignedList = res.data
            })
        },
        /**罐 搜索按钮操作 */
        handleQuery() {
            this.deviceChange()
        },
        resetQuery() {
            this.queryParams = {
                mesFctrId: "",
                inoutTypeId: "",
                name: ""
            };
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /**物料 搜索按钮操作 */
        handleQuery2() {
            this.handleTopItemSelected(this.currentSideLine)
        },
        /**物料 重置按钮操作 */
        resetQuery2() {
            this.queryParams = {
                nodeType: "",
                mesFctrId: "",
                nodeName: ""
            };
            this.resetForm("queryForm");
            this.handleQuery();
        },
    }
}

</script>
<style lang="scss" scoped>
ul,
li {
    list-style: none;
    padding: 0;
    margin: 0;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}

.selectedbtm {
    background-color: rgb(175, 175, 175);
    color: white;
}

.selecright {
    background-color: blue;
    color: white;
}

::v-deep.el-select-dropdown__item {
    padding-left: 12px;
}

.jcc-con {
    width: 100%;
    height: 100% !important;
    display: flex;
    padding: 10px;


    .ulcss {
        width: 100%;
    }

    .jcc-left {
        width: 48%;

        .jcc-top {
            width: 100%;
            height: 55%;
            line-height: 100%;

            ::v-deep.el-card {
                height: 100%;
            }

            ::v-deep.el-card__body {
                height: calc(100% - 140px);
            }

            .box-card {
                height: 100%;
                width: 100%;

                .card-body {
                    width: 100%;
                    height: 200px;
                    border-radius: 5px;
                    border: 1px solid #333;
                    overflow: auto;
                    padding-bottom: 10px;

                    .ulcss {
                        height: 100%;
                    }
                }
            }
        }

        .jcc-bto {
            width: 100%;
            height: 42%;
            line-height: 100%;

            ::v-deep.el-card {
                height: 100%;
            }

            ::v-deep.el-card__body {
                height: calc(100% - 40px);
            }

            .box-card {
                height: 100%;
                width: 100%;

                .card-body {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    border: 1px solid #333;
                    overflow: auto;
                }
            }
        }
    }

    .jcc-mod {
        width: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .btn-iteml {
            margin: 0 5px;
            position: absolute;
            bottom: 300px;
        }

        .btn-itemr {
            margin: 0 5px;
            position: absolute;
            bottom: 210px;
        }
    }

    .jcc-right {
        width: 50%;

        ::v-deep.el-card {
            height: 100%;
        }

        ::v-deep.el-card__body {
            height: calc(100% - 45px);
        }

        .box-card {
            height: 680px;
            width: 100%;

            .card-body {
                width: 100%;
                height: calc(100% - 150px);
                border-radius: 5px;
                border: 1px solid #333;
                overflow: auto;
            }
        }
    }
}
</style>
