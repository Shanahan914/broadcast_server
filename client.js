import WebSocket from "ws"
import readline from 'readline'

// cli setup
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})


//client
const client = new WebSocket("ws://localhost:8080")

// open connection
client.on('open', () =>{
    console.log('Connected to server')
    
    //user input
    rl.setPrompt('Enter a message:')
    rl.prompt();

    rl.on('line', (input) => {
        client.send(input);
        console.log('Message sent')
        rl.prompt();
    })
})

// from server
client.on("message", (data)=> {
    console.log('\nReceived from server:', data.toString())
    rl.prompt()
})

//handle errors
client.on('error', (error) =>{
    console.error('Websocket error:', error)
})

//close connection
client.on('close', () =>{
    console.log('\nDisconnected.')
    // closes the cli
    rl.close()
})


