export const getLocalStorage = (name) => {
  let storage = localStorage.getItem(name);
  if (storage) storage = JSON.parse(storage);
  return storage;
};

export const setLocalStorage = (name, value) => {
  const storageValue = JSON.stringify(value);
  localStorage.setItem(name, storageValue);
};
