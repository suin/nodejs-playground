console.log('mago.js: running')

// SIGINTを受け付けたとき
process.on('SIGINT', () => {
  console.log('mago.js: SIGINT')
  process.exit()
})

// プロセスが終了するとき
process.on('exit', () => {
  console.log('mago.js: exit')
})

// このプロセスがずっと起動し続けるためのおまじない
setInterval(() => null, 10000)
