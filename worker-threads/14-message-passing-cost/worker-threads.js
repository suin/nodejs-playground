const {repeat, data} = require('./config.js')
const {isMainThread, Worker, parentPort} = require('worker_threads')
if (isMainThread) {
  let count = 0
  new Worker(__filename)
    .on('message', function (message) {
      if (message === 'end') {
        console.timeEnd('test')
        this.terminate()
        return
      } else if (message === 'start') {
        console.time('test')
      }
      this.postMessage(++count <= repeat)
    })
} else {
  parentPort.postMessage('start')
  parentPort.on('message', continues => {
    parentPort.postMessage(continues ? data : 'end')
  })
}

