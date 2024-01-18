<template>
    <!-- 区域平衡表列组态 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="界区类型:" style="margin-left: -20px;" prop="nodeTypeId">
                <el-select v-model="queryParams.nodeTypeId" placeholder="界区类型" clearable @change="handleChaneg">
                    <el-option v-for="dict in Limitzone" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="区域:" prop="areaId">
                <el-select v-model="queryParams.areaId" placeholder="区域" clearable>
                    <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="物料类型:" prop="mtrlTypeId">
                <el-select v-model="queryParams.mtrlTypeId" placeholder="物料类型" clearable>
                    <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="primary" plain size="mini" @click="handleSave">保存</el-button>
                <el-button type="primary" plain size="mini" @click="handleAdd">添加</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete" :disabled="single">删除</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table border v-loading="loading" :data="dataListTC" @selection-change="handleSelectionChange"
            @cell-dblclick="handleCellDblClick">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="平衡项" align="center" prop="Name" key="NameId">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="scope.row.Editable = true" style="width: 100%;height: 30px;"> {{
                        scope.row.Name }}
                    </div>
                    <el-select v-else v-model="scope.row.Name" placeholder="请选择" value-key="label" style="width: 100%;"
                        @change=" scope.row.Editable = false, scope.row.Name = $event.label, scope.row.nameId = $event.value">
                        <el-option v-for="its in balanceItemsOptions" :key="its.value" :label="its.label"
                            :value="its"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="顺序" sortable align="center" key="DisplayOrder" prop="DisplayOrder"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable1" @click="scope.row.Editable1 = true"> {{ scope.row.DisplayOrder }}
                    </div>
                    <el-input v-else type="number" ref="usernameRef" v-model="scope.row.DisplayOrder"
                        @blur="scope.row.Editable1 = false" autofocus />
                </template>
            </el-table-column>
            <el-table-column label="平衡项ID" sortable align="center" key="ItemId" prop="ItemId" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable2" @click="scope.row.Editable2 = true"> {{ scope.row.ItemId }}
                    </div>
                    <el-input v-else ref="usernameRef" v-model="scope.row.ItemId" @blur="scope.row.Editable2 = false"
                        autofocus />
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    name: "BatteryLimitBalanceTableConfiguration",
    data() {
        return {
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            Limitzone: [],
            materielType: [
                {
                    label: '物料',
                    value: "0"
                },
                {
                    label: '辅料',
                    value: "1"
                }
            ],
            balanceItemsOptions: [],//平衡项
            selectedFile: null, // Add this property
            Upfile: "",//上传文件名称
            sideLineList: [],//弹窗选择数据
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
            // 总条数
            total: 0,
            dataList: [],
            dataListTC: [],
            listdata: [],//深拷贝数据进行对比
            mtrlOption: [],//物料类型
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 用户导入参数
            upload: {
                // 是否显示弹出层（用户导入）
                open: false,
                // 弹出层标题（用户导入）
                title: "",
                // 是否禁用上传
                isUploading: false,
                // 是否更新已经存在的用户数据
                updateSupport: 0,
                // 设置上传的请求头部
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址
                url: process.env.VUE_APP_BASE_API + "mes/mtrlTemVcf/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "mtrlId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                tankName1: "",
                nodeTypeId: "",
                materielType: "0",//物料
                limitzoneType: "0",//界区
            },
            FormJQtype: [],//区域
            // 表单校验
            rules: {},
        };
    },
    watch: {},
    created() {
        this.getOther();
        this.getList();
    },
    methods: {
        handleChaneg() {
            this.$api.i_nodeAreaList({ nodeAreaType: this.queryParams.nodeTypeId }).then(res => {
                this.FormJQtype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
                this.queryParams.areaId = this.FormJQtype[0].value;
            })
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
        handleTopItemSelected(row) {
            this.form.mtrlName = row.name; // Update the selected index
            this.form.mtrlId = row.id
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
            this.$api.QueryAreaBalnCol().then(res => {
                let List = res.list  //RecId
                this.dataList = List.map(p => {
                    return {
                        ...p,
                        ...{
                            Editable: false,
                            Editable1: false,
                            Editable2: false,
                        }
                    }
                })
                this.dataListTC = this.dataList.slice(0, 10)
                //深拷贝数据进行对比
                this.listdata = JSON.parse(JSON.stringify(this.dataListTC))
                this.total = this.dataList.length
                console.log(this.dataList, "数据收拾收拾");
                this.loading = false;
            }
            );
        },
        getOther() {
            //物料类型
            this.$api.i_factMtrlGroupList().then(res => {
                if (res.code == 200) {
                    this.mtrlOption = res.data.map(e => {
                        return {
                            label: e.name,
                            value: e.id
                        }
                    })
                }
            })
            // 界区
            this.$api.i_nodeAreaType().then(res => {
                this.Limitzone = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })

            //平衡项下拉列表
            this.$api.P_balanceList().then(res => {
                this.balanceItemsOptions = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },

        //保存
        handleSave() {
            //提交接口,保存全部列表数据
            this.$message.success("保存成功")
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            console.log()
            this.queryParams = {
                ...this.queryParams,
                ...{
                    id: '',
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
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
        /** 新增按钮操作 */
        handleAdd() {
            this.dataListTC.unshift({
                "id": undefined,
                "NodeAlias": "",
                "temperature": "",
                Editable: true,
                Editable1: true
            })
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.i_mtrlTemVcfDel({ id: userIds })
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
