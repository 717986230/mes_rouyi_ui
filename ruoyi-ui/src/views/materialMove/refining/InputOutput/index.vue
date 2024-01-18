<template>
    <!--化工装置投入产出-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="装置:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择装置" clearable>
                    <el-option v-for="dict in SJtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in classesList" :key="dict.value" :label="dict.ShiftText"
                        :value="dict.ShiftValue" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除记录
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleDeleteClass">删除班次记录
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-check" size="mini" :disabled="single"
                    @click="handleAutomaticCollection">数据提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-close" size="mini" :disabled="single"
                    @click="handleAutomaticCollection">解除提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-search" size="mini" @click="handleReCalc">重新计算</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-plus" size="mini" @click="submitForm">保存</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table ref="multipleTable" v-if="dataList && dataList.length > 0" border v-loading="loading" :data="dataList"
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.listSub">
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="节点类型" align="center" key="NodeType" prop="NodeType" />
                            <el-table-column label="计量方式" align="center" key="MeasureType" prop="MeasureType" />
                            <el-table-column label="料仓名称/测量点名称" align="center" key="InstrAlias" prop="InstrAlias" />
                            <el-table-column label="前量/前读书" align="center" key="PreWeight" prop="PreWeight" />
                            <el-table-column label="后量/后读书" align="center" key="PreAdjVal" prop="PreAdjVal" />
                            <el-table-column label="调整量" align="center" key="PreVadVal" prop="PreVadVal" />
                            <el-table-column label="调整前净重" align="center" key="AftConVal" prop="AftConVal" />
                            <el-table-column label="调整后净重" align="center" key="PreVadVal" prop="PreVadVal" />
                            <el-table-column label="后量确认量" align="center" key="Weight" prop="Weight" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" type="index" v-if="columns[0].visible" />
            <el-table-column label="侧线名称" align="center" key="NodeAlias" prop="NodeAlias" v-if="columns[4].visible"
                :show-overflow-tooltip="true" width="200" />
            <el-table-column label="物料名称" align="center" key="MtrlAlias" prop="MtrlAlias" v-if="columns[4].visible"
                :show-overflow-tooltip="true" width="200" />
            <el-table-column label="进出标识" align="center" key="InOutTypeName" prop="InOutTypeName" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="质量等级" align="center" key="AftCtchVal" prop="AftCtchVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="侧线原始量" align="center" key="AreaRowVal" prop="AreaRowVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="侧线确认量" align="center" key="DisplayOrder" prop="DisplayOrder" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="缓存前量" align="center" key="EvaluDiffVal" prop="EvaluDiffVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="缓存后量" align="center" key="PreCtchVal" prop="PreCtchVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="存差量" align="center" key="RecId" prop="RecId" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="存差确认量" align="center" key="SaveCtchConVal" prop="SaveCtchConVal"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="界区原始值" align="center" key="SaveCtchVal" prop="SaveCtchVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="界区确认量" align="center" key="SdlnAfVal" prop="SdlnAfVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="评估差异量" align="center" key="SdlnOriVal" prop="SdlnOriVal" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="当前班次" align="center" key="RankId" prop="RankId" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="保存人" align="center" key="SavUserId" prop="SavUserId" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="保存时间" align="center" key="SavTime" prop="SavTime" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="界区公式" align="center" key="AreaForm" prop="AreaForm" v-if="columns[4].visible"
                :show-overflow-tooltip="true" width="200" />
            <el-table-column label="侧线公式" align="center" key="Formula" prop="Formula" v-if="columns[4].visible"
                :show-overflow-tooltip="true" width="200" />
        </el-table>
    </div>
</template>
<script>
export default {
    name: "instructMonitor",
    components: {},
    data() {
        return {
            //装置下拉列表
            SJtype: [],
            //仪表下拉数据
            instrList: [],
            //侧线下拉数据
            lineList: [],
            //物料下拉数据
            materielList: [],
            //质量等级下拉数据
            rankList: [],
            // 列信息
            columns: [
                { key: 0, label: `序号`, visible: true },
                { key: 1, label: `F`, visible: true },
                { key: 2, label: `仪表名称`, visible: true },
                { key: 3, label: `采集时间`, visible: true },
                { key: 4, label: `前读数`, visible: true },
                { key: 5, label: `C`, visible: true },
                { key: 6, label: `RTDB读数`, visible: true },
                { key: 7, label: `RTDB错误读数`, visible: true },
                { key: 8, label: `C`, visible: true },
                { key: 9, label: `后读数`, visible: true },
                { key: 10, label: `净读数`, visible: true },
                { key: 11, label: `回零/开工前值`, visible: true },
                { key: 12, label: `系数`, visible: true },
                { key: 13, label: `虚实标记`, visible: true },
                { key: 14, label: `累计表标示`, visible: true },
                { key: 15, label: `工位号`, visible: true },
                { key: 16, label: `提交人`, visible: true },
                { key: 17, label: `提交时间`, visible: true },
            ],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 表格数据
            dataList: null,
            // 表单参数
            form: {
                CrtTime: '',//创建时间
            },
            // 查询参数
            queryParams: {
                "isAsc": "",
                "pageNum": 1,
                "pageSize": 10,
                "mesWspId": "",
                "mesFctrName": "",
                "nodeAreaCode": "",
                "unitAreaName": "",
                "reasonable": true,
                "orderByColumn": "",
                "unitAreaAlias": "",
            },
            // 表单校验
            rules: {
                UnitRdType: [
                    { required: true, message: "请选择操作类型", trigger: "blur" },
                ],
                DlvNode: [
                    { required: true, message: "请选择本方节点", trigger: "blur" }
                ],
                RcvNode: [
                    { required: true, message: "请选择对方节点", trigger: "blur" }
                ],
                BegRdTime: [
                    { required: true, message: "请选择开始时间", trigger: "blur" }
                ],
            },
            //班次类型
            classesList: [],
            //操作类型
            operationType: [],
            //本方节点
            ourNode: [],
            //对方节点
            othersNode: [],
            // expands: [], // 只展开一行放入当前行id
            // getRowKeys: (row) => { // 获取当前行id
            //     return row.NodeId||''; // 这里看这一行中需要根据哪个属性值是id
            // },
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //获取班次
            this.$api.classes().then(res => {
                if (res.code == 200) {
                    this.classesList = res.data
                }
            });
            //装置
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.SJtype = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //仪表下拉数据
            this.$api.instrList().then(res => {
                this.instrList = res.data.map(r => {
                    return {
                        label: r.PairNodeName,
                        value: r.PairNodeId,
                    }
                })
            })
            //侧线下拉数据
            this.$api.lineList().then(res => {
                this.lineList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
            //物料下拉数据
            this.$api.materielList().then(res => {
                this.materielList = res.data.map(r => {
                    return {
                        label: r.PairNodeName,
                        value: r.PairNodeId,
                    }
                })
            })
            //质量等级下拉数据
            this.$api.rankList().then(res => {
                this.rankList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })


            //操作类型
            this.$api.operationType().then(res => {
                this.operationType = res.data.map(r => {
                    return {
                        label: r.TypeName,
                        value: r.TypeId,
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.ReCalc(this.queryParams).then(res => {
                if (res.code == 200) {
                    console.log(' 查询列表', res)
                    this.dataList = res.data.map(e => {
                        return {
                            ...e,
                            ...{
                                Editable: false,
                                ReadTime: this.dayjs(e.ReadTime).format('YYYY-MM-DD HH:mm:ss'),
                                ListSub1: e.ListSub
                            }
                        }
                    })
                    console.log('查询主数据成功', this.dataList)
                    this.loading = false;
                }
            }
            );
        },
        //获取本方节点
        getOurNodes() {
            //本方节点
            this.$api.ourNode({
                rdTypeId: '',//操作类型 id
                unitId: '',//装置 id
            }).then(res => {
                this.ourNode = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
        },
        //获取对方节点
        getOtherNodes() {
            //本方节点
            this.$api.otherNodes({
                isUsePhyModel: this.form.checked,//是否使用拓朴结构
                rdTypeId: '',//操作类型 id
                nodeId: '',//本方节点id
            }).then(res => {
                this.othersNode = res.data.map(r => {
                    return {
                        label: r.Name,
                        value: r.Key,
                    }
                })
            })
        },
        //仪表名称 改变
        selectBlur(e, row) {
            console.log('仪表名称 改变', e)
            console.log('仪表名称 改变', row)
            // row.InstrAliasEditable=false
            this.$modal.msgWarning("仪表已改变。请检查对应的侧线和物料信息是否正确。");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.InstrId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 自动采集按钮操作 */
        handleAutomaticCollection() {
            this.msgSuccess('自动采集数据成功')
        },
        /** 重新计算按钮操作 */
        handleReCalc() {
            this.msgSuccess('重新计算按钮操作')
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            const userId = row.id || this.ids[0];
            this.$api.i_nodeAreaById({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },

        /** 提交按钮 */
        submitForm: function () {
            // todo 增加判断保存逻辑
            //1. 主数据 仪表名称 + 采集时间 不能重复
            //2. 子数据 侧线名称 和 物料名称 不能重复
            this.$modal.msgSuccess("保存成功");
            this.getList();
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + this.ids + '"的数据项？').then(() => {

            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /*删除班次记录*/
        handleDeleteClass() {
            this.$modal.confirm('是否确认删除班次记录').then(() => {

            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        //只展开一行
        expandColumn(row, expandedRows) {
            // 每次只展开一行
            let that = this;
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.NodeId)
                    this.single = false;
                }
            } else {
                that.expands = []
                this.single = true;
            }
        },
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
        }
    }
};
</script>
<style scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}
</style>

