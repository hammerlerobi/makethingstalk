import React from "react";
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
      descriptionText = "✅ Das Video wurde mit dem Tag verknüpft";
      break;
    default:
      descriptionText = "Neues Video mit dem Tag verlinken?";
      break;
  }
  return (
    <div className="row vh-100 p0 m-0 bg">
      <div className="col p-0 d-flex flex-column justify-content-center align-items-center ">
        <Tag uploadProgress={props.uploadProgress}></Tag>
        <div className="tag-headline">
          <p>{descriptionText}</p>
        </div>
        {props.upload === null ? (
          <button type="button" className="btn btn-outline-dark">
            Video* auswählen
          </button>
        ) : (
          ""
        )}
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          fontSize: "0.8em",
        }}
      >
        *es wird nur mp4-Format unterstützt
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tagID: state.tagID,
  tagColor: state.tagColor,
  media: state.media,
  upload: state.upload,
});

export default connect(mapStateToProps)(TagWrapper);
