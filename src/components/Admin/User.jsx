import React, { useContext, useEffect } from 'react'

import { MessageContext } from '../Message'

import './User.css'

const User = ({user}) => {
  const { setMessage } = useContext(MessageContext)

  const makeDate = (firebaseDate) => {
    //['', '17', 'Apr', '2023', '22:43:16', 'GMT'] (3) ['22', '43', '16']
    //new Date(year,month,day,hours,minutes,seconds,ms)
    return new Date(firebaseDate).toLocaleString()
  }

  return (
    <div className='admin-user'>
      <div className='email'>
        <h2>Email:</h2>
        <h3>{user.email}</h3>
      </div>

      <div className='name'>
        <h2>Display name:</h2>
        <h3>{user.displayName}</h3>
      </div>

      <div className='role'>
        <h2>Role:</h2>
        <h3>{user.role}</h3>
      </div>

      <div className='creation-date'>
        <h2>Creation date:</h2>
        <h3>{makeDate(user.creationTime)}</h3>
      </div>

      <div className='last-login-date'>
        <h2>Last login:</h2>
        <h3>{makeDate(user.lastSignInTime)}</h3>
      </div>

      <div className='action-buttons'>
        <button className='ban' onClick={() => {
          console.log('click')
          setMessage({
            type: 'success',
            text: `User ${user.email} is now banned. `
          })
        }}>
          <span className="material-symbols-outlined">block</span>
          <span className='text'>Ban</span>
        </button>

        <button className='delete'>
          <span className="material-symbols-outlined">delete</span>
          <span className='text'>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default User