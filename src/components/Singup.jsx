import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Layout from './Layout'

import './Signup.css'

const Singup = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    fetch('/users/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson)
        setCurrentUser(true)
      })
      .catch(err => console.log(err))
  }

  if (currentUser) return <Navigate replace to='/' />

  return (
    <Layout>
      <div className='signup'>
        <h1>Sign up</h1>

        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            <input type='password' placeholder='password again' value={password2} onChange={e => setPassword2(e.target.value)} />

            <div className='buttons'>
              <button>
                <span className="material-symbols-outlined">send</span>
                <span className='text'>Send</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  )
}

export default Singup