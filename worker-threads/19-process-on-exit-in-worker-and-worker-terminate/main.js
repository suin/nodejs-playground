const { Worker } = require('worker_threads')

const worker = new Worker('./worker.js')
worker.on('exit', () => console.log('[main] worker exit'))
worker.terminate()

// Output:
// [main] worker exit
// ※ワーカーのconsole.logは実行されない
