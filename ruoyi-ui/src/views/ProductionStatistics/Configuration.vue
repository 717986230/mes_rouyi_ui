<template>
    <!-- 物料平衡表组态 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="mesFactId">
                <el-select v-model="queryParams.mesFactId" placeholder="MES工厂" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="success" plain size="mini" @click="handleSave">保存</el-button>
                <el-button type="primary" plain size="mini" @click="handleBalancen">平衡表初始化</el-button>
                <el-button type="primary" plain size="mini" @click="handleAdd">添加</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete">删除</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table border v-loading="loading" :data="dataListTC" @selection-change="handleSelectionChange"
            @cell-dblclick="handleCellDblClick">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="名称" align="center" key="Name" prop="Name">
                <template slot-scope="scope">
                    <div style="width: 100%;height: 30px;" @click="toggleRowVisibility(scope.row)"
                        v-if="!scope.row.Editable">{{ scope.row.Name }}</div>
                    <el-input v-else ref="usernameRef" v-model="scope.row.Name" @blur="handleBlur(scope.row)" autofocus />
                </template>
            </el-table-column>
            <el-table-column label="顺序" sortable align="center" key="DispalyOrder" prop="DispalyOrder"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div style="width: 100%;height: 30px;" @click="toggleRowVisibility1(scope.row)"
                        v-if="!scope.row.Editable1"> {{ scope.row.DispalyOrder }}
                    </div>
                    <el-input v-else ref="usernameRef" type="number" v-model="scope.row.DispalyOrder"
                        @blur="handleBlur1(scope.row)" autofocus />
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "Configuration",
    data() {
        return {
            open: false,
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            dataList: [],
            dataListTC: [],
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            FactoryList: [],//mes工厂
            // 查询参数
            queryParams: {
                mesFactId: undefined,
            },
            //罐数据
            tankList: [],
            iseditdata: [],
        };
    },
    watch: {},
    created() {
        this.getTankList();
        this.getOther()
    },
    methods: {
        getOther() {
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
                this.queryParams.mesFactId = this.FactoryList[0].value
            })
        },
        //保存
        handleSave() {
            function compareArrays(arr1, arr2) {
                // 比较数组长度
                if (arr1.length !== arr2.length) {
                    return "数组长度不相同";
                }
                for (let i = 0; i < arr1.length; i++) {
                    const item1 = arr1[i];
                    const item2 = arr2[i]
                    // 比较两个对象是否相同
                    if (JSON.stringify(item1) !== JSON.stringify(item2)) {
                        return `元素 ${i + 1} 有变化:\n${JSON.stringify(item1)}\n${JSON.stringify(item2)}`;
                    }
                }
                return false;
            }
            console.log(this.iseditdata, this.dataListTC);
            const isDataChanged = compareArrays(this.iseditdata, this.dataListTC);
            if (!isDataChanged) {
                this.$message.error("没有添加或修改需要保存的数据!")
            } else {
                this.$message.success("保存成功")

            }
            let isEdit = false
            if (isEdit) {
                this.$message.error("没有添加或修改需要保存的数据!")
            }
        },
        //双击修改
        toggleRowVisibility(row) {
            row.Editable = true;
        },
        toggleRowVisibility1(row) {
            row.Editable1 = true;
        },
        //失焦事件
        handleBlur(row) {
            row.Editable = false;
        },
        handleBlur1(row) {
            row.Editable1 = false
        },
        handleCellDblClick(row, column, event) {
            // Check if the double-clicked cell is in the "mtrlId" column
            if (column.property === 'mtrlName') {
                this.handleEdit(row);
            }
        },
        handleEdit(row) {
            this.reset();
            if (row.id) {
                this.$api.i_mtrlTemVcfByid({ id: row.id }).then(response => {
                    this.form = response.data;
                });
            }
            this.open = true;
            this.title = "物料"
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.QueryMatBalnConfigData(this.queryParams).then(res => {
                let List = res.list  //RecId
                this.dataList = List.map(p => {
                    return {
                        ...p,
                        ...{
                            Editable: false,
                            Editable1: false,
                        }
                    }
                })
                this.dataListTC = this.dataList.slice(0, 5);
                this.iseditdata = JSON.parse(JSON.stringify(this.dataList.slice(0, 5)));
                this.total = this.dataList.length
            }
            );
            this.loading = false;
        },
        //获取罐列表
        getTankList() {
            this.$api.i_stdCmmmCuabtankList().then((res) => {
                this.tankList = res.data.map(e => {
                    return {
                        label: e.tankName,
                        value: e.tankId
                    }
                })
            })
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            this.queryParams = {
                ...this.queryParams,
                ...{
                    id: this.iseditdata.length + 1,
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.RecId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_mtrlTemVcfSU({
                            "id": this.form.id,
                            "mtrlId": this.form.mtrlId,
                            "temperature": this.form.temperature,
                            "vcfVal": this.form.vcfVal,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_mtrlTemVcfSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        //平衡表初始化按钮
        handleBalancen() {
            this.dataListTC = this.dataList.slice(0, 5);
            this.$message.success("平衡表初始化成功")
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.dataListTC.unshift({
                "id": undefined,
                "DispalyOrder": "0",
                "IsReadOnly": "",
                "Name": "",
                "Editable": true,
                "Editable1": true,
            })
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.RecId || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
                this.getList();
            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 0 !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}
</style>
