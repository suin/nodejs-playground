process.on('exit', () => {
  console.log('[worker] exit')
})

setInterval(() => null, 10000)
