import store from "../redux/reduxStore";
import {
  newTag,
  setTagName,
  setTagColor,
  setUploadStatus,
} from "../redux/actions";
import { getName } from "./name-generator";

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
    if (message.command === "NewTAG" || message.command === "Play") {
      store.dispatch(setTagColor(get_random_color()));
      store.dispatch(setTagName(getName(message.tagID)));
      store.dispatch(setUploadStatus(null));
    }
  };
}

// "just for fun"
function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}

function get_random_color() {
  var h = rand(1, 360); // color hue between 1 and 360
  var s = rand(60, 80); // saturation 30-100%
  var l = rand(45, 55); // lightness 30-70%
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
