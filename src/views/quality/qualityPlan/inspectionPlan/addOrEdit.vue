<template>
    <div class="app-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="24" class="card-box">
                    <el-card>
                        <div slot="header">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="方案编号:" prop="inspectionNumber">
                                    <el-input
                                        disabled
                                        style="width: 90%"
                                        placeholder="系统自动生成"
                                        v-model="form.inspectionNumber"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="方案名称:" prop="name">
                                    <el-input
                                        placeholder="请选择方案名称"
                                        style="width: 90%"
                                        v-model="form.name"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="建立日期:" prop="establish">
                                    <el-date-picker
                                        style="width: 90%"
                                        placeholder="请选择建立日期"
                                        v-model="form.establish"
                                        type="date"
                                        format="yyyy-MM-dd"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>

                <el-col :span="24" class="card-box">
                    <el-card class="box-card">
                        <div slot="header">
                            <span>检验项目</span>
                        </div>
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain icon="el-icon-plus" size="mini"
                                           @click="handleAddRecord">添加行</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini"
                                           @click="handleDelRecord">移除</el-button>
                            </el-col>
                        </el-row>
                        <el-table :data="form.planList" @selection-change="handleSelectionChange">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column type="index" label="序号" fixed></el-table-column>
                            <el-table-column prop="item" label="检验项目"  fixed width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item1" label="检验项目类别" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item1"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item2" label="分析方法" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item2"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item3" label="检验方法" width="150">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item3"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item4" label="目标值" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item4"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item5" label="规格下限" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item5"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item6" label="下公差" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item6"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item7" label="规格上限" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item7"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="item8" label="上公差" width="100">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.item8"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作"  width="200">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" class="danger" @click="handlePlanDel(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" class="primary" @click="handlePlanCopy(scope.row)">复制</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
                <el-col :span="24" style="height: 100px"></el-col>
            </el-row>
            <el-row class="foot-btn flex justify-center align-center">
                <el-col :span="24" class="flex justify-center align-center">
                    <el-button @click="onCancel()">
                        {{ isEdit ? "关闭" : "取消" }}
                    </el-button>
                    <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(0)">保存</el-button>
                    <el-button type="success" v-hasPermi="['equipment:repair:add']" @click="onSubmit(1)">保存并提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>


import { listUser,deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";

export default {
    name: "addOrEdit",
    data() {
        return {
            rules: {
                inspectionNumber: [
                    { required: false, message: "", trigger: "change" },
                ],
                name: [
                    { required: true, message: "请输入方案名称", trigger: "change" },
                ],
                establish: [
                    { required: true, message: "请选择建立日期", trigger: "change" },
                ],
            },
            form: {
                planList:[]
            },
            //质检方案 多选id暂存
            planListIDS:[],
        };
    },
    watch:{
    },
    created() {
        this.getOtherData();
    },
    computed: {
        isEdit(){
            return this.$route.query && this.$route.query.id
        },
    },
    mounted() {
        //修改判断
        if(this.isEdit){
            this.form = {"inspectionNumber":"zdf-5682842","planList":[{"id":1704784641170,"item":"材质检验","item1":"材质","item2":"化学药品分析","item3":"化学检验","item4":"220","item5":"210","item6":"10","item7":"250","item8":"30"},{"id":1704784690985,"item":"材质检验","item1":"材质2","item2":"化学药品分析","item3":"化学检验","item4":"100","item5":"90","item6":"10","item7":"110","item8":"10"}],"name":"材料检验","establish":"2024-01-12 12:45:12"}
        }
    },
    methods: {
        //获取其他需求数据
        getOtherData() {},
        //提交
        onSubmit(status) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success("质检方案保存成功");
                    this.$router.go(-1);
                }
            });
        },
        //取消
        onCancel() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
            this.form = {};
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.planListIDS = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //质检方案 增加 展示弹窗
        handleAddRecord(){
           this.form.planList.push({id:new Date().getTime()})
            this.msgSuccess("新增质检方案成功");
        },
        //质检方案 移除  移除列表数据
        handleDelRecord(){
            const idx = this.planListIDS;
            this.form.planList = this.form.planList.filter(item => {
                return idx.indexOf(item.id) === -1
            })
            this.msgSuccess("移除质检方案成功");
        },

        //质检方案删除
        handlePlanDel(row){
            this.form.planList = this.form.planList.filter((e)=>e.id!=row.id)
        },
        //质检方案复制
        handlePlanCopy(row){
            this.form.planList.push({...row,id:new Date().getTime()})
        }
    },
};
</script>
<style scoped lang="scss">
.app-container {
    width: 100%;
    height: calc(1050px - 10px);
    position: relative;
}

.foot-btn {
    z-index: 2;
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px #a0a8a0;
}

::v-deep .el-upload--picture-card {
    width: 15.6875rem !important;
    font-size: 14px;
}

.wx-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}
</style>
