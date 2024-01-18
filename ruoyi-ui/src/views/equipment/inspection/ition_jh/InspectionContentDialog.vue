<template>
  <el-dialog
    title="选择巡检内容"
    :visible.sync="thisDialogShow"
    @close="cancel"
  >
    <div class="herder flex justify-between">
      <el-input
        v-model="queryParams2.inspectionContent"
        placeholder="请输入巡检内容"
        style="width: 200px; margin: 0 0 10px 0"
        @keyup.enter.native="query"
      ></el-input>
      <div>
        <el-button type="cyan" @click="query">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      highlight-current-row v-model="selectedRow" :current-row-key="radio"  @selection-change="handleSelectionChange">
<!--      <el-table-column label="" width="55" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-radio-->
<!--            :label="scope.$index"-->
<!--            v-model="radio">{{ '' }}-->
<!--          </el-radio>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="inspectionSerial" label="任务编号" align="center" ></el-table-column>
      <el-table-column label="创建时间" align="center" width="180" prop="createTime">
        <template slot-scope="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="inspectionContent" label="任务内容" align="center"></el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
    </el-table>
    <pagination
      v-show="pagination.total>0"
      :total="pagination.total"
      :page.sync="pagination.pageNum"
      :page-sizes="pagination.sizes"
      :limit.sync="pagination.pageSize"
      position="left"
      @pagination="getTableData"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="success" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import tableSearchPaginationMixin from "@/views/equipment/mixins/tableSearchPagination";

export default {
  mixins: [tableSearchPaginationMixin],
  name: "InspectionContent",
  props: {
    dialogShow: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      thisDialogShow: false,
      selectedRow: '',
      radio: -1,
      queryParams2:{
        inspectionContent:''
      }
    }
  },
  watch: {
    thisDialogShow(newVal) {
      this.thisDialogShow = newVal
    }
  },
  created() {
    this.thisDialogShow = this.dialogShow
    //获取内容列表
    this.getTableData();
  },
  mounted() {
    this.thisDialogShow = this.dialogShow
  },
  methods: {
    //获取巡检内容
    getTableData() {
      this.tableLoading = true;
      this.$api.getInspectionList({...{
          pageNum:this.pagination.pageNum, // 当前页
          pageSize: this.pagination.pageSize, // 分页大小
        }, ...this.queryParams2}).then((res) => {
        if (res.code == 200) {
          console.log('获取获取巡检内容列表数据接口成功', res)
          this.tableData = res.rows
          this.pagination.total = res.total
          this.tableLoading = false
        } else {
          console.log(`获取列表数据接口成功,但接口状态=${res.code}`, res)
        }
      })
        .catch((err) => {
          console.log('接口失败', err)
          this.tableLoading = true;
        })
    },
    //弹窗单选 赋值
    handleRowClick(row) {
      this.selectedRow = row;
    },
    //弹窗对选 赋值
    handleSelectionChange(selection) {
      this.inspectionList = selection
    },
    //弹窗取消
    cancel(){
      this.thisDialogShow = false;
      this.radio = -1;
      this.selectedRow = ''
      this.inspectionList = []
      this.$emit('closeDialog2',false)
    },
    //弹窗确定
    confirm(){
      this.deviceDialogShow = false;
      //发送选择的巡检内容
      this.$emit('inspectionList',this.inspectionList)
      //发送关闭函数
      this.$emit('closeDialog2',false)
    }
  }
}
</script>

<style scoped>
::v-deep .el-radio__label{
  display: none;
}
</style>
