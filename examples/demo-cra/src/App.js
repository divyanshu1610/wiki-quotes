import './style.css'
import React, { useState } from 'react'
import * as Wikiquotes from 'wiki-quotes'

const App = () => {
  const [state, setState] = useState({ enabled: true, quote: '', title: '' })

  const handleClick = () => {
    setState({ enabled: false })
    Wikiquotes.getRandomQuote()
      .then((q) => {
        setState({ ...q, enabled: true })
      })
      .catch((e) => console.log(e))
  }

  return (
    <div>
      <h2>Random Quote</h2>
      <button disabled={!state.enabled} onClick={handleClick}>
        Get Random Quote
      </button>
      <h4>{state.title}</h4>
      <p>{state.quote}</p>
    </div>
  )
}

export default App
