var IP = window.location.hostname;

var idleLayer = document.getElementById("idle");
var welcomeLayer = document.getElementById("welcome");

var connection = new WebSocket("ws:" + IP + ":8090", ["soap", "xmpp"]);

connection.onopen = function () {
  console.log("----- CONNECTED TO THE SERVER -----");
};
connection.onmessage = function (message) {
  let json;

  try {
    json = JSON.parse(message.data);
    console.log("WS:", json);
  } catch (error) {
    console.error(error);
  }

  if (json.command) {
    switch (json.command) {
      case "Update":
        location.reload();
        break;

      case "Idle":
        showIdle();
        break;
    }
  }
};

function getTagCount() {
  fetch("http://" + IP + ":4000/api/tag/count")
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      if (res.count == 0) showWelcome();
      else showIdle();
    });
}

getTagCount();

function showIdle() {
  welcomeLayer.classList.add("hidden");
  idleLayer.classList.remove("hidden");
}

function showWelcome() {
  welcomeLayer.classList.remove("hidden");
  idleLayer.classList.add("hidden");
}
