console.log('\n\n===\ntest.js\n===\n\n')
console.log('process.argv %o', process.argv)
console.log('required %o', __filename)

const {workerData} = require('worker_threads')
console.log({workerData})

//
// const path = require('path')
// const tsNodeDevpath = require.resolve('ts-node-dev')
// const wrapJsPath = path.resolve(path.dirname(tsNodeDevpath), 'wrap.js')
//
// console.log('tsNodeDevpath %o', wrapJsPath)
// require(wrapJsPath)
//
// const {parentPort} = require('worker_threads')
//
// process.send = message => {
//   console.log('process.send message %o', message)
//   // parentPort.postMessage({type: 'ts-node-dev', message})
// }
//
// function clearRequireCache() {
//   Object.keys(require.cache).forEach(function(key) {
//     delete require.cache[key];
//   });
// }
//
// clearRequireCache()
//
// console.trace(Object.keys(require.cache))
