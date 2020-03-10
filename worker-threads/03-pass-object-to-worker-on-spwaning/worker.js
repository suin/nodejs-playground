const {workerData} = require('worker_threads')
console.log('worker.js %O', workerData)
workerData.push(4, 5, 6)
console.log('worker.js %O', workerData)
