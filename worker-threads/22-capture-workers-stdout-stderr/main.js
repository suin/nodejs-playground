const { Worker } = require('worker_threads')

const worker = new Worker('./worker.js')
worker.stdout.unpipe(process.stdout)
worker.stderr.unpipe(process.stderr)

streamToString(worker.stdout).then(output => {
  console.log("worker's stdout: %O", output)
})
streamToString(worker.stderr).then(output => {
  console.log("worker's stderr: %O", output)
})

async function streamToString(stream) {
  let string = ''
  for await (const chunk of stream) {
    string += chunk.toString('utf-8')
  }
  return string
}
