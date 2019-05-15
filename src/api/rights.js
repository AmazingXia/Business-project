import http from '@/utils/http.js'
//  1.0 所有权限列表
// - 请求路径：rights/:type
// - 请求方法：get
// - 请求参数
//   参数名 	参数说明	备注
//   type	类型  	值: list 或 tree , list 列表显示权限, tree 树状显示权限,参数是url参数:type

export const getAllRights = (type = 'tree') =>
  http({
    method: 'GET',
    url: `/rights/${type}`
  }).then(res => res.data)
  // 2.0左侧菜单权限
  // - 请求路径：menus
  // - 请求方法：get
  // - 响应数据

export const getMenus = () =>
  http({
    method: 'GET',
    url: `/menus`
  }).then(res => res.data)
  // "data":
  //       {
  //           "id": 101,
  //           "authName": "商品管理",
  //           "path": null,
  //           "children": [
  //               {
  //                   "id": 104,
  //                   "authName": "商品列表",
  //                   "path": null,
  //                   "children": []
  //               }
  //           ]
  //       }
  //   "meta": {
  //       "msg": "获取菜单列表成功",
  //       "status": 200
  //   }
