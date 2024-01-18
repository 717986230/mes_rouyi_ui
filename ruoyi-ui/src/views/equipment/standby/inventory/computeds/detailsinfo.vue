<!-- 详细信息 -->
<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>盘点任务信息</span>
            </div>
            <el-descriptions :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="盘点规则">{{ basicData.Inventoryrule }}</el-descriptions-item>
                <el-descriptions-item label="是否循环">{{ basicData.isLoop == "1" ? "是" : "否"
                }}</el-descriptions-item>
                <el-descriptions-item label="计划开始时间">{{ basicData.Scheduledstarttime
                }}</el-descriptions-item>
                <el-descriptions-item label="计划结束时间">
                    {{ basicData.Scheduledendtime }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>盘点范围</span>
            </div>
            <el-descriptions :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="盘点仓库">{{ basicData.Stash }}</el-descriptions-item>
                <el-descriptions-item label="盘点备件">{{ basicData.Plannedparts }}</el-descriptions-item>
                <el-descriptions-item label="盘点负责人">{{ basicData.auditor }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>盘点执行信息</span>
            </div>
            <el-descriptions :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="实际开始时间:">{{ basicData.Actualstarttime
                }}</el-descriptions-item>
                <el-descriptions-item label="实际结束时间">{{ basicData.Actualendtime }}</el-descriptions-item>
                <el-descriptions-item label="执行人">{{ basicData.auditor }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card" style="margin-bottom: 100px;">
            <div slot="header" class="clearfix">
                <span>盘点明细</span>
            </div>
            <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
                <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                <el-table-column label="备件名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="备件编号" align="center" sortable key="Sparenumber" prop="Sparenumber"
                    :show-overflow-tooltip="true" />
                <el-table-column label="规格型号" align="center" sortable key="Specificationmodel" prop="Specificationmodel"
                    :show-overflow-tooltip="true" />
                <el-table-column label="备件类型" align="center" sortable key="Sparetype" prop="Sparetype"
                    :show-overflow-tooltip="true" />
                <el-table-column label="单位" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true" />
                <el-table-column label="盘点仓库" align="center" sortable key="Inventorywarehouse" prop="Inventorywarehouse"
                    :show-overflow-tooltip="true" />
                <el-table-column label="存放位置" align="center" sortable key="Storagelocation" prop="Storagelocation"
                    :show-overflow-tooltip="true" />
                <el-table-column label="库存数量" align="center" sortable key="Inventoryquantity" prop="Inventoryquantity"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="盘点数量" align="center" sortable key="Countquantity" prop="Countquantity"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="盘盈/盘亏" align="center" sortable key="Inventoryprofit" prop="Inventoryprofit"
                    :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'detailsinfo',
    props: ['basicData', 'PopwindowDate']
}
</script>
<style scoped>
.box-card {
    margin: 15px;
}
</style>