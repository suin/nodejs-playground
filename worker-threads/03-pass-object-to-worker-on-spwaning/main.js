const {Worker} = require('worker_threads')
const workerData = [1, 2, 3]
const worker = new Worker('./worker.js', { workerData })
setTimeout(() => console.log('main.js: %O', workerData), 1000)
