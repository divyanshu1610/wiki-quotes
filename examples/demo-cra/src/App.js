import './style.css'
import React from 'react'
import * as Wikiquotes from 'wiki-quotes'

const App = () => {
  // const [quote, setQuote] = useState({})

  const handleClick = () => {
    Wikiquotes.getRandomQuote()
      .then((q) => {
        console.log(q)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div>
      <h2>Random Quote</h2>
      <button onClick={handleClick}>Get Random Quote</button>
      {/* <h4>{quote.title}</h4>
      <p>{quote.quote}</p> */}
    </div>
  )
}

export default App
