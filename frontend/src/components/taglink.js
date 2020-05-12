import React, { useCallback } from "react";
import request from "superagent";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setOldPage, addMedia } from "../components/redux/actions";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

import Tag from "./tag";
import "../styles/upload.scss";

var IP = window.location.hostname;
var descriptionText = "";
var file = "";
const TagLink = (props) => {
  let history = useHistory();
  let currentLocation = useLocation().pathname;
  //navigation to idle screen if tag has been removed
  if (
    props.tagCommand === "Idle" &&
    props.oldPage !== currentLocation &&
    !props.upload
  ) {
    history.push("/");
    props.setOldPage(currentLocation);
  }

  // DROP ZONE
  const onDrop = useCallback((files, e) => {
    //upload the file
    let formData = new FormData();
    formData.append("file", files[0]);
    const req = request
      .post("/api/upload/")
      .send(formData)
      .on("progress", (event) => {
        var percent = Math.floor(event.percent);
        if (percent >= 100) {
          console.log("FINISHED");
        } else {
          console.log(percent);
        }
      })
      .then((res) => {
        var result = JSON.stringify(res.body.id);
        console.log(result);
        //result here
        linkTag(props.tagID, result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // {id: "plRsa_Kyv", name: "200514.mp4", uploadTime: 1589268403069, connectedTags: Array(0)}
  // specify upload params and url for your files
  // ----- ÜBERNEHMEN

  const linkTag = (tagId, mediaId) => {
    postData("http://" + IP + ":4000/api/tag/link", {
      tagId: tagId,
      mediaId: mediaId,
    }).then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "video/*",
  });

  //UPLOADER TEXT DEBUG WHEN A TAG HAS BEEN REMOVED/DDED
  switch (props.upload) {
    case true:
      descriptionText = "Video wird hochgeladen ...";
      break;
    case false:
      descriptionText = "Das Video wurde erfolgreich verknüpft. ";
      break;
    default:
      descriptionText =
        "Klicke auf den Bildschirm oder lege einfach dein Video hier ab um es mit dem Tag zu verknüpfen";
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transitino: { duration: 0.75 } }}
      className="container-fluid p-0"
    >
      {" "}
      <div
        id="dropzone-area"
        className={isDragActive ? "active" : ""}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="row vh-100 p0 m-0 bg">
          <div className="col p-0 d-flex flex-column justify-content-center align-items-center">
            <Tag scale={props.upload ? 0 : 1}></Tag>
            <motion.p
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              className="headline mt-5"
            >
              {descriptionText}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  tagCommand: state.command,
  oldPage: state.oldPage,
  upload: state.upload,
  tagID: state.tagID,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setOldPage: (oldPage) => {
      dispatch(setOldPage(oldPage));
    },
    addMedia: (media) => {
      dispatch(addMedia(media));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagLink);

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
