import React from "react";
import { connect } from "react-redux";
import Tag from "./tag";

var descriptionText = "";

const TagWrapper = (props) => {
  //UPLOADER TEXT DEBUG WHEN A TAG HAS BEEN REMOVED/DDED

  switch (props.upload) {
    case "uploading":
      descriptionText =
        "Das Video wird hochgeladen und mit dem Objekt verknüpft...";
      break;
    case "finished":
      descriptionText =
        "Das Video wurde erfolgreich verknüpft und wird nun abgespielt.";
      break;
    default:
      if (props.media) {
        descriptionText =
          "Dieses Objekt ist bereits mit einem Video verknüpft. Willst du das Video ersetzen?";
      } else {
        descriptionText =
          "Dieses Objekt wurde noch nicht mit einem Video vernküpft.";
      }
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
          <div>
            <button type="button" className="btn pl-4 pr-4  btn-dark">
              Video wählen*
            </button>
            <p className="hint">*momentan wird nur mp4-Format unterstützt.</p>
          </div>
        ) : (
          ""
        )}
      </div>
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
