// sortUsers.js

export const sortUsersAlphabetically = (users) => {
  return [...users].sort((a, b) => a.storeName.localeCompare(b.storeName));
};
