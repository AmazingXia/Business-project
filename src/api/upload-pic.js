// 图片上传

// - 请求路径：upload
// - 请求方法：post
// - 请求参数

//   参数名 	参数说明	备注
//   file	上传文件
import http from '@/utils/http.js'

export const uploadPic = ({
    query = '',
    pagenum = 1,
    pagesize = 10
  }) =>
  http({
    method: 'POST',
    url: '/upload',
    data: {
      file
    }
  }).then(res => res.data)
