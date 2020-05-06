// write the mediaID here and wait for the websocket to receive a tag
var mediaIDToLink = "";
var IP = location.hostname;

//start websocket we need it to link tags
var connection = new WebSocket("ws:" + IP + ":8090", ["soap", "xmpp"]);
connection.onopen = function () {
  console.log("----- CONNECTED TO THE SERVER -----");
};
connection.onmessage = function (e) {
  //please refer to
  //backend/transmitters/IInteractonMessage.ts
  //this is what we will receive here.

  let message;
  console.dir(message);
  try {
    message = JSON.parse(e.data);
  } catch (error) {
    console.error(error);
  }

  if (message.tagID && mediaIDToLink !== "") {
    console.log("Linking " + message.tagID + "to Media" + mediaIDToLink);
    postData("http://" + IP + ":4000/api/tag/link", {
      tagId: message.tagID,
      mediaId: mediaIDToLink,
    }).then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
    // if we get a tag and mediaIDToLink is set we link the media to the tag
  }
};

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

var startLinkMode = (mediaId) => {
  console.log(mediaId);
  alert("place tag on box to connect media to tag within 10 seconds");
  mediaIDToLink = mediaId;
  // after 5 seconds we clear mediaIDToLink and end linkmode
  setTimeout(function () {
    mediaIDToLink = "";
  }, 10000);
};

// ---------------------- new tag

var newTag = document.getElementById("tagDetected");

var newTagOverlay = true;

document.addEventListener("keypress", function logKey(e) {
  console.log(e.code);
  if (e.code == "Enter") {
    newTagOverlay = !newTagOverlay;
    if (!newTagOverlay) {
      newTag.style.visibility = "hidden";
    } else {
      newTag.style.visibility = "visible";
    }
  }
});
