import React, { useState, useEffect } from 'react'
import { Keyboard, Toast } from 'zarm'
import styles from '../../App.module.scss'
import { Input, DatePicker } from 'zarm'
import dayjs from '_dayjs@1.10.6@dayjs';

import { editBill } from '../../store/actions/bill'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  list: any
  send: (val: boolean) => void,
  update: () => void,
  data: any
}
const EditBill = (props: Props) => {

  let dispatch = useDispatch()
  let [activetab, setActivetab] = useState<number>(0)
  let [activeICON, setActiveICON] = useState<number>(0)

  let [typeId, setTypeId] = useState<number>(1)

  let [beizhu, setBeizhu] = useState<boolean>(true)
  let [inputdatas, setInputdata] = useState<string>('')

  let [remark, setRemark] = useState<string>('')
  let [typename, setTypename] = useState<string>("餐饮")
  let [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  let [visible2, setVisible2] = useState<boolean>(false)



  let keyBoardItem = ['1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '0', '<svg viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg"><path d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z" fill="currentColor"></path></svg>']
  // 图标
  let icons = ['icon-canyin', 'icon-fushi2', 'icon-jiaotong', 'icon-zhuye', 'icon-gouwu1', 'icon-boshimao', 'icon-yiliao', 'icon-lvxing', 'icon-pengyou', 'icon-jinqianjinbi-', 'icon-gongzi', 'icon-jiangjin', 'icon-zhuanzhang', 'icon-licai', 'icon-duizhang-tuikuan', 'icon-jinqianjinbi--copy']
  let onMaskClick = () => {
    close()
  }
  // 键盘事件
  let clickItem = (item: string, index: number) => {
    switch (index) {
      case 11:
        inputdatas = inputdatas.slice(0, inputdatas.length - 1)
        setInputdata(inputdatas)
        break;
      default:
        if (inputdatas[inputdatas.length - 3] === '.') {
          return
        } else {
          inputdatas += item
        }
        setInputdata(inputdatas)
        break;
    }
  }
  // 确定事件
  let confim = () => {
    if (inputdatas) {
      let time = dayjs().valueOf()
      if (date !== dayjs().format('YYYY-MM-DD')) {
        time = dayjs(date).valueOf()
      }
      // console.log(props.data.id);
      // console.log(inputdatas);
      // console.log(typeId);
      // console.log(typename);
      // console.log(time);
      // console.log(activetab + 1);
      // console.log(remark);
      dispatch(editBill(props.data.id, inputdatas, typeId, typename, time, activetab + 1, remark))
      props.update()
      // 分发事件
      props.send(false)
    } else Toast.show('未输入金额')

  }

  // 修改时间
  let sureDate = (e: any) => {
    // console.log(e);
    setDate(dayjs(e).format('YYYY-MM-DD'))
    setVisible2(false)
  }

  useEffect(() => {
    setActivetab(props.data.pay_type - 1)
    setActiveICON(props.list.findIndex((item: any) => {
      return props.data.type_name === item.name
    }))
    setDate(dayjs(Number(props.data.date)).format('YYYY-MM-DD'))
    setInputdata(props.data.amount)
  }, [])

  return (
    <div className={`${styles.addBill}`}>
      <div className='t-a-r p-10 font-s-18'
        onClick={() => { props.send(false) }} >X</div>
      <div className='flex jcsb p-10 '>
        <div className='flex'>
          <div className={`m-r-15 
          ${activetab === 0 ? styles.activetab : styles.tab}`}
            onClick={() => {
              setActivetab(0), setActiveICON(0), setTypeId(1),
                setTypename('餐饮')
            }}>支出</div>
          <div className={`${activetab === 1 ? styles.activetab1 : styles.tab} `}
            onClick={() => {
              setActivetab(1), setActiveICON(10), setTypeId(11),
                setTypename('工资')
            }}> 收入</div>
        </div>
        <div >
          <div className={`${styles.date1}`}
            style={{
              backgroundColor: ' rgba(0, 0, 0, 0.1) ',
              borderRadius: '15px'
            }} onClick={() => {
              setVisible2(true)
            }}>
            {date}<i className='iconfont font-s-12 icon-jiantou1 m-l-10'></i>
          </div>
        </div>
      </div >
      {/* 时间选择器 */}
      <DatePicker
        visible={visible2}
        mode="date"
        wheelDefaultValue={date}
        // 最大日期
        max={dayjs().format('YYYY-MM-DD')}
        // 取消
        onCancel={() => {
          setVisible2(false)
        }}
        // 选择时间后确定
        onOk={sureDate}
      />

      <div className={`${styles.sum} p-lr-10 mb-10`}>
        <div className='bor-b p-10'>
          <span>￥</span>
          <span>{inputdatas}</span>
        </div>
      </div>
      <div className={`${styles.scoll} flex`}>
        {
          activetab === 0 ?
            props.list.map((item: any, index: number) => {
              return (
                item.type === '1' ? <div key={index}>
                  <div className={` t-a-c p-10`} style={{ width: 100, }}
                    onClick={() => {
                      setActiveICON(index), setTypeId(item.id),
                        setTypename(item.name)
                    }}>
                    <div>
                      <i className={`iconfont ${icons[index]} 
                      ${activeICON === index ? styles.spen : ''}`}
                        style={{ fontSize: 25 }}></i>
                    </div>
                    <div>
                      {item.name}
                    </div>
                  </div>
                </div> : null
              )
            }) : null
        }
        {
          activetab === 1 ?
            props.list.map((item: any, index: number) => {
              return (
                item.type === '2' ? <div key={index}>
                  <div className={` t-a-c p-10`} style={{ width: 100, }}
                    onClick={() => {
                      setActiveICON(index), setTypeId(item.id),
                        setTypename(item.name)
                    }}>
                    <div>
                      <i className={`iconfont ${icons[index]} ${activeICON === index ?
                        styles.come : ''}`} style={{ fontSize: 25 }}></i>
                    </div>
                    <div>
                      {item.name}
                    </div>
                  </div>
                </div> : null
              )
            }) : null
        }
      </div>
      {/* 备注 */}
      <div className='p-10'>
        {
          beizhu ? <span className='p-10' style={{ color: "#007FFF" }} onClick={() => {
            setBeizhu(false)
          }}>添加备注</span> : <div className='border p-10'>
            <Input showLength autoHeight type="text" rows={4}
              maxLength={50} placeholder="摘要" onChange={(value: any) => {
                setRemark(value);
              }} /></div>
        }
      </div>
      {/* 键盘 */}
      <div style={{ background: '#fff ' }} className='flex width-100'>
        <div className='cc-number-keyboard-wrap width-100 '>
          <div className='cc-number-keyboard-wrap-content'>
            {
              keyBoardItem.map((item: string, index: number) => {
                return (
                  <div className="cc-number-keyboard-wrap-content-item" key={index}
                    onClick={() => clickItem(item, index)}>
                    <div className='cc-number-keyboard-wrap-content-item-key'
                      // 此步相当于 v-HTML
                      dangerouslySetInnerHTML={{
                        __html: item
                      }}></div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={` height-100 font-c-w flex jcc `} style={{
          backgroundColor: '#007FFF', height: '222px',
          width: '90px', fontSize: 20
        }} onClick={confim}>确认</div>
      </div>
    </div >
  )
}

export default EditBill
