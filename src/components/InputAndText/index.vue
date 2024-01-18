<template>
    <div>
        <div @click="isEdit = true" v-if="!isEdit">
           {{thisVal}}
        </div>
        <div v-else>
            <el-input v-if="inputType == 'number'" v-model="thisVal" type="number" maxlength="11" size="mini" @keyup.enter.native="valChange" @blur="valChange"></el-input>
            <el-input v-if="inputType == 'text'" v-model="thisVal" size="mini" @keyup.enter.native="valChange" @blur="valChange"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'inputAndText',
    props:{
        value:{
            type:String|Number,
            default:()=>''
        },
        inputType:{
            type:String,
            default:'number'
        }
    },
    watch:{
        value: {
            handler(val) {
                if (val) {
                    this.thisVal = val
                } else {
                    this.thisVal = ''
                }
            },
            deep: true,
            immediate: true
        },
    },
    data(){
        return{
            thisVal:'',
            isEdit:false
        }
    },
    methods:{
        valChange(){
            this.$emit('input',this.thisVal)
            this.isEdit = false
        }
    }
}
</script>

<style scoped>

</style>
