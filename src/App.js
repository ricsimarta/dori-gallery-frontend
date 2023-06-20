import { useState } from 'react';
import './App.css';
import { AuthProvider } from './components/Auth';
import { LangProvider } from './components/Lang';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings/Settings';
import Login from './components/Login';
import Singup from './components/Singup';
import Admin from './components/Admin/Admin';
import { MessageProvider } from './components/Message';

const App = () => {

  /* useEffect(() => {
    fetch('/images/id')
      .then(res => res.json())
      .then(resJson => setData(resJson))
  }, []) */

  return (
    <AuthProvider>
      <LangProvider>
        <MessageProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Singup />} />
            </Routes>
          </Router>
        </MessageProvider>
      </LangProvider>
    </AuthProvider>
  );
}

export default App;
