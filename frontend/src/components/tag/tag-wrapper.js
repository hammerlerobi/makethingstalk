import React from "react";
import { motion } from "framer";
import { connect } from "react-redux";
import Tag from "./tag";

var descriptionText = "";
const TagWrapper = (props) => {
  //UPLOADER TEXT DEBUG WHEN A TAG HAS BEEN REMOVED/DDED

  switch (props.upload) {
    case "uploading":
      descriptionText = "Wird hochgeladen ...";
      break;
    case "finished":
      descriptionText =
        "🎉 Das Video wurde erfolgreich hochgeladen und verknüpft.";
      break;
    default:
      descriptionText =
        "Klicke auf den Bildschirm oder lege einfach dein Video hier ab um es mit dem Tag zu verknüpfen";
      break;
  }
  return (
    <div className="row vh-100 p0 m-0 bg">
      <div className="col p-0 d-flex flex-column justify-content-center align-items-center ">
        <Tag uploadProgress={props.uploadProgress}></Tag>
        <div
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 0.5,
          }}
          className="tag-headline"
        >
          <p>{descriptionText}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tagID: state.tagID,
  tagName: state.tagName,
  tagColor: state.tagColor,
  media: state.media,
  upload: state.upload,
});

export default connect(mapStateToProps)(TagWrapper);
