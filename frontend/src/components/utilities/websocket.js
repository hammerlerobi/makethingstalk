import store from "../redux/reduxStore";
import {
  newTag,
  setTagColor,
  setUploadStatus,
  setTagThumbnail,
} from "../redux/actions";
import IP from "./ip-settings";
import { random_color } from "./color-generator";

var message;
export function Connection() {
  var ws = new WebSocket("ws://" + IP[0] + ":8090", ["soap", "xmpp"]);
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

    if (message.command === "Thumbnail") {
      store.dispatch(setUploadStatus(null));
      store.dispatch(setTagThumbnail(message.media));
    } else
      store.dispatch(newTag(message.command, message.media, message.tagID));

    if (message.command === "NewTAG" || message.command === "Play") {
      store.dispatch(setTagColor(random_color()));
    }
  };
}
