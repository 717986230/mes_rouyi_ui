<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-sort-down" size="mini" @click="handleDataAcquisition">数据采集</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-edit" size="mini" @click="handleTankCapacityCalc">罐量计算</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-edit-outline" size="mini" @click="handleTableCalc">表计量</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-check" size="mini" @click="handleConfirm">确定</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="success" plain icon="el-icon-close" size="mini" @click="handleCancel">取消</el-button>
                </el-col>
            </el-row>
            <el-collapse v-model="activeName">
                <el-collapse-item title="详细信息" name="1">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="罐:" prop="UnitRdType">
                                <el-select v-model="form.UnitRdType" @change="form.UnitRdType=$event,operationChange($event)">
                                    <el-option v-for="(dict,index) in $parent.$parent.materielList" :key="dict.value2+index"
                                               :label="dict.label2" :value="dict.label2"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16"></el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="检尺类型:" prop="DlvNode" style="width: 90%">
                                <el-select v-model="form.ChkTypeName" @change="DlvNodeChange($event)">
                                    <el-option label="料仓检尺" value="料仓检尺"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料别名:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="检尺人:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="检尺时间:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仪表油尺:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="油温(℃):" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水尺(m):" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="人工油尺(m):" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="压力(Mpa):" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水率(%):" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="标准密度(kg/m3):" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="介质浓度:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="酸碱系数:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水量:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="气相温度:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="大气温度:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修正油尺:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="空尺计量输出" name="2">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="气相温度:" prop="DlvNode" style="width: 90%">
                                <el-checkbox v-model="form.checked">是否空尺</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16"></el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="空尺:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="量油尺修正:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="浸油高度:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="罐量计算结果" name="3">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="偏移量:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水容积:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VCF:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="净油容积量:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="静压修正值:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="液体质量:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="气相密度:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相体积:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相质量:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="温度修正值:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毛计量体积:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="盈亏量:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="最大安全容积:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最大安全量:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="净油质量:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="最小安全容积:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最小安全量:" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="罐确认量:" style="width: 90%">
                                <el-input v-model="form.TankNodeAlias" disabled/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="备注:" prop="DlvNode" style="width: 90%">
                                <el-input v-model="form.TankNodeName" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16"/>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "infoEntry",
    data(){
        return{
            activeName:'1',
            form:{},
            rules:[

            ]
        }
    },
    created() {
        console.log('子组件获取父组件数据', this.$parent.$parent)
    },
    methods: {
        handleDataAcquisition() {

        },
        handleTankCapacityCalc() {

        },
        handleTableCalc() {

        },
        handleConfirm() {

        },
        handleCancel() {
        }
    }
}
</script>

<style scoped>

</style>
