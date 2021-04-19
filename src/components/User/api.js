const urlForUser = (id) => `https://jsonplaceholder.typicode.com/users/${id}`;

export const fetchUser = (id) =>
  fetch(urlForUser(id)).then((data) => data.json());
