const {Worker} = require('worker_threads')
const worker1 = new Worker('./worker.js', {
  workerData: 'worker1',
})
const worker2 = new Worker('./worker.js', {
  workerData: 'worker2',
})
