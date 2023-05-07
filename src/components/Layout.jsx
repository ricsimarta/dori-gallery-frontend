import React, { useContext, useState } from 'react'
import { AuthContext } from './Auth'
import Header from './Header/Header'

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout