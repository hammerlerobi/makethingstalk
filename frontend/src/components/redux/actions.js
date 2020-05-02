export const addTag = (tagID, media) => {
  return {
    type: "ADD_TAG",
    tagID: tagID,
    media: media,
  };
};

export const addMedia = (media) => {
  return {
    type: "ADD_MEDIA",
    media: media,
  };
};

export const addTagPerson = (tagName, tagColor) => {
  return {
    type: "ADD_TAG_PERSON",
    tagName: tagName,
    tagColor: tagColor,
  };
};

export const setOldPage = (oldPage) => {
  return {
    type: "SET_OLD_PAGE",
    oldPage: oldPage,
  };
};

export const testUpload = (state) => {
  return {
    type: "TEST_UPLOAD",
    state: state,
  };
};

//TESTING DISPATCHES
// {
// 	type: 'ADD_TAG',
// 	tagID: 123456456,

// 	}
