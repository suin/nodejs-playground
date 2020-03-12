const {Worker} = require('worker_threads')
const worker1 = new Worker('./worker1.js')
const worker2 = new Worker('./worker2.js')
worker1.on('message', message => worker2.postMessage(message))
