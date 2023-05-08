import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Layout from './Layout'

const Singup = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
        <h1>sign up</h1>

        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
          <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
          <button>submit</button>
        </form>

        <Link to='/login'>login</Link>
      </div>
    </Layout>
  )
}

export default Singup