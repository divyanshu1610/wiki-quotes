import * as Wikiquotes from './index.js'

Wikiquotes.getRandomQuote()
  .then((q) => console.log(q))
  .catch((e) => console.log(e))

Wikiquotes.getRandomQuoteByTitle('Mahatma Gandhi')
  .then((q) => console.log(q))
  .catch((e) => console.log(e))
