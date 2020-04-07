console.log('oya.js: running')

// SIGINTを受け付けたとき
process.on('SIGINT', () => {
  console.log('oya.js: SIGINT')
  process.exit()
})

// プロセスが終了するとき
process.on('exit', () => {
  console.log('oya.js: exit')
})

// 子プロセスを起動
const ko = require('child_process').fork('ko.js')

// 3秒後にproc2.jsを終了する
setTimeout(() => {
  console.log('oya.js: ko.jsを終了させてます...')
  ko.kill('SIGINT')
}, 3000)

// ko.jsが終了したとき
ko.on('exit', () => {
  console.log('> Ctrl-Cを押してください...')
})

// このプロセスがずっと起動し続けるためのおまじない
setInterval(() => null, 10000)
