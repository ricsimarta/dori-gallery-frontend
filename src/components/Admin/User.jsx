import React, { useEffect } from 'react'

const User = ({user}) => {

  const makeDate = (firebaseDate) => {
    const dateElements = firebaseDate.split(',')[1].split(' ')
    const timeElements = dateElements[4].split(':')

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
    </div>
  )
}

export default User