import React from 'react'
// Usuall Component
import NavBar from '@/components/NavBar.js'
import Input from '@/components/Input'
// Style
import style from './index.module.scss'

export default function Login() {
  const extraClik = () => {
    console.log(123)
  }

  return (
    <div className={style.root}>
      <NavBar>标题</NavBar>
      {/* Loagin format */}
      <div className="content">
        <h3>短信登录</h3>

        <form>
          <div className="input-item">
            <Input placeholder="phone number"></Input>
            <div className="validate">手机号验证错误信息</div>
          </div>

          <div className="input-item">
            <Input
              placeholder="Code"
              extra={{ message: 'send message code', extraClik }}
            ></Input>
            <div className="validate">手机号验证错误信息</div>
          </div>
          <button className="login-btn">登陆</button>
        </form>
      </div>
    </div>
  )
}
