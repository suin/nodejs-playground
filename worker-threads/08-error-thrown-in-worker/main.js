const {Worker} = require('worker_threads')
const worker = new Worker('./worker.js')
setTimeout(function () {
  console.log('The main thread is alive!')
}, 3000)
