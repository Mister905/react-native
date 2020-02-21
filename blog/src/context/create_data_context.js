import React, { useReducer } from "react";

export default (reducer, actions, initial_state) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial_state);

    const bound_actions = {};

    for (const action in actions) {
      if (actions.hasOwnProperty(action)) {
        bound_actions[action] = actions[action](dispatch);
      }
    }

    return (
      <Context.Provider value={{ state, ...bound_actions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
