import React from "react";
import { connect } from "react-redux";
import Tag from "./tag";

var descriptionText;

const TagWrapper = (props) => {
  //UPLOADER TEXT DEBUG WHEN A TAG HAS BEEN REMOVED/DDED

  switch (props.upload) {
    case "uploading":
      descriptionText = (
        <p>Das Video wird hochgeladen und mit dem Objekt verknüpft...</p>
      );

      break;
    case "finished":
      descriptionText = (
        <p>Das Video wurde erfolgreich verknüpft und wird nun abgespielt.</p>
      );
      break;
    default:
      if (props.media) {
        descriptionText = (
          <p>
            Dieses Objekt ist bereits mit einem Video verknüpft. Willst du das
            MP4 Video ersetzen?
          </p>
        );
      } else {
        descriptionText = (
          <p>
            Dieses Objekt ist nicht mit einem Video verknüpft.<br></br>Wähle zum
            Verknüpfen ein MP4 Video aus.
          </p>
        );
      }
      break;
  }
  return (
    <div className="row vh-100 p0 m-0 bg">
      <div className="col p-0 d-flex flex-column justify-content-center align-items-center ">
        <Tag uploadProgress={props.uploadProgress}></Tag>
        <div className="tag-headline">{descriptionText}</div>
        {props.upload === null ? (
          <div>
            <button type="button" className="btn pl-4 pr-4  btn-dark">
              Video auswählen
            </button>
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
