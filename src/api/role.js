import http from '@/utils/http.js'
/**
 * 1.0 获取角色
 * 请求路径：roles

请求方法：get

 */
export const getRoles = () =>
  http({
    method: 'GET',
    url: '/roles'
  }).then(res => res.data)
/**
 * 2.0 添加角色
- 请求路径：roles
- 请求方法：post
- 请求参数
  参数名     	参数说明	备注
  roleName	角色名称	不能为空
  roleDesc	角色描述	可以为空
 */
export const addRole = ({ roleName, roleDesc }) =>
  http({
    method: 'POST',
    url: '/roles',
    data: {
      roleName,
      roleDesc
    }
  }).then(res => res.data)
/**
 * 3.0根据 ID 查询角色
- 请求路径：roles/:id
- 请求方法：get
- 请求参数

  参数名 	参数说明 	备注
  :id 	角色 ID	不能为空携带在url中


 */
export const queryRole = id =>
  http({
    method: 'get',
    url: `/roles/${id}`,
  }).then(res => res.data)
/**
 * 4.0 编辑提交角色
- 请求路径：roles/:id
- 请求方法：put
- 请求参数

  参数名     	参数说明 	备注
  :id     	角色 ID	不能为空携带在url中
  roleName	角色名称 	不能为空
  roleDesc	角色描述 	可以为空
 */
export const editRole = (id, { roleName, roleDesc }) =>
  http({
    method: 'PUT',
    url: `/roles/${id}`,
    data: {
      roleName,
      roleDesc
    }
  }).then(res => res.data)
/**
 * 5.0删除角色
 * 请求路径：roles
 * - 请求路径：roles/:id
- 请求方法：delete
- 请求参数
 */
export const delRole = id =>
  http({
    method: 'DELETE',
    url: `/roles/${id}`
  }).then(res => res.data)
/**
 * 6.0角色授权
 * - 请求路径：roles/:roleId/rights
    - 请求方法：post
    - 请求参数

      参数名    	参数说明    	备注
      :roleId	角色 ID   	不能为空携带在url中
      rids   	权限 ID 列表	以 , 分割的权限 ID 列表

 */
export const rightManagement = (roleId, { rids }) =>
  http({
    method: 'POST',
    url: `/roles/${roleId}/rights`,
    data: {
      rids
    }
  }).then(res => res.data)
/**
 * 7.0删除角色指定权限
// - 请求路径：roles/:roleId/rights/:rightId
// - 请求方法：delete
// - 请求参数
//   参数名     	参数说明 	备注
//   :roleId 	角色 ID	不能为空携带在url中
//   :rightId	权限 ID	不能为空携带在url中
// - 响应数据说明
 */
export const delSpecialRight = ({ roleId, rightId }) =>
  http({
    method: 'DELETE',
    url: `/roles/${roleId}/rights/${rightId}`
  }).then(res => res.data)
