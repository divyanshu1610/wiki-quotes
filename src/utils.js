/**
 *
 * Any sentence
 * Returns the input string with the first alphabet of each word capitalize
 */

function capitalizeString(input) {
  const inputArray = input.split(' ')
  const output = []
  for (const s in inputArray) {
    output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1))
  }
  return output.join(' ')
}

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  capitalizeString,
  randomInt,
}
