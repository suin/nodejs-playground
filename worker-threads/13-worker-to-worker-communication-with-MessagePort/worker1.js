const assert = require('assert')
const {parentPort, MessagePort} = require('worker_threads')
parentPort.once('message', ({worker2}) => {
  assert(worker2 instanceof MessagePort)
  worker2.postMessage('message from worker1')
})
