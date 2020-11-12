import { capitalizeString } from '../src/utils.js'

test('it capitalizes only the first alphabet of the word', () => {
  expect(capitalizeString('helloworld')).toEqual('Helloworld')
})

test('it returns the same string', () => {
  expect(capitalizeString('Helloworld')).toEqual('Helloworld')
})

test('it return empty string', () => {
  expect(capitalizeString('')).toEqual('')
})

test('it return null', () => {
  expect(capitalizeString(null)).toEqual(null)
})
