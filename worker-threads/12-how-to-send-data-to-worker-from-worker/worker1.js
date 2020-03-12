const {parentPort} = require('worker_threads')
parentPort.postMessage('message from worker1')
