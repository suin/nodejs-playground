const {Worker} = require('worker_threads')
const worker = new Worker('./worker.js')
worker.postMessage('Hello!')
