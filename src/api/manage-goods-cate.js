/**
 * 商品分类管理
 */
import http from '@/utils/http.js'

// 1.0商品数据列表

// - 请求路径：categories
// - 请求方法：get
// - 请求参数

//   参数名 	参数说明   	备注
//   type	[1,2,3]	值：1，2，3 分别表示显示一层二层三层分类列表

export const getGoodsCateList = (type) =>
  http({
    method: 'GET',
    url: '/categories',
    params: {
      type
    }
  }).then(res => res.data)

// 2.0添加分类

// - 请求路径：categories
// - 请求方法：post
// - 请求参数

//   参数名      	参数说明  	备注
//   cat_pid  	分类父 ID	不能为空
//   cat_name 	分类名称  	不能为空
//   cat_level	分类层级  	不能为空

export const addGoodsList = ({
    cat_pid,
    cat_name,
    cat_level
  }) =>
  http({
    method: 'post',
    url: '/categories',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  }).then(res => res.data)
// 3.0根据 id 查询分类

// - 请求路径：categories/:id
// - 请求方法：get
// - 请求参数

//   参数名 	参数说明 	备注
//   :id 	分类 ID	不能为空携带在url中

// - 响应数据

export const queryGoodsCate = id =>
  http({
    method: 'GET',
    url: `categories/${id}`
  }).then(res => res.data)
// 4.0编辑提交分类

// - 请求路径：categories/:id
// - 请求方法： put
// - 请求参数

//   参数名     	参数说明 	备注
//   :id     	分类 ID	不能为空携带在url中
//   cat_name	分类名称 	不能为空

export const editGoodsCate = (id, cat_name) =>
  http({
    method: 'put',
    url: `categories/${id}`,
    data: {
      cat_name
    }
  }).then(res => res.data)
// 5.0删除分类

// - 请求路径：categories/:id
// - 请求方法：delete
// - 请求参数

//   参数名 	参数说明 	备注
//   :id 	分类 ID	不能为空携带在url中

export const delGoodsCateById = (type) =>
  http({
    method: 'GET',
    url: '/categories',
    params: {
      type: [1]
    }
  }).then(res => res.data)
