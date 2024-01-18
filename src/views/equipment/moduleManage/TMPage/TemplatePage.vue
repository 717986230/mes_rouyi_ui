<template>
  <table v-if="excelData!=null" class="table-box" style="width:100%">
    <tr>
      <th class="t-center textcss" colspan="64">东方国际集装箱（锦州）有限公司</th>
    </tr>
    <tr>
      <th class="t-center textcss" colspan="64">{{excelData.maintenanceName}}日常巡查记录表</th>
      <!-- <th class="t-center textcss" colspan="64"><span style="color:red">{{excelData.maintenanceName}}</span>日常巡查记录表</th> -->
    </tr>
    <tr v-show="true">
      <td v-for="cell in smallCells(64)" :key="cell" class="t-center"></td>
    </tr>
    <tr>
      <td colspan="3" class="t-center t-border">设备名称</td>
      <td colspan="8" class="t-center t-border">{{excelData.maintenanceName}}</td>
      <td colspan="5" class="t-center t-border">设备编号</td>
      <td colspan="20" class="t-center t-border">{{excelData.maintenanceCode}}</td>
      <td colspan="4" class="t-center t-border">使用部门</td>
      <td colspan="7" class="t-center t-border">{{excelData.userDepartment}}</td>
      <td colspan="4" class="t-center t-border">使用班组</td>
      <td colspan="7" class="t-center t-border">{{excelData.useDept}}</td>
      <td colspan="4" class="t-center t-border">主管工程师</td>
      <td colspan="5" class="t-center t-border">{{excelData.engineer}}</td>
    </tr>
    <tr>
      <td colspan="3" rowspan="2" class="t-center t-border">序号</td>
      <td colspan="8" rowspan="2" class="t-center t-border">项目名称</td>
      <td colspan="25" rowspan="2" class="t-center t-border">检查内容</td>
      <td colspan="31" class="t-center t-border">检查记录</td>
    </tr>
    <tr>
      <td v-for="cell in smallCells(31)" :key="cell" v-html="cell" class="t-center t-border">{{ cell }}</td>
    </tr>
    <tr v-for="(e,index) in excelData.machineryContent" :key="e.id">
      <td colspan="3" class="t-center t-border">{{ index + 1 }}</td>
      <td colspan="8" class="t-center t-border">{{e.deviceName}}</td>
      <td colspan="25" class="t-border" v-html="breakLines(e.content)"></td>
      <td v-for="(cell,index) in e.resultStrs" v-html="cell" :key="index" class="t-center t-border"></td>
    </tr>
    <tr>
      <td colspan="36" class="t-center t-border">机械点检人员:{{excelData.inspectPerson || ""}}</td>
      <td v-for="(cell,index) in smallCells(31)" :key="index" class="t-center t-border"></td>
    </tr>
    <tr v-for="(e,index) in excelData.electricalContent" :key="e.id">
      <td colspan="3" class="t-center t-border">{{ index + 1 }}</td>
      <td colspan="8" class="t-center t-border">{{e.deviceName}}</td>
      <td colspan="25" class="t-border">{{ e.content }}</td>
      <td v-for="(cell,index) in e.resultStrs" :key="index" v-html="cell" class="t-center t-border"></td>
    </tr>
    <tr>
      <td colspan="36" class="t-center t-border">电气点检人员:{{excelData.inspectPerson }}</td>
      <td v-for="cell in smallCells(31)" :key="cell" class="t-center t-border"></td>
    </tr>
    <tr>
      <!-- <td colspan="36" class="t-left t-border" style="color:red"> -->
      <td colspan="36" class="t-left t-border">工程师不定期巡检记录:{{excelData.engineerInspects }}</td>
      <td v-for="(cell,index) in smallCells(31)" :key="index" class="t-center t-border"></td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="36" class="t-left">点检方法: 看,试,听,闻,测; 记录符号: 正常√; 异常×; 修理O;</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'TemplatePage',
  props: ['excelData'],
  data() {
    return {
      istext: '1.哈哈哈哈哈哈 \n 2.我我我我哦我 \n 3.你你你你你你 \n 4.红红火火恍恍惚惚hhhhhhhhhh'
    }
  },
  computed: {},
  methods: {
    //表格行数方法
    smallCells(count) {
      return Array.from({ length: count }, (_, index) => `${index + 1}`)
    },
    breakLines(text) {
      return text.replace(/\n/g, '<br>')
    }
  }
}
</script>
<style scoped>
.table-box {
  border-spacing: 0;
}

.t-center {
  text-align: center;
}
.textcss {
  font-size: 24px;
}
.t-border {
  border: 1px solid #000;
}

td,
tr {
  width: 30px;
  height: 30px;
}
</style>
