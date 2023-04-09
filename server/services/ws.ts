import { IncomingMessage, ServerResponse, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { createComment } from '../controllers/comments';
import mongoose, { Schema, Types } from 'mongoose';

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
        owner: Schema.Types.ObjectId;
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
                this.handleComment(data);
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

    private handleComment(message: CommentMessage) {
        createComment(message.data)
            .then((comment) => {
                this.sendToAllClients({ type: 'comment', data: comment });
            })
            .catch((err) => {
                const message =
                    err instanceof mongoose.Error.ValidationError
                        ? 'Incorrect data for comment creation'
                        : 'Server error';
                this.sendToAllClients({
                    type: 'error',
                    data: message,
                });
            });
    }

    private sendToAllClients(data: { type: string; data: unknown }) {
        Array.from(this.clients.keys()).forEach((client) => {
            client.send(JSON.stringify(data));
        });
    }
}
