<template>
    <!-- 进出厂点物料配置 -->
    <div class="jcc-con">
        <div class="jcc-left flex flex-direction align-center justify-between">
            <div class="jcc-top">
                <el-card class="box-card">
                    <div slot="header">
                        <span>进出厂点</span>
                    </div>
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="50">
                        <el-form-item label="工厂:">
                            <el-select v-model="queryParams.mesFctrId" style="width: 100%;" placeholder="请选择工厂" clearable>
                                <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型:">
                            <el-select v-model="queryParams.inoutTypeId" style="width: 100%;" placeholder="请选择进出厂类型"
                                clearable>
                                <el-option v-for="dict in inoutTypeList" :key="dict.value" :label="dict.name"
                                    :value="dict.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进出厂点:" prop="name">
                            <el-input v-model="queryParams.name" style="width: 100%;" placeholder="请输入进出厂点" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!--进出厂点列表-->
                    <div class="card-body">
                        <table class="ulcss">
                            <tr class="cs" v-for="e in sideLineList" @click="handleTopItemSelected(e)"
                                :class="{ selectedtop: currentSideLine && currentSideLine.id == e.id }"
                                style=" display: block;width: 100%;">
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
                        <span>已分配物料</span>
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
                    <span>物料</span>
                </div>
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="50">
                    <el-form-item label="工厂:" prop="mesFctrId">
                        <el-select v-model="queryParams.mesFctrId" style="width: 100%;" placeholder="请选择工厂" clearable>
                            <el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料类型:" prop="groupId">
                        <el-select v-model="queryParams.groupId" style="width: 100%;" placeholder="请选择工厂" clearable>
                            <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料名:" prop="mtrlNmae">
                        <el-input v-model="queryParams.mtrlNmae" style="width: 100%;" placeholder="请输入物料" clearable
                            @keyup.enter.native="handleQuery2" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="handleQuery2">搜索</el-button>
                        <el-button size="mini" @click="resetQuery2">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--未分配物料-->
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
    name: "MaterialPoints",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
            //进出厂类型列表数据
            inoutTypeList: [],
            //工厂列表下拉数据
            factoryList: [],
            //进出厂点列表
            sideLineList: [],
            //已分配的物料列表
            AssignedList: null,
            //未分配物料列表
            rightList: [],
            //物料类型
            mtrlOption: [],
            // 显示搜索条件
            showSearch: true,
            // 查询参数
            queryParams: {
                mesFctrId: "",
                inoutTypeId: "",
                name: "",
                mtrlNmae: "",
                tankName: "",
                groupId: "",
            },
            //当前选中的进出厂点
            currentSideLine: null,
            //当前选中的物料
            currentAssigned: null,
            //当前未分配
            currentNotAssigned: null,
        }
    },
    watch: {
        'queryParams.mesFctrId': {
            handler(newVal) {
                if (newVal) {
                    this.deviceChange()
                }
            },
            deep: false, //递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
        'queryParams.inoutTypeId': {
            handler(newVal) {
                if (newVal) {
                    this.deviceChange()
                }
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
        'queryParams.groupId': {
            handler(newVal) {
                this.deviceChange()
            },
            deep: false, //非递归监听
            immediate: false, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        },
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
            //进出类型
            this.$api.i_inoutTypeList().then((res) => {
                if (res.code == 200) {
                    console.log(`接口成功`, res)
                    let inoutTypeList = res.data
                    this.inoutTypeList = inoutTypeList
                    if (inoutTypeList.length > 0) {
                        this.queryParams.inoutTypeId = inoutTypeList[0].id
                    }
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            //物料类型
            this.$api.i_factMtrlGroupList().then(res => {
                if (res.code == 200) {
                    console.log(`物料类型接口成功`, res)
                    let mtrlOption = res.data.map(e => {
                        return {
                            label: e.name,
                            value: e.id
                        }
                    })
                    mtrlOption.unshift({
                        label: '全部',
                        value: ''
                    })
                    this.mtrlOption = mtrlOption
                    if (mtrlOption.length > 0) {
                        this.queryParams.groupId = mtrlOption[0].value
                    }
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //工厂和进出厂类型切换 查询工厂和进出厂类型下的进出厂点
        deviceChange() {
            this.querySideLine({
                mesFctrId: this.queryParams.mesFctrId,
                inoutTypeId: this.queryParams.inoutTypeId,
                name: this.queryParams.name,
            })
        },
        // 查询进出厂点
        querySideLine(param) {
            this.$api.i_shipmentAllList(param).then((res) => {
                if (res.code == 200) {
                    let sideLineList = res.data
                    this.sideLineList = sideLineList
                    //初始化选中第一个进出厂点
                    if (sideLineList.length > 0) {
                        this.currentSideLine = sideLineList[0]
                        this.handleTopItemSelected(sideLineList[0])
                    } else {
                        this.AssignedList = []
                        this.sideLineList = []
                        this.currentAssigned = null
                        this.rightList = []
                        this.currentNotAssigned = null
                    }
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        //进出厂点列表点击  查询物料分配数据
        handleTopItemSelected(item) {
            this.currentSideLine = item
            //已分配
            const promise1 = this.$api.i_inoutMtrlListMtrlById({
                "nodeId": item.id
            })
            //未分配
            const promise2 = this.$api.i_factMtrlList({
                "groupId": this.queryParams.groupId, //分类ID1 原油 ,2 原料 ,3 半成品,4 成品
                "mesFactId": this.queryParams.mesFctrId, //工厂id
                "mtrlNmae": this.queryParams.mtrlNmae //物料名称
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
                                use: AssignedList.some(e1 => e1.mtrlId == e.id) //用于判断为非配是否显示该数据,若已分配不显示
                            }
                        }
                    })
                })
                .catch((err) => {
                    console.log('查询进出厂点 分配 未 分配错误')
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
        //厂物料列表
        queryFactMtrlList() {
            this.$api.i_factMtrlList({
                "groupId": this.queryParams.groupId, //分类ID1 原油 ,2 原料 ,3 半成品,4 成品
                "mesFactId": this.queryParams.mesFactId, //工厂id
                "mtrlNmae": this.queryParams.mtrlNmae //物料名称
            }).then((res) => {
                if (res.code == 200) {
                    console.log('厂物料列表接口成功', res)
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        // 左移
        leftMod() {
            //判断是否选择物料
            if (!this.currentNotAssigned) {
                this.$message.error("未选择未分配物料");
                return false
            }
            // 未分配转已分配
            this.$api.i_inoutMtrlSU({
                nodeId: this.currentSideLine.id, //进出厂点id 必传
                mtrlId: this.currentNotAssigned.id, //物料id
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
                    this.$message.success("分配物料成功");
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
            //判断是否选择物料
            if (!this.currentAssigned) {
                this.$message.error("未选择已分配物料");
                return false
            }
            //已分配 转 未分配
            this.$api.i_inoutMtrlDel({
                id: this.currentAssigned.id, //进出厂点id 必传
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.currentAssigned = null;
                    this.currentNotAssigned = null
                    this.$message.success("物料移除成功");
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
            this.$api.i_inoutMtrlSU({
                id: this.currentAssigned.id,
                nodeId: this.currentSideLine.id, //进出厂点id 必传
                mtrlId: this.currentAssigned.mtrlId, //物料id
                useFlag: e //是否使用0否1是
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currentSideLine)
                    this.$message.success(`物料${e == 1 ? '启用' : '停用'}成功`);
                    this.currentAssigned = null;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        /**进出厂点 搜索按钮操作 */
        handleQuery() {
            this.deviceChange()
        },
        /**进出厂点 重置按钮操作 */
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
                groupId: "",
                mesFctrId: "",
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
            top: 610px;
        }

        .btn-itemr {
            margin: 0 5px;
            position: absolute;
            top: 500px;
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
                height: calc(100% - 100px);
                border-radius: 5px;
                border: 1px solid #333;
                overflow: auto;
            }
        }
    }
}</style>
