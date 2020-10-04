const router = require('express').Router();

//add all routes here
const routes = ['auth', 'articles'];

//loops through routes array above and sets up the paths.
//ex for 'auth' would be "router.user('/auth', require('./auth'))"
for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
