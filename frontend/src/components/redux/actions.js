export const newTag = (command, media, tagID) => {
  return {
    type: "NEW_TAG",
    command: command,
    media: media,
    tagID: tagID,
  };
};

export const addMedia = (media) => {
  return {
    type: "ADD_MEDIA",
    media: media,
  };
};

export const addTagName = (tagName) => {
  return {
    type: "ADD_TAG_NAME",
    tagName: tagName,
  };
};
export const addTagColor = (tagColor) => {
  return {
    type: "ADD_TAG_COLOR",
    tagColor: tagColor,
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

// TESTING DISPATCHES
// {
// 	type: 'NEW_TAG',
// 	command: "NewTag",
// 	tagID: "#123456456",
// 	media: "test.mp4",
// 	}
