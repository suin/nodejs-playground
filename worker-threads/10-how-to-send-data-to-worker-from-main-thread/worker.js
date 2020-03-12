const {parentPort} = require('worker_threads')
parentPort.on('message', message => {
  console.log('worker received message: %o', message)
})
