<!--文件预览-->
<template>
    <el-dialog class="file-dialog" :title="file.fileName" append-to-body style="" :visible.sync="thisDialogVisible" :close-on-click-modal="true" @close="close">
        <vue-office-pdf
            v-if="file.fileType === 'pdf'"
            style="width: 100%; height: 100%"
            :src="file.fileUrl"
            @rendered="renderedHandler"
            @error="errorHandler"
        />
        <vue-office-docx
            v-if="file.fileType === 'docx'"
            style="width: 100%; height: 100%"
            :src="file.fileUrl"
            @rendered="renderedHandler"
            @error="errorHandler"
        />
        <vue-office-excel
            v-if="file.fileType === 'excel'"
            style="width: 100%; height: 100%"
            :src="file.fileUrl"
            @rendered="renderedHandler"
            @error="errorHandler"
        />
    </el-dialog>
</template>

<script>
import VueOfficePdf from "@vue-office/pdf";
import VueOfficeDocx from "@vue-office/docx";
import VueOfficeExcel from "@vue-office/excel";
export default {
    name: 'filePreview',
    components: {
        VueOfficePdf,VueOfficeDocx,VueOfficeExcel
    },
    props:{
        file:{
            type:Object,
            default(){
                return {
                    fileUrl:'',
                    fileType:'',
                    fileName:''
                }
            }
        },
        dialogVisible:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {
      thisDialogVisible(){
          return this.dialogVisible
      }
    },
    methods:{
        close(){
          this.$emit('close')
        },
        renderedHandler() {
            console.log("渲染完成");
        },
        errorHandler() {
            console.log("渲染失败");
        },
    }
}
</script>

<style scoped>
::v-deep .el-dialog{
    margin: 0 !important;
    width: 100%;
}
.file-dialog{
    overflow-x: hidden;
    top: 10vh;
    height: 80vh;
    width: 70vw;
    left: 15vw;
    background-color: #ffffff
}
::v-deep .docx-wrapper{
    background-color: #ffffff !important;
}
::v-deep .vue-office-pdf-wrapper{
    background-color: #ffffff !important;
}
</style>