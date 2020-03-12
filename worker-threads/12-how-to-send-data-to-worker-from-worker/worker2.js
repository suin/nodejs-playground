const {parentPort} = require('worker_threads')
parentPort.on('message', message => {
  console.log('worker2 received message: %o', message)
})
