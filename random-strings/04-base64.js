const {randomBytes} = require('crypto')

function generateRandomString(length) {
  return randomBytes(length).toString('hex')
}

// tests
const assert = require('assert')

const lengthList = [0, 1, 2, 4, 8, 16]

for (let length of lengthList) {
  const randomString = generateRandomString(length)
  console.log('string(%i) %o', randomString.length, randomString)
  assert(randomString.length === length)
}
