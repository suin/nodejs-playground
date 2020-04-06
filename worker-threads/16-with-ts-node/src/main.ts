import {Worker} from 'worker_threads'

new Worker(__dirname + '/worker.js')
