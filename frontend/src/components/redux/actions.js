export const newTag = (command, media, tagID) => {
  return {
    type: "NEW_TAG",
    command: command,
    media: media,
    tagID: tagID,
  };
};

export const setMedia = (media) => {
  return {
    type: "SET_MEDIA",
    media: media,
  };
};

export const setTagThumbnail = (media) => {
  let tagThumbnail = media.split(".")[0] + ".png";
  return {
    type: "SET_TAG_THUMBNAIL",
    tagThumbnail: tagThumbnail,
  };
};

export const setOldPage = (oldPage) => {
  return {
    type: "SET_OLD_PAGE",
    oldPage: oldPage,
  };
};

export const setUploadStatus = (state) => {
  return {
    type: "SET_UPLOAD_STATUS",
    state: state,
  };
};
