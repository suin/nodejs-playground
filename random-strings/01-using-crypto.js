const {randomBytes} = require('crypto')

function generateRandomString(length) {
  return randomBytes(length).reduce((p, n) => p + n.toString(36).slice(-1), '')
}

const assert = require('assert')

const lengthList = [0, 1, 2, 4, 8, 16]

for (let length of lengthList) {
  const randomString = generateRandomString(length)
  console.log('string(%i) %o', randomString.length, randomString)
  assert(randomString.length === length)
}
