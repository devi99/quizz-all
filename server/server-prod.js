const express = require('express')
const path = require('path');
const { createServer } = require('http')
const WebSocket = require('ws');
const apiRoutes = require('./routes/api');

// Import the game file.
var guizlogic = require('./gameserverlogic');

const app = express(),
            DIST_DIR = path.join(__dirname, '../dist'),
            HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))
app.use('/api', apiRoutes);
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

const server = createServer(app);
const wss = new WebSocket.Server({ server });

function noop() {}
 
function heartbeat() { this.isAlive = true;}

wss.on('connection', function connection(ws, request) {
    let id = request.headers['sec-websocket-key'];
    guizlogic.initGame(ws, request);
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    console.log('client connected - ' + id);
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
   
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);
   
  wss.on('close', function close() {
    clearInterval(interval);
  });

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
