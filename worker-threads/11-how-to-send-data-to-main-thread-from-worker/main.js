const {Worker} = require('worker_threads')
const worker = new Worker('./worker.js')
worker.on('message', message => {
  console.log('Main thread received message: %o', message)
})
