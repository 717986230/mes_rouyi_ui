import filePreview from '../common/filePreview.vue'
export default {
  components:{
    filePreview,
  },
  data () {
    return {
      fileDialogVisible:false,
      file:{
        fileUrl:'',
        fileType:'',
        fileName:'',
      }
    }
  },
  methods: {
    handlePreview(row){
      console.log('点击预览文件',row)
      let {fileUrl,fileType,fileName } = row
      this.file = {fileUrl,fileType,fileName }
      this.fileDialogVisible = true
    },
    handleDownload(){
      this.msgSuccess('下载成功')
    }
  }
}
