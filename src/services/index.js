const users = require('./users/users.service.js');
const member = require('./member/member.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(member);
};
