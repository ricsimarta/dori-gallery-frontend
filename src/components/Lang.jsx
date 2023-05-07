import React, { useState } from 'react'
import { languages } from './Languages'

const LangContext = React.createContext()

const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState("english")

  return (
    <LangContext.Provider value={{language, setLanguage}}>
      {children}
    </LangContext.Provider>
  )
}

export { LangContext, LangProvider, }