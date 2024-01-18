<template>
  <table  v-if="excelData!=null" class="table-box" style="width:80%">
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
      <th class="t-center" colspan="6">设备维修记录表</th>
    </tr>
    <tr>
      <td colspan="5"> {{ excelData.maintainOrderNumber }}</td>
    </tr>
    <tr>
      <td colspan="3" class="t-center t-border">
        设备名称
      </td>
      <td class="t-center t-border">
        设备编号
      </td>
      <td class="t-center t-border">
        规格型号
      </td>
      <td class="t-center t-border">
        备注
      </td>
    </tr>
    <tr>
      <td colspan="3" class="t-center t-border">
        {{ excelData.facilityName }}
      </td>
      <td class="t-center t-border">
        {{ excelData.facilityNumber }}
      </td>
      <td class="t-center t-border">
        {{ excelData.sizeModel }}
      </td>
      <td class="t-center t-border">
        {{ excelData.remark }}
      </td>
    </tr>
    <tr>
      <td class="t-center t-border">存在问题</td>
      <td colspan="5" class=" t-border">{{excelData.existProblem}}</td>
    </tr>
    <tr>
      <td class="t-center t-border">修理内容</td>
      <td colspan="5" class=" t-border">
        {{excelData.processMode}}
      </td>
    </tr>
    <tr>
      <td class="t-center t-border">更换主要配件</td>
      <td colspan="5" class=" t-border">
          {{excelData.PartsName}}
      </td>
    </tr>
    <tr>
      <td rowspan="2" class="t-center t-border">完成情况</td>
      <td colspan="5" class=" t-border">
        <table class="w-100">
          <tr>
            <td colspan="5">机械：{{excelData.accomplish}}</td>
          </tr>
          <tr class="flex align-center justify-end">
            <td colspan="4">主修人:{{excelData.maintainPeople}}</td>
            <td colspan="1"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="5" class=" t-border">
        <table class="w-100">
          <tr>
            <td colspan="5">电器：{{excelData.accomplish}}</td>
          </tr>
          <tr class="flex align-center justify-end">
            <td colspan="4">主修人:{{excelData.maintainPeople}}</td>
            <td colspan="1"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td rowspan="2" class="t-center t-border">验收意见</td>
      <td colspan="5" class=" t-border">
        <table class="w-100">
          <tr>
            <td colspan="5">{{excelData.checkIdea}}</td>
          </tr>
          <tr class="flex align-center justify-end">
            <td colspan="4">班长/(主管工程师):{{excelData.leadName}}</td>
            <td colspan="1"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="5" class=" t-border">
        <table class="w-100">
          <tr>
            <td colspan="5">{{excelData.spotTestIdea}}</td>
          </tr>
          <tr class="flex align-center justify-end">
            <td colspan="4">设备主管(抽检):{{excelData.spotTestName}}</td>
            <td colspan="1"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td></td>
      <td colspan="3">修理时间:{{ dayjs(excelData.fulfillTime).format('YYYY-MM-DD HH:mm:ss') }}</td>
      <td></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "maintenanceTemplate",
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
</style>

