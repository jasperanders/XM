export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log("read from state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log("failed");
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
    console.log("saved to local storage");
  } catch (err) {
    console.log("Could not access local storage.");
  }
};
