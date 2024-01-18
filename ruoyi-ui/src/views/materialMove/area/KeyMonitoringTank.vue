<template>
    <!-- 重点罐监控-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="" prop="">
                <el-button type="success" size="mini" @click="handleQuery">刷新</el-button>
                <el-button type="success" plain size="mini" @click="handleAdd">新增</el-button>
                <el-button type="warning" plain size="mini" @click="handleAllClear" :disabled="single">解除报警</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete" :disabled="single">删除</el-button>
            </el-form-item>
            <el-form-item style="float: right;" label="刷新时间:" prop="dateRange">
                <div class="block">
                    <el-date-picker v-model="queryParams.dateRange" type="datetime" placeholder="选择日期时间" :disabled="false">
                    </el-date-picker>
                </div>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" style="width: 100%;margin-bottom: 20px;" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column label="罐号" width="130" align="center" sortable key="tankNum" prop="tankNum"
                :show-overflow-tooltip="true" />
            <el-table-column label="油品名称" align="center" width="100" sortable key="oilName" prop="oilName"
                :show-overflow-tooltip="true" />
            <el-table-column label="液位(m)" width="100" align="center" sortable key="liquidLevel" prop="liquidLevel"
                :show-overflow-tooltip="true" />
            <el-table-column label="油温(℃)" align="center" sortable key="oilTemperature" prop="oilTemperature" width="100" />
            <el-table-column label="密度(kg/m)" align="center" sortable prop="density" key="density" width="120">
            </el-table-column>
            <el-table-column label="油量流量(t/h)" align="center" sortable key="oilFlowRate" prop="oilFlowRate" width="130" />
            <el-table-column label="净油量(t)" align="center" sortable key="netOilWeight" prop="netOilWeight" width="100" />
            <el-table-column label="设定点(m)" align="center" sortable key="setPoint" prop="setPoint" width="120" />
            <el-table-column label="液位状态" align="center" sortable key="liquidLevelStatus" prop="liquidLevelStatus"
                width="100" />
            <el-table-column label="合格状态" align="center" sortable key="SideLineData4" prop="SideLineData4" width="100" />
            <el-table-column label="收付目的地" align="center" sortable key="SideLineData5" prop="SideLineData5" width="130" />
            <el-table-column label="已收付量(t)" align="center" sortable key="amountPaidReceived" prop="amountPaidReceived"
                width="120" />
            <el-table-column label="体积流量(m3/h)" align="center" sortable key="volumeFlowRate" prop="volumeFlowRate"
                width="140" />
            <el-table-column label="合格日期" align="center" sortable key="qualificationDate" prop="qualificationDate"
                width="120" />
            <el-table-column label="水尺" align="center" sortable key="waterLevel" prop="waterLevel" width="120" />
            <el-table-column label="水份(%)" align="center" sortable key="waterContent" prop="waterContent" width="120" />
            <el-table-column label="气压(KPa)" align="center" sortable key="airPressure" prop="airPressure" width="120" />
            <el-table-column label="油体积(m3)" align="center" sortable key="oilVolume" prop="oilVolume" width="120" />
            <el-table-column label="收付操作" align="center" sortable key="paymentOperation" prop="paymentOperation"
                width="120" />
            <el-table-column label="气温(℃)" align="center" sortable key="airTemperature" prop="airTemperature" width="120" />
            <el-table-column fixed="right" label="备注" align="center" sortable key="remark" prop="remark" width="120" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新增 -->
        <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body center>
            <el-card>
                <div style="float:right;margin-bottom:10px">
                    <el-button type="primary" size="mini" @click="AddGroup">新增分组</el-button>
                    <el-button type="danger" plain size="mini" @click="DelGroup" :disabled="singlechild">删除分组</el-button>
                    <el-button type="primary" plain size="mini" @click="SaveGroup">保存分组</el-button>
                </div>
            </el-card>
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="11" style="border:1px solid #ccc;height:400px">
                        <div class="head-container">
                            <el-tree :data="TCdataListLeft" :props="defaultProps" :expand-on-click-node="false"
                                :filter-node-method="filterNode" ref="tree" node-key="id" default-expand-all
                                highlight-current @node-click="handleNodeClickLeft" />
                        </div>

                    </el-col>
                    <el-col :span="2" class="btn">
                        <el-button class="btn1" type="success" size="mini" @click="leftAddGroup" :disabled="isUP">
                            {{ "+ >>>" }} </el-button>
                        <el-button class="btn2" type="danger" plain size="mini" @click="rightAddGroup" :disabled="singlech">
                            {{ "x <<<" }} </el-button>
                    </el-col>
                    <el-col :span="11">
                        <el-table ref="multipleTable" border v-loading="loading" :data="TCdataList"
                            @selection-change="handleSelectionChangechild">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column prop="props" type="expand">
                                <template slot-scope="props">
                                    <div style="padding: 0px 50px">
                                        <el-table :data="props.row.tankList" :show-header="false"
                                            @selection-change="handleSeleChild">
                                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                                            <el-table-column label="" align="center">
                                                <template slot-scope="scope">
                                                    {{ scope.row.name }}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="分组" align="center" key="gname" prop="gname"
                                :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <div @click="startEditing(scope.row)" v-if="!scope.row.Editable1"
                                        style="width: 100%;height: 30px;">
                                        {{ scope.row.gname }}
                                    </div>
                                    <el-input v-else type="text" v-model="scope.row.gname" clearable
                                        @blur="stopEditing(scope.row)"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="subitmForm">确 定</el-button>
                <el-button @click="open = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
const _ = require('lodash')
export default {
    name: "KeyMonitoringTank",

    data() {
        return {

            TCdataListLeft: [],//左侧数据
            defaultProps: {
                children: 'tankAllListVOS',
                label: 'name'
            },
            open: false,
            checked: false,
            dataList: [],
            TCdataList: [],// 右侧列表（有子集）

            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            idsch: [],//子集
            singlech: true,
            multiplech: true,
            //选中子集数组
            idschild: [],
            singlechild: true,
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiplechild: true,
            multiple: true,
            // 总条数
            total: 0,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                dateRange: new Date(),
                tank: " ",
                "id": "",
                "isAsc": "",
                "nodeAreaId": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "unitCode": "",
                "unitAlias": "",
                "unitName": "0",
                "unitTypeId": ""
            },
            // 表单校验
            rules: {},
            leftdata: {},
            isUP: true,//左侧树结构选中变化
            rightListselect: {},//右侧选中的数据
            rightListP: {},//右侧父级
            newSave: [],//对比数据数组
            rowDate: {},//选中状态数据
            isSave: false,// 数据改变保存分组
        };
    },
    watch: {
        checked(newVal) {
            this.setupAutoRefresh();
        },
    },
    created() {
        this.getList();
        this.setupAutoRefresh();
    },
    mounted() { },
    methods: {
        //子数据删除
        handleChildDel(row, mIndex, index) {
            console.log('子数据删除', row, mIndex, index)
            this.$modal.confirm('是否确认删除选中的的数据项？').then(() => {
                row.ListSub1.splice(index, 1)
                this.$set(this.dataList, mIndex, row)
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {

            });
        },
        startEditing(row) {
            row.Editable1 = true;
        },
        stopEditing(row, newValue) {
            this.rowDate = row
            row.Editable1 = false;
        },
        //保存分组
        SaveGroup() {
            const isEqual = _.isEqual(this.TCdataList, this.newSave);
            if (isEqual) {
                this.$message.success("数据未发生改变")
            } else {
                this.$message.success("数据已保存")
                this.isSave = true
            }
        },
        subitmForm() {
            if (this.isSave) {
                this.$api.i_keynoteTankGroupAdd({
                    name: this.rowDate.gname,
                    id: this.rowDate.gid
                }).then(res => {
                    if (res.code === 200) {
                        this.getList()
                        this.$message.success("保存成功")
                    }
                })
            }
            this.isSave = false
            this.open = false
        },
        // 删除分组
        DelGroup() {
            let uid = this.idschild[0] || this.idsch[0]
            this.$modal.confirm('删除分组将同步删除分组内的重点监控管' + uid).then(() => {
                this.$api.i_keynoteTankGroupDelete({ id: uid })
            }).then(() => {
                this.$nextTick(() => {
                    this.getList()
                })
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        // 新增分组
        AddGroup() {
            this.$api.i_keynoteTankGroupAdd({
                name: "重点罐" + this.TCdataList.length + 1
            }).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$message("新增成功")
                }
            })
            this.reset();
        },
        //右移按钮<<<
        leftAddGroup() {
            this.$api.i_keynoteTankAdd({
                "gid": this.rightListP.gid,
                "id": "",
                "tankId": this.leftdata.id
            }).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$message("右移成功")
                }
            })
            this.isUP = true
        },
        //左移按钮>>>
        rightAddGroup() {
            //删除
            this.$api.i_keynoteTankDelete({
                "gid": "",
                "id": this.rightListselect.id,
                "tankId": ""
            }).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$message("左移成功")
                }
            })
        },
        setupAutoRefresh() {
            if (this.checked) {
                // If "自动刷新"
                this.autoRefreshInterval = setInterval(this.getList, 10000);
            } else {
                // If "自动刷新"
                clearInterval(this.autoRefreshInterval);
            }
        },
        /** 树结构筛选 */
        filterNode(value) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //左侧节点 点击回调
        handleNodeClickLeft(data, node) {
            this.leftdata = data
            if (this.leftdata) {
                this.isUP = false
            }
            console.log('左侧节点 点击回调', data)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankareaTankList().then(res => {
                //左侧数据
                this.TCdataListLeft = res.data
            })
            this.$api.i_keyTankMonitorngSelece().then(res => {
                this.dataList = res.data  //RecId
            }
            );
            this.$api.i_keynoteTankList().then(res => {
                let datass = res.data.map(r => {
                    return {
                        ...r,
                        Editable1: false,
                    }
                })
                this.TCdataList = res.data.map(r => {
                    return {
                        ...r,
                        Editable1: false,
                    }
                })
                this.newSave = _.cloneDeep(datass)
                console.log(this.newSave, "原数据");
            })
            this.loading = false;
        },

        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "des": "",
                "capacity": 0,
                "unitNum": "",
                "useFlag": "1",
                "sectorId": "",
                "unitCode": "",
                "unitName": "",
                "unitAlias": "",
                "nodeAreaId": "",
                "unitTypeId": "",
                "upperUnitId": "",
                "displayOrder": "1000",
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        //新增
        handleAdd() {

            this.open = true
            this.title = "新增重点罐"
        },
        //解除报警
        handleAllClear() { },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.RecId || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_unitDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.RecId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //子集的选中
        handleSeleChild(selection) {
            this.rightListselect = selection[0];
            console.log("子集", selection);
            this.idsch = selection.map(item => item.id);
            this.singlech = selection.length != 1;
            this.multiplech = !selection.length;
        },
        // 子集多选框选中数据
        handleSelectionChangechild(selection) {
            this.rightListP = selection[0];
            this.idschild = selection.map(item => item.gid);
            console.log(selection, this.idschild, "选中右侧数据");
            this.singlechild = selection.length != 1;
            this.multiplechild = !selection.length;
        },
        close() {
            this.open = false;
            this.reset();
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}

.btn {
    position: relative;
    height: 400px;

    .btn1 {
        position: absolute;
        top: 100px;
        left: 10px;
    }

    .btn2 {
        position: absolute;
        top: 200px;
        left: 0;
    }
}
</style>
