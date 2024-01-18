<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">基础信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="检验单号">{{basicData.inspectionNumber}}</el-descriptions-item>
                        <el-descriptions-item label="送检员">{{basicData.inspector}}</el-descriptions-item>
                        <el-descriptions-item label="部门">{{basicData.department}}</el-descriptions-item>
                        <el-descriptions-item label="收料仓库">{{basicData.receivingWarehouse}}</el-descriptions-item>
                        <el-descriptions-item label="仓位">{{basicData.location}}</el-descriptions-item>
                        <el-descriptions-item label="物品类型">{{basicData.itemType}}</el-descriptions-item>
                        <el-descriptions-item label="物品名称">{{basicData.itemName}}</el-descriptions-item>
                        <el-descriptions-item label="物品编码">{{basicData.itemCode}}</el-descriptions-item>
                        <el-descriptions-item label="规格型号">{{basicData.specification}}</el-descriptions-item>
                        <el-descriptions-item label="单位">{{basicData.unit}}</el-descriptions-item>
                        <el-descriptions-item label="供应商">{{basicData.location}}</el-descriptions-item>
                        <el-descriptions-item label="批号">{{basicData.batchNumber}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">检验信息</span>
                    </div>
                    <el-descriptions :column=2 style="margin-left: 30px;">
                        <el-descriptions-item label="报检数量">{{basicData.inspectionQuantity}}</el-descriptions-item>
                        <el-descriptions-item label="检验员">{{basicData.inspector2}}</el-descriptions-item>
                        <el-descriptions-item label="检验日期">{{basicData.inspectionDate}}</el-descriptions-item>
                        <el-descriptions-item label="检验方式">{{basicData.inspectionMethod}}</el-descriptions-item>
                        <el-descriptions-item label="检验数量">{{basicData.inspectionQuantity2}}</el-descriptions-item>
                        <el-descriptions-item label="抽样标准">{{basicData.standards}}</el-descriptions-item>
                        <el-descriptions-item label="批量大小">{{basicData.batch}}</el-descriptions-item>
                        <el-descriptions-item label="检验水平">{{basicData.inspectionLevel}}</el-descriptions-item>
                        <el-descriptions-item label="AQL">{{basicData.AQL}}</el-descriptions-item>
                        <el-descriptions-item label="样本数">{{basicData.samplesNum}}</el-descriptions-item>
                        <el-descriptions-item label="允收数">{{basicData.acceptanceNum}}</el-descriptions-item>
                        <el-descriptions-item label="拒收数">{{basicData.rejectionNum}}</el-descriptions-item>
                        <el-descriptions-item label="样本破坏数">{{basicData.sampleDestructionCount}}</el-descriptions-item>
                        <el-descriptions-item label="不合格数量">{{basicData.nonconformingQuantity}}</el-descriptions-item>
                        <el-descriptions-item label="合格数量">{{basicData.conformingQuantity}}</el-descriptions-item>
                        <el-descriptions-item label="检验结果">{{basicData.inspectionResult}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">质检方案</span>
                    </div>
                    <el-table :data="basicData.planList" align="center">
                        <el-table-column label="序号" align="center" type="index" width="100" fixed></el-table-column>
                        <el-table-column align="center" prop="item" label="检验项目" fixed></el-table-column>
                        <el-table-column align="center" prop="item1" label="检验项目类别"></el-table-column>
                        <el-table-column align="center" prop="item2" label="分析方法"></el-table-column>
                        <el-table-column align="center" prop="item3" label="检验方法"></el-table-column>
                        <el-table-column align="center" prop="item4" label="目标值"></el-table-column>
                        <el-table-column align="center" prop="item5" label="规格下限"></el-table-column>
                        <el-table-column align="center" prop="item6" label="下公差"></el-table-column>
                        <el-table-column align="center" prop="item7" label="规格上限"></el-table-column>
                        <el-table-column align="center" prop="item8" label="上公差"></el-table-column>
                        <el-table-column align="center" prop="item9" label="样本值"></el-table-column>
                        <el-table-column align="center" prop="item10" label="不良数量"></el-table-column>
                        <el-table-column align="center" prop="item11" label="合格数量"></el-table-column>
                        <el-table-column align="center" prop="item12" label="检验结果"></el-table-column>
                        <el-table-column align="center" prop="item13" label="备注"></el-table-column>
                        <el-table-column prop="item14" label="不良图片"  width="150">
                            <template slot-scope="scope">
                                <img style="width: 150px;" :src="scope.row.item14" alt="不良品图片"/>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box mt10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="normal m20 bold">其他信息</span>
                    </div>
                    <el-descriptions :column=3 style="margin-left: 30px;">
                        <el-descriptions-item label="提交人">{{basicData.subUser}}</el-descriptions-item>
                        <el-descriptions-item label="提交时间">{{basicData.subTime}}</el-descriptions-item>
                        <el-descriptions-item label="更新时间">{{basicData.upTime}}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'basic',
    data(){
        return {

        }
    },
    props:['basicData'],
    methods:{

    }
}
</script>

<style scoped>
.img{
    border-width: 0px;
    width: 196px;
    height: 146px;
}
</style>