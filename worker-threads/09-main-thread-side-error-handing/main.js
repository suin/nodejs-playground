const {Worker} = require('worker_threads')
const worker = new Worker('./worker.js')
worker.on('error', err => {
  console.error(err.message)
})
setTimeout(function () {
  console.log('The main thread is alive!')
}, 3000)
