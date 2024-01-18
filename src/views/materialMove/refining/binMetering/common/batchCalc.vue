<template>
    <div>
        <!--批量检尺-->
        <el-form ref="form" :model="batchform" :rules="rules" inline label-width="130px">
            <el-form-item label="时间:">
                <el-date-picker
                    v-model="batchform.date"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="primary" plain icon="el-icon-sort-down" size="mini" @click="handleDataAcquisition">批量采数</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="primary" plain icon="el-icon-edit" size="mini" @click="handleTankCapacityCalc">批量计算</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="danger" plain icon="el-icon-check" size="mini" @click="handleConfirm">确认</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <el-table border :data="dataList">
            <el-table-column label="序号" align="center" type="index"/>
            <el-table-column label="料仓" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="物料" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="物料别名" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="罐确认量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="计算量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="检尺时间" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="人工检尺高度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="油温" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="密度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="净油容积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="仪表检尺高度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="偏移量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="水尺高度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="水容积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="含水量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="VCF值" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="压力" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="气相温度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="气相密度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="气相体积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="气相质量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="液体质量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="毛计量体积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="大气温度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="修正油尺" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="温度修正值" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="静压修正值" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="酸度系数" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="介质浓度" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="检尺人ID" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="录入时间" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="收付" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="提交状态" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="备注" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="最大安全容积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="最小容积" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="最大安全质量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
            <el-table-column label="最小质量" align="center" width="200" key="TankNodeName" prop="TankNodeName"/>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "batchCalc",
    data(){
        return{
            batchform: {
                date:''
            },
            rules:[],
            dataList:[]
        }
    }
}
</script>

<style scoped>

</style>
