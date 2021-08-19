import http from "./"

export default {
  // 注册
  register(username: string, password: string) {
    return http.post('/api/user/register', {
      username, // 用户名
      password, // 密码
    })
  },
  // 登陆
  login(username: string, password: string) {
    return http.post('/api/user/login', {
      username, // 用户名
      password, // 密码
    })
  },
  // 获取用户信息
  userInfo() {
    return http.get('/api/user/get_userinfo')
  },
  // 修改个性签名
  signature(signature: string, avatar: string) {
    return http.post('/api/user/edit_userinfo', {
      signature,
      avatar
    })
  },
  // 上传
  upLoad(files: any) {
    return http.post('/api/upload', {
      files
    })
  },
  // 修改密码
  editPassword(old_pass: string, new_pass: string, new_pass2: string) {
    return http.post('/api/user/modify_pass', {
      old_pass, // 原密码
      new_pass, // 新密码
      new_pass2, // 确认新密码
    })
  },
  // 消费类型
  consumption() {
    return http.get('/api/type/list')
  },
  // 账单
  // , {
  // date, // 月份
  //   page, // 分页
  //   page_size, // 分页大小默认 5
  //  , // 类型 id，不传默认所有
  // }
  bill(date: string, page: number, page_size: number, type_id: string) {
    return http.get(`/api/bill/list?date=${date}&page=${page}&page_size=${page_size}&type_id=${type_id}`)
  },
  //   date: '1609233153302', // 月份
  //   page: 1, // 分页
  //   page_size: 5, // 分页大小默认 5
  //   type_id: '1', // 类型 id，不传默认所有
  // // }
  //账单列表
  billList(date: string, page: number, page_size: number, type_id?: string) {

    return type_id ? http.get(`/api/bill/list?date=${date}&page=${page}&page_size=${page_size}&type_id=${type_id}`) : http.get(`/api/bill/list?date=${date}&page=${page}&page_size=${page_size}`)
  },

  // 添加账单
  addBill(amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark?: string) {

    if (remark) {
      return http.post('/api/bill/add', {
        amount, // 订单金额
        type_id, // 消费类型id
        type_name, // 消费类型名称
        date,// 消费时间
        pay_type, // 账单类型 1:支出 2:收入
        remark, // 备注
      })
    } else {
      return http.post('/api/bill/add', {
        amount, // 订单金额
        type_id, // 消费类型id
        type_name, // 消费类型名称
        date,// 消费时间
        pay_type, // 账单类型 1:支出 2:收入
      })
    }
  },
  // 账单详情
  details(id: string) {
    return http.get(`/api/bill/detail?id=${id}`)
  },
  // 编辑账单
  editBill(id: number, amount: string, type_id: number, type_name: string, date: number, pay_type: number, remark: string) {
    return http.post('/api/bill/update',
      {
        id, // 账单 id
        amount, // 订单金额
        type_id, // 消费类型id
        type_name, // 消费类型名称
        date,// 消费时间
        pay_type, // 账单类型 1:支出 2:收入
        remark, // 备注
      }
    )
  },
  delBill(id: string) {
    return http.post('/api/bill/delete', {
      id
    })
  },
  // 数据统计
  statistical(date: string) {
    return http.get(`/api/bill/data?date=${date}`)
  }

}