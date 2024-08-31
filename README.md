# WebSocket Server with Temporary Username Functionality

## Overview
This project implements a WebSocket server that assigns temporary usernames to clients upon connection. The server handles client connections, broadcasts messages, and ensures each client has a unique temporary username.

Assumes a small number of connections: < 30. Further optimitisation required for larger user base. 

A solution to the broadcast server project created by roadmapsh https://roadmap.sh/projects/broadcast-server

## Features
* Temporary Username Assignment: Each client receives a unique temporary username generated from a predefined list of animals.
* Broadcast Messaging: Messages sent by any client are broadcasted to all other connected clients, prefixed with the sender's username.
* Connection Tracking: Keeps track of connected clients and their IP addresses along with their usernames.

Setup
Prerequisites
Node.js (v14 or later recommended)

Installation
Clone the Repository:
```
git clone https://github.com/your-repo/websocket-server.git
cd websocket-server
```
Install Dependencies:
```
npm install
```
Start the Server:
```
node broadcast start
```
To join as a client:
```
node broadcast connect
```

Usage
* Assigning Usernames: Upon connecting, clients receive a unique temporary username.
* Broadcasting Messages: Messages are prefixed with the sender’s username and sent to all other clients.
