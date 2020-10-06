process.on('SIGINT', () => {
  console.log('[worker] SIGINT')
})
process.on('exit', () => {
  console.log('[worker] exit')
})

setInterval(() => null, 10000)
