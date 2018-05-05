const render = require('mithril-node-render')


module.exports = function (options = {}) {
  return function mydemo(req, res, next) {
    console.log('mydemo middleware is running');


    next();
  };
};
