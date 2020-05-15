// var IP = "192.168.178.43"; //location.hostname;
var IP = window.location.hostname;

var videoLayer = document.getElementById("video");
var idleLayer = document.getElementById("idle");
var tagLayer = document.getElementById("tag");

var connection = new WebSocket("ws:" + IP + ":8090", ["soap", "xmpp"]);

// When the connection is open, send some data to the server
connection.onopen = function () {
  console.log("----- CONNECTED TO THE SERVER -----");
};

connection.onmessage = function (e) {
  //please refer to
  //backend/transmitters/IInteractonMessage.ts
  //this is what we will receive here.

  let message;
  try {
    message = JSON.parse(e.data);
  } catch (error) {
    console.error(error);
  }
  console.log("WS:", message);

  // if (message.media) {
  //   videoLayer.src = "../backend/uploads/" + message.media;
  //   videoLayer.load();
  // }

  if (message.command) {
    switch (message.command) {
      // case "Play":
      //   showVideo();
      //   videoLayer.play();
      //   break;
      case "NewTAG":
        showTag(message.tagID);
        // showTag(randomID());
        break;
      case "Idle":
        showIdle();
        videoLayer.pause();
        break;
    }
  }
};

function showVideo() {
  videoLayer.classList.remove("hidden");
  tagLayer.classList.add("hidden");
  idleLayer.classList.add("hidden");
}

function showTag(ID) {
  //document.getElementById("tag").style.backgroundColor = getColor(ID);

  document.getElementById("tag-bubble").classList.remove("hidden");
  document.getElementById("tag-name").innerHTML = getName(ID);
  document.getElementById("tag-id").innerHTML = "#" + ID;

  document.getElementById("sounds").play();

  draw(getColorHue(ID));

  videoLayer.classList.add("hidden");
  tagLayer.classList.remove("hidden");
  idleLayer.classList.add("hidden");
}

function showIdle() {
  document.getElementById("tag-bubble").classList.add("hidden");

  videoLayer.classList.add("hidden");
  tagLayer.classList.add("hidden");
  idleLayer.classList.remove("hidden");
}
