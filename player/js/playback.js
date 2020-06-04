var IP = window.location.hostname;

var idleLayer = document.getElementById("idle");
var welcomeLayer = document.getElementById("welcome");

var connection = new WebSocket("ws:" + IP + ":8090", ["soap", "xmpp"])

connection.onopen = function () {
    console.log("----- CONNECTED TO THE SERVER -----")
  }
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
        
        case "NewTAG":
        case "Play":
        case "Idle":
          showIdle();
          break;
      }
    
    }
  };


function getIdleScreen() {

  fetch("http://localhost:4000/api/media/idle")
  .then(data=> {
    return data.json()
  })
  .then(res=>{
    if(res.name != "")
      idleLayer.innerHTML = "<img src='" + res.name + "'>";
  })

}

function getTagCount() {

  fetch("http://localhost:4000/api/tag/count")
  .then(data=> {
    return data.json()
  })
  .then(res=>{
    if(res.count == 0) 
     showWelcome()
    else
      showIdle()
  })

}

getIdleScreen();
getTagCount();


function showIdle() {
  welcomeLayer.classList.add("hidden");
  idleLayer.classList.remove("hidden");
}

function showWelcome() {
  welcomeLayer.classList.remove("hidden");
  idleLayer.classList.add("hidden");
}
