import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// antd
import { List, DatePicker, Drawer, Toast, Modal } from 'antd-mobile'
// Usuall Component
import NavBar from '@/components/NavBar'
import EditInput from './components/EditInput'
import EditList from './components/EditList/idnex'

// package
import classnames from 'classnames'
import Dayjs from 'dayjs'

// style
import styles from './index.module.scss'

// Store-aciton
import {
  getUserDetail,
  updateProfile,
  updatePhoto,
} from '@/store/actions/profile'
import { logout as logoutNow } from '@/store/actions/login'
import { useHistory } from 'react-router-dom'

const { Item } = List

export default function ProfileEdit() {
  //  dispatch
  const dispatch = useDispatch()
  //  useSelector
  const profile = useSelector((state) => state.profile.profile)
  // history
  const history = useHistory()

  // ref
  const fileRef = useRef(null)

  const [openObj, setOpenObj] = useState({
    visibel: false,
    title: '',
  })

  const [openList, setOpenList] = useState({
    visibel: false,
    title: '',
  })

  // config
  const config = {
    photo: [
      {
        title: 'Camera',
        onClick: () => {
          console.log('Camera')
        },
      },
      {
        title: 'Album',
        onClick: () => {
          fileRef.current.click()
        },
      },
    ],
    gender: [
      {
        title: 'Man',
        onClick: () => {
          onCommit('gender', 0)
        },
      },
      {
        title: 'Women',
        onClick: () => {
          onCommit('gender', 1)
        },
      },
    ],
  }

  // get user detail
  useEffect(() => {
    dispatch(getUserDetail())
  }, [dispatch])

  // Drawer close
  const drawerClose = () => {
    setOpenObj({
      visibel: false,
      type: '',
    })
    setOpenList({
      visibel: false,
      title: '',
    })
  }

  // update profile
  const onCommit = async (title, value) => {
    await dispatch(
      updateProfile({
        [title]: value,
      })
    )
    Toast.success('Success to updated', 2)
    drawerClose()
  }

  // Evnet
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('photo', file)
    await dispatch(updatePhoto(formData))
    Toast.success('Success to change photo')
    drawerClose()
  }

  const onDataChange = async (date) => {
    onCommit('birthday', Dayjs(date).format('YYYY-MM-DD'))
  }

  const logout = () => {
    Modal.alert('Warning', 'Sure to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'default',
      },
      {
        text: 'OK',
        style: { color: '#FC6627' },
        onPress: () => {
          dispatch(logoutNow())
          history.push('/login')
          Toast.success('logout!', 1)
        },
      },
    ])
  }

  return (
    <div className={styles.root}>
      <div className="content">
        <NavBar>Profile</NavBar>
        <div className="wrapper">
          <List className="profile-list">
            <Item
              arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => {
                setOpenList({
                  visibel: true,
                  title: 'photo',
                })
              }}
            >
              photo
            </Item>
            <Item
              arrow="horizontal"
              extra={profile.name}
              onClick={() => {
                setOpenObj({
                  visibel: true,
                  title: 'name',
                })
              }}
            >
              name
            </Item>
            <Item
              arrow="horizontal"
              extra={
                <span
                  className={classnames('intro', profile.intro ? 'normal' : '')}
                >
                  {profile.intro || '...'}
                </span>
              }
              onClick={() => {
                setOpenObj({
                  visibel: true,
                  title: 'intro',
                })
              }}
            >
              introduce
            </Item>
          </List>
          <List className="profile-list">
            <Item
              arrow="horizontal"
              extra={profile.gender === 0 ? '男' : '女'}
              onClick={() => {
                setOpenList({
                  visibel: true,
                  title: 'gender',
                })
              }}
            >
              gender
            </Item>
            <DatePicker
              mode="date"
              title="Birthday"
              extra="Optional"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
              value={new Date(profile.birthday)}
              onChange={onDataChange}
            >
              <Item arrow="horizontal" extra="123">
                birthday
              </Item>
            </DatePicker>
          </List>
          <div className="logout">
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* slide animation for text */}
      <Drawer
        className="drawer"
        sidebar={
          openObj.visibel && (
            <EditInput
              drawerClose={drawerClose}
              openObj={openObj}
              onCommit={onCommit}
            ></EditInput>
          )
        }
        open={openObj.visibel}
      >
        {''}
      </Drawer>
      {/* slide animation for text */}

      {/* slide animation for selctor */}
      <Drawer
        className="drawer"
        position="bottom"
        sidebar={
          openList.visibel && (
            <EditList config={config} openList={openList}></EditList>
          )
        }
        open={openList.visibel}
        onOpenChange={drawerClose}
      >
        {''}
      </Drawer>
      {/* slide animation for selctor */}

      <input ref={fileRef} type="file" hidden onChange={onFileChange} />
    </div>
  )
}
