import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

// Usuall Component
import NavBar from '@/components/NavBar/index.js'
import Input from '@/components/Input'
// Style
import style from './index.module.scss'

// package
import { Toast } from 'antd-mobile'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useFormik } from 'formik'

// Store-aciton
import { sendCode, login } from '@/store/actions/login'

export default function Login() {
  // dispatch - Store
  const dispatch = useDispatch()
  // history - Router
  const history = useHistory()
  // location
  const location = useLocation()

  const [countDown, setCountDown] = useState(0)

  /************ formik ************/
  // Validate Data Obj
  const validate = (values) => {
    const errors = {}
    // mobile input check
    if (!values.mobile) {
      errors.mobile = 'Required'
    }
    if (!values.code) {
      errors.code = 'Required'
    }
    return errors
  }

  // Validate Obj
  const formik = useFormik({
    initialValues: {
      mobile: '13911111111',
      code: '246810',
    },
    // Mobile & Code Format
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('Mobile is requied!')
        .matches(/^1[3-9]\d{9}$/, 'Mobile format is wrong'),
      code: Yup.string()
        .required('Code is requied!')
        .matches(/^\d{6}$/, 'Code format is wrong'),
    }),
    onSubmit: async (values) => {
      await dispatch(login(values))
      console.log(location.state)
      if (location.state.from) {
        history.replace(location.state.from)
      } else {
        history.replace('/home')
      }
    },
    validate,
  })

  // decomposition Formik(from data) Data
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    touched, // input box is touched?
    errors, // error obj
    isValid, //Validate is ok?
  } = formik
  /************ formik ************/

  // Code send
  const extraClik = async () => {
    if (countDown > 0) return
    // check mobile fomat
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      })
      return
    }

    await dispatch(sendCode(mobile))
    Toast.success('Send success!', 2)

    // Start countdown(60s)
    setCountDown(5)
    let timeId = setInterval(() => {
      setCountDown((countDown) => {
        if (countDown === 1) clearInterval(timeId)
        return countDown - 1
      })
    }, 1000)
  }

  return (
    <div className={style.root}>
      <NavBar>标题</NavBar>
      {/* Loagin format */}
      <div className="content">
        <h3>短信登录</h3>

        <form onSubmit={handleSubmit}>
          {/* mobile */}
          <div className="input-item">
            <Input
              placeholder="phone number"
              autoComplete="off"
              maxLength="11"
              value={mobile}
              name="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input>
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : (
              ''
            )}
          </div>

          {/* Code */}
          <div className="input-item">
            <Input
              placeholder="Code"
              autoComplete="off"
              maxLength="6"
              extra={{
                message: countDown === 0 ? 'send message code' : countDown,
                extraClik,
              }}
              value={code}
              name="code"
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : (
              ''
            )}
          </div>
          <button
            type="submit"
            className={classNames('login-btn', !isValid && 'disabled')}
            disabled={!isValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
