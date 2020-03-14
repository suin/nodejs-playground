const {Worker} = require('worker_threads')

const max = 1024 * 2
console.log(`creating ${max} threads...`)
let onlineTotal = 0
for (let i = 1; i <= max; i++) {
  new Worker('./worker.js')
    .on('online', () => {
      onlineTotal++
      console.log(`worker #${i} is online now. [${onlineTotal}/${max}]`)
    })
}
