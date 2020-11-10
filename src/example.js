const Wikiquotes = require('./index')

Wikiquotes.getRandomQuote()
  .then((q) => console.log(q))
  .catch((e) => console.log)

Wikiquotes.getRandomQuoteByTitle('Mahatma Gandhi')
  .then((q) => console.log(q))
  .catch((e) => console.log)
