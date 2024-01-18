<template>
    <div>
    <el-table style="padding-top: 0px;width: 100%" border :data="dataList"  :show-header="showHeader">
        <el-table-column type="expand" prop="scope">
            <template slot-scope="scope" >
                <div style="padding: 0px 0px 4px 10px" v-if="scope.row.children && scope.row.children.length > 0">
                    <nested-table :showHeader="false" :data="scope.row.children"></nested-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="物料名称" >
            <template slot-scope="scope">
                <div @click="handleTCedit(scope.row)" style="width: 100%;height: 30px;">
                    {{ scope.row.name }}
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="物料等级" width="300"></el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="open" width="30%" :before-close="handleClose" show-close>
        <div style="display: flex;justify-content: center;">
            <div style="line-height: 25px;">
                物料名称:
            </div>
            <el-input v-model="input1" type="tel" maxlength="11" size="mini" style="width:200px"></el-input>
            <el-button @click="dialogVisible = false" size="mini">查询</el-button>
        </div>
        <div class="treeboxflex">
            <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false"
                     :filter-node-method="filterNode" ref="tree" node-key="id" default-expand-all highlight-current
                     @node-click="handleNodeClick" />
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="verify" size="mini">确 定</el-button>
            </span>
    </el-dialog>
    </div>
</template>

<script>
import NestedTable from './NestedTable.vue';

export default {
    name:'NestedTable',
    components: {
        NestedTable
    },
    props:{
        data:{
            type:Array,
            default(){
                return []
            }
        },
        showHeader:{
            type:Boolean,
            default:false
        },
    },
    data(){
      return{
          dataList:[],
          open:false,
          dataListTC:[],
          rowMtrlAlias:null,
          title:"",
          tabledata:null,
          deptOptions: [],
          defaultProps: {
              children: "children",
              label: "label"
          },
      }
    },
    watch:{
        data: {
            handler(newVal) {
                if (newVal) {
                    this.dataList = newVal
                }
            },
            deep: false, //非递归监听
            immediate: true, //初始化组件时就立即执行一次handler函数，而不需要等待queryParams.unitId的变化。
        }
    },
    created() {
        deptTreeSelect().then(response => {
            this.deptOptions = response.data;
        });
    },
    methods:{
        /** 树结构筛选 */
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        verify() {
            this.open = false
            // this.dataListTC.find((e => e.RecId == this.tabledata)).MtrlAlias = this.rowMtrlAlias
            let indexDate = this.dataListTC.find((e => e.RecId == this.tabledata))
            indexDate.MtrlAlias = this.rowMtrlAlias.label
            this.$set(this.dataListTC, this.dataListTC.findIndex((e => e.RecId == this.tabledata)), indexDate)
        },
        handleNodeClick(row) {
            console.log(row);
            this.rowMtrlAlias = row
        },
        handleTCedit(row) {
            console.log(row, "row");
            this.open = true;
            this.title = "选择物料树";
            if (row) {
                this.tabledata = row.RecId
            } else {
                this.tabledata = undefined
            }
        },
    }
};
</script>
<style>
::v-deep .el-table__cell, .el-table__expanded-cell{
    padding-top: 0px !important;
}
</style>
