<template>
    <!-- Tis监控 -->
    <div class="app-container">
        <el-row :gutter="20">
            <!--左侧-->
            <el-col :span="4" :xs="24">
                <div class="head-container">
                    <el-tree style="height: calc(100% - 80px);overflow: auto" class="filter-tree" :data="storageTree"
                        :props="defaultProps" highlight-current accordion :filter-node-method="filterNode"
                        @node-click="treeNodeClick" ref="tree">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="20" :xs="24">
                <div id="" class="mini-splitter-pane mini-splitter-pane2"
                    style="width: 1252px; height: 404px; left: 243px; top: 0px;">
                    <div class="mini-fit" id="fd1" style="height: 404px;">
                        <table>
                            <tbody>
                                <tr class="dashed">
                                    <td>
                                        <span class="tm-add-spanText">日期:</span>
                                    </td>
                                    <td>
                                        <el-date-picker size="mini" v-model="queryParamsSave.time" type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </td>
                                    <td>
                                        <span class="tm-add-spanText">班次:</span>
                                    </td>
                                    <td>
                                        <el-select size="mini" v-model="queryParamsSave.classes" placeholder="班次" clearable>
                                            <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label"
                                                :value="dict.value" />
                                        </el-select>
                                    </td>
                                    <td rowspan="5" colspan="2">
                                        <div class="" style="padding: 0 0 0 30px;border: 1px solid #ccc;">
                                            <div>液位（m）</div>
                                            <div id="tankFarm">
                                            </div>
                                            <div for="">{{ queryParams.minfo }}米</div>
                                        </div>
                                    </td>
                                    <td rowspan="5" colspan="2">
                                        <div class="" style="padding: 0 0 0 60px;border: 1px solid #ccc;">
                                            温度(°C)
                                            <div id="temp">
                                            </div>
                                            {{ queryParams.temp }}°C
                                        </div>
                                    </td>
                                </tr>
                                <tr class="dashed">
                                    <td>
                                        <span> 罐:</span>
                                    </td>
                                    <td>
                                        <el-select disabled v-model="queryParamsSave.tankId" placeholder="罐"
                                            style="width: 100%;" size="mini" clearable>
                                            <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label"
                                                :value="dict.value" />
                                        </el-select>
                                    </td>
                                    <td>
                                        <span> 物 料 : </span>
                                    </td>
                                    <td>
                                        <el-select disabled size="mini" v-model="queryParams.materiel" placeholder="物料"
                                            clearable>
                                            <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label"
                                                :value="dict.value" />
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        液位:
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td colspan="2">
                                        <el-checkbox v-model="checked">是否自动</el-checkbox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        设定点:
                                    </td>
                                    <td>
                                        <el-input maxlength="11" size="mini" v-model="queryParams.setPoint"
                                            placeholder="设定点" clearable> </el-input>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="checked1">是否上升</el-checkbox>
                                    </td>
                                    <td style="text-align: center">
                                        <el-button size="mini" type="info" @click="handleSettings">设定</el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        密度(kg/m3):
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td></td>
                                    <td>
                                        <el-button size="mini" type="info" style="margin-left: 68px;"
                                            @click="handleReckoner">计算器</el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>温度(℃):</td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td colspan="2">
                                        <el-checkbox v-model="checked" style=" width:100px">是否自动</el-checkbox>
                                    </td>
                                    <td>
                                        罐状态:
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td>
                                        液位状态:
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>环境温度(℃):</td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td colspan="2">
                                        <el-checkbox v-model="checked">是否自动</el-checkbox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>总观测体积(m3):</td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                    <td rowspan="7" colspan="6" style="padding-top: 10px; padding-left: 10px">
                                        <div style="width: 100%;height: 400px;border: 2px #8cb2e2 outset;">
                                            <div style="margin: 0 auto;text-align: center;line-height:400px ">无数据</div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        毛标准体积(m3) :
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>

                                    </td>
                                </tr>
                                <tr>
                                    <td>净标准体积(m3) :</td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        净标准重量(t) :
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        罐空量(t) :
                                    </td>
                                    <td>
                                        <el-input disabled maxlength="11" size="mini"> </el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import TempBar from './temp';
import tankFarmBar from './tankFarm.js';
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "tankFarmMonitor",
    components: { Treeselect },
    data() {
        return {
            checked: false,
            checked1: false,
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
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
            // 用户表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 部门树选项
            deptOptions: undefined,
            // 是否显示弹出层
            open: false,
            // 部门名称
            deptName: undefined,
            // 岗位选项
            postOptions: [],
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {},
            defaultProps: {
                children: "children",
                label: "label"
            },

            queryParamsSave: {
                "classes": "1",
                "tankId": "",
                "time": new Date(),
            },
            // 查询参数
            queryParams: {
                temp: 87,
                minfo: 17,
                unitName: "0",
                pageNum: 1,
                pageSize: 10,
                userName: undefined,
                phonenumber: undefined,
                status: undefined,
                deptId: undefined,

                setPoint: '',
            },
            temper: "",
            tankfarm_val: "",
            storageTree: [],//树结构数据
        };
    },
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        },
    },

    mounted() {

        //温度计
        this.temper = new TempBar("#temp");
        this.temper.setValue(this.queryParams.temp, 150);
        //杯子
        this.tankfarm_val = new tankFarmBar('#tankFarm');
        this.tankfarm_val.setValue(this.queryParams.minfo, 30)
    },
    created() {
        this.getList();
        this.getDeptTree();
    },
    methods: {
        filterNode() {
        },
        handleNodeClick() {
        },
        //设定按钮
        handleSettings() {
            this.$message.success("设定")
            this.queryParams.minfo = this.queryParams.setPoint || 12
            this.tankfarm_val.setValue(this.queryParams.minfo, 30);
        },
        //计算器按钮
        handleReckoner() {
            this.$message.success("计算中")
        },
        /** 查询列表 */
        getList() {
            // 递归函数，用于构建树形结构
            function buildTree(data, parentId) {
                const tree = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ParentId === parentId) {
                        const node = {
                            label: data[i].Text,
                            id: data[i].Id,
                            parentId: data[i].ParentId,
                        };
                        const children = buildTree(data, data[i].Id);
                        if (children.length > 0) {
                            node.children = children;
                        }
                        tree.push(node);
                    }
                }
                return tree;
            }
            //仓库树列表
            this.$api.GetTrees().then(res => {
                console.log('仓库列表', res.data)
                // 构建树形结构
                const departmentData = res.data;
                const treeData = buildTree(departmentData, -1);
                this.storageTree = treeData
                console.log('仓库树列表', treeData)
            })
            // this.$api.i_tankTisSelece({
            //     ...this.queryParamsSave,
            //     time: JSON.stringify(new Date(this.queryParamsSave.time)).slice(1, 11)
            // }).then(res => {
            //     if (res.code == 200) {
            //         this.userList = res.data.list;
            //         this.total = res.data.total;
            //     }
            // })
        },
        /** 查询部门下拉树结构 */
        getDeptTree() {
            deptTreeSelect().then(response => {
                this.deptOptions = response.data;
            });
        },
    }
};
</script>
<style ></style>
