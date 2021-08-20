import React, { useState, useEffect } from 'react'

import styles from '../../App.module.scss'
// 引入图片
import loginimg from '../../assets/cryptocurrency.png'

import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Checkbox } from 'zarm';
import { login, register } from '../../store/actions/user'
// 路由跳转
import { useHistory } from 'react-router-dom'
import { useWatch } from './../../hooks/useWatch';
const Login = () => {
    let dispatch = useDispatch()
    let history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    let state = useSelector((state: any) => state)
    let [activeindex, setactiveindex] = useState<number>(0)
    // 随机数
    // let a = Math.floor(Math.random() * 33)
    let [a, setA] = useState(Math.floor(Math.random() * 33))
    let registerboo = useSelector((state: any) => state.user.registerboo)
    const zm = ['A', '0', '1', '2', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', '7', '8', '9', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '3', '4', '5', '6',]

    // 登陆] 
    let goto = () => {
        if (activeindex === 0) {
            dispatch(login(username, password))
        } else {
            dispatch(register(username, password))
        }
        // console.log(558);
    }
    useEffect(() => {
        if (registerboo) {
            setactiveindex(0)
        }
    }, [registerboo])
    // 监听
    return (
        <div className={`${styles.login}`}>
            <div>
                <img src={loginimg} alt="" style={{
                    width: '100vw',
                    height: '280px'
                }} />
            </div>

            {/* 导航栏 */}
            <div className="flex font-s-18 p-lr-10 " style={{ color: '#597fe7' }}>
                <div className={`p-10 ${activeindex === 0 ? `${styles.title}` : ''}`} onClick={() => { setactiveindex(0) }} >登陆</div>
                <div className={`p-10 ${activeindex === 1 ? `${styles.title}` : ""}`} onClick={() => { setactiveindex(1) }}>注册</div>
            </div>

            <div className="p-10">
                {/* 登陆表单 */}
                <div className='flex' style={{ height: '50px' }}>
                    <i className={`iconfont icon-ic_b-commond_telepho m-r-15 ${styles.icon}`}></i>
                    <Input
                        clearable={false}
                        type="text"
                        placeholder="请输入用户名"
                        value={username}
                        onChange={(value: any) => {
                            setUsername(value);
                        }}

                    />
                </div>
                <div className='flex' style={{ height: '50px' }}>
                    <i className={`iconfont icon-suo m-r-15 ${styles.icon}`} ></i>
                    <Input
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={(value: any) => {
                            setPassword(value);
                        }}
                    />
                </div>
                {/* 注册 */}
                {
                    activeindex === 1 ?
                        <div>
                            <div className='flex' style={{ height: '50px' }}>
                                <i className={`iconfont icon-suo m-r-15 ${styles.icon}`} ></i>
                                <Input
                                    type="password"
                                    placeholder="请输入验证码"
                                    value={code}
                                    onChange={(value: any) => {
                                        setCode(value);
                                    }}
                                />
                                <div className={`flex p-10 ${styles.code}`}  >
                                    {zm.slice(a, a + 4).map((item: string, index: number) => {
                                        return (
                                            <div className='mr-5' key={index} onClick={() => {
                                                setA(Math.floor(Math.random() * 33))
                                            }}>{item}</div>
                                        )
                                    }
                                    )}


                                </div>
                            </div>
                            <div>
                                <Checkbox >阅读并同意《掘掘手札条款》
                                </Checkbox>
                            </div>
                        </div>
                        : null
                }
            </div>
            <div className='p-15 '>
                <Button theme="primary" block onClick={goto}>登录</Button>
            </div>
            {/* <div className={`${styles.box}`}> </div> */}

        </div >

    )
}

export default Login
