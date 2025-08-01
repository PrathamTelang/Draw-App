import { WebSocketServer } from "ws";
import { config } from "./config";


const wss = new WebSocketServer({ port:config.port });

wss.on('connection', function connection(ws, request) {

    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');

    ws.on('message', function message(data) {
        ws.send('pong')
    })
})