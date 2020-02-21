import create_data_context from "./create_data_context";
import tracker_api from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from '../navigation_ref';

const initial_state = {
  token: null,
  error: null
};

const auth_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CREATE_ERROR":
      return {
        ...state,
        error: payload
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: ""
      };
    case "REGISTER":
      return {
        ...state,
        token: payload,
        error: ""
      };
    case "LOGIN":
      return {
        ...state,
        token: payload,
        error: ""
      };
    case "LOGOUT":
      return {
        ...state,
        token: "",
        error: ""
      };
    default:
      return state;
  }
};

// ACTIONS

const get_local_token = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "LOGIN", payload: token });
    navigate("TrackList");
  } else {
    navigate("Login");
  }
};

const clear_error = dispatch => () => {
  dispatch({ type: "CLEAR_ERROR" });
};

const register = dispatch => async ({ email, password }) => {
  try {
    const res = await tracker_api.post("/api/auth/register", {
      email,
      password
    });
    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "REGISTER", payload: res.data.token });
    navigate("TrackList");
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "CREATE_ERROR", payload: "Registration Error" });
  }
};

const login = dispatch => async ({ email, password }) => {
  try {
    const res = await tracker_api.post("/api/auth/login", {
      email,
      password
    });
    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "LOGIN", payload: res.data.token });
    navigate("TrackList");
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "CREATE_ERROR", payload: "Login Error" });
  }
};

const logout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("Login");
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "CREATE_ERROR", payload: "Logout Error" });
  }
};

export const { Context, Provider } = create_data_context(
  auth_reducer,
  { register, login, logout, clear_error, get_local_token },
  initial_state
);
