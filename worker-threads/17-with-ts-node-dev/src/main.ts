import {Worker} from 'worker_threads'

// @ts-ignore
process.originalSend = process.send

// @ts-ignore
process.send = function(...args) {
  console.log('sending... %o', args)
  // @ts-ignore
  this.originalSend(...args)
}

console.log(process.argv)

const worker = new Worker(__dirname + '/worker.js', {
  execArgv: [],
})
if (typeof process.send === 'function') {
  worker.on('message', (message: any) => {
    if (
      typeof message === 'object' &&
      message !== null &&
      message.type === 'ts-node-dev'
    ) {
      console.log('relay %o', message.message)
      process.send!(message.message)
    }
  })
}

//
require('./hoge')
