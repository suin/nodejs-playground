
console.log('\n\n===\nworker.js started\n===\n\n')

console.log(process.argv)

process.argv = [process.argv[0], null, process.argv[1]]

process.send = message => {
  console.log('process.send message %o', message)
  // parentPort.postMessage({type: 'ts-node-dev', message})
}

// function clearRequireCache() {
//   Object.keys(require.cache).forEach(function(key) {
//     delete require.cache[key];
//   });
// }
//
// clearRequireCache()

const tsNodeDevHookJs = process.execArgv.find(value => /ts-node-dev-hook-.+\.js/.test(value))
console.log('tsNodeDevHookJs %o', tsNodeDevHookJs)
if (tsNodeDevHookJs) {
  require('ts-node-dev')
  console.log('require %o', tsNodeDevHookJs)
  console.log(require(tsNodeDevHookJs))
}

const path = require('path')
const tsNodeDevpath = require.resolve('ts-node-dev')
const wrapJsPath = path.resolve(path.dirname(tsNodeDevpath), 'wrap.js')

console.log('tsNodeDevpath %o', wrapJsPath)
require(wrapJsPath)


// if (tsNodeDevHookJs) {
//   console.log('require %o', tsNodeDevHookJs)
//   console.log(require(tsNodeDevHookJs))
// }
//
// console.log(Object.keys(require.cache))
//
//
// // require('ts-node').register()
require(__dirname + '/tsWorker.ts')
