import React, { useEffect, useState } from 'react'

import './Message.css'

const MessageContext = React.createContext()

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({})
  const [timeoutId, setTimeoutId] = useState(0)
  const [fading, setFading] = useState(false)
  const [fadingTimeoutId, setFadingTimeoutId] = useState(0)

  useEffect(() => {
    setFading(false)
    if (timeoutId) {
      clearTimeout(timeoutId)
      clearTimeout(fadingTimeoutId)
    }

    setFadingTimeoutId(setTimeout(() => {
      setFading(true)
    }, 3700))    

    setTimeoutId(setTimeout(() => {
      setMessage({})
    }, 4000))
  }, [message])

  return (
    <MessageContext.Provider value={{ setMessage }}>
      {Object.keys(message).length !== 0 && 
      <div className={`
        message
        ${fading ? 'fading' : ''} 
        ${message.type === 'success' && 'success'}
        ${message.type === 'error' && 'error'}`}>
        {message.text}
      </div>}
      {children}
    </MessageContext.Provider>
  )
}

export { MessageContext, MessageProvider }