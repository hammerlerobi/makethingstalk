import React, { useState, useEffect } from "react";
var message;
export function Connection() {
  var ws = new WebSocket("ws://localhost:8090", ["soap", "xmpp"]);
  const [isData, setData] = useState(null);

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected websocket main component");
    };
    ws.onmessage = (e) => {
      console.log("WS message:", JSON.parse(e.data));
      try {
        message = JSON.parse(e.data);
      } catch (error) {
        console.error(error);
      }
      setData(message.tagID);
    };
    return () => {
      ws.close();
    };
  });
  return isData;
}
