import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    external: ['cheerio', 'axios'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
]
