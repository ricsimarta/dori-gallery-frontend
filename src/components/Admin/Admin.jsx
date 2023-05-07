import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth'
import Layout from '../Layout'

import './Admin.css'
import User from './User'
import { CircularProgress } from '@mui/material'

const Admin = () => {
  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users/admin', {
      method: 'GET',
      headers: {
        Authorization: currentUser.uid
      }
    })
      .then(res => res.json())
      .then(resJson => setUsers(resJson))
  }, [])

  return (
    <Layout>
      <div className='admin'>
        <h1>ADmin</h1>
        {!users.length ?
          <>
            <CircularProgress color='inherit' />
          </> :
          <>
            {users.map((user, index) =>
              <User user={user} key={index} />
            )}
          </>
        }
      </div>
    </Layout>
  )
}

export default Admin