<template>
  <table  v-if="excelData!=null" class="table-box" style="width:100%">
    <!--            rowspan-->
    <tr>
      <th style="width: 5%"></th>
      <th style="width: 12%"></th>
      <th style="width: 20%"></th>
      <th style="width: 20%"></th>
      <th style="width: 20%"></th>
      <th style="width: 20%"></th>
    </tr>
    <tr>
      <th class="t-center" colspan="6">设备故障报告单</th>
    </tr>
    <tr>
      <td colspan="5"> {{ excelData.maintainOrderNumber }}</td>
    </tr>

    <tr>
      <td rowspan="1" class="t-center t-border">报修</td>
      <td colspan="5"  style="padding: 0">
        <table class="w-100">
          <tr>
            <td class="t-border">设备名称:</td>
            <td class="t-border">{{excelData.facilityName}}</td>
            <td class="t-border">使用班组:</td>
            <td class="t-border">{{excelData.userDeptName}}</td>
          </tr>
          <tr>
            <td class="t-border">运行状态:</td>
            <td class="t-border">{{excelData.operatingState}}</td>
            <td class="t-border">维修班组:</td>
            <td class="t-border">{{excelData.maintainDeptName}}</td>
          </tr>
          <tr>
            <td class="t-border">报修时间:</td>
            <td class="t-border">{{dayjs(excelData.RepairsStartTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="t-border">报修人:</td>
            <td class="t-border">{{excelData.userDeptId}}</td>
          </tr>
          <tr>
            <td class="t-border">故障描述:</td>
            <td colspan="3" class="t-border">{{excelData.existProblem}}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td rowspan="1" class="t-center t-border">维修</td>
      <td colspan="5"  style="padding: 0">
        <table class="w-100">
          <tr>
            <td class="t-border">故障分析:</td>
            <td colspan="3" class="t-border">{{excelData.faultAnalysis}}</td>
          </tr>
          <tr>
            <td class="t-border">处理方式:</td>
            <td colspan="3" class="t-border"></td>
          </tr>
          <tr>
            <td class="t-border">是否更换零件:</td>
            <td class="t-border"> {{excelData.changePart}}</td>
            <td class="t-border">更换零件名称:{{excelData.PartsName}}</td>
            <td class="t-border">更换零件型号:{{excelData.PartsType}}</td>
          </tr>
          <tr>
            <td class="t-border">数量:</td>
            <td class="t-border">{{excelData.ReceiveAmount}}</td>
            <td class="t-border">解决开始时间:{{dayjs(excelData.crateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="t-border">解决结束时间:{{ dayjs(excelData.fulfillTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
          </tr>
          <tr>
            <td class="t-border">维修状态:</td>
            <td class="t-border">{{excelData.WorkStatus}}</td>
            <td class="t-border">维修人:{{excelData.MaintainPeople}}</td>
            <td class="t-border">维修班长:{{excelData.maintainDeptName}}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td rowspan="1" class="t-center t-border">反馈</td>
      <td colspan="5" style="padding: 0">
        <table class="w-100">
          <tr>
            <td class="t-border">是否引起停线:</td>
            <td class="t-border">{{excelData.whetherLineStop}}</td>
            <td class="t-border">停线开始时间:{{ dayjs(excelData.breakdownTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="t-border">停线结束时间:{{dayjs(excelData.breakdownEndTime).format('YYYY-MM-DD HH:mm:ss') }}</td>
          </tr>
          <tr>
            <td class="t-border">满意度: {{excelData.satisfy}} %</td>
            <td class="t-border">反馈意见:{{excelData.feedback}}</td>
            <td colspan="2" class="t-border"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "faultTemplate",
  props:['excelData']
}
</script>

<style scoped>
.table-box {
  border-spacing: 0;
}

.t-center {
  text-align: center;
}

.t-border {
  border: 1px solid #000;
}

td, tr {
  padding: 10px 20px;
}
table{
  border-spacing: 0;
}

</style>
