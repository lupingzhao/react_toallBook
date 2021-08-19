import React from 'react'
import { useState } from 'react';
import { Icon, TabBar, Cell, Button } from 'zarm';
import { useWatch } from '../../hooks/useWatch';
import { useHistory } from 'react-router-dom';

import tj from '../../assets/tj.png'
import tj1 from '../../assets/tj1.png'
import zd from '../../assets/zd.png'
import zd1 from '../../assets/zd1.png'

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const BottomTabBar = () => {
    let history = useHistory()
    const [activeKey, setActiveKey] = useState('/');
    const [visible, setVisible] = useState(true);

    // 页面切换
    let goto = (e: any) => {
        setActiveKey(e)
        history.push(e)
    }
    // 监听 路由跳转 控制颜色
    useWatch(() => {
        // console.log(window.location.pathname);
        setActiveKey(window.location.pathname)
    }, activeKey)

    return (
        <div >
            <TabBar visible={visible} activeKey={activeKey} onChange={goto}>
                {/* <TabBar.Item itemKey="home" title="主页" icon={<TabIcon type="home" />} /> */}
                <TabBar.Item itemKey="/" title="账单" icon={<img alt="" src={activeKey === '/' ? zd1 : zd} style={{ width: 24, height: 24 }} />} />
                <TabBar.Item
                    itemKey="/Statistical"
                    title="统计"
                    icon={<img alt="" src={activeKey === '/Statistical' ? tj1 : tj} style={{ width: 24, height: 24 }} />}

                />
                <TabBar.Item
                    itemKey="/My"
                    title="我的"
                    icon={<TabIcon type="user" />}
                />
            </TabBar>
        </div>
    )
}

export default BottomTabBar
