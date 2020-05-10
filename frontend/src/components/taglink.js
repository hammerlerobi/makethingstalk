import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setOldPage, addMedia, testUpload } from "../components/redux/actions";
import Dropzone from "react-dropzone-uploader";

import { motion } from "framer-motion";

import Tag from "./tag";
import "../styles/upload.scss";

var IP = window.location.hostname;
var descriptionText = "";
var files = "";
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
  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    let formData = new FormData();
    formData.append("files", file);

    return { url: "http://" + IP + ":4000/api/upload/", formData };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta.name);
  };

  // FEEDBACK FOR ACTIVE
  // postData("http://" + IP + ":4000/api/tag/link", {
  // 	tagId: props.tagID,
  // 	mediaId: acceptedFiles[0].name,
  // }).then((data) => {
  // 	console.log(data); // JSON data parsed by `response.json()` call
  // });

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
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
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
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  tagCommand: state.command,
  oldPage: state.oldPage,
  upload: state.upload,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setOldPage: (oldPage) => {
      dispatch(setOldPage(oldPage));
    },
    addMedia: (media) => {
      dispatch(addMedia(media));
    },
    testUpload: () => {
      dispatch(testUpload(true));
      setTimeout(() => {
        dispatch(testUpload(false));
      }, 5000);
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
