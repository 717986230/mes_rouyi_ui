<!-- 任务执行 -->
<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>盘点执行信息</span>
            </div>
            <el-descriptions :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="实际开始时间:">
                    <el-input type="text" style="width: 250px;" v-model="basicData.Actualstarttime" disabled></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="实际结束时间">
                    <el-input type="text" style="width: 250px;" v-model="basicData.Actualendtime" disabled></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="执行人">
                    <el-input type="text" style="width: 250px;" v-model="basicData.Actualendtime" disabled></el-input>
                </el-descriptions-item>
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
                    <template slot-scope="scope">
                        <div v-if="routerId">
                            {{ scope.row.Countquantity }}
                        </div>
                        <el-input v-else type="text" v-model="scope.row.Countquantity" @blur="handleBlur" maxlength="30"
                            style="width: 100px;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="盘盈/盘亏" align="center" sortable key="Inventoryprofit" prop="Inventoryprofit"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="routerId">
                            {{ scope.row.Inventoryprofit }}
                        </div>
                        <el-input v-else type="text" v-model="scope.row.Inventoryprofit" @blur="handleBlur" maxlength="30"
                            style="width: 100px;"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'basicData',
    props: ['basicData'],
    data() {
        return {
            PopwindowDate: [
                {
                    id: 1,    //id
                    name: "液压阀", // 设备名称
                    Specificationmodel: "BG-11120", // 规格型号
                    Sparenumber: "BG-11120NKJ",
                    Sparetype: "消耗配件",
                    Inventorywarehouse: "耗材仓库",
                    Storagelocation: "耗材仓库-MKL",
                    Inventoryquantity: 12,
                    Countquantity: 22,
                    Inventoryprofit: 9,
                    unit: "个",
                }, {
                    id: 2,    //id
                    name: "火花塞", // 设备名称
                    Specificationmodel: "BG-11122", // 规格型号
                    Sparenumber: "BG-11122NKJ",
                    Sparetype: "消耗配件",
                    Inventorywarehouse: "耗材仓库",
                    Storagelocation: "耗材仓库-MKL",
                    Inventoryquantity: 78,
                    Countquantity: 44,
                    Inventoryprofit: 19,
                    unit: "套",
                }, {
                    id: 3,    //id
                    name: "前轧钢配件", // 设备名称
                    Specificationmodel: "BG-11125", // 规格型号
                    Sparenumber: "BG-11125NKJ",
                    Sparetype: "备用配件",
                    Inventorywarehouse: "备用仓库",
                    Storagelocation: "备用仓库-KJH",
                    Inventoryquantity: 8,
                    Countquantity: 41,
                    Inventoryprofit: 69,
                    unit: "箱",
                }, {
                    id: 4, //id
                    name: "喷漆盒栓", // 设备名称
                    Specificationmodel: "BG-11127", // 规格型号
                    Sparenumber: "BG-11127NKJ",
                    Sparetype: "主动更换件",
                    Inventorywarehouse: "铸件仓库",
                    Storagelocation: "铸件仓库-JJJ",
                    Inventoryquantity: 33,
                    Countquantity: 12,
                    Inventoryprofit: 89,
                    unit: "项",
                }
            ],
        }
    }
}
</script>

<style scoped>
.box-card{
    margin: 15px;
}
</style>