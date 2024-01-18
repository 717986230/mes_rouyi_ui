<template>
    <!-- 运输计量配置 -->
    <div class="jcc-con">
        <div class="jcc-left flex flex-direction align-center justify-between">
            <div class="jcc-top">
                <el-card class="box-card">
                    <div slot="header">
                        <span>运输类型</span>
                    </div>
                    <div class="card-body">
                        <table class="ulcss">
                            <tr v-for="e in transportTypeList" @click="handleTopItemSelected(e)"
                                :class="{ selectedtop: currenttransportType === e }"
                                class="cs"
                                style=" display: block;width: 100%;">
                                <td>
                                    {{ e.name }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-card>
            </div>
            <div class=" jcc-bto">
                <el-card class="box-card">
                    <div slot="header">
                        <span>已经配置的计量类型</span>
                    </div>
                    <div class="card-body">
                        <table class="ulcss">
                            <tr v-for="(e, index) in AssignedList" :key="index" @click="handleBtoItemSelected(e)"
                                :class="{ selectedbtm: currentAssigned === e }"
                                class="cs"
                                style="display: block;width: 100%;height: 25px;text-align: center">
                                <td style="float: left;">
                                    {{ e.gaugeTypeName }}
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
                    <span>计量类型</span>
                </div>
                <div class="card-body">
                    <table class="ulcss">
                         <span v-for="e in rightList" @click="handleRightItemSelected(e)">
                            <tr v-if="!e.use"
                                :class="{ selecright: currentNotAssigned&&currentNotAssigned.id === e.id }" class="cs" style=" display: block;width: 100%;">
                                <td>
                                    {{ e.name }}
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
    name: "TranMeaCon",
    data() {
        return {
            //运输类型列表
            transportTypeList:[],
            AssignedList: null,
            rightList: [],
            // 显示搜索条件
            showSearch: true,
            //当前选中的运输类型
            currenttransportType:null,
            //当前选中的预分配计量类型
            currentAssigned:null,
            //当前选中的未分配计量类型
            currentNotAssigned:null,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList(){
            //获取运输类型
            this.$api.i_transportTypeList().then((res) => {
                 if (res.code == 200) {
                      console.log('获取运输类型接口成功', res)
                     this.transportTypeList = res.data;
                    } else {
                      console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        handleTopItemSelected: _.throttle(function (item) {
            this.currenttransportType = item
            //已分配
            const promise1 =   this.$api.i_transportGaugeList({
                "transportTypeId": item.id
            })
            //未分配
            const promise2 =  this.$api.i_gaugeTypeList()
            Promise.all([promise1, promise2 ])
                .then((res) => {
                    console.log('promise all执行完成',res)
                    let AssignedList = res[0].data
                    let rightList = res[1].data
                    this.AssignedList = AssignedList
                    this.rightList = rightList.map(e=>{
                        return {
                            ...e,
                            ...{
                                use:AssignedList.some(e1=>e1.gaugeTypeTd == e.id) //用于判断为非配是否显示该数据,若已分配不显示
                            }
                        }
                    })
                })
                .catch((err)=> {
                    console.log('查询计量类型 分配 未 分配错误')
                })
        },1000),
        handleBtoItemSelected(item) {
            this.currentAssigned = item;
        },
        handleRightItemSelected(item) {
            this.currentNotAssigned = item
        },
        // 左移
        leftMod() {
            //判断是否选择料仓
            if(!this.currentNotAssigned){
                this.$message.error("未选择未配置计量类型");
                return false
            }
            // 未分配转已分配
            this.$api.i_transportGaugeSU({
                transportTypeId: this.currenttransportType.id, //侧线id 必传
                gaugeTypeId: this.currentNotAssigned.id, //料仓id
                useFlag: 1 //是否使用0否1是
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currenttransportType)
                    this.$nextTick(()=>{
                        let NotAssigned = this.rightList.filter(e=>{
                            return !e.use && e.id != this.currentNotAssigned.id
                        })
                        this.currentNotAssigned = NotAssigned[0];
                    })
                    this.$message.success("配置计量类型成功");
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
            if(!this.currentAssigned){
                this.$message.error("未选择已经配置的计量类型");
                return false
            }
            //已分配 转 未分配
            this.$api.i_transportGaugeDel({
                id: this.currentAssigned.id, //侧线id 必传
            }).then((res) => {
                if (res.code == 200) {
                    this.handleTopItemSelected(this.currenttransportType)
                    this.currentAssigned = null;
                    this.currentNotAssigned = null
                    this.$message.success("计量类型移除成功");
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
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
            height: 48%;
            line-height: 100%;
            ::v-deep.el-card{
                height: 100%;
            }
            ::v-deep.el-card__body{
                height: calc(100% - 40px);
            }
            .box-card {
                height: 100%;
                width: 100%;
                .card-body{
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
            height: 48%;
            ::v-deep.el-card{
                height: 100%;
            }
            ::v-deep.el-card__body{
                height: calc(100% - 40px);
            }
            .box-card {
                height: 100%;
                width: 100%;
                .card-body{
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
        ::v-deep.el-card{
            height: 100%;
        }
        ::v-deep.el-card__body{
            height: calc(100% - 40px);
        }
        .box-card {
            height: 680px;
            width: 100%;
            .card-body{
                width: 100%;
                height: 100%;
                border-radius: 5px;
                border: 1px solid #333;
                overflow: auto;
            }
        }
    }
}
</style>
