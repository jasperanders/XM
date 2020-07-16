import React, { Component, useState, createContext, useEffect } from "react";

import HttpService, { storedAuthToken } from "./http";
import apiRoutes from "./apiRoutes";

// Initializes the Context. This constant must be imported, wherever
// you need to access the user context
export const ExamContext = React.createContext({
  loadAllUsers: () => {},
  allUsers: { rows: [] },
  allQuestions: { rows: [] },
});

export default function UserContextProvider({ children }) {
  const [allUsers, setAllUsers] = useState({ rows: [] });
  const [allQuestions, setAllQuestions] = useState({ rows: [] });

  useEffect(() => {
    loadAllUsers();
    loadAllQuestions();
  }, []);

  const loadAllUsers = () => {
    return HttpService.get(apiRoutes.USER).then(({ data }) => {
      setAllUsers(data);
      console.log(data);
    });
  };

  const loadAllQuestions = () => {
    return HttpService.get(apiRoutes.QUESTION).then(({ data }) => {
      // console.log(data);
      setAllQuestions(data);
    });
  };

  return (
    // For more details on how the React Context API works, take a look at https://reactjs.org/docs/context.html
    // In this case we provide an user object and both the load- and wipe-user function to the react context.
    // In order to access the right component scope we also need to bind the this-context. In a case, where we don't
    // do that the function cannot access the component state and thus cannot change the user-context.
    <ExamContext.Provider
      value={{
        allQuestions,
        loadAllUsers,
        allUsers,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
