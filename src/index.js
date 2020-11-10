const {
  queryAPI,
  getSectionsForPage,
  getQuotesForSections,
  getQuotes,
} = require('./functions')

const { randomInt } = require('./utils')

const getRandomQuote = (titleList) => {
  const defaultList = [
    'Mahatma Gandhi',
    'Albert Einstein',
    'Martin Luther King, Jr.',
    'Leonardo da Vinci',
    'Walt Disney',
    'Edgar Allan Poe',
    'Sigmund Freud',
    'Thomas A. Edison',
    'Robin Williams',
    'Steve Jobs',
  ]
  if (!titleList) {
    titleList = defaultList
  }
  const titleName = titleList[randomInt(0, titleList.length)]
  console.log(titleName)
  return getRandomQuoteByTitle(titleName)
}

const getRandomQuoteByTitle = (titleName) => {
  return new Promise((resolve, reject) => {
    let pageId = null
    queryAPI(titleName)
      .then((pageid) => {
        pageId = pageid
        return getSectionsForPage(pageid)
      })
      .then((sections) => getQuotesForSections(sections, pageId))
      .then((quotes) => getQuotes(quotes))
      .then((d) => {
        const i = randomInt(0, d.length)
        resolve({ title: titleName, quote: d[i] })
      })
      .catch((err) => reject(err))
  })
}

const Wikiquotes = {
  getRandomQuote,
  getRandomQuoteByTitle,
}

module.exports = Wikiquotes
