import React, { useState } from 'react'
import { NavBar, Icon, Cell, Input, Button } from 'zarm'
import { editPassword } from '../../store/actions/user/index'
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'zarm';

const SetPassWord = () => {

  let [pass, setPass] = useState<string>('')
  let [newpass, setNewpass] = useState<string>('')
  let [confipass, setConfipass] = useState<string>('')
  // editPassword(old_pass, new_pass, new_pasa2)
  // Dispatch const state = useSelector(state => state.state)
  let dispatch = useDispatch()

  // 修改密码
  let sure = () => {
    console.log(56);
    pass && newpass && confipass ? dispatch(editPassword(pass, newpass, confipass)) : Toast.show('有输入项为输入')
  }

  return (
    <div>
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="重置密码"
      />
      <div className='p-10'>
        <Cell title="原密码">
          <Input
            clearable
            type="password"
            placeholder="请输入"
            value={pass}
            onChange={(value: any) => {
              setPass(value);
            }}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入"
            value={newpass}
            onChange={(value: any) => {
              setNewpass(value);
            }}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请输入"
            value={confipass}
            onChange={(value: any) => {
              setConfipass(value);
            }}
          />
        </Cell>
        <div className='m-tb-10'>
          <Button theme="primary" block={true} onClick={() => { sure() }}>保存</Button>

        </div>
      </div>
    </div>
  )
}

export default SetPassWord
