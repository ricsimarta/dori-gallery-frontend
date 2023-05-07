import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth'
import Layout from './Layout'

const Home = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Layout>
      <div className='home'>
        <h1>home asd</h1>

        {currentUser ?
          <>
            <p>logged in as {currentUser.email}</p>
            <Link to='/settings'>settings</Link>
          </>
          :
          <p>
            <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link>
          </p>
        }
      </div>
    </Layout>
  )
}

export default Home