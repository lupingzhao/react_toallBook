import api from "../../../http/api"
import { Toast } from "zarm"
import * as _ from 'lodash'
import { useHistory } from 'react-router-dom';
// 账单

//账单列表
export const billList = (date: string, page: number, page_size: number, type_id?: string, more = false) => {
    return (dispatch: any) => {
        // 发请求
        api.billList(date, page, page_size, type_id).then((res: any) => {
            // 触发reducer的方法
            // console.log(res);
            if (res.code === 200) {
                // console.log(7980);
                // 用于图表数据
                let zc1 = [] as any
                let sr1 = [] as any
                let zc2 = [] as any
                let sr2 = [] as any
                let zc3 = [] as any
                let sr3 = [] as any

                res.data.list.map((item: any) => {
                    return item.bills.map((item1: any) => {
                        if (item1.pay_type === 1) {
                            zc3.push(item1)
                            zc1.push({ value: Number(item1.amount), name: item1.type_name, type: item1.type_id })
                        } else {
                            sr3.push(item1)
                            sr1.push({ value: Number(item1.amount), name: item1.type_name, type: item1.type_id })
                        }
                    })

                })
                zc1 = _.groupBy(zc1, 'name')
                sr1 = _.groupBy(sr1, 'name')
                Object.keys(zc1).map((item: any) => {
                    let sum = 0
                    zc1[item].map((item1: any) => {
                        sum += item1.value
                    })
                    zc2.push({
                        value: sum,
                        name: item
                    })
                })
                Object.keys(sr1).map((item: any) => {
                    let sum = 0
                    sr1[item].map((item1: any) => {
                        sum += item1.value
                    })
                    sr2.push({
                        value: sum,
                        name: item
                    })
                })
                dispatch({
                    type: 'billList',
                    data: [zc3, sr3],
                    datas: res.data.list,
                    total: [res.data.totalExpense, res.data.totalIncome],
                    zc: zc2,
                    sr: sr2,
                    more
                })
                // console.log(res.data.list);
            } else {
                Toast.show(res.msg)
                // window.location.href = '/login'
            }
        }).catch((err: any) => {
            console.log(err)
        })
    }
}
// 添加账单
export const addBill = (amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark?: string) => {
    return (dispatch: any) => {
        // 发请求
        api.addBill(amount, type_id, type_name, date, pay_type, remark).then((res: any) => {
            // console.log(res);
            // 触发reducer的方法
            if (res.code === 200) {
                dispatch({
                    type: 'addBill',
                    data: true
                })
                Toast.show(res.msg)
            } else Toast.show(res.msg)
        }).catch((err: any) => {
            console.log(err)
        })
    }
}
// 账单详情

export const details = (id: string) => {
    return (dispatch: any) => {
        // 发请求
        api.details(id).then((res: any) => {
            console.log(res.data);
            // 触发reducer的方法
            dispatch({
                type: 'details',
                data: res.data
            })
        }).catch((err: any) => {
            console.log(err)
        })
    }
}
// 编辑账单

export const editBill = (id: number, amount: string, type_id: number, type_name: string, date: number, pay_type: number, remark: string) => {
    return (dispatch: any) => {
        // 发请求
        api.editBill(id, amount, type_id, type_name, date, pay_type, remark).then((res: any) => {
            // console.log(res);
            // 触发reducer的方法
            dispatch({
                type: 'editBill',
                data: res.data
            })
        }).catch((err: any) => {
            console.log(err)
        })
    }
}
// 删除
export const delBill = (id: string) => {
    return (dispatch: any) => {
        // 发请求
        api.delBill(id).then((res: any) => {
            // console.log(res);
            // 触发reducer的方法
            dispatch({
                type: 'delBill',
                data: res.data
            })
            Toast.show(res.msg)
        }).catch((err: any) => {
            console.log(err)
        })
    }
}
// 
// 数据统计
export const statistical = (date: string) => {
    return (dispatch: any) => {
        // 发请求
        api.statistical(date).then((res: any) => {
            console.log(res);
            // 触发reducer的方法
            dispatch({
                type: 'statistical',
                data: res.data.data
            })

        }).catch((err: any) => {
            console.log(err)
        })
    }
}

