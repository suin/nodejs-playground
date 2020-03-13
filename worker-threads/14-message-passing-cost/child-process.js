const {repeat, data} = require('./config.js')
const {fork} = require('child_process')
if (process.send === undefined) {
  // parent process
  let count = 0
  fork(__filename)
    .on('message', function (message) {
      if (message === 'end') {
        console.timeEnd('test')
        this.kill()
        return
      } else if (message === 'start') {
        console.time('test')
      }
      this.send(++count <= repeat)
    })
} else {
  process.send('start')
  process.on('message', continues => {
    process.send(continues ? data : 'end')
  })
}
