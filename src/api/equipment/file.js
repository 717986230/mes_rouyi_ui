import request from '@/utils/request'

export const fileApi = {
  // 文件上传
  filesUpload(param) {
    return request({
      url: '/file/upload',
      method: "POST",
      data: param,
    })
  }
}


