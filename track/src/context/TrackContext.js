import create_data_context from "./create_data_context";
import tracker_api from "../api/tracker";

const initial_state = {
  track_name: null,
  tracks: []
};

const track_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_TRACK_NAME":
      return {
        ...state,
        track_name: payload
      };
    case "RESET_TRACK_NAME":
      return {
        ...state,
        track_name: null
      };
    case "GET_TRACKS":
      return {
        ...state,
        tracks: payload
      };
    default:
      return state;
  }
};

// ACTIONS
const get_tracks = dispatch => async () => {
  try {
    const res = await tracker_api.get("/api/tracks");
    dispatch({ type: "GET_TRACKS", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

const save_track = dispatch => async (name, locations) => {
  try {
    const res = await tracker_api.post("/api/tracks", { name, locations });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const update_track_name = dispatch => name => {
  dispatch({ type: "UPDATE_TRACK_NAME", payload: name });
};

const reset_track_name = dispatch => () => {
  dispatch({ type: "RESET_TRACK_NAME" });
};

export const { Context, Provider } = create_data_context(
  track_reducer,
  { get_tracks, save_track, update_track_name, reset_track_name },
  initial_state
);
