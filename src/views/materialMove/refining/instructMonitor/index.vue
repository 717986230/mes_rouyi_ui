<template>
    <!-- 仪表计量 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="50px">
            <el-form-item label="装置:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择装置" clearable>
                    <el-option v-for="dict in SJtype" :key="dict.value" :label="dict.label" :value="dict.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" prop="date">
                <el-date-picker
                    v-model="queryParams.date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in classesList" :key="dict.value" :label="dict.ShiftText"
                               :value="dict.ShiftValue"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAutomaticCollection">自动采集</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" :disabled="single" @click="handleAdd">添加</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                           @click="handleDelete">删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-plus" size="mini" @click="submitForm">保存</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table ref="multipleTable" v-if="dataList&&dataList.length>0" border v-loading="loading" :data="dataList" @selection-change="handleSelectionChange"
                  :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="expandColumn">
            <el-table-column fixed="left" type="selection" width="50" align="center"/>
            <el-table-column prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.ListSub1">
                            <el-table-column align="center"  width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleChildDel(props.row,props.$index,scope.$index)" style="color: #ff9292">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="侧线名称" align="center" width="200">
                                <template slot-scope="scope">
                                    <div>
                                    <span v-if="!scope.row.editable"
                                          @click="scope.row.editable = true"> {{ scope.row.NodeAlias }}</span>
                                        <span v-else>
                                         <el-select v-model="scope.row.NodeAlias" clearable
                                                    @change="scope.row.editable = false">
                                                <el-option v-for="(dict,index) in lineList" :key="dict.value+index"
                                                           :label="dict.label" :value="dict.label"/>
                                         </el-select>
                                    </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="物料" align="center" width="200">
                                <template slot-scope="scope">
                                    <div>
                                        <span v-if="!scope.row.editable"
                                             @click="scope.row.editable = true"> {{ scope.row.MtrlAlias }}</span>
                                        <span v-else>
                                         <el-select v-model="scope.row.MtrlAlias" clearable
                                                    @change="scope.row.editable = false">
                                                <el-option v-for="(dict,index) in materielList" :key="dict.value+index"
                                                           :label="dict.label" :value="dict.label"/>
                                         </el-select>
                                    </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="质量等级" align="center" width="200"
                                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span v-if="!scope.row.editable"
                                            @click="scope.row.editable = true"> {{ scope.row.RankName }}</span>
                                        <span v-else>
                                         <el-select v-model="scope.row.RankName" clearable
                                                    @change="scope.row.editable = false">
                                                <el-option v-for="(dict,index) in rankList" :key="dict.value+index"
                                                           :label="dict.label" :value="dict.label"/>
                                         </el-select>
                                    </span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" type="index"
                             v-if="columns[0].visible"/>
            <el-table-column label="F" align="center" key="RecFlag" prop="RecFlag"
                             v-if="columns[1].visible" :show-overflow-tooltip="true"/>
            <el-table-column label="仪表名称" align="center" width="200"
                             v-if="columns[2].visible">
                <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.Editable"
                              @click="scope.row.Editable = true"> {{ scope.row.InstrAlias }}</span>
                        <span v-else>
                             <el-select v-model="scope.row.InstrAlias" clearable
                                        @change="selectBlur($event),scope.row.Editable = false">
                                    <el-option v-for="(dict,index) in instrList" :key="dict.value+index"
                                               :label="dict.label" :value="dict.label"/>
                             </el-select>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="采集时间" align="center" width="260"
                             v-if="columns[3].visible">
                <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.Editable"
                              @click="scope.row.Editable = true"> {{ scope.row.ReadTime }}</span>
                        <span v-else>
                              <el-date-picker
                                  style="width:80%"
                                  v-model="scope.row.ReadTime"
                                  type="datetime"
                              >
                              </el-date-picker>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="前读数" align="center" key="PreVadVal" prop="PreVadVal" v-if="columns[4].visible"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="C" align="center" v-if="columns[5].visible">
                <template slot-scope="scope">
                    >>
                </template>
            </el-table-column>
            <el-table-column label="RTDB读数" align="center" key="NetWeight" prop="NetWeight" width="160"
                             v-if="columns[6].visible">
            </el-table-column>
            <el-table-column label="RTDB错误读数" align="center" key="InstrRawVal" prop="InstrRawVal" width="120"
                             v-if="columns[7].visible"/>
            <el-table-column label="C" align="center" width="120"
                             v-if="columns[8].visible">
                <template slot-scope="scope">
                    >>
                </template>
            </el-table-column>
            <el-table-column label="后读数" align="center" key="InstrVadVal" prop="InstrVadVal" width="120"
                             v-if="columns[9].visible">
                <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.Editable"
                              @click="scope.row.Editable = true"> {{ scope.row.InstrVadVal }}</span>
                        <span v-else>
                            <el-input v-model="scope.row.InstrVadVal"/>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="净读数" align="center" key="jds" prop="jds" width="120"
                             v-if="columns[10].visible"/>
            <el-table-column label="回零/开工前值" align="center" key="hlsq" prop="hlsq" width="120"
                             v-if="columns[11].visible">
                <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.Editable" @click="scope.row.Editable = true"> {{ scope.row.hlsq }}</span>
                        <span v-else>
                            <el-input v-model="scope.row.hlsq"/>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="回零/开工后值" align="center" key="hlsh" prop="hlsh" width="120"
                             v-if="columns[11].visible">
                <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.Editable" @click="scope.row.Editable = true"> {{ scope.row.hlsh }}</span>
                        <span v-else>
                            <el-input v-model="scope.row.hlsh"/>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="系数" align="center" key="Coefficient" prop="Coefficient" width="120"
                             v-if="columns[12].visible"/>
            <el-table-column label="虚实标记" align="center" key="AccuInstrFlag" prop="AccuInstrFlag" width="120"
                             v-if="columns[13].visible"/>
            <el-table-column label="累计表标示" align="center" key="InstrTagStat" prop="InstrTagStat" width="120"
                             v-if="columns[14].visible"/>
            <el-table-column label="工位号" align="center" key="gwh" prop="gwh" width="120"
                             v-if="columns[15].visible"/>
            <el-table-column label="提交人" align="center" key="tjr" prop="tjr" width="120"
                             v-if="columns[16].visible"/>
            <el-table-column label="提交时间" align="center" key="CmtTime" prop="CmtTime" width="120"
                             v-if="columns[17].visible"/>
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
                {key: 0, label: `序号`, visible: true},
                {key: 1, label: `F`, visible: true},
                {key: 2, label: `仪表名称`, visible: true},
                {key: 3, label: `采集时间`, visible: true},
                {key: 4, label: `前读数`, visible: true},
                {key: 5, label: `C`, visible: true},
                {key: 6, label: `RTDB读数`, visible: true},
                {key: 7, label: `RTDB错误读数`, visible: true},
                {key: 8, label: `C`, visible: true},
                {key: 9, label: `后读数`, visible: true},
                {key: 10, label: `净读数`, visible: true},
                {key: 11, label: `回零/开工前值`, visible: true},
                {key: 12, label: `系数`, visible: true},
                {key: 13, label: `虚实标记`, visible: true},
                {key: 14, label: `累计表标示`, visible: true},
                {key: 15, label: `工位号`, visible: true},
                {key: 16, label: `提交人`, visible: true},
                {key: 17, label: `提交时间`, visible: true},
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
                    {required: true, message: "请选择操作类型", trigger: "blur"},
                ],
                DlvNode: [
                    {required: true, message: "请选择本方节点", trigger: "blur"}
                ],
                RcvNode: [
                    {required: true, message: "请选择对方节点", trigger: "blur"}
                ],
                BegRdTime: [
                    {required: true, message: "请选择开始时间", trigger: "blur"}
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
            expands: [], // 只展开一行放入当前行id
            getRowKeys: (row) => { // 获取当前行id
                return row.InstrId||''; // 这里看这一行中需要根据哪个属性值是id
            },
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
            this.$api.i_unitListall({unitName: ""}).then(res => {
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
            this.$api.mainDatas(this.queryParams).then(res => {
                    if (res.code == 200) {

                        this.dataList = res.data.map(e => {
                            return {
                                ...e,
                                ...{
                                    Editable: false,
                                    ReadTime: this.dayjs(e.ReadTime).format('YYYY-MM-DD HH:mm:ss'),
                                    ListSub1:e.ListSub1.map(r => {
                                        return{
                                            ...r,
                                            ...{
                                                editable: false
                                            }
                                        }
                                    })
                                }
                            }
                        })
                        console.log('查询主数据成功',  this.dataList )
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
        /** 添加按钮操作 */
        handleAdd() {
            //判断需要增加的是 主数据 还是 侧线数据
            //侧线数据 this.expands.length > 0
            if(this.expands.length > 0){
                let nowRowData = this.dataList.filter(e=>e.InstrId==this.expands[0])[0].ListSub1
                let nowChildData = nowRowData.length > 0 ? nowRowData[0] : {}
                this.dataList = this.dataList.map(e=>{
                    console.log('map',e.ListSub1)
                    this.expands[0] ? e.ListSub1.push(nowChildData) : e.ListSub1
                    return {
                        ...e,
                    }
                })
            }else{
                //主数据
                if(this.ids.length==0){
                    this.msgError('请选择一天数据')
                }else if(this.ids.length>1){
                    this.msgError('请选择一天数据')
                }else {
                    let nowRowData = this.dataList.filter(e=>e.InstrId==this.ids[0])[0]
                    nowRowData.InstrId = Math.floor((Math.random()*8000)+1)
                    this.dataList.push(nowRowData)

                    this.$refs.multipleTable.clearSelection();
                }
            }
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            const userId = row.id || this.ids[0];
            this.$api.i_nodeAreaById({id: userId}).then(response => {
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
        //只展开一行
        expandColumn(row, expandedRows) {
            console.log(row, expandedRows);
            // 每次只展开一行
            let that = this;
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.InstrId)
                    this.single = false;
                }
            } else {
                that.expands = []
                this.single = true;
            }
        },
        //子数据删除
        handleChildDel(row,mIndex,index){
            console.log('子数据删除',row,mIndex,index)
            this.$modal.confirm('是否确认删除选中的的数据项？').then(() => {
                row.ListSub1.splice(index,1)
                this.$set(this.dataList,mIndex,row)
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
