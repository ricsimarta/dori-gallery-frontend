import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'
import Layout from './Layout'

const Login = () => {
  const { currentUser } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

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


    /* try {
      firebaseConfig.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
      alert(err)
    } */
  }

  if (currentUser) return <Navigate replace to='/settings' />

  return (
    <Layout>
      <div className='login'>
        <h1>sign in</h1>

        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
          <input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button>submit</button>
        </form>

        <Link to='/signup'>signup</Link>

        <button onClick={() => setShowReset(!showReset)}>forgotten pw</button>
        {showReset &&
          <>
            <input type='email' placeholder='forgotten email' value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
            <button onClick={() => {
              //send reset pw email
              sendPasswordResetEmail(firebaseConfig.auth(), resetEmail)
                .then(res => console.log('reset pw sent: ', res))
                .catch(err => console.log(err))
            }}>send</button>
          </>
        }
      </div>
    </Layout>
  )
}

export default Login