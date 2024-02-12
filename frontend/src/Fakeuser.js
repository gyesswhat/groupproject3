const fakeUser = {
  username: 'john_doe',
  email: 'john@example.com',
  loggedIn: true,
};

const getUser = () => fakeUser.loggedIn;

export default getUser;
