import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setOldPage, addMedia, testUpload } from "../components/redux/actions";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import Tag from "./tag";
import "../styles/upload.scss";

var descriptionText = "";
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
  const onDrop = useCallback((acceptedFiles, e) => {
    props.addMedia(acceptedFiles[0].name);
    // GETTING THE FILES HERE
    // -> READY TO UPLOAD
    props.testUpload();
  }, []);

  // FEEDBACK FOR ACTIVE

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
