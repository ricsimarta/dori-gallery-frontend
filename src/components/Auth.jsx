import React, { useEffect, useState } from 'react'
import firebaseConfig from '../firebase-config'
import { CircularProgress } from '@mui/material'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])
  
  useEffect(() => {
    if (currentUser) {
      fetch('/users/user-role', { headers: { Authorization: currentUser.uid } })
        .then(res => res.json())
        .then(resJson => {
          setUserRole(resJson)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [currentUser])

  if (loading) {
    return <CircularProgress color='inherit' />
  }

  return (
    <AuthContext.Provider value={{currentUser, userRole}}>
        {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }