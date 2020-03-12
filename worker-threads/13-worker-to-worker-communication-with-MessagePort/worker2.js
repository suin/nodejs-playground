const assert = require('assert')
const {parentPort, MessagePort} = require('worker_threads')
parentPort.once('message', ({worker1}) => {
  assert(worker1 instanceof MessagePort)
  worker1.on('message', message => {
    console.log('worker2 received message: %o', message)
  })
})
