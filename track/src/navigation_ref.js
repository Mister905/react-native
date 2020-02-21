import { NavigationActions } from "react-navigation";

let navigator;

export const set_navigator = navigation_object => {
  navigator = navigation_object;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
