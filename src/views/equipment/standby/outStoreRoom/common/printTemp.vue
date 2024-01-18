<template>
    <div  id="print-content">
        <table  v-if="excelData!=null" class="table-box" style="width:100%">
            <tr>
                <th class="t-center" colspan="6">
                    <h2 class="bold">设备（备件）出库单</h2>
                </th>
            </tr>
            <tr>
                <td class="text-right" colspan="6">
                    {{excelData.code}}
                </td>
            </tr>
            <tr>
                <td class="t-center t-border">
                    序号
                </td>
                <td class="t-center t-border">
                    设备(备件)名称
                </td>
                <td class="t-center t-border">
                    规格型号
                </td>
                <td class="t-center t-border">
                    单位
                </td>
                <td class="t-center t-border">
                    数量
                </td>
                <td class="t-center t-border">
                    出库类型
                </td>
            </tr>
            <tr v-for="(item,index) in excelData.equipmentList">
                <td class="t-center t-border">
                    {{index+1}}
                </td>
                <td class="t-center t-border">
                    {{item.name}}
                </td>
                <td class="t-center t-border">
                    {{item.model}}
                </td>
                <td class="t-center t-border">
                    {{item.unit}}
                </td>
                <td class="t-center t-border">
                    {{item.num}}
                </td>
                <td class="t-center t-border">
                    {{item.type}}
                </td>
            </tr>
            <tr>
                <td colspan="4">出库操作人:{{excelData.userName}}</td>
                <td colspan="2">出库时间:{{ dayjs(excelData.realityEndTime).format('YYYY年MM月DD日') }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "printTemp",
    props:['excelData'],
    methods:{
        printData() {
            const element = document.getElementById('print-content');
            const content = element.innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
    <html>
      <head>
        <style>
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
          /* 将第二行的边框样式设置为none */
          .table-box tr:nth-child(2) {
            border: none;
          }

          @media print {
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
            /* 将第二行的边框样式设置为none */
            .table-box tr:nth-child(2) {
              border: none;
            }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
            printWindow.document.close();
            printWindow.print();
        },
    }
}
</script>

<style >
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
@media print {
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
    /* 将第二行的边框样式设置为none */
    .table-box tr:nth-child(2) {
        border: none;
    }
}
</style>
