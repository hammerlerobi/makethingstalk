import React, { useCallback, useState } from "react";
import request from "superagent";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  setOldPage,
  setUploadStatus,
  setMedia,
} from "../components/redux/actions";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

import "../styles/upload.scss";
import TagWrapper from "./tag/tag-wrapper";

var IP = window.location.hostname;
// var IP = "192.168.178.43";

const TagLink = (props) => {
  const [uploadProgress, setProgress] = useState(0);
  let history = useHistory();
  let currentLocation = useLocation().pathname;
  //navigation to idle screen if tag has been removed
  if (
    props.tagCommand === "Idle" &&
    props.oldPage !== currentLocation &&
    props.upload !== "uploading"
  ) {
    history.push("/");
    props.setOldPage(currentLocation);
  }

  // DROP ZONE FUNCTION
  const onDrop = useCallback((files, e) => {
    //upload the file
    let formData = new FormData();
    console.log(files);

    formData.append("file", files[0]);
    const req = request
      .post("/api/upload/")
      .send(formData)
      .on("progress", (event) => {
        var percent = Math.floor(event.percent);
        if (percent >= 100) {
          props.setUploadStatus("finished");
          setProgress(100);
        } else {
          console.log(percent);
          props.setUploadStatus("uploading");
          setProgress(percent);
        }
      })
      .then((res) => {
        console.log(res.body);
        console.log("FIIIINISHED");
        props.setTagMedia(files[0].name);
        linkTag(props.tagID, res.body.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const linkTag = (tagId, mediaId) => {
    console.log("linking" + tagId + "to" + mediaId);
    postData("http://" + IP + ":4000/api/tag/link", {
      tagId: tagId,
      mediaId: mediaId,
    }).then((response) => {
      console.log("linked");
    });
  };

  //DROP ZONE SETTINGS
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "video/mp4",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transitino: { duration: 0.5 } }}
      className="container-fluid p-0"
    >
      {" "}
      <div
        id="dropzone-area"
        className={isDragActive ? "active" : ""}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <TagWrapper uploadProgress={uploadProgress}></TagWrapper>
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
    setUploadStatus: (uploadStatus) => {
      dispatch(setUploadStatus(uploadStatus));
    },
    setTagMedia: (media) => {
      dispatch(setMedia(media));
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
  }).then((res) => {
    if (res.ok) {
      return new Promise(function (resolve, reject) {
        resolve("success");
      });
    } else {
      return new Promise(function (resolve, reject) {
        reject("failed");
      });
    }
  });
}
