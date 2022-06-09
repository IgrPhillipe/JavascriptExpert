const http = require('http');
const DEFAULT_USER = { username: 'admin', password: 'admin' };

const routes = {
  '/contact:GET': (request, response) => {
    response.write('Contact Us page');
    return response.end();
  },
  '/login:POST': async (request, response) => {
    for await (const data of request) {
      const { username, password } = JSON.parse(data);

      if (username !== DEFAULT_USER.username || password !== DEFAULT_USER.password) {
        response.writeHead(401);
        response.write('Loggin has failed');
        return response.end();
      }

      response.write('Loggin has succeeded');
      return response.end();
    }
  },
  default: (request, response) => {
    response.writeHead(404);
    response.write('Not found!');
    return response.end();
  }
}

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method}`;
  const chosen = routes[routeKey] || routes.default;
  
  response.writeHead(200, { 'Content-Type': 'text/html' });
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3001, () => console.log('🚀 Server ready at port 3001'));

module.exports = app;