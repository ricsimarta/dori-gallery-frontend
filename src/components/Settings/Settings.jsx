import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';

import { AuthContext } from './../Auth'
import { LangContext } from '../Lang';
import { languages } from '../Languages';

import firebaseConfig from './../../firebase-config'
import Layout from './../Layout';
import './Settings.css'

const Settings = () => {
  const { currentUser } = useContext(AuthContext)
  const { language } = useContext(LangContext)

  const [loading, setLoading] = useState(true)
  const [showReauth, setShowReauth] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState(currentUser && currentUser.displayName ? currentUser.displayName : "")
  const [newUserName, setNewUserName] = useState(userName)
  const [editUsername, setEditUsername] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      getProfileData(currentUser)
    }
  }, [])


  const getProfileData = user => {
    fetch('/users/user-data', { headers: { Authorization: user.uid } })
      .then(res => res.json())
      .then(resJson => {
        setUserRole(resJson.role)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const deleteUser = user => {
    user.delete()
      .then(res => console.log('res: ', res))
      .catch(err => {
        switch (err.code) {
          case 'auth/requires-recent-login':
            console.log('friss bejelentkezés szükséges')
            setShowReauth(true)
            break
          default:
            console.log('ismeretlen hiba')
            console.log(err.code)
            console.log(err)
        }
      })
  }

  const updateProfile = user => {
    setUpdateLoading(true)
    fetch('https://dori-gallery-backend.onrender.com/users/update-user', { 
      method: 'POST',
      headers: { 
        'Authorization': user.uid,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ displayName: newUserName })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson)
        setUpdateLoading(false)
      })
      .catch(err => console.log(err))
  }
  if (!currentUser) return <Navigate replace to='/login' />

  return (
    <Layout>
      <div className='settings'>
        {
          loading ? <CircularProgress color='inherit'/> :
            !showReauth
              ?
              <>
                <h1>{languages[language].settings.title}</h1>

                <div className='settings-container'>
                  <h2 className='email'>{currentUser.email}</h2>

                  <div className='settings-main'>
                    <div className='name'>
                      <h3>{languages[language].settings.userName}:</h3>

                      <div className='change'>
                        <input type='text' value={newUserName} disabled={!editUsername} onChange={e => setNewUserName(e.target.value)}/>

                        <span className="material-symbols-outlined" onClick={() => {
                          setEditUsername(!editUsername)
                          if (editUsername) {
                            updateProfile(currentUser)
                            setUserName(newUserName)
                          }
                        }}>{!updateLoading ? editUsername ? 'done_outline' : 'edit' : <CircularProgress color='inherit'/>}</span>
                      </div>

                    </div>

                    <div className='role'>
                      <h3>{languages[language].settings.role}</h3>

                      <div className='line'>
                        <p>{userRole}</p>

                        <div className='help-container'>
                          <span className="material-symbols-outlined">question_mark</span>
                          <p className='help'>
                            {
                              userRole === 'member' ? 
                                languages[language].settings.roleHelp.member :
                              userRole === 'admin' ? 
                                languages[language].settings.roleHelp.admin :
                              'unknown role'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='buttons'>
                      <button className='delete' onClick={() => deleteUser(currentUser)}>
                        {languages[language].settings.delete}
                        <span className="material-symbols-outlined">delete</span>
                      </button>

                      <button onClick={() => firebaseConfig.auth().signOut()}>
                        {languages[language].settings.logout}
                        <span className="material-symbols-outlined">logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
              :
              <>
                <p>{languages[language].reauthentication.title}</p>
                <input type='email' placeholder={languages[language.reauthentication.email]} value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder={languages[language].reauthentication.password} value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={() => {
                  reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(email, password))
                    .then(res => {
                      currentUser.delete()
                      setShowReauth(false)
                    })
                    .catch(err => console.log('new err: ', err))
                }}>{languages[language].reauthentication.login}</button>
              </>
        }
      </div>
    </Layout>
  )
}

export default Settings