import React, { useEffect, useState } from 'react'

import styles from '../App.module.scss'
const Demo = () => {
  // 拖拽dom元素
  let [top, setTop] = useState<string>('0px')
  let [left, setLeft] = useState<string>('100px')
  let dj = () => {
    console.log(678678);
  }
  useEffect(() => {
    var one = document.getElementById('box')!
    // 2:绑定 touchstart
    one.addEventListener("touchstart", function (e) {
      console.log("1:触碰开始");
      console.log(e);
    })
    //3:绑定 touchmove
    one.addEventListener("touchmove", function (e) {
      console.log("2:移动中");
      // console.log(e.targetTouches[0].clientX);
      setLeft(String(e.targetTouches[0].clientX) + 'px')
      setTop(String(e.targetTouches[0].clientY) + 'px')
    })
    //4:绑定 touchend
    one.addEventListener("touchend", function () {
      console.log("3:触碰结束");
    });

  }, [])



  return (
    <div>
      <div id='box' onClick={dj} className={`${styles.box33}`} style={{ width: 100, height: 100, backgroundColor: 'red', top: `${top}`, left: `${left}` }}>1111</div>
    </div >

  )
}

export default Demo
