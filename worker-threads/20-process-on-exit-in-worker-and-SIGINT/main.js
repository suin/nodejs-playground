const { Worker } = require('worker_threads')

process.on('SIGINT', () => {
  console.log('[main] SIGINT')
  process.exit()
})

const worker = new Worker('./worker.js')
console.log('Press Ctrl-C...')

setInterval(() => null, 10000)

// Output:
// Press Ctrl-C...
// ^C[main] SIGINT
// ※ worker.jsのprocess.on("SIGINT")、process.on("exit")は実行されない
