const initState = {
  users: [],
  list: [],
  useInfo: '',
  // 注册是否请求成功
  registerboo: false,
  signature: ''
}

interface Action {
  type: string,
  data: any
}

const userReducers = (state = initState, action: Action) => {

  if (action.type === 'register') {
    return {
      ...state,
      registerboo: action.data
    }
  }
  if (action.type === 'login') {
    return {
      ...state,
      registerboo: action.data
    }
  }
  if (action.type === 'userInfo') {
    // console.log(action.data)
    return {
      ...state,
      useInfo: action.data

    }
  }
  if (action.type === 'signature') {
    return {
      ...state,
      signature: action.data
    }
  }
  if (action.type === 'editPassword') {
    return {
      ...state,
      registerboo: action.data
    }
  }
  if (action.type === 'consumption') {
    return {
      ...state,
      list: action.data
    }
  }
  if (action.type === 'upLoad') {
    return {
      ...state,
      users: action.data
    }
  }
  return {
    ...state
  }
}

export default userReducers