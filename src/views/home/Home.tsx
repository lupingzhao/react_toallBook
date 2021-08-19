import React, { useState, useRef, useEffect } from 'react';
import BottomTabBar from '../../components/bottomTabBar/bottomTabBar'
import styles from '../../App.module.scss'
import { Select, Popup, Button, Affix, DatePicker, Keyboard } from 'zarm'
//用户请求
import { consumption } from '../../store/actions/user'
// 账单请求
import { billList } from '../../store/actions/bill'
import { useSelector, useDispatch } from 'react-redux'

import { useWatch } from './../../hooks/useWatch';
import empt from '../../assets/empty.png'
import dayjs from '_dayjs@1.10.6@dayjs';

import BillLists from '../../components/billLists/BillLists'
import AddBill from '../../components/addiBill/AddBill';



const Home = () => {
    let dispatch = useDispatch()
    let list = useSelector((state: any) => state.user.list)
    let total = useSelector((state: any) => state.bill.total)
    let billLists = useSelector((state: any) => state.bill.billLists)

    const [visible1, setVisible1] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)
    const [visible3, setVisible3] = useState<boolean>(false)

    let [page, setpage] = useState<number>(1)

    let [type, setType] = useState<string>('全部类型')
    let [date, setDate] = useState<string>(dayjs().format('YYYY-MM'))


    // 消费类型列表
    let getList = () => {
        dispatch(consumption())
    }
    // 类型切换
    let typeswich = (type: string, id?: number) => {
        setType(type)
        setVisible1(false)
        id ? dispatch(billList(String(dayjs(date).format('YYYY-MM')), 1, 5, String(id))) : dispatch(billList(String(dayjs(date).format('YYYY-MM')), 1, 5, 'all'))
    }
    // 选择时间后点击确定
    let sureDate = (e: any) => {
        setDate(dayjs(e).format('YYYY-MM'))
        setVisible2(false)
        dispatch(billList(String(dayjs(dayjs(e).format('YYYY-MM')).format('YYYY-MM')), 1, 5, 'all'))
    }
    //添加账单时关闭弹出层
    let send = (e: boolean) => {
        setVisible3(e)
        dispatch(billList(String(dayjs(date).format('YYYY-MM')), 1, 5, 'all'))
    }
    // 加载更多
    let upload = (val: number) => {
        if (val === 0) {
            page++
            setpage(page)
            dispatch(billList(String(dayjs(date).format('YYYY-MM')), page, 5, 'all', true))
        } else {
            dispatch(billList(String(dayjs(date).format('YYYY-MM')), page, 5, 'all', true))
        }

    }

    // 账单列表
    useEffect(() => {
        getList()
        dispatch(billList(String(dayjs(date).format('YYYY-MM')), page, 5, 'all'))
    }, [])

    let [top, setTop] = useState<string>('500px')
    let [left, setLeft] = useState<string>('320px')

    // 拖拽
    useEffect(() => {
        var one = document.getElementById('box')!
        // 2:绑定 touchstart
        one.addEventListener("touchstart", function (e) {
            // console.log("1:触碰开始");
            // console.log(e);
        })
        //3:绑定 touchmove
        one.addEventListener("touchmove", function (e) {
            // console.log("2:移动中");
            // console.log(e.targetTouches[0].clientX);
            setLeft(String(e.targetTouches[0].clientX) + 'px')
            setTop(String(e.targetTouches[0].clientY) + 'px')
        })
        //4:绑定 touchend
        one.addEventListener("touchend", function () {
            // console.log("3:触碰结束");
        });

    }, [])


    return (
        <div className={`${styles.home}`} >
            <div className={`flex p-10 ${styles.homehead}`} style={{ height: 100, width: '100vw', backgroundColor: '#007FFF', color: 'white' }}>
                <div className='width-100 '>
                    <div className='flex a-i-fe mb-10'>
                        <div className='mr-10'>
                            <span>总支出：</span>
                            <span style={{ fontSize: 20, fontWeight: 700 }}>￥{total[0].toFixed(2)}</span>
                        </div >
                        <div>
                            <span>总收入：</span>
                            <span style={{ fontSize: 20, fontWeight: 700 }}>￥{total[1].toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='flex jce width-100 font-s-12'>
                        <div onClick={() => {
                            setVisible1(true)
                        }} className={`${styles.p510} mr-10 `} style={{ backgroundColor: ' rgba(0, 0, 0, 0.2) ', borderRadius: '15px' }}>
                            {type}<i className='iconfont font-s-12 icon-jiantou1 m-l-10'></i>
                        </div>
                        <div className={`${styles.p510}`} style={{ backgroundColor: ' rgba(0, 0, 0, 0.2) ', borderRadius: '15px' }} onClick={() => {
                            setVisible2(true)
                        }}>
                            {date}<i className='iconfont font-s-12 icon-jiantou1 m-l-10'></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* 有无数据时 */}
            <div style={{ marginTop: 100 }}>
                {
                    billLists.length === 0 ? <div className='flex jcc ' >
                        <div style={{ marginTop: '50% ' }}>
                            <img src={empt} alt="" style={{ width: '100px', height: 100 }} />
                            <div className='p-tb-10 t-a-c'>暂无数据</div>
                        </div>
                    </div> : billLists.length > 0 && billLists[0] ? <BillLists billLists={billLists} upload={upload}></BillLists> : null
                    // 
                }

            </div>


            {/*添加账单 */}
            <div className={`${styles.fixed}`} id='box' style={{ top: `${top}`, left: `${left}` }} >
                <div className={`flex jcc ${styles.color}`} style={{
                    borderRadius: '50%', width: 50, height: 50,
                    backgroundColor: 'white', boxShadow: '0 0 10px gray',
                }} onClick={() => { setVisible3(true) }}>
                    <i className='iconfont icon-shuxiebeifen ml-5' style={{ fontSize: 26 }}></i>
                </div>
            </div>



            <BottomTabBar></BottomTabBar>

            {/* 类型弹出层 */}
            <Popup
                visible={visible1}
                direction="bottom"
                onMaskClick={() => { setVisible1(false) }}
                destroy={false}
            >
                <div className={`${styles.popup1}`} style={{ backgroundColor: "#f5f5f5", height: '70vh' }}>
                    <div className='flex jcsb p-tb-10 bgc-white '>
                        <div ></div>
                        <div className='p-tb-10'>请选择类型</div>
                        <div className='pr-10' onClick={() => { setVisible1(false) }}>X</div>
                    </div>
                    <div className='p-10'>
                        <Button theme="primary" onClick={() => { typeswich('全部类型') }}>全部类型</Button>
                        <div className='p-tb-10'>
                            <div className='mb-10'>支出</div>
                            <div className='flex flex-wrap jcsb ' >
                                {list.length > 0 && list[0].id ? list.map((item: any, index: number) => {
                                    return (
                                        item.type === '1' ? <div className={`width-32 t-a-c p-tb-10 mb-10  ${styles.typebox}`} key={index} style={{ backgroundColor: 'white' }} onClick={() => { typeswich(item.name, item.id) }}>{item.name}</div> : null
                                    )
                                }) : null}
                            </div>
                            <div className='mb-10'>收入</div>
                            <div className='flex flex-wrap jcsb ' >
                                {list.length > 0 && list[0].id ? list.map((item: any, index: number) => {
                                    return (
                                        item.type === '2' ? <div className={`width-32 t-a-c p-tb-10 mb-10  ${styles.typebox}`} key={index} style={{ backgroundColor: 'white' }} onClick={() => { typeswich(item.name, item.id) }}>{item.name}</div> : null
                                    )
                                }) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>

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
            {/* 添加账单 */}
            <Popup
                visible={visible3}
                direction="bottom"
                onMaskClick={() => { setVisible3(false) }}
                destroy={false}>
                <div className={`${styles.popup1}`} style={{ backgroundColor: "#fff" }}>
                    <AddBill list={list} send={send}></AddBill>
                </div>
            </Popup>

        </div >
    )
}

export default Home
