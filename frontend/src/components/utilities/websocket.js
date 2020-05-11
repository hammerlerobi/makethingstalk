import store from "../redux/reduxStore";
import { newTag, addTagName, addTagColor } from "../redux/actions";

 var IP = window.location.hostname;
//var IP = "192.168.178.43";
var message;
export function Connection() {
  var ws = new WebSocket("ws://" + IP + ":8090", ["soap", "xmpp"]);
  ws.onopen = () => {
    console.log("CONNECTED TO WS");
  };
  ws.onmessage = (e) => {
    try {
      message = JSON.parse(e.data);
      console.log("WS:", message);
    } catch (error) {
      console.error(error);
    }

    store.dispatch(newTag(message.command, message.media, message.tagID));
    store.dispatch(addTagColor(message.tagColor));
    store.dispatch(addTagName(message.tagName));
  };
}
