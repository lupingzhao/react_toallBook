import React, { useState, useRef, useEffect } from 'react'
import dayjs from '_dayjs@1.10.6@dayjs';
import styles from '../../App.module.scss'
import { useComputed } from './../../hooks/useComputed/index';
import { useHistory } from 'react-router-dom';
import { Pull } from 'zarm'

interface props {
  billLists: any
  upload: (val: number) => void
}
const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};
const BillLists = (props: props) => {
  let [toaspend, setToaSpend] = useState<number[]>([])
  let [toacome, setToacome] = useState<number[]>([])
  let history = useHistory()
  // 图标
  let icons = ['icon-canyin', 'icon-fushi2', 'icon-jiaotong', 'icon-zhuye', 'icon-gouwu1', 'icon-boshimao', 'icon-yiliao', 'icon-lvxing', 'icon-pengyou', 'icon-jinqianjinbi-', 'icon-gongzi', 'icon-jiangjin', 'icon-zhuanzhang', 'icon-licai', 'icon-duizhang-tuikuan', 'icon-jinqianjinbi--copy']


  let toview = (val: any) => {
    // console.log(val);
    history.push('/EditBill', { data: val })
  }
  const pullRef = useRef();
  const [bodyScroll, setBodyScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  // 模拟加载更多数据
  const loadData = () => {
    setLoading(LOAD_STATE.loading)
    props.upload(0)
  };

  // 刷新
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    props.upload(1)
    setTimeout(() => {
      setRefreshing(REFRESH_STATE.success);
    }, 2000);
  };
  //计算
  useComputed(() => {
    let spend = [] as any
    let come = [] as any
    props.billLists.map((item: any, index: number) => {
      spend.push(0)
      come.push(0)
      item.bills && item.bills.map((item1: any) => {
        if (item1.pay_type === 1) {
          spend[index] += Number(item1.amount)
        } else {
          come[index] += Number(item1.amount)
        }
      })
    })
    return setToaSpend(spend), setToacome(come)

  }, props.billLists)

  return (
    <Pull
      ref={pullRef}
      refresh={{
        state: refreshing,
        handler: refreshData,
      }}
      load={{
        state: loading,
        distance: 200,
        handler: loadData,
      }}
    >
      <div className={`${styles.BillLists} p-10`} style={{ marginBottom: '0%' }} >
        <div className='p-10' >
          {props.billLists.length && props.billLists.map((item: any, index: number) => {
            return (
              <div key={index} className='mb-10 p-10' style={{ boxShadow: '0 0 3px gray' }}>
                <div className='flex jcsb mb-10 '>
                  <div className='font-s-16 font-w-7'>{item.date}</div>
                  <div className='flex p-tb-10'>
                    <div className={`mr-10 t-a-c flex`}>
                      <div className={`${styles.ZHI} mr-5`}>支</div>
                      <div className={`${styles.spen} `}> -{Number(toaspend[index]).toFixed(2)}</div>
                    </div>
                    <div className={`mr-10 t-a-c flex`}>
                      <div className={`${styles.ZHI} mr-5`}>收</div>
                      <div className={`${styles.come} `}> +{Number(toacome[index]).toFixed(2)}</div>
                    </div>

                  </div>
                </div>
                {/* 内容 */}
                <div className='mb-10'>
                  {
                    item.bills && item.bills.map((item1: any, index1: number) => {
                      return (
                        <div key={index1} className='mb-10 bor-b' onClick={() => { toview(item1) }}>
                          <div className='flex jcsb p-10'>
                            <div>
                              <i className={`iconfont ${icons[item1.type_id - 1]} mr-5 ${item1.pay_type === 1 ? styles.spen1 : styles.come1}`} style={{ fontSize: 20 }}></i>
                              {item1.type_name}
                            </div>
                            <div className={` ${item1.pay_type === 1 ? styles.spen : styles.come}`}>
                              {item1.pay_type === 1 ? <span>-</span> : <span>+</span>}
                              ￥ {item1.amount}</div>
                          </div>
                          <div className='p-10'>
                            <div>{dayjs(Number(item1.date)).format('YYYY-MM-DD HH:mm')}</div>
                            {item1.remark ? <span>| {item1.remark}</span> : null}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })}
        </div >
      </div >
    </Pull>
  )
}

export default BillLists
