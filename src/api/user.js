import http from '@/utils/http.js'
// import { CancelToken } from 'axios'
// import axios from 'axios'
// let calcelFind = function () {}

export const getUsers = ({ query = '', pagenum = 1, pagesize = 20 }) =>
  // calcelFind ()
  http({
    url: '/users',
    method: 'GET',
    params: {
      query,
      pagenum,
      pagesize
    }
    // cancelToken: new CancelToken(function executor(c) {
    //   calcelFind = c
    // })
  }).then(res => res.data)

// 2.0   添加用户
//
// username   // 用户名称   // 不能为空
// password   // 用户密码   // 不能为空
// email    // 邮箱   // 可以为空
// mobile   // 手机号
// "meta": {
//   "msg": "用户创建成功",
//   "status": 201

export const addUser = (addUserData) => {
  return http({
    url: 'users',
    method: 'POST',
    data: {
      username: addUserData.username,
      password: addUserData.password,
      email: addUserData.email,
      mobile: addUserData.mobile
    }
  }).then(res => res.data)
}

// 3.0修改用户状态
//   - users/:uId/state/:type
// - 请求方法：put
// uId      // 用户 ID  // 不能为空携带在url中
// type   // 用户状态   // 不能为空携带在url中，值为 true 或者 false

export const updataUserState = ({ uId, type }) =>
  http({
    url: `/users/${uId}/state/${type}`,
    method: 'PUT'
  }).then(res => res.data)

// 4.0  根据 ID 查询用户信息
//   - ：users/:id    // - 请求方法：get
// id   // 用户 ID
// - 请求路径：users/:id
// - 请求方法：get
// "data": {
//   "id": 503,
//   "username": "admin3",
//   "role_id": 0,
//   "mobile": "00000",
//   "email": "new@new.com"
// },
// "meta": {
//   "msg": "更新成功",
//   "status": 200
// }

export const queryUserById = id => {
  return http({
    method: 'GET',
    url: `/users/${id}`
  }).then(res => res.data)
}
// 5.0编辑用户
// - 请求路径：users/:id
// - 请求方法：put
// id
// email
// mobile

export const editUserById = (id, { email, mobile }) => http({
  method: 'PUT',
  url: `users/${id}`,
  data: {
    email,
    mobile
  }
}).then(res => res.data)
/*
  6.0 删除用户

  - 请求路径：users/:id
  - 请求方法：delete
  - 请求参数

      id
    用户 id
    不能为空参数是url参数:id

    {
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
*/

export const delUser = id => http({
  method: 'DELETE',
  url: `/users/${id}`,
  params: {
    id
  }
}).then(res => res.data)
/*
  7.0 分配角色
 */

export const editRole = ({ id, rid }) =>
  http({
    url: `users/${id}/role`,
    method: 'PUT',
    data: {
      rid
    }
  }).then(res => res.data)
/*
  8.0分配用户角色

- 请求路径：users/:id/role
- 请求方法：put
- 请求参数

  参数名 	参数说明 	备注
  id  	用户 ID	不能为空参数是url参数:id
  rid 	角色 id	不能为空参数body参数
*/
export const partUserRole = ({ id, rid }) =>
  http({
    url: `users/${id}/role`,
    method: 'PUT',
    data: {
      rid
    }
  }).then(res => res.data)
