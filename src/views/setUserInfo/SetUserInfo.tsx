import React, { useState } from 'react'
import { NavBar, Icon, Button } from 'zarm'
import CcUpload from '../../components/cc-upload/cc-upload'
import { signature, userInfo } from '../../store//actions//user/index'
import { useDispatch, useSelector } from 'react-redux';
import { Toast, Input } from 'zarm';



const SetUserInfo = () => {
  let dispatch = useDispatch()
  let user = JSON.parse(localStorage.getItem('user')!)
  let [img, setImg] = useState<string>(user.avatar)
  let [signa, setsignas] = useState<string>(user.signature)


  // console.log(user);
  let headers = {
    Authorization: localStorage.getItem('token')
  }
  // 请求成功
  let uploadSuccess = (res: any) => {
    setImg('http://api.chennick.wang' + `${res.data}`)
  }
  // 请求失败
  let uploadFail = (err: any) => {
    Toast.show('上传图片失败')
  }
  // signature(signature, avatar).then((res: any)
  let confim = () => {
    dispatch(signature(signa, img))
  }

  return (
    <div >
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="用户信息"
      />
      <div className='p-10'>
        <div className='font-w-7 p-b-10 bor-b' style={{ fontSize: 26 }}>个人资料</div>

        <div className='m-tb-10 p-b-10 bor-b'>
          <div className='p-tb-10'>头像</div>
          <div className='p-10 flex'>
            <div>
              <img src={img} alt="" style={{ width: 100, height: 100, borderRadius: "50%" }} />
            </div>
            <div className='m-l-10'>
              <div className='mb-10' >支持 jpg、png、jpeg格式大小200KB以内的图片</div>
              <CcUpload
                action='http://api.chennick.wang/api/upload'
                headers={headers}
                uploadSuccess={uploadSuccess}
                uploadFail={uploadFail}
                maxSize={500}
                maxCount={9}
                fileType={['jpg', 'png', 'jpeg']}
                name={'file'}
              >
                <Button theme="primary" size='sm'>点击上传</Button>
              </CcUpload>
            </div>
          </div>
        </div>
        <div className='p-tb-10 bor-b'>
          <div className='p-tb-10 font-s-16 mb-10'>个性签名</div>
          <div className='font-s-14'>
            <Input
              clearable
              type="text"
              placeholder="请输入"
              value={signa}
              onChange={(value: any) => {
                setsignas(value);
              }}
            />
          </div>
        </div>
        <div className='m-tb-10 p-tb-10'>
          <div><Button theme="primary" block onClick={confim}>保存</Button></div>
        </div>
      </div>

    </div >
  )
}

export default SetUserInfo
