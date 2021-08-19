import React, { useEffect } from 'react'
import BottomTabBar from '../../components/bottomTabBar/bottomTabBar'
import styles from '../../App.module.scss'
import { userInfo } from '../../store//actions/user/index'
import { Cell, Icon, Button } from 'zarm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747961_3pu97zidnja.js');
const My = () => {
    let dispatch = useDispatch()
    let history = useHistory()
    let goedit = () => {
        history.push('/SetUserInfo')
    }
    let goSetup = () => {
        history.push('/SetPassWord')
    }
    let goabout = () => {
        history.push('/About')
    }
    const useInfo = useSelector((state: any) => state.user.useInfo)

    useEffect(() => {
        dispatch(userInfo())
    }, [])

    return (
        <div className=''>
            <div className={``} style={{ backgroundColor: '#316EE1' }}>
                <div className='flex jcsb a-i-fs p-10 font-c-w' style={{ height: '200px' }}>
                    <div className='p-10'>
                        <div className={`${styles.nike}`}>昵称：{useInfo.username}</div>
                        <div className='m-tb-10'>
                            <i className='iconfont icon-yumao mr-5 font-s-18' style={{ color: '#87DBFE' }}></i>
                            {useInfo.signature}</div>
                    </div>
                    <div className='p-10'>
                        <img src={useInfo.avatar} alt="" style={{ width: 100, height: 100, borderRadius: "50%" }} />
                    </div>
                </div>

            </div>
            {/* 表格 */}
            <div className='bgc-white m-c p-10 b-radius-10' style={{ width: '92%', marginTop: '-30px', boxShadow: '0 0 10px gray' }}>
                <Cell title="用户信息更改" hasArrow={true} icon={<Icon type="icon-gongjudown" theme="primary" size="md" />} onClick={() => { goedit() }} />
                <Cell title="重置密码" icon={<Icon type="icon-dunpai1" theme="primary" size="md" />} hasArrow={true} onClick={() => { goSetup() }} />
                <Cell title="关于我们" icon={<Icon type="icon-credentials_icon" theme="primary" size="md" />} hasArrow={true} onClick={() => { goabout() }} />
            </div>
            <div className='p-10 m-tb-10'>
                <Button theme="danger" block onClick={() => { history.push('/login'), localStorage.clear() }}>退出</Button>
            </div>

            <BottomTabBar></BottomTabBar>
        </div >
    )
}

export default My
