<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true"
                 label-width="50px">
            <el-form-item label="装置:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择装置" clearable>
                    <el-option v-for="dict in SJtype" :key="dict.value" :label="dict.label" :value="dict.value"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="single"  @click="handleEdit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete"  size="mini" :disabled="single"  @click="handleDel">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center"/>
            <el-table-column label="序号" align="center" type="index"
                             v-if="columns[0].visible"/>
            <el-table-column label="指标名称" sortable align="center" key="IndexName" prop="IndexName" v-if="columns[1].visible"
                             :show-overflow-tooltip="true" width="200"/>
            <el-table-column label="计算方式" sortable align="center" key="Formula" prop="Formula" v-if="columns[2].visible"
                             :show-overflow-tooltip="true" />
            <el-table-column label="顺序" sortable align="center" key="DisplayOrder" prop="DisplayOrder" v-if="columns[3].visible"
                             :show-overflow-tooltip="true" width="200"/>
        </el-table>
        <el-dialog :title="title" :visible.sync="open" width="800px">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称:" prop="IndexName">
                            <el-input v-model="form.IndexName" placeholder="请输入名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="公式:" prop="Formula">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="10">
                                    <el-input v-model="form.Formula" type="textarea"  :autosize="{ minRows: 16, maxRows: 16}"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <div class="buttons flex flex-direction align-center justify-around">
                                        <el-button class="el-botton" @click="calculate('+')" :disabled="!isSelected">+</el-button>
                                        <el-button class="el-botton" @click="calculate('-')" :disabled="!isSelected">-</el-button>
                                        <el-button class="el-botton" @click="calculate('*')" :disabled="!isSelected">*</el-button>
                                        <el-button class="el-botton" @click="calculate('/')" :disabled="!isSelected">/</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <el-table height="300" ref="multipleTable" :data="lineData" style="width: 300px;" :show-header="false" @select="handleSelectionClick"  @row-click="handleRowClick">
                                        <el-table-column type="selection"></el-table-column>
                                        <el-table-column prop="label"  ></el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="顺序:" prop="DisplayOrder">
                            <el-input v-model="form.DisplayOrder" placeholder="请输入顺序" type="number" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "index",
    data(){
        return{
            //装置下拉列表
            SJtype: [],
            queryParams:{},
            ids:[],
            single:true,
            multiple:true,
            loading:false,
            dataList:[],
            columns:[
                {key: 0, label: `序号`, visible: true},
                {key: 1, label: `指标名称`, visible: true},
                {key: 2, label: `计算方式`, visible: true},
                {key: 3, label: `顺序`, visible: true},
            ],
            title:'',
            open:false,
            form:{
                IndexName:'',
                Formula:'',
                DisplayOrder:'',
            },
            rules:{
                IndexName: [
                    {required: true, message: "请输入名称", trigger: "blur"},
                ],
                Formula: [
                    {required: true, message: "请设置公式", trigger: "blur"}
                ],
                DisplayOrder: [
                    {required: true, message: "请输入排序", trigger: "blur"}
                ],
            },
            lineData: [],
            isSelected: false,
            selectedRow: null
        }
    },
    created() {
        this.getList();
        this.getOther();
    },
    watch:{
        'selectedRow'(newVal) {
            this.isSelected = newVal!= null ? true : false
        }
    },
    methods:{
        getList(){
            this.$api.QueryIndexDataByUnitId({}).then((res) => {
                 if (res.code == 200) {
                      console.log('接口成功', res)
                     this.dataList = res.data
                    } else {
                      console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        getOther(){
            //装置
            this.$api.i_unitListall({unitName: ""}).then(res => {
                this.SJtype = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //装置下的 侧线公式
            this.$api.InitSideName().then(res => {
                let beforeData = [
                    {
                        label:'进侧线总和',
                        value:`INSTREAM()`
                    },
                    {
                        label:'出侧线总和',
                        value:`OUTSTREAM()`
                    },
                    {
                        label:'消耗线总和',
                        value:`CONSPSTREAM()`
                    }
                ]
                let lineData = res.data.map(e=>{
                    return{
                        label:e.SideLineAlias,
                        value:`STREAM(${e.SideLineAlias})`
                    }
                })
                this.lineData = beforeData.concat(lineData)
            })
        },
        handleAdd(){
            this.title = '新增指标'
            this.open = true
        },
        handleEdit(){
            this.form = this.dataList.filter(e=>e.IndexDataId == this.ids[0])[0]
            this.title = '指标编辑'
            this.open = true
        },
        handleDel(){
            this.msgSuccess('删除成功')
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.IndexDataId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //弹窗 确定
        submitForm(){
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.IndexDataId != undefined) {
                        this.msgSuccess('修改成功')
                        this.form = {}
                        this.open = false
                    } else {
                        this.msgSuccess('新增成功')
                        this.form = {}
                        this.open = false
                    }
                }
            });
        },
        //弹窗 取消
        cancel(){
            this.form = {}
            this.open = false
        },
        calculate(operator) {
            if (this.form.Formula.length > 0) {
                this.form.Formula += `${operator}${this.getSelectedValue()}`
            } else {
                this.form.Formula += `${this.getSelectedValue()}`
            }
        },
        getSelectedValue() {
            const selectedRows = this.selectedRow
            if (selectedRows) {
                return selectedRows.value
            }
            return ''
        },
        handleRowClick(row) {
            console.log('handleRowClick row',row)
            if (this.selectedRow === row) {
                this.selectedRow = null
                this.$refs.multipleTable.clearSelection();
            } else {
                this.selectedRow = row
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
            }
        },
        handleSelectionClick(selection, row) {
            console.log('handleSelectionClick row',selection, row)
            if (this.selectedRow === row) {
                this.selectedRow = null
                this.$refs.multipleTable.clearSelection();
            } else {
                this.selectedRow = row
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}


.buttons {
    height: 100%;
    .el-botton{
        width: 60px;
        color: black;
        font-size: 24px;
        font-weight: bold;
        text-align: justify;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .el-button + .el-button{
        margin-left: 0;
    }
}

</style>
