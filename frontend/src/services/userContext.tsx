import React, { Component, useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

import HttpService, { storedAuthToken } from "./http";
import apiRoutes from "./apiRoutes";

// Initializes the Context. This constant must be imported, wherever
// you need to access the user context
export const UserContext = React.createContext({
  user: { id: null, role: null },
  loadUser: () => {},
  wipeUser: () => {},
  setUser: (value) => {},
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    id: null,
    role: null,
  });

  useEffect(() => {
    console.log(user);
    loadUser();
  }, []);

  /**
   * the loadUser function returns a promise, because we want to wait for the state to be set, before anything else
   * happens. The state is only set only when there isn't already a user loaded and if an authtoken lies in the
   * session storage. Otherwise the promise is resolved, without doing anything other.
   * If an user is already loaded, we don't need to make an API-call, we just resolve the promise.
   *
   * The loadUser function does not return a user but loads the user into the UserContext.
   * @returns {Promise<any>}
   */
  const loadUser = () => {
    const authToken = storedAuthToken();
    console.log(authToken);
    if (!user.id && authToken) {
      return HttpService.get(apiRoutes.USER_ME, authToken)
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => false);
    }
    return new Promise((resolve) => resolve());
  };

  const wipeUser = () =>
    setUser({
      id: null,
      role: null,
    });

  return (
    // For more details on how the React Context API works, take a look at https://reactjs.org/docs/context.html
    // In this case we provide an user object and both the load- and wipe-user function to the react context.
    // In order to access the right component scope we also need to bind the this-context. In a case, where we don't
    // do that the function cannot access the component state and thus cannot change the user-context.
    <UserContext.Provider
      value={{
        user,
        setUser,
        loadUser,
        wipeUser,
      }}
    >
      {children}
      <button onClick={wipeUser}>Logout</button>
    </UserContext.Provider>
  );
}
