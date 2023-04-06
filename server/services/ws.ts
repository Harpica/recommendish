import { IncomingMessage, ServerResponse, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface WS extends WebSocket {
    isAlive: boolean;
}

type Message = InitMessage | CommentMessage;

interface InitMessage {
    type: 'init';
    data: { id: number };
}

interface CommentMessage {
    type: 'comment';
    data: {
        owner: number;
        body: string;
    };
}

export class WsServer {
    private wss: WebSocketServer;
    private clients: Map<WebSocket, { id: number }>;
    private interval: NodeJS.Timer;

    constructor(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Map<WebSocket, { id: number }>();
        this.interval = this.setInterval(this.wss);
    }

    start() {
        this.wss.on('connection', (client: WS) => {
            client.isAlive = true;
            client.on('pong', () => this.heartbeat(client));
            client.on('message', (message: Buffer) => {
                this.handleWsMessage(message, client);
            });
            client.on('close', () => {
                clearInterval(this.interval);
                this.clients.delete(client);
            });
        });
    }

    private heartbeat(ws: WS) {
        ws.isAlive = true;
    }

    private setInterval(wss: WebSocketServer) {
        return setInterval(function ping() {
            wss.clients.forEach(function each(ws) {
                const webSocket = ws as WS;
                if (webSocket.isAlive === false) return ws.terminate();

                webSocket.isAlive = false;
                webSocket.ping();
            });
        }, 30000);
    }
    private handleWsMessage(message: Buffer, client: WebSocket) {
        const data = JSON.parse(message.toString()) as Message;
        switch (data.type) {
            case 'init':
                this.initClient(data, client);
                break;
            case 'comment':
                // add to db and send to all clients
                break;

            default:
                break;
        }
    }
    private initClient(message: InitMessage, sender: WebSocket) {
        const id = message.data.id;
        const metadata = { id };
        this.clients.set(sender, metadata);
    }
}
