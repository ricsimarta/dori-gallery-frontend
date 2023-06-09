import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from './../Auth'
import firebaseConfig from './../../firebase-config'

import './Header.css'
import { LangContext } from '../Lang'
import { languages } from '../Languages'

const Header = () => {
  const { currentUser, userRole } = useContext(AuthContext)
  const { language } = useContext(LangContext)

  return (
    <header>
      <ul>
        {currentUser ?
          <>
            <div className='left-side'>
              <NavLink to='/'>
                <span className="material-symbols-outlined">home</span>
                <span className='text'>{languages[language].header.home}</span>
              </NavLink>

              <NavLink to='/settings'>
                <span className="material-symbols-outlined">settings</span>
                <span className='text'>{languages[language].header.settings}</span>
              </NavLink>

              {userRole === 'admin' && <NavLink to='/admin'>
                <span className="material-symbols-outlined">manage_accounts</span>
                <span className='text'>{languages[language].header.admin}</span>
              </NavLink>}
            </div>

            <button onClick={() => firebaseConfig.auth().signOut()}>
              <span className="material-symbols-outlined">logout</span>
              <span className='text'>{languages[language].header.logout}</span>
            </button>
          </>
          :
          <div className='left-side'>
            <NavLink to='/login'>
              <span className="material-symbols-outlined">login</span>
              <span className='text'>Login</span>
            </NavLink>

            <NavLink to='/signup'>
              <span className="material-symbols-outlined">person_add</span>
              <span className='text'>Sign up</span>
            </NavLink>
          </div>
        }

      </ul>
    </header>
  )
}

export default Header