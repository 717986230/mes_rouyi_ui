<!--规则配置-->
<template>
<div>
    <el-row>
        <el-col :span="12" class="p20">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>平衡规则</span>
                </div>
                <el-table border :data="ruleData">
                    <el-table-column label="节点名称" prop="ItemName"></el-table-column>
                    <el-table-column label="启用标识">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.Num"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="12" class="p20">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>平衡参数</span>
                </div>
                <el-form :form="LoadResult" label-width="150px" label-position="left">
                    <el-form-item :label="LoadResult.deltaData[0].ConfigName+'(%)：'">
                        <el-input-number v-model="LoadResult.delta" :controls="false" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="LoadResult.ratioData[0].ConfigName+'(%)：'">
                        <el-input-number v-model="LoadResult.ratio" :controls="false" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="LoadResult.compData[0].ConfigName+'(%)：'">
                        <el-input-number v-model="LoadResult.comp" :controls="false" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="24" class="flex align-center justify-center">
            <el-button type="success" plain @click="submit">保存</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: 'index',
    data(){
        return{
            ruleData:[],//平衡规则
            LoadResult:null,//平衡参数
        }
    },
    created() {
        this.getData()
    },
    methods:{
        getData(){
            this.$api.RuleData({}).then((res) => {
                 if (res.code == 200) {
                      console.log('接口成功', res)
                     this.ruleData = res.data
                    } else {
                      console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            this.$api.LoadResult({}).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.LoadResult = res.data
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        submit(){
            console.log('保存参数=',this.ruleData ,this.LoadResult)
        }
    }
}
</script>

<style scoped>

</style>
