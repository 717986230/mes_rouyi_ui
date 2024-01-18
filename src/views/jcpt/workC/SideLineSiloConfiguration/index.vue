<template>
    <!-- 侧线料仓配置 -->
    <div class="jcc-con">
        <div class="jcc-left flex flex-direction align-center justify-between">
            <div class="jcc-top">
                <el-card class="box-card">
                    <div slot="header">
                        <span>侧线</span>
                    </div>
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="50">
                        <el-form-item label="工厂:" prop="mesFctrId">
                            <el-select v-model="queryParams.mesFctrId" style="width: 100%;" placeholder="请选择工厂" clearable
                                @change="fctrChange">
                                <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="装置:" prop="unitId">
                            <el-select v-model="queryParams.unitId" style="width: 100%;" placeholder="请选择装置" clearable>
                                <el-option v-for="dict in deviceList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="侧线:" prop="nodeName">
                            <el-input v-model="queryParams.nodeName" style="width: 100%;" placeholder="请输入侧线" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!--侧线列表-->
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
                <el-card class="box-card">
                    <div slot="header">
                        <span>已分配料仓</span>
                    </div>
                    <div class="card-body">
                        <table class="ulcss">
                            <tr v-for="(e, index) in AssignedList" :key="index" @click="handleBtoItemSelected(e)"
                                :class="{ selectedbtm: currentAssigned === e }" class="cs"
                                style="display: block;width: 100%;height: 25px;text-align: center">
                                <td style="float: left;">
                                    {{ e.tankName }}
                                </td>
                                <td style="float: right;">
                                    <el-radio-group v-model="e.useFlag" @input="useFlagChange">
                                        <el-radio :label="0">未启用</el-radio>
                                        <el-radio :label="1">启用</el-radio>
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
                    <span>料仓</span>
                </div>
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="50">
                    <el-form-item label="工厂:" prop="mesFctrId">
                        <el-select v-model="queryParams.mesFctrId" style="width: 150px;" placeholder="请选择工厂" clearable
                            @change="fctrChange">
                            <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="料仓:" prop="tankTypeId">
                        <el-input v-model="queryParams.tankName" style="width: 150px;" placeholder="请输入料仓" clearable
                            @keyup.enter.native="handleQuery2" />
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
                            <tr v-if="!e.use" :class="{ selecright: currentNotAssigned && currentNotAssigned.id === e.id }"
                                class="cs" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.tabkAlias }}
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
    name: "SideLineSiloConfiguration",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
            //工厂列表下拉数据
            factoryList: [],
            //装置列表下拉数据
            deviceList: [],
            //侧线列表
            sideLineList: [],
            //已分配的料仓列表
            AssignedList: null,
            //未分配料仓列表
            rightList: [],
            // 显示搜索条件
            showSearch: true,
            // 查询参数
            queryParams: {
                mesFctrId: "",
                unitId: "",
                nodeName: "",
                tankName: "",
            },
            //当前选中的侧线
            currentSideLine: null,
            //当前选中的料仓
            currentAssigned: null,
            //当前未分配
            currentNotAssigned: null,
        }
    },
    watch: {
        'queryParams.unitId': {
            handler(newVal) {
                if (newVal) {
                    this.deviceChange()
                }
            },
            deep: false, //非递归监听
            immediate: true, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        }
    },
    created() {
        this.getOther()
    },
    methods: {
        getOther() {
            //工厂
            this.$api.i_MESFactoryAllList().then(res => {
                let factoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.factoryList = factoryList
                if (factoryList.length > 0) {
                    this.queryParams.mesFctrId = factoryList[0].value
                }
            })
        },
        //工厂数据切换 装置赋值
        fctrChange(e) {
            this.$api.i_commonGetFc({ mesFctrId: e }).then(res => {
                const mapData = (data) => data.map(e => ({ label: e.name, value: e.id }));
                let zzlist = res.data?.pmUnitVEntities.map(e => ({ label: e.name, value: e.id }))
                //初始化选中第一个
                if (zzlist.length > 0) {
                    this.queryParams.unitId = zzlist[0].value
                    this.deviceList = zzlist
                } else {
                    this.deviceList = []
                    this.queryParams.unitId = ''
                }
            });
        },
        //装置切换 查询装置下的侧线
        deviceChange() {
            this.querySideLine({
                mesFctrId: this.queryParams.mesFctrId,
                unitId: this.queryParams.unitId,
                nodeName: this.queryParams.nodeName,
            })
        },
        //querySideLine
        querySideLine(param) {
            this.$api.i_sideLineALLList(param).then((res) => {
                if (res.code == 200) {
                    this.sideLineList = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //侧线列表点击  查询料仓分配数据
        handleTopItemSelected(item) {
            this.currentSideLine = item
            //已分配
            const promise1 = this.$api.i_sideTankList({
                "nodeId": item.id
            })
            //未分配
            const promise2 = this.$api.i_tankgetByDTOList({
                "mesFctrId": this.queryParams.mesFctrId,//MES工厂唯一ID
                "tankName": this.queryParams.tankName,//	罐名称
                "tankTypeId": 5 //1:卧罐,2:球罐,3:立罐,4:长输管线,5:固体料仓,6:虚拟罐,7:其他,8:包装装置,10:特殊类型
            })
            Promise.all([promise1, promise2])
                .then((res) => {
                    console.log('promise all执行完成', res)
                    let AssignedList = res[0].data
                    let rightList = res[1].data
                    this.AssignedList = AssignedList
                    this.rightList = rightList.map(e => {
                        return {
                            ...e,
                            ...{
                                use: AssignedList.some(e1 => e1.tankId == e.id) //用于判断为非配是否显示该数据,若已分配不显示
                            }
                        }
                    })
                })
                .catch((err) => {
                    console.log('查询侧线 分配 未 分配错误')
                })
        },
        handleBtoItemSelected(item) {
            this.currentAssigned = item;
            // Move the selected item from AssignedList to rightList
        },
        handleRightItemSelected(item) {
            // Move the selected item from rightList to AssignedList
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
            this.$api.i_stockMtrlSU({
                nodeId: this.currentSideLine.id, //侧线id 必传
                tankId: this.currentNotAssigned.id, //料仓id
                useFlag: 1 //是否使用0否1是
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.$nextTick(() => {
                        let NotAssigned = this.rightList.filter(e => {
                            return !e.use && e.id != this.currentNotAssigned.id
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
            this.$api.i_stockMtrlDel({
                id: this.currentAssigned.id, //侧线id 必传
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.currentAssigned = null;
                    this.currentNotAssigned = null
                    this.$message.success("料仓移除成功");
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //启用 未启用 变化
        useFlagChange(e) {
            this.$api.i_stockMtrlSU({
                id: this.currentAssigned.id,
                nodeId: this.currentSideLine.id, //侧线id 必传
                tankId: this.currentAssigned.tankId, //料仓id
                useFlag: e //是否使用0否1是
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
        /**侧线 搜索按钮操作 */
        handleQuery() {
            this.deviceChange()
        },
        /**侧线 重置按钮操作 */
        resetQuery() {
            this.queryParams.nodeName = '';
            this.handleQuery();
        },
        /**料仓 搜索按钮操作 */
        handleQuery2() {
            this.handleTopItemSelected(this.currentSideLine)
        },
        /**料仓 重置按钮操作 */
        resetQuery2() {
            this.queryParams.tankName = '';
            this.handleQuery2();
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
                    height: 100%;
                    border-radius: 5px;
                    border: 1px solid #333;
                    overflow: auto;
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
            bottom: 250px;
        }

        .btn-itemr {
            margin: 0 5px;
            position: absolute;
            bottom: 150px;
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
                height: calc(100% - 50px);
                border-radius: 5px;
                border: 1px solid #333;
                overflow: auto;
            }
        }
    }
}
</style>
