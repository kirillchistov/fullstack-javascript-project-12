const apiPath = '/api/v1';

const routes = {
  login: () => `${apiPath}/login`,
  channelsPath: () => `${apiPath}/channels`,
  messagesPath: () => `${apiPath}/messages`,
  root: () => '/',
  loginPage: () => '/login',
};

export default routes;
