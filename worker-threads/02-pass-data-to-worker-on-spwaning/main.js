const {Worker} = require('worker_threads')
const worker = new Worker('./worker.js', {
  workerData: 'message from main.js!',
})
