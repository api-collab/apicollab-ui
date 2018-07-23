const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');

const data = require('./data.js')();
const apiSpecData = fs.readFileSync(path.join(__dirname, 'valid_oas.yml'), 'utf8');

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
server.use(middlewares);

/**
 * Rewire apis as needed
 */
server.use(
  jsonServer.rewriter({
    '/suggestions/:partialWord': '/suggestions?_page=1&_limit=7',
    '/:resource/search?query=:query': '/:resource?q=:query'
  })
);

/**
 * Intercept requests
 */
router.render = (req, res) => {
  if (req.url.indexOf('swaggerDoc') >= 0) {
    res.status(200).send(apiSpecData);
  } else if (res.locals.data.constructor === Array) {
    // Wrap in to object
    res.jsonp({
      totalCount: res.locals.data.length,
      items: res.locals.data
    });
  } else {
    res.jsonp(res.locals.data);
  }
};

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
