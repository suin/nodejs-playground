const {highLoadTask} = require('./highLoadTask')

console.time('total')

console.time('task#1')
highLoadTask()
console.timeEnd('task#1')

console.time('task#2')
highLoadTask()
console.timeEnd('task#2')

console.time('task#3')
highLoadTask()
console.timeEnd('task#3')

console.timeEnd('total')
