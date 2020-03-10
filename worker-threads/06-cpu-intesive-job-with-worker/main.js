const {Worker} = require('worker_threads')

console.time('total')
const worker1 = new Worker('./worker.js', {
  workerData: 'worker1',
})
const worker2 = new Worker('./worker.js', {
  workerData: 'worker2',
})
const worker3 = new Worker('./worker.js', {
  workerData: 'worker3',
})

Promise.all([
  new Promise(r => worker1.on('exit', r)),
  new Promise(r => worker2.on('exit', r)),
  new Promise(r => worker3.on('exit', r)),
]).then(() => console.timeEnd('total'))
