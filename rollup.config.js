export default {
  external: ['cheerio', 'node-fetch'],
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.common.js',
    format: 'cjs',
  },
}
