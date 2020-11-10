const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { URLSearchParams } = require('url')
const API_URL = require('./config')
const { capitalizeString } = require('./utils')

/**
 * Query based on "titleName" parameter and return page id.
 * If multiple page ids are returned, choose the first one.
 * Query includes "redirects" option to automatically traverse redirects.
 * All words will be capitalized as this generally yields more consistent results.
 */
const queryAPI = (titleName) => {
  titleName = capitalizeString(titleName)
  const params = new URLSearchParams({
    format: 'json',
    action: 'query',
    redirects: '',
    titles: titleName,
  })

  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: 'POST',
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        const pages = data.query.pages
        let pageId = -1
        for (const p in pages) {
          const page = pages[p]
          // api can return invalid recrods, these are marked as "missing"
          if (!('missing' in page)) {
            pageId = page.pageid
            break
          }
        }
        if (pageId > 0) {
          resolve(pageId)
        } else {
          resolve('NA')
        }
      })
      .catch((err) => reject(err))
  })
}

/**
 * Get the sections for a given page.
 * This makes parsing for quotes more manageable.
 * Returns an array of all "1.x" sections as these usually contain the quotes.
 * If no 1.x sections exists, returns section 1. Returns the titles that were used
 * in case there is a redirect.
 */
const getSectionsForPage = (pageId) => {
  const params = new URLSearchParams({
    format: 'json',
    action: 'parse',
    prop: 'sections',
    pageid: pageId,
  })

  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: 'POST',
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        const sectionArray = []
        const sections = data.parse.sections
        for (const s in sections) {
          const splitNum = sections[s].number.split('.')
          if (splitNum.length > 1) {
            sectionArray.push(sections[s].index)
          }
        }
        // Use section 1 if there are no "1.x" sections
        if (sectionArray.length === 0) {
          sectionArray.push('1')
        }
        resolve(sectionArray)
      })
      .catch((err) => reject(err))
  })
}

/**
 * Get all quotes for a given section.  Most sections will be of the format:
 * <h3> title </h3>
 * <ul>
 *   <li>
 *     Quote text
 *     <ul>
 *       <li> additional info on the quote </li>
 *     </ul>
 *   </li>
 * <ul>
 * <ul> next quote etc... </ul>
 *
 * The quote may or may not contain sections inside <b/> tags.
 *
 * For quotes with bold sections, only the bold part is returned for brevity
 * (usually the bold part is more well known).
 * in case there is a redirect.
 */
const getQuotesForSections = (sections, pageId) => {
  const promises = []
  for (const s in sections) {
    promises.push(_getQuotesForSection(s, pageId))
  }
  return new Promise((resolve, reject) => {
    const quotes = []
    Promise.allSettled(promises)
      .then((results) => {
        results.forEach((q) => {
          if (q.status === 'fulfilled') {
            quotes.push(...q.value)
          }
        })
        resolve(quotes)
      })
      .catch((err) => reject(err))
  })
}

const _getQuotesForSection = (section, pageId) => {
  const params = new URLSearchParams({
    format: 'json',
    action: 'parse',
    noimages: '',
    pageid: pageId,
    section: section,
  })
  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: 'POST',
      body: params,
    })
      .then((res) => res.json())
      .then((result) => {
        const quotesArr = []
        const quotes = result.parse.text['*']
        const $ = cheerio.load(quotes)
        $('li:not(li li)').each(function (i, elem) {
          const bolds = $(this).find('b').html()
          if (bolds !== null) quotesArr.push(bolds)
        })
        resolve(quotesArr)
      })
      .catch((err) => reject(err))
  })
}

/**
 * Get all the quotes and do a little cleanup
 */
const getQuotes = (quotes) => {
  return new Promise((resolve, reject) => {
    if (!quotes) return reject(new Error('`quotes` is null: Required array'))
    const allQuotes = []
    for (const q in quotes) {
      const $ = cheerio.load(quotes[q])
      allQuotes.push($.text())
    }
    resolve(allQuotes)
  })
}

module.exports = {
  queryAPI,
  getSectionsForPage,
  getQuotesForSections,
  getQuotes,
}
