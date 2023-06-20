import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Auth'
import Layout from '../Layout'

import './Admin.css'
import User from './User'
import { CircularProgress } from '@mui/material'

const Admin = () => {
  const { currentUser, userRole } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [sortDirection, setSortDirection] = useState('asc')
  const [sortBy, setSortBy] = useState('displayName')
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [roles, setRoles] = useState({})
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (currentUser && userRole === 'admin') {
      fetch('/users/admin', {
        method: 'GET',
        headers: {
          Authorization: currentUser?.uid
        }
      })
        .then(res => res.json())
        .then(resJson => {
          setUsers(resJson)
          setFilteredUsers(resJson)
        })
    }
  }, [currentUser])

  useEffect(() => {
    if (search.length > 2) setFilteredUsers([...users].filter(user => (Object.keys(user).map(key => user[key])).filter(value => typeof (value) === 'string' && value.toLowerCase().includes(search.toLowerCase())).length))
    else setFilteredUsers([...users])
  }, [search])

  useEffect(() => {
    if (filteredUsers) setRoles(countRoles(filteredUsers))
  }, [filteredUsers])

  const countRoles = (users) => {
    return {
      admins: users.filter(user => user.role === 'admin').length,
      mods: users.filter(user => user.role === 'mod').length,
      members: users.filter(user => user.role === 'member').length
    }
  }

  const sortUsersBy = (users, sortBy) => {
    if (sortBy === 'creationTime') {
      return sortDirection === 'asc' ? users.sort((a, b) => Date.parse(a.creationTime) - Date.parse(b.creationTime)) : users.sort((a, b) => Date.parse(b.creationTime) - Date.parse(a.creationTime))
    } else if (sortBy === 'lastSignInTime') {
      return sortDirection === 'asc' ? users.sort((a, b) => Date.parse(a.lastSignInTime) - Date.parse(b.lastSignInTime)) : users.sort((a, b) => Date.parse(b.lastSignInTime) - Date.parse(a.lastSignInTime))
    } else {
      return sortDirection === 'asc' ? users.sort((a, b) => a[sortBy].localeCompare(b[sortBy])) : users.sort((a, b) => b[sortBy].localeCompare(a[sortBy]))
    }
  }

  if (userRole !== 'admin') return <Navigate replace to='/' />
  if (!currentUser) return <Navigate replace to='/login' />

  return (
    <Layout>
      <div className='admin'>
        <h1>Admin</h1>

        {users.length === 0 ?
          <>
            <CircularProgress color='inherit' />
          </> :
          <>
            {/* <div className='users-list-settings'>
            </div> */}

            <div className='users-container'>
              <div className='listing-container'>
                <h3 className='listing'>
                  Listing <span className='number'>{filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}: </span>

                  <span className='number admin'>{roles.admins} {roles.admins === 1 ? "admin" : "admins"}</span>,

                  <span className='number mod'> {roles.mods} {roles.mods === 1 ? "mod" : "mods"}
                  </span>, and

                  <span className='number member'> {roles.members} {roles.member === 1 ? "member" : "members"}</span>.
                </h3>

                {showSearch ?
                  <div className='input-container'>
                    <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='search word...' />
                    <span className="material-symbols-outlined" onClick={() => {
                      if (search.length > 0) setSearch("")
                      else setShowSearch(false)
                    }}>close</span>
                  </div> :

                  <button className='search-icon' onClick={() => setShowSearch(true)}>
                    <span className="material-symbols-outlined">search</span>
                    <span className='text'>Search</span>
                  </button>}
              </div>

              {sortUsersBy(filteredUsers, sortBy).map((user, index) =>
                <User user={user} key={index} />
              )}
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

export default Admin