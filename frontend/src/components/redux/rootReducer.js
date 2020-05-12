import adjNoun from "adj-noun";
adjNoun.seed(parseInt(Math.random() * 999));

const initState = {
  command: "",
  media: null,
  tagID: "",
  oldPage: null,
  tagName: adjNoun().join(" "),
  tagColor: get_random_color(),
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
        if (merged[key] === undefined || merged[key] === null)
          merged[key] = state[key];
      }
      return merged;

    case "ADD_MEDIA":
      return { ...state, media: action.media };
    case "ADD_TAG_COLOR":
      return { ...state, tagColor: action.tagColor };
    case "ADD_TAG_NAME":
      return { ...state, tagName: action.tagName };
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

// "just for fun"
function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}

function get_random_color() {
  var h = rand(1, 360); // color hue between 1 and 360
  var s = rand(60, 80); // saturation 30-100%
  var l = rand(45, 55); // lightness 30-70%
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
