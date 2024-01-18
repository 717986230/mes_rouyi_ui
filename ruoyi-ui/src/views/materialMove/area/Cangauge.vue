<template>
    <!-- 罐检尺-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="time">
                <div class="block">
                    <el-date-picker style="width:150px" v-model="queryParams.time" type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="班次" clearable>
                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐区:" prop="tankAreaId">
                <el-select v-model="queryParams.tankAreaId" placeholder="罐区" clearable>
                    <el-option v-for="dict in TankFarm" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐:" prop="tankId">
                <el-select v-model="queryParams.tankId" placeholder="罐" clearable>
                    <el-option v-for="dict in Fulltank" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button type="info" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleChangTank">罐初始化</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" @click="handleBatchScale">批量检尺</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleAdd">新建</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleRenewal">更新</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">保存</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" style="width: 100%;margin-bottom: 20px;" @selection-change="handleSelectionChange"
            border>
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.subList">
                            <el-table-column fixed="left" type="selection" align="center" />
                            <el-table-column label="检尺时间" align="center" prop="AftTime" width="130">
                                <template slot-scope="scope">
                                    {{ dayjs(scope.row.AftTime.match(/\d+/)[0]).format("YYYY-MM-DD HH:mm:ss") }}
                                </template>
                            </el-table-column>
                            <el-table-column label="检尺类型" align="center" prop="gaugeType" width="130">
                            </el-table-column>
                            <el-table-column label="物料" align="center" prop="PreVal" width="130">
                            </el-table-column>
                            <el-table-column label="别名" align="center" prop="alias" width="130">
                            </el-table-column>
                            <el-table-column label="罐量" align="center" prop="tankVolume" width="130">
                            </el-table-column>
                            <el-table-column label="人工检尺高度" align="center" prop="manualGaugeHeight" width="130">
                            </el-table-column>
                            <el-table-column label="油温" align="center" prop="oilTemperature" width="130">
                            </el-table-column>
                            <el-table-column label="密度" align="center" prop="density" width="130">
                            </el-table-column>
                            <el-table-column label="净油容积" align="center" prop="netOilVolume" width="130">
                            </el-table-column>
                            <el-table-column label="仪表检尺" align="center" prop="instrumentGauge" width="130">
                            </el-table-column>
                            <el-table-column label="水尺高度" align="center" prop="waterGaugeHeight" width="130">
                            </el-table-column>
                            <el-table-column label="水容积" align="center" prop="waterVolume" width="130">
                            </el-table-column>
                            <el-table-column label="含水率" align="center" prop="waterContentRatio" width="130">
                            </el-table-column>
                            <el-table-column label="VCF" align="center" prop="vcf" width="130">
                            </el-table-column>
                            <el-table-column label="压力" align="center" prop="pressure" width="130">
                            </el-table-column>
                            <el-table-column label="气相温度" align="center" prop="meteorologicalTemperature" width="130">
                            </el-table-column>
                            <el-table-column label="气相密度" align="center" prop="meteorologicalDensity" width="130">
                            </el-table-column>
                            <el-table-column label="气相体积" align="center" prop="meteorologicalVolume" width="130">
                            </el-table-column>
                            <el-table-column label="液体质量" align="center" prop="liquidQuality" width="130">
                            </el-table-column>
                            <el-table-column label="毛计量体积" align="center" prop="grossMeteredVolume" width="130">
                            </el-table-column>
                            <el-table-column label="毛标准质量" align="center" prop="grossStandardMass" width="130">
                            </el-table-column>
                            <el-table-column label="毛标准体积" align="center" prop="grossStandardVolume" width="130">
                            </el-table-column>
                            <el-table-column label="大气温度" align="center" prop="atmosphericTemperature" width="130">
                            </el-table-column>
                            <el-table-column label="修正油尺" align="center" prop="correctedOilGauge" width="130">
                            </el-table-column>
                            <el-table-column label="温度修正值" align="center" prop="temperatureCorrectionValue" width="130">
                            </el-table-column>
                            <el-table-column label="净油质量" align="center" prop="netOilMass" width="130">
                            </el-table-column>
                            <el-table-column label="酸度系数" align="center" prop="acidityCoefficient" width="130">
                            </el-table-column>
                            <el-table-column label="浓碱系数" align="center" prop="alkalinityCoefficient" width="130">
                            </el-table-column>
                            <el-table-column label="检尺人" align="center" prop="creator" width="130">
                            </el-table-column>
                            <el-table-column label="录入时间" align="center" prop="gaugeTime" width="130">
                            </el-table-column>
                            <el-table-column label="提交状态" align="center" prop="status" width="130">
                            </el-table-column>
                            <el-table-column label="备注" align="center" prop="remark" width="130">
                            </el-table-column>
                            <el-table-column label="最大安全容量" align="center" prop="maxSafeCapacity" width="130">
                            </el-table-column>
                            <el-table-column label="最大安全容积" align="center" prop="maxSafeVolume" width="130">
                            </el-table-column>
                            <el-table-column label="最小安全容量" align="center" prop="minSafeCapacity" width="130">
                            </el-table-column>
                            <el-table-column label="最小安全容积" align="center" prop="minSafeVolume" width="130">
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="left" type="index" align="center" />
            <el-table-column width="100" label="罐名称" align="center" key="nodeName" prop="nodeName" sortable>
            </el-table-column>
            <el-table-column label="检尺时间" width="130" align="center" sortable key="gaugeTime" prop="gaugeTime"
                :show-overflow-tooltip="true" />
            <el-table-column label="检尺类型" align="center" width="100" sortable key="gaugeType" prop="gaugeType"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料" align="center" width="100" sortable key="material" prop="material"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" width="100" sortable key="alias" prop="alias"
                :show-overflow-tooltip="true" />
            <el-table-column label="质量状态" width="100" align="center" sortable key="qualityStatus" prop="qualityStatus"
                :show-overflow-tooltip="true" />
            <el-table-column label="罐量" align="center" sortable key="tankVolume" prop="tankVolume" width="80" />
            <el-table-column label="罐高" align="center" sortable key="SideLineData" prop="SideLineData" width="80" />
            <el-table-column label="油温" align="center" sortable key="oilTemperature" prop="oilTemperature" width="80" />
            <el-table-column label="密度" align="center" sortable prop="density" key="density" width="80">
            </el-table-column>
            <el-table-column label="大气温度" align="center" sortable key="atmosphericTemperature" prop="atmosphericTemperature"
                width="120" />
            <el-table-column label="气象密度" align="center" sortable key="meteorologicalDensity" prop="meteorologicalDensity"
                width="120" />
            <el-table-column label="气象体积" align="center" sortable key="meteorologicalVolume" prop="meteorologicalVolume"
                width="120" />
            <el-table-column label="气象质量" align="center" sortable key="meteorologicalQuality" prop="meteorologicalQuality"
                width="120" />
            <el-table-column label="气象温度" align="center" sortable key="meteorologicalTemperature"
                prop="meteorologicalTemperature" width="120" />
            <el-table-column label="液体质量" align="center" sortable key="liquidQuality" prop="liquidQuality" width="120" />
            <el-table-column label="含水量" align="center" sortable key="waterContent" prop="waterContent" width="100" />
            <el-table-column label="毛计量体积" align="center" sortable key="grossMeteredVolume" prop="grossMeteredVolume"
                width="120" />
            <el-table-column label="收付" align="center" sortable key="payment" prop="payment" width="120" />
            <el-table-column label="提交状态" align="center" sortable key="submissionStatus" prop="submissionStatus"
                width="120" />
            <el-table-column label="备注" align="center" sortable key="remark" prop="remark" width="120" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新建弹窗 -->
        <el-dialog :title="title" :visible.sync="open" width="1100px" append-to-body show-close>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked1">详细信息</el-checkbox>
                </legend>
                <el-form v-show="checked1" ref="form" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="罐:" prop="unitTypeId">
                                <el-select v-model="form.unitTypeId" placeholder="罐">
                                    <el-option v-for="(item, index) in Fulltank" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="检尺类型:" prop="gaugeType">
                                <el-select v-model="form.gaugeType" placeholder="检尺类型">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料:" prop="material">
                                <el-select v-model="form.material" placeholder="物料">
                                    <el-option v-for="(item, index) in materiel" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料别名:" prop="alias">
                                <el-select v-model="form.alias" placeholder="物料别名">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="检尺人:" prop="creator">
                                <el-select v-model="form.creator" placeholder="检尺人">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="检尺时间:" prop="gaugeTime">
                                <el-select v-model="form.gaugeTime" placeholder="检尺时间">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仪表油尺:" prop="correctedOilGauge">
                                <el-input maxlength="11" type="text" v-model="form.correctedOilGauge"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="油温(℃):" prop="oilTemperature">
                                <el-input maxlength="11" type="text" v-model="form.oilTemperature"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水尺(m):" prop="waterGaugeHeight">
                                <el-input maxlength="11" type="text" v-model="form.waterGaugeHeight"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="人工油尺(m):" prop="correctedOilGauge">
                                <el-input maxlength="11" style="width: 150px;" type="text"
                                    v-model="form.correctedOilGauge"></el-input>
                                <span style="margin-right: 10px;">{{ "191.2" }}</span>
                                <span>{{ "19" }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="压力(MPa):" prop="pressure">
                                <el-input maxlength="11" type="text" v-model="form.pressure"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水率(%):" prop="waterContentRatio">
                                <el-input maxlength="11" type="number" v-model="form.waterContentRatio"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="标准密度(kg/m3):" prop="density">
                                <el-input maxlength="11" v-model="form.density" type="text"
                                    style="width:130px;margin-right: 10px;"></el-input>
                                <el-button size="mini" type="info" @click="form.MixingDensity">混合密度</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="介质浓度:" prop="netOilMass">
                                <el-input maxlength="11" type="number" v-model="form.netOilMass"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="酸碱系数:" prop="acidityCoefficient">
                                <el-input maxlength="11" type="number" v-model="form.acidityCoefficient"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水量:" prop="waterVolume">
                                <el-input maxlength="11" type="number" v-model="form.waterVolume"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="气相温度:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="大气温度:" prop="meteorologicalTemperature">
                                <el-input maxlength="11" type="number" v-mount="form.meteorologicalTemperature"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修正油尺:" prop="correctedOilGauge">
                                <el-input maxlength="11" type="number" v-model="form.correctedOilGauge"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked2">空尺计量输出</el-checkbox>
                </legend>
                <el-form ref="form" v-show="checked2" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="" prop="unitNum">
                                <el-checkbox v-model="checked">是否空尺</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="空尺:" prop="instrumentGauge">
                                <el-input maxlength="11" type="text" v-model="form.instrumentGauge"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="量油尺修正:" prop="correctedOilGauge">
                                <el-input maxlength="11" type="text" v-model="form.correctedOilGauge"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="浸油高度:" prop="manualGaugeHeight">
                                <el-input maxlength="11" type="text" v-model="form.manualGaugeHeight"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked3">罐量计算结果</el-checkbox>
                </legend>
                <el-form ref="form" v-show="checked3" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="毛标准体积:" prop="grossStandardVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.grossStandardVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水容积:" prop="waterVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.waterVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VCF:" prop="vcf">
                                <el-input disabled maxlength="11" type="text" size="mini" v-model="form.vcf"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="净油容积量:" prop="netOilVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.netOilVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="静压修正值:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毛标准质量:" prop="grossStandardMass">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.grossStandardMass"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="气相密度:" prop="meteorologicalDensity">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.meteorologicalDensity"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相体积:" prop="meteorologicalVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.meteorologicalVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相质量:" prop="meteorologicalQuality">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.meteorologicalQuality"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="温度修正值:" prop="temperatureCorrectionValue">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.temperatureCorrectionValue"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毛计量体积:" prop="grossMeteredVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.grossMeteredVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="盈亏量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="最大安全容积:" prop="maxSafeVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.maxSafeVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最大安全量:" prop="maxSafeCapacity">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.maxSafeCapacity"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="净油质量:" prop="netOilMass">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.netOilMass"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="最小安全容积:" prop="minSafeVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.minSafeVolume"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最小安全量:" prop="minSafeCapacity">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.minSafeCapacity"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="罐确认量:" prop="tankVolume">
                                <el-input disabled maxlength="11" type="text" size="mini"
                                    v-model="form.tankVolume"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="备注:" prop="remark">
                                <el-input maxlength="11" type="text" size="mini" v-model="form.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <el-row :gutter="10">
                <el-col :span="12" :offset="6">
                    <el-button type="info" size="mini" @click="DataAcquisition">数据采集</el-button>
                    <el-button type="info" size="mini" @click="TankSizeCalculation">罐量计算</el-button>
                    <el-button type="info" size="mini" @click="handleVerify">确认</el-button>
                    <el-button type="info" size="mini" @click="Cancel">取消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 罐初始化 -->
        <el-dialog :title="titleTankinitialization" :visible.sync="openTankinitialization" width="640px" append-to-body
            show-close>
            <el-card>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="罐:" prop="unitNum">
                                <el-input type="text" maxlength="11" disabled size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="时间:" prop="gaugeTime">
                                <el-date-picker size="mini" v-model="form.gaugeTime" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="物料:" prop="material">
                                <el-select v-model="form.material" placeholder="物料" clearable size="mini">
                                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12" :offset="6">
                            <el-button type="info" size="mini" @click="verifyTankinitialization">生成初始化记录</el-button>
                            <el-button type="info" size="mini" @click="CancelTankinitialization">返回</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>

        </el-dialog>
        <!-- 批量检尺 -->
        <el-dialog :title="titleBatchScale" :visible.sync="openBatchScale" width="1000px" append-to-body show-close>
            <el-card>
                <el-form ref="form" :model="form" :rules="rules">
                    <el-row :gutter="10">
                        <el-col :span="8" style="margin-top: 10px;">
                            <el-radio v-model="radio" label="1">班检尺</el-radio>
                            <el-radio v-model="radio" label="2">班内检尺</el-radio>
                            <el-radio v-model="radio" label="2">盘点</el-radio>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="时间:" prop="gaugeTime">
                                <el-date-picker v-model="form.gaugeTime" type="datetime" placeholder="选择日期时间" size="mini">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="margin-top: 5px;">
                            <el-button size="mini" type="info" @click="handleRefresh">刷新</el-button>
                            <el-button size="mini" type="info" @click="RelativeDensitConversion">相对密度换算</el-button>
                            <el-button size="mini" type="info" @click="handleopenBatchScale">返回</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8" style="margin-top: 5px;">
                            <el-radio v-model="radio" label="1" @click="Easttank">动罐</el-radio>
                            <el-radio v-model="radio" label="2" @click="selectAll">全选</el-radio>
                            <el-radio v-model="radio" label="2" @click="MultipleChoice">多选</el-radio>
                        </el-col>
                        <el-col :span="8">
                            <el-button size="mini" type="info" @click="handleNew">新建</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button size="mini" type="info" @click="BatchProduction">批量采数</el-button>
                            <el-button size="mini" type="info" @click="BatchCalculation">批量计算</el-button>
                            <el-button size="mini" type="info" @click="HandleSaveer">保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <el-table :data="dataList" style="width: 100%;margin-bottom: 20px;" border
                    @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" align="center" />
                    <el-table-column fixed="left" type="index" align="center" />
                    <el-table-column fixed="left" width="100" label="节点名称" align="center" key="nodeName" prop="nodeName"
                        sortable>
                    </el-table-column>
                    <el-table-column label="物料" width="130" align="center" sortable key="material" prop="material"
                        :show-overflow-tooltip="true" />
                    <el-table-column label="物料别名" align="center" width="100" sortable key="alias" prop="alias"
                        :show-overflow-tooltip="true" />
                    <el-table-column label="罐确认量" align="center" width="100" sortable key="FormulaData" prop="FormulaData"
                        :show-overflow-tooltip="true" />
                    <el-table-column label="计算量" align="center" width="100" sortable key="FormulaData" prop="FormulaData"
                        :show-overflow-tooltip="true" />
                    <el-table-column label="检尺时间" width="100" align="center" sortable key="gaugeTime" prop="gaugeTime"
                        :show-overflow-tooltip="true" />
                    <el-table-column label="人工检尺" align="center" sortable key="GaugeTranData" prop="GaugeTranData"
                        width="80" />
                    <el-table-column label="油温" align="center" sortable key="oilTemperature" prop="oilTemperature"
                        width="80" />
                    <el-table-column label="密度" align="center" sortable key="density" prop="density" width="80" />
                    <el-table-column label="净油容积" align="center" sortable prop="netOilVolume" key="netOilVolume" width="80">
                    </el-table-column>
                    <el-table-column label="仪表检尺" align="center" sortable key="instrumentGauge" prop="instrumentGauge"
                        width="120" />
                    <el-table-column label="偏移量" align="center" sortable key="des2" prop="des2" width="120" />
                    <el-table-column label="水尺高度" align="center" sortable key="waterGaugeHeight" prop="waterGaugeHeight"
                        width="120" />
                    <el-table-column label="水容积" align="center" sortable key="waterVolume" prop="waterVolume" width="120" />
                    <el-table-column label="VCF值" align="center" sortable key="vcf" prop="vcf" width="120" />
                    <el-table-column label="压力" align="center" sortable key="pressure" prop="pressure" width="120" />
                    <el-table-column label="气相温度" align="center" sortable key="atmosphericTemperature"
                        prop="atmosphericTemperature" width="120" />
                    <el-table-column label="气相密度" align="center" sortable key="meteorologicalDensity"
                        prop="meteorologicalDensity" width="120" />
                    <el-table-column label="气相体积" align="center" sortable key="meteorologicalVolume"
                        prop="meteorologicalVolume" width="120" />
                    <el-table-column label="气相质量" align="center" sortable key="meteorologicalQuality"
                        prop="meteorologicalQuality" width="120" />
                    <el-table-column label="液体质量" align="center" sortable key="liquidQuality" prop="liquidQuality"
                        width="120" />
                    <el-table-column label="毛标准质量" align="center" sortable key="grossStandardMass" prop="grossStandardMass"
                        width="120" />
                    <el-table-column label="毛标准体积" align="center" sortable key="grossStandardVolume"
                        prop="grossStandardVolume" width="120" />
                    <el-table-column label="毛计量体积" align="center" sortable key="grossMeteredVolume"
                        prop="grossMeteredVolume" width="120" />
                    <el-table-column label="大气温度" align="center" sortable key="atmosphericTemperature"
                        prop="atmosphericTemperature" width="120" />
                    <el-table-column label="修正油尺" align="center" sortable key="correctedOilGauge" prop="correctedOilGauge"
                        width="120" />
                    <el-table-column label="温度修正" align="center" sortable key="temperatureCorrectionValue"
                        prop="temperatureCorrectionValue" width="120" />
                    <el-table-column label="静压修正" align="center" sortable key="des2" prop="des2" width="120" />
                    <el-table-column label="酸度系数" align="center" sortable key="acidityCoefficient" prop="acidityCoefficient"
                        width="120" />
                    <el-table-column label="介质浓度" align="center" sortable key="des2" prop="des2" width="120" />
                    <el-table-column label="检尺人ID" align="center" sortable key="creator" prop="creator" width="120" />
                    <el-table-column label="录入时间" align="center" sortable key="gaugeTime" prop="gaugeTime" width="120" />
                    <el-table-column label="收付" align="center" sortable key="payment" prop="payment" width="120" />
                    <el-table-column label="提交状态" align="center" sortable key="submissionStatus" prop="submissionStatus"
                        width="120" />
                    <el-table-column label="备注" align="center" sortable key="remark" prop="remark" width="120" />
                    <el-table-column label="最大安全容积" align="center" sortable key="maxSafeVolume" prop="maxSafeVolume"
                        width="120" />
                    <el-table-column label="最小容积" align="center" sortable key="minSafeVolume" prop="minSafeVolume"
                        width="120" />
                    <el-table-column label="最大安全质量" align="center" sortable key="maxSafeCapacity" prop="maxSafeCapacity"
                        width="120" />
                    <el-table-column label="最小质量" align="center" sortable key="minSafeCapacity" prop="minSafeCapacity"
                        width="120" />
                </el-table>
            </el-card>
        </el-dialog>
        <!-- 混合密度 -->
        <el-dialog :title="titleMixingDensity" :visible.sync="openMixingDensity" width="500px" append-to-body show-close>
            <el-card>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="罐:" prop="tank">
                                <el-select disabled v-model="form.tank" placeholder="罐" clearable size="mini">
                                    <el-option v-for="dict in Fulltank" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="物料:" prop="materiel">
                                <el-select disabled v-model="form.materiel" placeholder="物料" clearable size="mini">
                                    <el-option v-for="dict in materiel" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="前检尺(m):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini" v-model="form.unitNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="后检尺(m):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="前油温(℃):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="后油温(℃):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="前密度kg/m3:" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="后密度kg/m3:" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="前体积(m3):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="后体积(m3):" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="混合密度:" prop="unitNum">
                                <el-input type="number" maxlength="11" size="mini"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12" :offset="6">
                            <el-button type="primary" size="mini" @click="ReadDensity">读取密度</el-button>
                            <el-button type="primary" size="mini" @click="handlecompute">计算</el-button>
                            <el-button type="info" size="mini" @click="handleOk">确定</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>

        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "Cangauge",
    components: {},
    data() {
        return {
            radio: "",
            zzType: [],
            materiel: [],//全部物料
            titleMixingDensity: "",//混合title
            openMixingDensity: false,//混合密度弹窗
            titleTankinitialization: "",
            titleBatchScale: "",
            checked: false,
            checked1: false,
            checked2: false,
            checked3: false,
            input3: "",
            input4: "",
            openTankinitialization: false, // 罐初始化 弹窗
            openBatchScale: false,//批量检尺  弹窗
            open: false,
            TankFarm: [],//获取全部罐区
            Fulltank: [],//获取全部罐
            dataList: [],
            value1: new Date(),
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            // 用户表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "classes": "0",
                "tankAreaId": "",
                "tankId": "",
                "time": new Date(),
                "pageNum": 1,
                "pageSize": 10
            },
            // 表单校验
            rules: {},
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
    },
    methods: {
        //读取密度
        ReadDensity() {

        },
        //计算
        handlecompute() {

        },
        //确定
        handleOk() {
            this.openMixingDensity = false
        },
        //混合密度
        MixingDensity() {
            this.openMixingDensity = true;
            this.titleMixingDensity = "物料移动-混合密度";
        },
        //刷新
        handleRefresh() {

        },
        //相对密度换算
        RelativeDensitConversion() {

        },
        //返回
        handleopenBatchScale() {
            this.openBatchScale = false
        },
        //动罐
        Easttank() {

        },
        //全选
        selectAll() {

        },
        //多选
        MultipleChoice() {

        },
        //新建
        handleNew() { },
        //批量采数
        BatchProduction() {

        },
        //批量计算
        BatchCalculation() {

        },
        //保存
        HandleSaveer() {

        },

        //保存
        handleImport() {

        },
        //数据采集
        DataAcquisition() {
            this.$message("数据采集")
        },
        //罐量计算
        TankSizeCalculation() {
            this.$message("罐量计算")
        },
        handleVerify() {
            this.open = false;
            this.submitForm();// 调用新增接口
            this.$message("确认")
        },
        Cancel() {
            this.open = false;
        },
        //生成初始化记录
        verifyTankinitialization() {

        },
        //罐初始化   返回
        CancelTankinitialization() {
            this.openTankinitialization = false;
        },
        CancelBatchScale() {
            this.openBatchScale = false;
        },
        //切换罐弹窗查询
        TankhandleQuery() {
            this.$message.success("查询")
        },
        //弹窗切罐
        cupPing() {
            this.$message.success("切罐")
        },
        UncupPing() {
            this.$message.success("取消切罐")
        },
        toggleRowVisibility(row) {
            row.Editable = true;
        },
        //失焦事件
        handleBlur(row) {
            row.Editable = false
        },
        //仪表名称 改变
        selectBlur(e, row) {
            this.$modal.msgWarning("仪表已改变。请检查对应的侧线和物料信息是否正确。");
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankScaleMeasureSelece({
                ...this.queryParams,
                "time": JSON.stringify(this.queryParams.time).slice(1, 11),
            }).then(res => {
                this.dataList = res.rows
                this.total = res.total
            }
            );
            this.loading = false;
        },
        getOther() {
            //获取全部物料
            this.$api.i_mtrAllList().then(res => {
                this.materiel = res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }));
            })
            //获取全部罐区
            this.$api.i_tankAreaAll().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: " " };
                // 将 "全部" 选项添加到数组的开头
                this.TankFarm = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tankAreaId = this.TankFarm[0].value
            })
            //获取全部罐
            this.$api.i_tankAllList({
                "tankAreaId": this.queryParams.tankAreaId
            }).then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: " " };
                // 将 "全部" 选项添加到数组的开头
                this.Fulltank = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tankId = this.Fulltank[0].value
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "acidityCoefficient": "",
                "alias": "",
                "alkalinityCoefficient": "",
                "atmosphericTemperature": "",
                "correctedOilGauge": "",
                "creator": "",
                "density": "",
                "gaugeTime": "",
                "gaugeType": "",
                "grossMeteredVolume": "",
                "grossStandardMass": "",
                "grossStandardVolume": "",
                "id": undefined,
                "instrumentGauge": "",
                "liquidQuality": "",
                "mainId": undefined,
                "manualGaugeHeight": "",
                "material": "",
                "maxSafeCapacity": "",
                "maxSafeVolume": "",
                "meteorologicalDensity": "",
                "meteorologicalQuality": "",
                "meteorologicalTemperature": "",
                "meteorologicalVolume": "",
                "minSafeCapacity": "",
                "minSafeVolume": "",
                "netOilMass": "",
                "netOilVolume": "",
                "oilTemperature": "",
                "pressure": "",
                "remark": "",
                "status": "",
                "tankVolume": "",
                "temperatureCorrectionValue": "",
                "vcf": "",
                "waterContentRatio": "",
                "waterGaugeHeight": "",
                "waterVolume": ""
            };
            this.resetForm("form");
        },
        //罐初始化
        handleChangTank() {
            if (this.queryParams.tank != " ") {
                this.openTankinitialization = true
                this.titleTankinitialization = "罐区-罐初始化"
            } else {
                this.$message.error("请选择罐")
            }
        },
        // 批量检尺
        handleBatchScale() {
            if (this.queryParams.tankfarm != " ") {
                this.openBatchScale = true
                this.titleBatchScale = "批量检尺信息录入"
            } else {
                this.$message.error("请选择罐区")
            }
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            if (this.queryParams.tank != " ") {
                this.reset();
                this.open = true;
                this.title = "罐检尺信息录入";
            } else {
                this.$message.error("请选择罐")

            }
        },
        //更新
        handleRenewal() {
            this.$message("更新")
        },

        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_tankScaleMeasureAdd({
                            "acidityCoefficient": this.form.acidityCoefficient,
                            "alias": this.form.alias,
                            "alkalinityCoefficient": this.form.alkalinityCoefficient,
                            "atmosphericTemperature": this.form.atmosphericTemperature,
                            "correctedOilGauge": this.form.correctedOilGauge,
                            "creator": this.form.creator,
                            "density": this.form.density,
                            "gaugeTime": this.form.gaugeTime,
                            "gaugeType": this.form.gaugeType,
                            "grossMeteredVolume": this.form.grossMeteredVolume,
                            "grossStandardMass": this.form.grossStandardMass,
                            "grossStandardVolume": this.form.grossStandardVolume,
                            "id": this.form.id,
                            "instrumentGauge": this.form.instrumentGauge,
                            "liquidQuality": this.form.liquidQuality,
                            "mainId": this.form.mainId,
                            "manualGaugeHeight": this.form.manualGaugeHeight,
                            "material": this.form.material,
                            "maxSafeCapacity": this.form.maxSafeCapacity,
                            "maxSafeVolume": this.form.maxSafeVolume,
                            "meteorologicalDensity": this.form.meteorologicalDensity,
                            "meteorologicalQuality": this.form.meteorologicalQuality,
                            "meteorologicalTemperature": this.form.meteorologicalTemperature,
                            "meteorologicalVolume": this.form.meteorologicalVolume,
                            "minSafeCapacity": this.form.minSafeCapacity,
                            "minSafeVolume": this.form.minSafeVolume,
                            "netOilMass": this.form.netOilMass,
                            "netOilVolume": this.form.netOilVolume,
                            "oilTemperature": this.form.oilTemperature,
                            "pressure": this.form.pressure,
                            "remark": this.form.remark,
                            "status": this.form.status,
                            "tankVolume": this.form.tankVolume,
                            "temperatureCorrectionValue": this.form.temperatureCorrectionValue,
                            "vcf": this.form.vcf,
                            "waterContentRatio": this.form.waterContentRatio,
                            "waterGaugeHeight": this.form.waterGaugeHeight,
                            "waterVolume": this.form.waterVolume,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankScaleMeasureAdd(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_tankScaleMeasureDelete({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}</style>
