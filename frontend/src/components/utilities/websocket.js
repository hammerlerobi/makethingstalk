import store from "../redux/reduxStore";
import { newTag, setTagColor, setUploadStatus } from "../redux/actions";
import { random_color } from "./color-generator";

 var IP = window.location.hostname;
// var IP = "192.168.178.43";
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
    // if (message.command === "Idle") {
    //   store.dispatch(setUploadStatus(null));
    // }

    if (message.command === "NewTAG" || message.command === "Play") {
      if (message.tagID == "") {
        setTimeout(() => {
          store.dispatch(setUploadStatus(null));
        }, 5000);
      } else {
        store.dispatch(setTagColor(random_color()));
      }
    }
  };
}
