import store from "../redux/reduxStore";
import { addTag } from "../redux/actions";

var message;
export function Connection() {
  var ws = new WebSocket("ws://localhost:8090", ["soap", "xmpp"]);
  ws.onopen = () => {
    console.log("CONNECTED TO WS");
  };
  ws.onmessage = (e) => {
    try {
      message = JSON.parse(e.data);
      console.log(message);
      // SetStates(message.tagID);
      store.dispatch(addTag(message.tagID, message.media));
      if (message.media !== "") {
      }
    } catch (error) {
      console.error(error);
    }
  };
}
