const initState = {
  command: "",
  media: null,
  tagID: "",
  oldPage: null,
  tagColor: null,
  upload: null,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_TAG":
      let merged = {
        command: action.command,
        media: action.media,
        tagID: action.tagID,
      };
      //avoid removing empty states
      for (var key in state) {
        if (action.command === "Idle") {
          if (
            merged[key] === undefined ||
            merged[key] === null ||
            merged[key] === ""
          ) {
            merged[key] = state[key];
          }
        } else {
          if (merged[key] === undefined || merged[key] === null) {
            merged[key] = state[key];
          }
        }
      }
      return merged;

    case "SET_MEDIA":
      return { ...state, media: action.media };
    case "SET_TAG_COLOR":
      return { ...state, tagColor: action.tagColor };
    case "SET_OLD_PAGE":
      return { ...state, oldPage: action.oldPage };
    case "SET_UPLOAD_STATUS":
      return {
        ...state,
        upload: action.state,
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;
