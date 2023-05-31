// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

const getLocalStorage = (key: string) => window.localStorage.getItem(key);
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, value);
const clearLocalStorage = () => window.localStorage.clear();

export { getLocalStorage, setLocalStorage, clearLocalStorage };
