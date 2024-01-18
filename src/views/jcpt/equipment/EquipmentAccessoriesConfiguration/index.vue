<template>
    <!-- 设备配件配置 -->
    <div class="jcc-con">
        <div class="jcc-left">
            <div class="jcc-top">
                <el-card class="box-card">
                    <div style="margin-bottom: 10px;">设备配件配置</div>
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="50">
                        <el-form-item label="设备名称:" prop="unitType">
                            <el-select size="mini" v-model="queryParams.unitType" style="width: 140px;" placeholder="设备名称"
                                clearable>
                                <el-option v-for="dict in UpperUnitList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备类型:" prop="unitAlias">
                            <el-select v-model="queryParams.unitAlias" style="width: 140px;" placeholder="设备类型" clearable>
                                <el-option v-for="dict in deviceTypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="">
                        <el-table border v-loading="loading" :data="sideLineList" height="230"
                            @row-click="handleTopItemSelected">
                            <el-table-column label="设备名称" align="center" key="name" prop="name" />
                        </el-table>
                        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                            :limit.sync="queryParams.pageSize" @pagination="deviceChange" />
                    </div>
                </el-card>
            </div>
        </div>
        <el-card class="jcc-mon">
            <el-form :model="queryParamsDown" ref="queryFormLeft" size="small" :inline="true" v-show="showSearch"
                label-width="50">
                <el-form-item label="设备类型:" prop="nodeAreaType">
                    <el-select v-model="queryParamsDown.nodeAreaType" style="width: 140px;" placeholder="设备类型" clearable>
                        <el-option v-for="dict in deviceTypeList" :key="dict.value" :label="dict.label"
                            :value="dict.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称:" prop="type">
                    <el-select v-model="queryParamsDown.type" style="width: 140px;" placeholder="设备名称" clearable>
                        <el-option v-for="dict in nodeTypeList" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="设备ID:" prop="nodeName">
                    <el-input v-model="queryParamsDown.nodeName" style="width: 130px;" placeholder="设备ID" clearable
                        @keyup.enter.native="handleQueryLeft" />
                </el-form-item>
                <el-form-item label="是否为配件:" prop="mediumId">
                    <el-select v-model="queryParamsDown.mediumId" style="width: 140px;" placeholder="是否为配件" clearable>
                        <el-option v-for="dict in SuperiorMaterial" :key="dict.value" :label="dict.label"
                            :value="dict.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="handleQueryLeft">搜索</el-button>
                    <el-button size="mini" @click="resetQueryleft">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="jcc-right">
            <el-card class="jcc-ch-le">
                <el-table border height="250" v-loading="loadingDown" :data="AssignedList"
                    @selection-change="handleLeftItemSelected">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="设备名称" align="center" key="name" prop="name" />
                    <el-table-column label="设备类型" align="center" key="ailas" prop="ailas" :show-overflow-tooltip="true" />
                </el-table>
            </el-card>
            <div class="jcc-mod">
                <el-button class="btn-iteml" type="info" @click="rightMod" :disabled="singleR">←</el-button>
                <el-button class="btn-itemr" type="info" @click="leftMod" :disabled="singleL">→</el-button>
            </div>
            <el-card class="jcc-ch-rg">
                <el-table border height="250" v-loading="loadingDown" :data="rightList"
                    @selection-change="handleRightItemSelected">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="设备名称" align="center" key="accessoryName" prop="accessoryName" />
                </el-table>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    name: "EquipmentAccessoriesConfiguration",
    data() {
        return {
            deviceTypeList: [],//设备类型
            SuperiorMaterial: [
                {
                    value: 0,
                    label: "否"
                },
                {
                    value: 1,
                    label: "是"
                }
            ],//是否为配件
            OwningRegion: [],//所属区域
            nodeTypeList: [],//节点类型
            //左列表
            AssignedList: [],
            //右列表
            rightList: [],
            sideLineList: [],
            UpperUnitList: [],//基本核算单元
            // 遮罩层
            loading: true,
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
            // 显示搜索条件
            showSearch: true,
            // 查询参数
            queryParams: {
                "deviceId": undefined,
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true
            },
            queryParamsDown: {
                "id": undefined,
                "isAsc": "",
                "name": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "useFlag": ""
            },
            //上
            currentSideLine: null,
            //左
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
            this.$api.e_deviceAccessorySaveOrUpdate(
                {
                    accessoryId: this.idsL[0],
                    deviceId: this.currentSideLine.id,
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
            this.$api.e_deviceAccessoryDel({ id: this.idsR[0] }).then((res) => {
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
            this.$api.e_deviceTypeList(param).then((res) => {
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
            const promise1 = this.$api.e_deviceList(
                this.queryParams
            )
            //右
            const promise2 = this.$api.e_deviceAccessoryList(
                this.queryParams
            )
            Promise.all([promise1, promise2])
                .then((res) => {
                    console.log('promise all执行完成', res)
                    let AssignedList = res[0].rows
                    let rightList = res[1].rows
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
            //设备类型
            this.$api.e_deviceTypeAllList().then(res => {
                this.deviceTypeList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })

            //所属区域
            this.$api.i_nodeAreaType().then(res => {
                this.OwningRegion = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })
            //节点类型
            this.$api.i_nodeTypeList().then(res => {
                this.nodeTypeList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
            //复合能源核算单元-上级核算单元下拉列表
            this.$api.e_basicCalculateUnitALLList().then(res => {
                this.UpperUnitList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.deviceChange();
        },
        handleQueryLeft() {
            this.handleTopItemSelected(this.currentSideLine);
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        resetQueryleft() {
            this.resetForm("queryFormLeft");
            this.handleQueryLeft();
            this.loadingDown = false
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
    height: 100%;
    padding: 10px;

    .ulcss {
        width: 100%;
    }

    .jcc-left {
        width: 100%;
        height: 48%;

        .jcc-top {
            width: 100%;
            height: 50%;
            line-height: 100%;
            margin: 0 auto;

            .box-card {
                height: 100%;
                width: 100%;
            }
        }
    }

    .jcc-right {
        width: 100%;
        display: flex;
        height: 48%;

        .jcc-ch-le {
            width: 48%;
            height: 48%;
        }

        .jcc-mod {
            width: 5%;
            height: 100%;

            .btn-iteml {
                margin: 0 5px;
                position: absolute;
                bottom: 260px;
            }

            .btn-itemr {
                margin: 0 5px;
                position: absolute;
                bottom: 160px;
            }
        }

        .jcc-ch-rg {
            width: 48%;
            height: 48%;
        }
    }
}
</style>
