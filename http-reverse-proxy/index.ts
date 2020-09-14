import * as fs from 'fs'
import http, { createServer, IncomingMessage, RequestOptions } from 'http'
import chalk from 'chalk'

const main = async () => {
  // TCPバックエンドサーバー
  const tcpBackendServerPort = 9000
  const tcpBackendServer = createServer(async (req, res) => {
    res.writeHead(200, { 'x-backend': 'A header from TCP backend server' })

    if (req.url!.includes('/stream/')) {
      console.log(chalk.blue(quote('>', await textifyMessage(req))))
      res.write('TCPバックエンドサーバーからのストリームレスポンスです\n')
      for (let i = 1; i <= 3; i++) {
        res.write(`${i}\n`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      res.end()
      return
    }

    if (req.url!.includes('/timeout/')) {
      console.log(chalk.blue(quote('>', await textifyMessage(req))))
      console.log('TCPバックエンドサーバーは10秒後にレスポンスを返します。')
      setTimeout(() => {
        res.write('TCPバックエンドサーバーからのストリームレスポンスです\n')
        res.end()
      }, 10000)
      return
    }

    console.log(chalk.blue(quote('>', await textifyMessage(req))))
    res.end('TCPバックエンドサーバーからのレスポンスです')
  })
  await new Promise((resolve, reject) => {
    try {
      tcpBackendServer.listen(tcpBackendServerPort, resolve)
    } catch (e) {
      reject(e)
    }
  })
  console.log(`TCPバックエンドサーバー起動完了: ポート${tcpBackendServerPort}`)

  // TCPバックエンドサーバーに直接リクエストを出すテスト
  console.log('TCPバックエンドサーバーに直接リクエストを出すテスト')
  const response = await request({
    host: '127.0.0.1',
    port: tcpBackendServerPort,
    method: 'GET',
    path: '/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response))))

  // IPCバックエンドサーバー
  const ipcBackendServerPath = process.cwd() + '/ipcBackendServer.sock'
  fs.existsSync(ipcBackendServerPath) && fs.unlinkSync(ipcBackendServerPath)
  const ipcBackendServer = createServer(async (req, res) => {
    res.writeHead(200, { 'x-backend': 'A header from IPC backend server' })

    if (req.url!.includes('/stream/')) {
      console.log(chalk.blue(quote('>', await textifyMessage(req))))
      res.write('IPCバックエンドサーバーからのストリームレスポンスです\n')
      for (let i = 1; i <= 3; i++) {
        res.write(`${i}\n`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      res.end()
      return
    }

    console.log(chalk.blue(quote('>', await textifyMessage(req))))
    res.end('IPCバックエンドサーバーからのレスポンスです')
  })
  await new Promise((resolve, reject) => {
    try {
      ipcBackendServer.listen(ipcBackendServerPath, resolve)
    } catch (e) {
      reject(e)
    }
  })
  console.log(`IPCバックエンドサーバー起動完了: パス: ${ipcBackendServerPath}`)

  // IPCバックエンドサーバーに直接リクエストを出すテスト
  console.log('IPCバックエンドサーバーに直接リクエストを出すテスト')
  const response2 = await request({
    socketPath: ipcBackendServerPath,
    host: 'example.com',
    method: 'GET',
    path: '/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response2))))

  // プロキシサーバ
  const proxyServerPort = 8000
  const proxyServer = createServer(async (clientReq, clientRes) => {
    if (/^\/tcp\//.test(clientReq.url!)) {
      const serverReq = http
        .request({
          host: '127.0.0.1',
          port: tcpBackendServerPort,
          method: clientReq.method,
          path: clientReq.url,
          headers: {
            ...clientReq.headers,
            'x-proxy': 'A header proxy server added to request',
          },
          timeout: 5000, // タイムアウトまで5秒
        })
        .on('error', () => clientRes.writeHead(502).end())
        .on('timeout', () => {
          serverReq.abort()
          clientRes.writeHead(504).end()
        })
        .on('response', serverRes => {
          clientRes.writeHead(serverRes.statusCode!, {
            ...serverRes.headers,
            'x-proxy': 'A header proxy server added to response',
          })
          serverRes.pipe(clientRes)
        })
      clientReq.pipe(serverReq)
      return
    }

    if (/^\/ipc\//.test(clientReq.url!)) {
      const serverReq = http
        .request({
          host: 'example.com',
          socketPath: ipcBackendServerPath,
          method: clientReq.method,
          path: clientReq.url,
          headers: {
            ...clientReq.headers,
            'x-proxy': 'A header proxy server added to request',
          },
        })
        .on('error', () => clientRes.writeHead(502).end())
        .on('timeout', () => {
          serverReq.abort()
          clientRes.writeHead(504).end()
        })
        .on('response', serverRes => {
          clientRes.writeHead(serverRes.statusCode!, {
            ...serverRes.headers,
            'x-proxy': 'A header proxy server added to response',
          })
          serverRes.pipe(clientRes)
        })
      clientReq.pipe(serverReq)
      return
    }

    console.log(chalk.blue(quote('>', await textifyMessage(clientReq))))
    clientRes.writeHead(404)
    clientRes.end('バックエンドサーバーが見つかりません')
  })
  await new Promise((resolve, reject) => {
    try {
      proxyServer.listen(proxyServerPort, resolve)
    } catch (e) {
      reject(e)
    }
  })
  console.log(`プロキシサーバー起動完了: ポート: ${proxyServerPort}`)

  console.log('バックエンドが存在しないURLにリクエスト')
  const response3 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/404',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response3))))

  console.log('プロキシサーバ越しにTCPバックエンドサーバーにリクエスト')
  const response4 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/tcp/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response4))))

  console.log('プロキシサーバ越しにIPCバックエンドサーバーにリクエスト')
  const response5 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/ipc/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response5))))

  console.log(
    'プロキシサーバ越しにTCPバックエンドサーバーのストリームレスポンスを取得',
  )
  const response6 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/tcp/stream/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response6, false))))
  for await (const chunk of response6) {
    console.log(chalk.green(quote('<', chunk.toString().trim())))
  }

  console.log(
    'プロキシサーバ越しにIPCバックエンドサーバーのストリームレスポンスを取得',
  )
  const response7 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/ipc/stream/',
    headers: {},
    timeout: 10,
  })
  console.log(chalk.green(quote('<', await textifyMessage(response7, false))))
  for await (const chunk of response7) {
    console.log(chalk.green(quote('<', chunk.toString().trim())))
  }

  console.log('TCPバックエンドサーバーの応答の遅さでタイムアウトする例')
  const response8 = await request({
    host: '127.0.0.1',
    port: proxyServerPort,
    method: 'GET',
    path: '/tcp/timeout/',
    headers: {},
  })
  console.log(chalk.green(quote('<', await textifyMessage(response8))))

  console.log('すべてのデモが完了しました。')
  proxyServer.close()
  tcpBackendServer.close()
  ipcBackendServer.close()
}

const request = (options: RequestOptions): Promise<IncomingMessage> =>
  new Promise((resolve, reject) =>
    http
      .request(options)
      .on('response', resolve)
      .on('error', reject)
      .on('timeout', () => reject(new Error('Timeout')))
      .end(),
  )

const textifyMessage = (
  msg: IncomingMessage,
  consumesBody = true,
): Promise<string> =>
  new Promise(async resolve => {
    let text = ''
    text += msg.method
      ? `${msg.method} ${msg.url} HTTP/${msg.httpVersion}\n`
      : `HTTP/${msg.httpVersion} ${msg.statusCode} ${msg.statusMessage}\n`

    // serialize headers
    let nextKey = undefined as string | undefined
    for (let keyOrValue of msg.rawHeaders) {
      if (nextKey === undefined) {
        nextKey = keyOrValue
      } else {
        text += `${nextKey}: ${keyOrValue}\n`
        nextKey = undefined
      }
    }
    text += '\n'
    if (consumesBody) {
      const bufs = []
      for await (const buf of msg) bufs.push(buf)
      text += Buffer.concat(bufs).toString()
    }
    resolve(text)
  })

const quote = (prefix: string, text: string) =>
  text
    .split('\n')
    .map(line => prefix + ' ' + line)
    .join('\n')

main().catch(err => {
  console.error(err)
  process.exit(1)
})
