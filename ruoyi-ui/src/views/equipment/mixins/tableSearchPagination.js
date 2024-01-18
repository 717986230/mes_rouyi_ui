import _ from 'lodash'
export default {
  data () {
    return {
      // 是否显示搜索
      showSearch: false,
      tableData: [],
      // 双项绑定search
      queryParams: {},
      // 查询后存的search
      queryParamsTemp: {},
      // 分页
      pagination: {
        pageNum: 1, // 当前页
        pageSize: 10, // 分页大小
        sizes: [10, 20, 50, 100], // 分页大小选项
        total: 0 // 总条数
      },
      tableLoading: false
    }
  },
  methods: {
    // 重置
    resetForm (queryParams = {}) {
      console.log('点击重置',queryParams)
      this.queryParams = queryParams
      this.query(this.queryParams)
      this.$refs['selectAreaRef'].reload()
    },
    // 查询
    query (queryParams = this.queryParamsTemp) {
      this.pagination.pageNum = 1
      this.queryParamsTemp = _.cloneDeep(queryParams)
      this.getTableData()
    },
    // 分页相关
    pageChange (pageNum) {
      // console.log(pageNum)
      this.pagination.pageNum = pageNum
      this.getTableData()
    },
    sizeChange (size) {
      // console.log(size)
      this.pagination.pageNum = 1
      this.pagination.size = size
      this.getTableData()
    },
    //设备管理 列表筛选增加 区域选择
    /*区域选择*/
    selectAreaChange(e){
      this.queryParams.areaId = e.id
    },
  }
}
