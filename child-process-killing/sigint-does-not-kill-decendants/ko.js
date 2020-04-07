console.log('ko.js: running')

// SIGINTを受け付けたとき
process.on('SIGINT', () => {
  console.log('ko.js: SIGINT')
  process.exit()
})

// プロセスが終了するとき
process.on('exit', () => {
  console.log('ko.js: exit')
})

// 孫プロセスを起動する
require('child_process').fork('mago.js')

// このプロセスがずっと起動し続けるためのおまじない
setInterval(() => null, 10000)
