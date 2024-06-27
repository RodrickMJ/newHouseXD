import { ServerResponse, IncomingMessage } from 'http';

class EventSource {
  private clients: ServerResponse[] = [];

  addClient(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    this.clients.push(res);

    // Remove the client when they disconnect
    req.on('close', () => {
      this.clients = this.clients.filter(client => client !== res);
    });
  }

  sendEvent(eventType: string, data: any) {
    const eventString = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach(client => {
      client.write(eventString);
    });
  }
}

export default new EventSource();
