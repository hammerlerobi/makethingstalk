export const addTag = (tagID, media) => {
  return {
    type: "ADD_TAG",
    tagID: tagID,
    media: media,
  };
};

export const setOldPage = (oldPage) => {
  return {
    type: "SET_OLD_PAGE",
    oldPage: oldPage,
  };
};

//TESTING DISPATCHES
// {
// 	type: 'ADD_TAG',
// 	tagID: 123456456
// 	}
