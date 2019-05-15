/**
 * 商品管理列表
 *
 *
 */


import http from '@/utils/http.js'

// 1.0商品数据列表

// - 请求路径：categories
// - 请求方法：get
// - 请求参数

//   参数名 	参数说明   	备注
//   type	[1,2,3]	值：1，2，3 分别表示显示一层二层三层分类列表

// "data": {
//   "total": 50,
//   "pagenum": "1",
//   "goods": [
//       {
//           "goods_id": 144,
//           "goods_name": "asfdsd",
//           "goods_price": 1,
//           "goods_number": 1,
//           "goods_weight": 1,
//           "goods_state": null,
//           "add_time": 1512954923,
//           "upd_time": 1512954923,
//           "hot_mumber": 0,
//           "is_promote": false
//       }
//   ]
// },
export const getGoodsList = ({
    query = '',
    pagenum = 1,
    pagesize = 10
  } = {}) =>
  http({
    method: 'GET',
    url: '/goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  }).then(res => res.data)

// 2.0添加商品

// - 请求路径：goods
// - 请求方法：post
// - 请求参数

//   参数名            	参数说明         	备注
//   goods_name     	商品名称         	不能为空
//   goods_cat      	以为','分割的分类列表 	不能为空
//   goods_price    	价格           	不能为空
//   goods_number   	数量           	不能为空
//   goods_weight   	重量           	不能为空
//   goods_introduce	介绍           	可以为空
//   pics           	上传的图片临时路径（对象）	可以为空
//   attrs          	商品的参数（数组）    	可以为空
export const addGoodsList = ({
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs
  }) =>
  http({
    method: 'post',
    url: '/goods',
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs
    }
  }).then(res => res.data)
// 3.0根据 ID 查询商品

// - 请求路径：goods/:id
// - 请求方法：get
// - 请求参数

//   参数名 	参数说明 	备注
//   id  	商品 ID	不能为空携带在url中
export const queryGoodsById = id =>
  http({
    method: 'GET',
    url: `/goods/${id}`
  }).then(res => res.data)
// 4.0编辑提交商品

// - 请求路径：goods/:id
// - 请求方法：put
// - 请求参数

//   参数名            	参数说明         	备注
//   id             	商品 ID        	不能为空携带在url中
//   goods_name     	商品名称         	不能为空
//   goods_price    	价格           	不能为空
//   goods_number   	数量           	不能为空
//   goods_weight   	重量           	不能为空
//   goods_introduce	介绍           	可以为空
//   pics           	上传的图片临时路径（对象）	可以为空
//   attrs          	商品的参数（数组）    	可以为空
export const editgoods = (id, {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs
  }) =>
  http({
    method: 'PUT',
    url: `/goods/${id}`,
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs
    }
  }).then(res => res.data)
// 5.0删除商品

// - 请求路径：goods/:id
// - 请求方法：delete
// - 请求参数

//   参数名 	参数说明 	备注
//   id  	商品 ID

export const delGoodsById = id =>
  http({
    method: 'delete',
    url: `/goods/${id}`
  }).then(res => res.data)
// 6.0同步商品图片

// - 请求路径：goods/:id/pics
// - 请求方法：put
// - 请求参数

//   参数名 	参数说明  	备注
//   id  	商品 ID 	不能为空携带在url中
//   pics	商品图片集合	如果有 pics_id 字段会保留该图片，如果没有 pics_id 但是有 pic 字段就会新生成图片数据

export const ayscGoodsPic = (id, pics) =>
  http({
    method: 'PUT',
    url: `/goods/${id}/pics`,
    data: {
      pics
    }

  }).then(res => res.data)
// 7.0同步商品属性

// - 请求路径：goods/:id/attributes
// - 请求方法：put
// - 请求参数

//   参数名 	参数说明 	备注
//   id  	商品 ID	不能为空携带在url中
export const ayscGoodsAttr = id =>
  http({
    method: 'PUT',
    url: `/goods/${id}/attributes`
  }).then(res => res.data)
