<template>
    <!--维修经验库-->
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
                    <el-form-item label="维修完成时间:" prop="Plannedtime" label-width="120px">
                        <el-date-picker
                            v-model="queryParams.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="区域" prop="numbers">
                        <el-select v-model="queryParams.areaID" placeholder="请选择区域" style="width: 90%">
                            <el-option v-for="(dict,index) in areaOptions" :key="index" :label="dict.label"
                                       :value="dict.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备名称" prop="numbers">
                        <el-input v-model="queryParams.name" placeholder="请输入设备名称" clearable style="width:90%"/>
                    </el-form-item>
                    <el-form-item label="故障类型" prop="numbers">
                        <el-select v-model="queryParams.areaID" placeholder="请选择故障类型" style="width: 90%">
                            <el-option v-for="(dict,index) in dict.type.fault_type" :key="index" :label="dict.label"
                                       :value="dict.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
                    </el-col>
                    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
                </el-row>
                <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column fixed="left" label="序号"  type="index" width="50" align="center" />
                    <el-table-column fixed="left" label="维修任务名称" align="center" sortable>
                        <template slot-scope="scope">
                            <div class="table-operation">
                                <b @click="handleDetail(scope.$index,scope.row)" class="primary cs">{{scope.row.item1}}</b>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="维修任务单号" align="center" sortable key="item2" prop="item2"/>
                    <el-table-column label="任务状态" align="center" sortable key="item3" prop="item3"/>
                    <el-table-column label="设备名称" align="center" sortable key="item4" prop="item4"/>
                    <el-table-column label="设备编号" align="center" sortable key="item5" prop="item5"/>
                    <el-table-column label="规格型号" align="center" sortable key="item6" prop="item6"/>
                    <el-table-column label="故障类型" align="center" sortable key="item7" prop="item7"/>
                    <el-table-column label="故障描述" align="center" sortable key="item8" prop="item8"/>
                    <el-table-column label="故障分析" align="center" sortable key="item9" prop="item9"/>
                    <el-table-column label="故障详情" align="center" sortable key="item10" prop="item10"/>
                    <el-table-column label="处理方式" align="center" sortable key="item11" prop="item11"/>
                    <el-table-column label="是否更换配件" align="center" sortable key="item12" prop="item12"/>
                    <el-table-column label="维修开始时间" align="center" sortable key="item13" prop="item13"/>
                    <el-table-column label="维修结束时间" align="center" sortable key="item14" prop="item14"/>
                    <el-table-column label="维修负责人" align="center" sortable key="item15" prop="item15"/>
                    <el-table-column label="现场图片" align="center" >
                        <template slot-scope="scope">
                            <i class="el-icon-picture large primary" @click="handlePicture(scope.row.item16)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" sortable key="item17" prop="item17"/>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getList" />
            </el-col>
        </el-row>
        <el-dialog :title="filesDialog.title" :visible.sync="filesDialog.visible" :width="filesDialog.width" append-to-body>
            <!--设备图片-->
            <el-row v-if="filesDialog.type == 'imgs'">
                <el-col :span="6" v-for="(file,index) in filesDialog.data" :key="index" style="margin-bottom: 10px;">
                    <img class="w-100" :src="file">
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import _ from 'lodash';
import { getToken } from "@/utils/auth";

export default {
    name: "index",
    dicts:['fault_type'],
    data() {
        return {
            areaOptions:[],
            // 双项绑定search
            queryParams: {
                numbers:'',
                name:'',
                date: [new Date(), new Date().getTime() + 24 * 60 * 60 * 1000],
                result:'',
                pageNum: 1,
                pageSize: 10,
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            resultOptions:[
                {
                    label: '合格',
                    value: '1'
                },
                {
                    label: '不合格',
                    value: '0'
                }
            ],//检验结果
            //遮罩层
            loading: false,
            // 是否显示搜索
            showSearch: true,
            //列表数据
            tableData: [],

            total: 0,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 弹出层标题
            title: "", //
            // 是否显示弹出层
            open: false,
            // 用户导入参数
            //弹窗数据 文件 图片
            filesDialog:{
                type:'imgs', // files || imgs
                data:[],
                title:'设备关联文档',
                visible:false,
                width:'800px',
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({ nodeAreaType: "2" }).then(res => {
                this.areaOptions = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.experienceList(this.queryParams).then(response => {
                    this.tableData = response.data
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery: _.debounce(function () {
            this.queryParams.pageNum = 1;
            this.getList();
        }, 1000),
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.queryParams.deptId = undefined;
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.nodeId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },


        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/pminnsmtnode/export', {
                ...this.queryParams
            }, `互供点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
    }
};
</script>
<style lang="scss" scoped>

</style>