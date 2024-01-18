<template>
  <el-col :span="24">
    <el-card style="width: 100%" body-style="padding-top:50px">
      <div slot="header">
        <span>{{ title }}</span>
      </div>
      <el-table
        ref="singleTable"
        :data="list.equipmentEntities"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column
        width="120" 
          property="equipmentName"
          label="设备名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
        width="90" 
          property="equipmentNumber"
          label="设备编号"
          align="center"
        >
        </el-table-column>
        <el-table-column property="model" label="规格型号" align="center"   width="90" >
        </el-table-column>
        <el-table-column property="pname" label="关联设备" align="center"   width="100" >
        </el-table-column>
        <el-table-column
          v-if="!isJX"
          property="dqContent"
          label="电气巡检内容"
          align="center"
        >
        </el-table-column>
        <el-table-column
          v-if="isJX"
          property="jxContent"
          label="机械巡检内容"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: "equipmentList",
  props: ["title", "list"],
  mounted() {
    console.log(this.title, this.list, "数据成句");
  },
  created() {},
  computed: {
    isJX() {
    return  this.list.planModle == 1 ? false : true;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
