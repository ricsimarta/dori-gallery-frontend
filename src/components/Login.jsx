import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'
import Layout from './Layout'

import './Login.css'

const Login = () => {
  const { currentUser } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetEmail2, setResetEmail2] = useState("")
  const [wrongEmail, setWrongEmail] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    firebaseConfig.auth().signInWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(err => {
        switch (err.code) {
          case 'auth/user-not-found':
            console.log('nem található user')
            break
          case 'auth/wrong-password':
            console.log('hibás jelszó')
            break
          case 'auth/too-many-requests':
            console.log('túl sok hibás próbálkozás')
            break
          default:
            console.log('ismeretlen hiba')
            console.log(err.code)
            console.log(err)
        }
      })
  }

  const handleReset = e => {
    e.preventDefault()

    if (resetEmail !== resetEmail2) {
      setWrongEmail(true)
    } else {
      setWrongEmail(false)
      sendPasswordResetEmail(firebaseConfig.auth(), resetEmail)
        .then(res => {
          console.log('reset pw sent: ', res)
          setResetEmail("")
          setResetEmail2("")
        })
        .catch(err => console.log(err))
    }
  }

  if (currentUser) return <Navigate replace to='/' />

  return (
    <Layout>
      <div className='login'>
        <h1>{!showReset ? "Sign in" : "Forgotten password"}</h1>

        <div className='form-container'>

          {!showReset ?
            <form onSubmit={handleSubmit}>
              <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
              <input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />

              <div className='buttons'>
                <button type='submit' className='submit'>
                  <span className="material-symbols-outlined">key</span>
                  <span className='text'>Log in</span>
                </button>

                <button type='button' className='forgotten' onClick={() => {
                  setShowReset(true)
                  setEmail("")
                  setPassword("")
                }}>
                  <span className="material-symbols-outlined">psychology_alt</span>
                  <span className='text'>Forgotten</span>
                </button>
              </div>
            </form> :
            <form onSubmit={handleReset}>
              <input className={wrongEmail ? 'wrong' : null} type='email' placeholder='email' value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
              <input className={wrongEmail ? 'wrong' : null} type='email' placeholder='email again' value={resetEmail2} onChange={e => setResetEmail2(e.target.value)} />

              <div className='buttons'>
                <button type='submit'>
                  <span className="material-symbols-outlined">send</span>
                  <span className='text'>Send</span>
                </button>

                <button type='button' className='forgotten' onClick={() => {
                  setShowReset(false)
                  setWrongEmail(false)
                  setResetEmail("")
                  setResetEmail2("")
                }}>
                  <span className="material-symbols-outlined">cancel</span>
                  <span className='text'>Cancel</span>
                </button>

              </div>
            </form>
          }
        </div>
      </div>
    </Layout>
  )
}

export default Login