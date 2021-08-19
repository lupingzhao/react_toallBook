import React, { useState, useEffect, useRef } from 'react';
import { Pull, Cell, Message, Icon, Button, ActivityIndicator, BackToTop } from 'zarm';

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

const getRandomNum = (min, max) => {
 const Range = max - min;
 const Rand = Math.random();
 return min + Math.round(Rand * Range);
};

const fetchData = (length, dataSource = []) => {
 let newData = [].concat(dataSource);
 const startIndex = newData.length;
 for (let i = startIndex; i < startIndex + length; i++) {
  newData.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
 }
 return newData;
};

let mounted = true;

const AddButton = () => {
 const pullRef = useRef();
 const [bodyScroll, setBodyScroll] = useState(false);
 const [dataSource, setDataSource] = useState([]);
 const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
 const [loading, setLoading] = useState(LOAD_STATE.normal);

 const toggleScrollContainer = () => {
  const newBodyScroll = !bodyScroll;
  setBodyScroll(newBodyScroll);

  if (newBodyScroll) {
   document.body.style.overflow = 'auto';
  } else {
   document.body.style.overflow = 'hidden';
  }
 };

 // 模拟请求数据
 const refreshData = () => {
  setRefreshing(REFRESH_STATE.loading);
  setTimeout(() => {
   setRefreshing(REFRESH_STATE.success);
  }, 2000);
 };

 // 模拟加载更多数据
 const loadData = () => {
  console.log(4343);
 };

 useEffect(() => {
  setDataSource(fetchData(20));

  return () => {
   mounted = false;
   document.body.style.overflow = 'auto';
  };
 }, []);

 const style = bodyScroll ? {} : { overflowY: 'auto', maxHeight: 400 };

 const scrollContainer = () => {
  return bodyScroll ? window : pullRef.current && pullRef.current.scrollContainer;
 };

 return (
  <>

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
    {dataSource}
   </Pull>
   {/* <BackToTop scrollContainer={scrollContainer} onClick={() => console.log('click back to top')}>
    <div
     style={{
      width: 60,
      height: 60,
      lineHeight: '60px',
      textAlign: 'center',
      backgroundColor: '#fff',
      color: '#999',
      fontSize: 20,
      borderRadius: 30,
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
     }}
    >
     Up
    </div>
   </BackToTop> */}
  </>
 );
};

export default AddButton