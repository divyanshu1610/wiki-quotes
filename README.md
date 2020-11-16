# Wiki-Quotes

[![Pipeline status][pipeline_badge]][pipeline_url]
<!-- [![Published on NPM][npm_badge]][npm_url] -->

An API for [Wikiquote][wikiquote]

- [Installation](#installation)
- [Usage](#usage)
  - [Import library](#import-library)
    - [ES2017 Module style](#es2017-module-style)
      - [In Node](#in-node)
    - [Old style](#old-style)
      - [Old style in Node](#old-style-in-node)
  - [API](#api)
  - [Examples](#examples)
    - [Get Random Quote](#get-random-quote)
    - [Get Random Quote By Title](#get-random-quote-by-title)
    - [More Examples][more_examples]
- [Powered by Wikidata](#powered-by-wikidata)
- [License](#license)

## Installation

With [`NPM`][npm]

```bash
npm install @divyanshu1610/wiki-quotes --save
```

## Usage

### Import library

#### ES2017 Module style

##### In Node

```javascript
import * as Wikiquotes from 'wiki-quotes'
```

#### Old style

##### Old style in Node

```javascript
const Wikiquotes = require('wiki-quotes')
```

### API

`wiki-quotes` provides this functions

```typescript
function getRandomQuote(
  titleList?: [string]
): { title: string, quote: string }
```
> Note: If `titleList` is not provided a `defaultList` is used and a random quote by any one of them will be returned otherwise overrided by `titleList`.
```typescript
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

```


```typescript
function getRandomQuoteByTitle(
  titleName: string
): { title: titleName, quote: string }

```



### Examples

> #### Get Random Quote

```javascript
// returns a promise that resolve with quote and it's person's name as title.
WikiquoteApi.getRandomQuote().then(console.log)
// Output:
{
  title: 'Robin Williams',
  quote: 'Look! The moon like a testicle hangs low in the sky. This bodes not well.'
}
```

> #### Get Random Quote By Title

```javascript
// returns a promise that resolve with quote and it's person's name as title.
WikiquoteApi.getRandomQuoteByTitle('Mahatma Gandhi').then(console.log)
// Output:
{
  title: 'Mahatma Gandhi',
  quote: 'Good government is no substitute for self-government.'
}
```

## Powered by Wikidata

Don't forget to add `Powered by Wikidata` to your project

## License

[MIT][license]

[pipeline_badge]: https://github.com/divyanshu1610/wiki-quotes/workflows/%F0%9F%9B%A0%20Build/badge.svg?branch=main
[pipeline_url]: https://github.com/divyanshu1610/wiki-quotes/workflows/%F0%9F%9B%A0%20Build/badge.svg?branch=main
<!-- [npm_badge]: -->
<!-- [npm_url]:  -->
[wikiquote]: https://www.wikiquote.org
[npm]: https://www.npmjs.com
[more_examples]: https://github.com/divyanshu1610/wiki-quotes/tree/main/examples
[license]: https://github.com/divyanshu1610/wiki-quotes/blob/main/LICENSE
