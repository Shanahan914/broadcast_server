import { startClient } from './client.js'
import { startServer } from './server.js'
import { argv } from 'node:process'



if (argv[2] === 'start'){
    startServer()
} else if (argv[2] === 'connect') {
    startClient()
} else {
    console.log('Invalid argument. Use "start" to run the server or "connect" to connect to the server')
}