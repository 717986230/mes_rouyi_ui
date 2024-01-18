<template>
    <!-- 罐物料配置 -->
    <div class="jcc-con">
        <div class="jcc-left flex flex-direction align-center justify-between">
            <div class="jcc-top">
                <el-card class="box-card">
                    <div slot="header">
                        <span>罐</span>
                    </div>
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="50">
                        <el-form-item label="工厂:" prop="mesFactId">
                            <el-select v-model="queryParams.mesFactId" style="width: 100%;" placeholder="请选择工厂" clearable
                                @change="fctrChange">
                                <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="罐区:" prop="tankAreaId">
                            <el-select v-model="queryParams.tankAreaId" style="width: 100%;" placeholder="请选择罐区" clearable>
                                <el-option v-for="dict in deviceList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="罐名称:" prop="tankName">
                            <el-input v-model="queryParams.tankName" style="width: 100%;" placeholder="罐名称" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!--罐物料列表-->
                    <div class="card-body">
                        <table class="ulcss">
                            <tr class="cs" v-for="e in sideLineList" @click="handleTopItemSelected(e)"
                                :class="{ selectedtop: currentSideLine === e }" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.tankName }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-card>
            </div>
            <div class="jcc-bto">
                <el-card class="box-card">
                    <div slot="header">
                        <span>选择的罐已经配置的物料</span>
                    </div>
                    <div class="card-body">
                        <table class="ulcss">
                            <tr v-for="(e, index) in AssignedList" :key="index" @click="handleBtoItemSelected(e)"
                                :class="{ selectedbtm: currentAssigned === e }" class="cs"
                                style="display: block;width: 100%;height: 25px;text-align: center">
                                <td style="float: left;">
                                    {{ e.mtrlName }}
                                </td>
                                <td style="float: right;">
                                    <el-radio-group v-model="e.useFlag" @input="useFlagChange">
                                        <el-radio label="0">未启用</el-radio>
                                        <el-radio label="1">启用</el-radio>
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
                    <span>条件设置</span>
                </div>
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="50">
                    <el-form-item label="工厂:" prop="mesFactId">
                        <el-select v-model="queryParams.mesFactId" style="width: 150px;" placeholder="请选择工厂" clearable
                            @change="fctrChange">
                            <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料类型:" prop="groupId">
                        <el-select v-model="queryParams.groupId" style="width: 150px;" placeholder="物料类型" clearable>
                            <el-option v-for="dict in WLtypeList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件设置:" prop="mtrlNmae">
                        <el-input v-model="queryParams.mtrlNmae" style="width: 150px;" placeholder="条件设置" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="handleQuery2">搜索</el-button>
                        <el-button size="mini" @click="resetQuery2">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--未分配料仓-->
                <div>
                    <span>未配置罐物料</span>
                </div>
                <div class="card-body">
                    <table class="ulcss">
                        <span v-for="e in rightList" @click="handleRightItemSelected(e)">
                            <tr v-if="!e.use" :class="{ selecright: currentNotAssigned && currentNotAssigned.id === e.id }"
                                class="cs" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.mtrlName }}
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
    name: "TankMatCon",
    data() {
        return {
            WLtypeList: [],// 物料类型
            //工厂列表下拉数据
            factoryList: [],
            //装置列表下拉数据
            deviceList: [],
            //侧线列表
            sideLineList: [],
            //已分配的料仓列表
            AssignedList: [],
            //未分配料仓列表
            rightList: [],
            // 显示搜索条件
            showSearch: true,
            // 查询参数
            queryParams: {
                mesFactId: "",
                tankAreaId: "",
                nodeName: "",
                tankName: "",
                groupId: "",
                mtrlNmae: ""

            },
            //当前选中的罐区
            currentSideLine: null,
            //当前选中的配置物料
            currentAssigned: null,
            //当前未配置物料
            currentNotAssigned: null,
        }
    },
    watch: {
        'queryParams.tankAreaId': {
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
        this.deviceChange()
    },
    methods: {
        getOther() {
            //工厂
            this.$api.i_MESFactoryAllList().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '全部', value: ' ' };

                // 将 "全部" 选项添加到数组的开头
                this.factoryList = [allOption, ...res.data.map(e => ({
                    label: e.mesFctrName,
                    value: e.mesFctrId
                }))];
                this.queryParams.mesFactId = this.factoryList[0].value
                // if (this.factoryList.length > 0) {
                //     this.queryParams.mesFactId = this.factoryList[0].value
                // }
            });

            //工厂 i_factMtrlGroupList

            this.$api.i_factMtrlGroupList().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '所有', value: ' ' };

                // 将 "全部" 选项添加到数组的开头
                this.WLtypeList = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.groupId = this.WLtypeList[0].value
            });

        },
        //工厂数据切换 装置赋值
        fctrChange(e) {
            this.$api.i_commonGetFc({ mesFactId: e }).then(res => {
                const mapData = (data) => data.map(e => ({ label: e.name, value: e.id }));
                let zzlist = res.data?.pmTankAreaEntities.map(e => ({ label: e.name, value: e.id }))
                //初始化选中第一个
                if (zzlist.length > 0) {
                    this.queryParams.tankAreaId = zzlist[0].value
                    this.deviceList = zzlist
                } else {
                    this.deviceList = []
                    this.queryParams.tankAreaId = ''
                }
            });
        },
        //装置切换 查询装置下的侧线
        deviceChange() {
            this.querySideLine({
                "mesFctrId": this.queryParams.mesFactId,
                "tankAreaId": this.queryParams.tankAreaId,
                "tankName": this.queryParams.tankName,
                "tankTypeId": this.queryParams.tankTypeId,
            })
        },
        //querySideLine
        querySideLine(param) {
            this.$api.i_GtankgetByDTOList(param).then((res) => {
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
        // 查询罐区分配数据
        handleTopItemSelected(item) {
            console.log(item, "裂变罐");
            this.currentSideLine = item
            //已分配
            const promise1 = this.$api.i_tankMtrlList({

                "nodeId": item.id
            })
            //未分配
            const promise2 = this.$api.i_factMtrlList({
                "groupId": this.queryParams.groupId,//物料组
                "mesFactId": this.queryParams.mesFactId,//工厂
                "mtrlNmae": this.queryParams.mtrlNmae,//条件设置

            })
            Promise.all([promise1, promise2])
                .then((res) => {
                    console.log('promise all执行完成', res)
                    let AssignedList = res[0].data
                    let rightList = res[1].data
                    console.log(res[0].data, rightList, 'rightList数据');
                    this.AssignedList = AssignedList
                    this.rightList = rightList.map(e => {
                        return {
                            ...e,
                            ...{
                                use: AssignedList.some(e1 => e1.mtrlId == e.id) //用于判断为非配是否显示该数据,若已分配不显示
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
        },
        handleRightItemSelected(item) {
            console.log(item, "item");
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
            this.$api.i_tankMtrlSU({
                nodeId: this.currentSideLine.id, //id 必传
                useFlag: "1",//是否使用0否1是
                "des": "",
                "displayOrder": "",
                "mtrlId": this.currentNotAssigned.id, //料仓id
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
            this.$api.i_tankMtrlDel({
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
            this.$api.i_tankMtrlSU({
                id: this.currentAssigned.id,
                nodeId: this.currentSideLine.id, //侧线id 必传
                mtrlId: this.currentAssigned.mtrlId, //料仓id
                "des": "",
                "displayOrder": "",
                "useFlag": e,
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
        /**罐 搜索按钮操作 */
        handleQuery() {
            this.deviceChange()
        },
        /**进出厂点 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                mesFctrId: " ",
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
                groupId: "",
                mesFctrId: " ",
                mtrlNmae: ""
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
            bottom: 380px;
        }

        .btn-itemr {
            margin: 0 5px;
            position: absolute;
            bottom: 280px;
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
