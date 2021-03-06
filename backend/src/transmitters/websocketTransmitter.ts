import { ITransmitter } from "./ITransmitter";
import { IInteractionMessage } from "./IInteractionMessage";
import WebSocket from "ws";

class WebsocketTransmitter implements ITransmitter {
  public wss: WebSocket.Server;
  constructor() {
    this.wss = new WebSocket.Server({
      port: 8090,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3,
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024, // Size (in bytes) below which messages
        // should not be compressed.
      },
    });
    // test the websocket
    console.log("Websocket started at port: " + this.wss.options.port);
  }

  public sendMessage(message: IInteractionMessage): void {
    this.wss.clients.forEach(function each(ws) {
      ws.send(JSON.stringify(message));
    });
  }
}

export { WebsocketTransmitter };
