const users = require('./users/users.service.js');
const member = require('./member/member.service.js');

const testDev = require('./test-dev/test-dev.service.js');

const customerActEls = require('./customer-act-els/customer-act-els.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(member);
  app.configure(testDev);
  app.configure(customerActEls);
};
