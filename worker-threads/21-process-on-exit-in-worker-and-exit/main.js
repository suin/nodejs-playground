const { Worker } = require('worker_threads')

const worker = new Worker('./worker.js')
process.on('exit', () => {
  console.log('[main] exit')
})
process.exit()

// Output:
// [main] exit
// ※ worker.jsのprocess.on("exit")は実行されない
