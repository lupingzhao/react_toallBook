const initState = {
    billList: [],
    billLists: [[], []],
    bill: [],
    detailBill: '',
    total: [0, 0],
    zc: '',
    sr: ''
}

interface Action {
    type: string,
    data: any,
    total: any
    datas: any
    registerboo?: boolean
    zc: any
    sr: any,
    more: boolean
}

const billReducers = (state = initState, action: Action) => {
    if (action.type === 'bill') {
        return {
            ...state,
            bill: action.data,
        }
    }
    if (action.type === 'billList') {
        // console.log(action.zc);
        return {
            ...state,
            // 是否分页 加载更多   action.more控制
            billLists: action.more ? [...state.billLists, ...action.datas] : action.datas,
            billList: action.data,
            total: action.total,
            zc: action.zc,
            sr: action.sr,
        }
    }
    if (action.type === 'addBill') {
        return {
            ...state,
            bill: action.data,
        }
    }
    if (action.type === 'details') {
        return {
            ...state,
            detailBill: action.data,
        }
    }
    if (action.type === 'editBill') {
        return {
            ...state,
            bill: action.data,
        }
    }
    if (action.type === 'delBill') {
        return {
            ...state,
            bill: action.data,
        }
    }
    if (action.type === 'statistical') {
        return {
            ...state,
            bill: action.data,
        }
    }

    return {
        ...state
    }
}

export default billReducers