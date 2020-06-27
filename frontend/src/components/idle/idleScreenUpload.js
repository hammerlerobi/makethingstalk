import React from "react";
import request from "superagent";


const IdleScreenUpload = () => {

  const onChangeHandler = (event) => {

    let formData = new FormData();  
    formData.append("file",event.target.files[0]);

    request
      .post("/api/upload/idle")
      .send(formData)
      .on("progress", (event) => {
        console.log(event.percent);
      })
      .then((res) => {
        console.log("upload complete");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
    Definiere ein Bild, welches angezeigt wird, wenn gerade kein Video abspielt.
    
    <label>Choose a file
     <input type="file" name="file" onChange={onChangeHandler}/>
    </label>
    </div>
  );
};

export default IdleScreenUpload;
