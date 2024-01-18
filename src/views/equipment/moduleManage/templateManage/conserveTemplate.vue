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
          <th class="t-center" colspan="6">设备保养记录表</th>
        </tr>
        <tr>
          <td colspan="5"> {{ excelData.planNumber }}</td>
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
            {{ excelData.equipmentName }}
          </td>
          <td class="t-center t-border">
            {{ excelData.equipmentNumber }}
          </td>
          <td class="t-center t-border">
            {{ excelData.model }}
          </td>
          <td class="t-center t-border">
            {{ excelData.remark }}
          </td>
        </tr>
        <tr>
          <td class="t-center t-border">存在问题</td>
          <td colspan="5" class=" t-border">{{ excelData.question }}</td>
        </tr>
        <tr>
          <td class="t-center t-border">保养级别及内容</td>
          <td colspan="5" class=" t-border">
            {{ excelData.maintenanceContent }}
          </td>
        </tr>
        <tr>
          <td class="t-center t-border">保养情况记录</td>
          <td colspan="5" class=" t-border">
            <table class="w-100">
              <tr>
                <td colspan="5">{{ excelData.maintainDetailVO.maintenanceContentDetail }}</td>
              </tr>
              <tr class="flex align-center justify-end">
                <td colspan="4">主修人：</td>
                <td colspan="1">{{ excelData.maintainDetailVO.createUser }}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td rowspan="2" class="t-center t-border">验收意见</td>
          <td colspan="5" class=" t-border">
            <table class="w-100">
              <tr>
                <td colspan="5">{{ excelData.spotCheck.comments }}</td>
              </tr>
              <tr class="flex align-center justify-end">
                <td colspan="4">班长/(主管工程师):</td>
                <td colspan="1">{{ excelData.spotCheck.createUser }}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="5" class=" t-border">
            <table class="w-100">
              <tr>
                <td colspan="5">{{ excelData.monitororLead.comments }}</td>
              </tr>
              <tr class="flex align-center justify-end">
                <td colspan="4">设备主管(抽检):</td>
                <td colspan="1">{{ excelData.monitororLead.createUser }}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="4">保养时间:{{ dayjs(excelData.realityEndTime).format('YYYY-MM-DD HH:mm:ss') }}</td>
          <td></td>
        </tr>
      </table>
</template>

<script>
export default {
  name: "conserveTemplate",
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
