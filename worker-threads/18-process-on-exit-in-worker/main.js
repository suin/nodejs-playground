const { Worker } = require('worker_threads')

new Worker('./worker.js')
process.on('exit', () => {
  console.log('[main] exit')
})

// Output:
// [worker] exit
// [main] exit
