const getLocalStorage = (key: string) => window.localStorage.getItem(key);
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, value);
const clearLocalStorage = () => window.localStorage.clear();

export { getLocalStorage, setLocalStorage, clearLocalStorage };
