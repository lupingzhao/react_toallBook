import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar, Icon, Modal, Popup } from 'zarm'
import styles from '../../App.module.scss'
import dayjs from '_dayjs@1.10.6@dayjs';
import { delBill, details } from '../../store/actions/bill'
import { consumption } from '../../store/actions/user'
import { useSelector, useDispatch } from 'react-redux'
import EditBill from '../../components/editBill/EditBill'
interface location {
  hash: string
  key: string
  pathname: string
  search: string
  state: any
}
const EditBills = () => {
  let icons = ['icon-canyin', 'icon-fushi2', 'icon-jiaotong', 'icon-zhuye', 'icon-gouwu1', 'icon-boshimao', 'icon-yiliao', 'icon-lvxing', 'icon-pengyou', 'icon-jinqianjinbi-', 'icon-gongzi', 'icon-jiangjin', 'icon-zhuanzhang', 'icon-licai', 'icon-duizhang-tuikuan', 'icon-jinqianjinbi--copy']
  let dispatch = useDispatch()
  // 路由传参
  let location = useLocation() as any
  let [boo1, setBoo1] = useState<boolean>(false)
  let data = useSelector((state: any) => state.bill.detailBill)
  let [visible3, setVisible3] = useState<boolean>(false)
  let list = useSelector((state: any) => state.user.list)

  let send = (e: boolean) => {
    setVisible3(e)
  }
  // 删除
  let submit = () => {
    dispatch(delBill(String(location.state.data.id)))
    setBoo1(false)
    window.history.back()
  }
  // 消费类型列表
  let getList = () => {
    dispatch(consumption())
  }
  // 跟新数据
  let update = () => {
    dispatch(details(location.state.data.id))
    setVisible3(false)
  }

  useEffect(() => {
    // console.log(location);
    dispatch(details(location.state.data.id))
    getList()
  }, [])

  return (

    <div className='bgc-low-gray' style={{ height: '100vh' }}>
      {/* {data &&
      } */}
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="账单详情"
      />
      <div>
        <div className=' m-tb-10 bgc-white p-10 b-radius-10' style={{ width: '90%' }}>
          <div className='t-a-c m-tb-10   '>
            <i className={`iconfont font-s-18 ${icons[list.findIndex((item: any) => {
              return data.type_name === item.name
            })]} mr-5  ${data.pay_type === 2 ? styles.come1 : styles.spen1}`} ></i>
            {data.type_name}
          </div>

          <div className='t-a-c m-tb-10 font-s-16 font-w-7'>
            {
              data.pay_type === 2 ?
                <span className='font-s-18 font-w-7'>+</span> :
                <span className='font-s-18 font-w-7'>-</span>
            }  {data.amount}
          </div>
          <div>
            <span>记录时间：</span>
            {dayjs(Number(data.date)).format('YYYY-MM-DD HH:mm')}</div>
          <div className='m-tb-10'>
            <span>备注：</span>
            {data.remark}
          </div>
          <div className='flex jcsa p-10'>
            <div className='font-c-red t-a-c' onClick={() => { setBoo1(true) }}>
              <i className='iconfont icon-huishou mr-5'></i>
              删除
            </div>
            <div className='t-a-c' onClick={() => { setVisible3(true) }}>
              <i className='iconfont icon-bianxie mr-5'></i>
              编辑
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="删除"
        visible={boo1}
        footer={
          <div className='flex jcsa width-100'>
            <div onClick={() => { setBoo1(false) }}>取消</div>
            <div className={`${styles.color}`} onClick={() => { submit() }}>确定</div>
          </div>
        }
      >
        <p className='t-a-c'>确认删除账单</p>
      </Modal>

      {/* 编辑 */}
      <Popup
        visible={visible3}
        direction="bottom"
        onMaskClick={() => { setVisible3(false) }}
        destroy={false}>
        <div className={`${styles.popup1}`} style={{ backgroundColor: "#fff" }}>
          <EditBill list={list} send={send} data={data} update={update}></EditBill>
        </div>
      </Popup>
    </div >
  )
}

export default EditBills
