import store from "../redux/reduxStore";
import { newTag, setUploadStatus, setTagThumbnail } from "../redux/actions";

let IP = window.location.hostname;

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

    if (
      message.command === "Thumbnail" ||
      (message.command === "Play" && message.tagID)
    ) {
      store.dispatch(setUploadStatus(null));
      store.dispatch(setTagThumbnail(message.media));
    }
    store.dispatch(newTag(message.command, message.media, message.tagID));
  };
}
