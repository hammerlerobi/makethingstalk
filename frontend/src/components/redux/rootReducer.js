const initState = {
  tagID: "",
  media: null,
  oldPage: null,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TAG":
      var newState = state;
      return { ...state, tagID: action.tagID, media: action.media };
    case "SET_OLD_PAGE":
      return { ...state, oldPage: action.oldPage };
    default:
      break;
  }
  return state;
};

export default rootReducer;
