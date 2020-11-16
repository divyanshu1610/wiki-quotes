const Wikiquotes = require('wiki-quotes')

Wikiquotes.getRandomQuote()
  .then((q) => console.log(q))
  .catch((e) => console.log(e))
