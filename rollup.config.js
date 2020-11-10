export default {
  external: ['cheerio', 'node-fetch'],
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      globals: {
        cheerio: 'cheerio',
        'node-fetch': 'fetch',
      },
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      globals: {
        cheerio: 'cheerio',
        'node-fetch': 'fetch',
      },
    },
    {
      name: 'Wikiquotes',
      file: 'dist/bundle.umd.js',
      format: 'umd',
      globals: {
        cheerio: 'cheerio',
        'node-fetch': 'fetch',
      },
    },
  ],
}
