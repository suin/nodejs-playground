const {highLoadTask} = require('./highLoadTask')

function asyncHighLoadTask(taskName) {
  return new Promise(resolve => {
    console.time(taskName)
    highLoadTask()
    console.timeEnd(taskName)
    resolve()
  })
}

(async function () {
  console.time('total')
  await Promise.all([
    asyncHighLoadTask('task#1'),
    asyncHighLoadTask('task#2'),
    asyncHighLoadTask('task#3'),
  ])
  console.timeEnd('total')
})()

