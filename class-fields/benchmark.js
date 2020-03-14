const target = process.argv[2] || 'es2020'
const instances = parseInt(process.argv[3] || '1')
const actionsPerInstance = parseInt(process.argv[4] || '1000000')

const {Foo} = require(target === 'esnext' ? './dist/esnext' : './dist/es2020')

function measure(methodName) {
  console.time(methodName)
  for (let a = 0; a < instances; a++) {
    const foo = new Foo()
    for (let b = 0; b < actionsPerInstance; b++) {
      foo[methodName]()
    }
  }
  console.timeEnd(methodName)
}

console.log('target: %s, instances: %i, actionsPerInstance: %i', target, instances, actionsPerInstance)
measure('readHardPrivateProperty')
measure('writeHardPrivateProperty')
measure('readSoftPrivateProperty')
measure('writeSoftPrivateProperty')
