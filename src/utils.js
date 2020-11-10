/**
 * Any sentence
 * Returns the input string with the first alphabet of each word capitalize
 */

export function capitalizeString(input) {
  const inputArray = input.split(' ')
  const output = []
  for (const s in inputArray) {
    output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1))
  }
  return output.join(' ')
}

export const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
