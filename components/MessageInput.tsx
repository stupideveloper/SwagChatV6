

import { useState } from 'react'
const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState('')

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      if(event.target["value"] == "") return
      if(event.target["value"].length > 350) return
      onSubmit(messageText)
      setMessageText('')
    }
  }

  return (
    <>
      <input
        className="shadow appearance-none border border-slate-600 placeholder:text-slate-600 focus:placeholder:text-slate-400 focus:bg-slate-800 rounded w-full py-2 px-3 bg-slate-900 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  )
}

export default MessageInput
