const apiPath = '/api/v1';

const routes = {
  login: () => `${apiPath}/login`,
  signup: () => `${apiPath}/signup`,
  channelsPath: () => `${apiPath}/channels`,
  messagesPath: () => `${apiPath}/messages`,
  root: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};

export default routes;
