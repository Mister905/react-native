import create_data_context from "./create_data_context";

const initial_state = {
  recording: false,
  current_location: null,
  locations: []
};

const location_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_CURRENT_LOCATION":
      if (state.recording) {
        return {
          ...state,
          current_location: payload,
          locations: [...state.locations, payload]
        };
      } else {
        return {
          ...state,
          current_location: payload
        };
      }

    case "START_RECORDING":
      return {
        ...state,
        recording: true
      };
    case "STOP_RECORDING":
      return {
        ...state,
        recording: false
      };
    case "RESET_LOCATION":
      return {
        ...state,
        current_location: null,
        locations: []
      };
    default:
      return state;
  }
};

// ACTIONS
const start_recording = dispatch => () => {
  dispatch({ type: "START_RECORDING" });
};

const stop_recording = dispatch => () => {
  dispatch({ type: "STOP_RECORDING" });
};

const get_location = dispatch => location => {
  dispatch({ type: "UPDATE_CURRENT_LOCATION", payload: location });
};

const reset_location = dispatch => () => {
  dispatch({ type: "RESET_LOCATION" });
};

export const { Context, Provider } = create_data_context(
  location_reducer,
  { start_recording, stop_recording, get_location, reset_location },
  initial_state
);
