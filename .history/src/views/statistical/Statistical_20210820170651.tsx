import React, { useState, useEffect, useRef } from 'react'
import BottomTabBar from '../../components/bottomTabBar/bottomTabBar'
import dayjs from '_dayjs@1.10.6@dayjs';
import styles from '../../App.module.scss'
import { Cell, DatePicker, Progress } from 'zarm'
import { billList } from '../../store/actions/bill'
import { useSelector, useDispatch } from 'react-redux'
import * as echarts from 'echarts';
import { useWatch } from './../../hooks/useWatch/index';

const Statistical = () => {

    let dispatch = useDispatch()
    let [date, setDate] = useState<string>(dayjs().format('YYYY-MM'))
    const [visible2, setVisible2] = useState<boolean>(false)
    const [tab, setTab] = useState<number>(0)
    const [tab1, setTab1] = useState<number>(0)

    // 已经拆分了支出 和收入 的数据[zc,sr]
    let billLists = useSelector((state: any) => state.bill.billList)
    // 原始数据 没有拆分数据
    let billList1 = useSelector((state: any) => state.bill.billLists)

    let total = useSelector((state: any) => state.bill.total)
    let zc = useSelector((state: any) => state.bill.zc)
    let sr = useSelector((state: any) => state.bill.sr)

    // dom元素
    let pie = useRef(null)

    // 图标
    let icons = [
        'icon-canyin', 'icon-fushi2', 'icon-jiaotong',
        'icon-zhuye', 'icon-gouwu1', 'icon-boshimao', 'icon-yiliao',
        'icon-lvxing', 'icon-pengyou', 'icon-jinqianjinbi-', 'icon-gongzi',
        'icon-jiangjin', 'icon-zhuanzhang', 'icon-licai', 'icon-duizhang-tuikuan',
        'icon-jinqianjinbi--copy']

    let sureDate = (e: any) => {
        setDate(dayjs(e).format('YYYY-MM'))
        setVisible2(false)
        dispatch(billList(String(dayjs(dayjs(e).format('YYYY-MM')).format('YYYY-MM')), 1, 5, 'all'))
    }
    let getlist = () => {
        dispatch(billList(String(dayjs(date).format('YYYY-MM')), 1, 20, 'all'))

    }
    useEffect(() => {
        getlist()
    }, [])
    // 显示图表 必需用监听
    useWatch(() => {
        var myChart = echarts.init(pie.current!);
        let data = '' as any
        let color = [] as any
        if (tab1 === 0) {
            data = zc
        } else { data = sr }
        myChart.setOption(
            {
                color: color,
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'center',
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        )
    }, [zc, sr])

    return (
        <div className={`bgc-low-gray ${styles.Statistical}`} style={{ height: "100vh" }}>
            <div className='bgc-white p-10 mb-10'>
                <div className='flex jcc m-tb-10'>
                    <div className={`${styles.rl}`} onClick={() => { setVisible2(true) }}>
                        {date}
                        <span className='p-lr-10 '>|</span>
                        <i className='iconfont icon-rili'></i>
                    </div>
                </div>
                <div className={`${styles.color} p-10 t-a-c`}>
                    共支出
                </div >
                <div className={`${styles.color} p-10 t-a-c font-s-16 font-w-7`} >
                    ￥{total[0].toFixed(2)}
                </div>
                <div className='font-c-gray p-10 t-a-c'>
                    共收入￥{total[1].toFixed(2)}
                </div>
            </div>
            {/* 收支 */}
            <div className='p-10 bgc-white '>
                <div className='flex jcsb'>
                    <div className='font-s-18'>
                        收支构成
                    </div>
                    <div className='flex'>
                        <div className={`mr-10 ${styles.title} ${tab === 0 ? styles.zc : ''}`} onClick={() => { setTab(0) }}>支出</div>
                        <div className={` ${styles.title} ${tab === 1 ? styles.sr : ''}`} onClick={() => { setTab(1) }}>收入</div>
                    </div>
                </div>
                {/* 收支小类别 */}
                {tab === 0 ?
                    // 支出
                    zc.length === 0 ? <div className='p-10 t-a-c'>暂无数据</div> : zc && zc.sort((item2: any, index2: any) => {
                        return index2.value - item2.value
                    }).map((item2: any, index2: number) => {
                        return (
                            <div key={index2} >
                                <div className=' width-100 p-tb-5' >
                                    <div className='flex mr-5 '>
                                        <i style={{ fontSize: 25 }} className={` mr-5 iconfont ${icons[item2.type - 1]} ${item2.type < 11 ? styles.spen1 : styles.come1}`}></i>
                                        <div className=' width-30'>{item2.name}￥{item2.value}</div>
                                        <div className="progress width-70">
                                            <Progress
                                                shape="line"
                                                percent={Number((Number(item2.value) / total[tab] * 100).toFixed(2))}
                                                theme={tab === 0 ? 'primary' : 'warning'}
                                                strokeShape={'round'}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    // 收入
                    <div>
                        {sr.length === 0 ? <div className='p-10 t-a-c'>暂无数据</div> : sr && sr.sort((item2: any, index2: any) => {
                            return index2.value - item2.value
                        }).map((item2: any, index2: number) => {
                            return (
                                <div key={index2} >
                                    <div className=' width-100 p-tb-5' >
                                        <div className='flex mr-5 '>
                                            <i style={{ fontSize: 25 }} className={` mr-5 iconfont ${icons[item2.type - 1]} ${item2.type < 11 ? styles.spen1 : styles.come1}`}></i>
                                            <div className=' width-30'>{item2.name}￥{item2.value}</div>
                                            <div className="progress width-70">
                                                <Progress
                                                    shape="line"
                                                    percent={Number((Number(item2.value) / total[tab] * 100).toFixed(2))}
                                                    theme={tab === 0 ? 'primary' : 'warning'}
                                                    strokeShape={'round'}
                                                    strokeWidth={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }  </div>
                }
                {/* 收支构成图 */}
                <div className='flex m-tb-10 jcsb width-100'>
                    <div className='font-s-18'>
                        收支数据图
                    </div>
                    <div className='flex jcc'>
                        <div className={`mr-10 ${styles.title} ${tab1 === 0 ? styles.zc : ''}`} onClick={() => { setTab1(0) }}>支出</div>
                        <div className={` ${styles.title} ${tab1 === 1 ? styles.sr : ''}`} onClick={() => { setTab1(1) }}>收入</div>
                    </div>
                </div>
                <div className='p-10'>
                    {/* 图表 */}
                    {billLists[tab] && billLists[tab].length === 0 ? <div className='t-a-c p-10'>暂无数据</div> : ''}
                    <div ref={pie} style={{ width: "100%", height: 300, }}></div>
                </div>
            </div>
            <BottomTabBar></BottomTabBar>
            {/* 时间选择器 */}
            <DatePicker
                visible={visible2}
                mode="month"
                // 最大日期
                max={dayjs().format('YYYY-MM')}
                // 取消
                onCancel={() => {
                    setVisible2(false)
                }}
                // 选择时间后确定
                onOk={sureDate}
            />
        </div >
    )
}

export default Statistical

{/* 切换不同类别用过滤 filter */ }
{/* {billList1 && billList1.map((item: any, index: number) => {
                    return (
                        item.bills && item.bills.filter((item1: any, index1: number) => {
                            return item1.pay_type === tab + 1
                        })!.map((item2: any, index2: number) => {
                            return (
                                <div key={index2} >
                                    <div className=' width-100 p-tb-5' >
                                        <div className='flex mr-5 '>
                                            <i style={{ fontSize: 25 }} className={` mr-5 iconfont ${icons[item2.type_id - 1]} ${item2.pay_type === 1 ? styles.spen1 : styles.come1}`}></i>
                                            <div className=' width-30'>{item2.type_name}￥{item2.amount}</div>
                                            <div className="progress width-70">
                                                <Progress
                                                    shape="line"
                                                    percent={Number((Number(item2.amount) / total[tab] * 100).toFixed(2))}
                                                    theme={tab === 0 ? 'primary' : 'warning'}
                                                    strokeShape={'round'}
                                                    strokeWidth={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                })} */}

// {
//     billLists[tab] && billLists[tab].length === 0 ? <div className='t-a-c p-10'>暂无数据</div> :
//     <div>
//         {billLists[tab] && billLists[tab].map((item1: any, index: number) => {
//             return (
//                 <div key={index}>
//                     <div className=' width-100 p-tb-5' >
//                         <div className='flex mr-5 '>
//                             <i style={{ fontSize: 25 }} className={` mr-5 iconfont ${icons[item1.type_id - 1]} ${item1.pay_type === 1 ? styles.spen1 : styles.come1}`}></i>
//                             <div className=' width-30'>{item1.type_name}￥{item1.amount}</div>
//                             <div className="progress width-70">
//                                 <Progress
//                                     shape="line"
//                                     percent={Number((Number(item1.amount) / total[tab] * 100).toFixed(2))}
//                                     theme={tab === 0 ? 'primary' : 'warning'}
//                                     strokeShape={'round'}
//                                     strokeWidth={10}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         })
//         }
//     </div>
// }