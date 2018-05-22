const mydemo = require('./mydemo');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/mydemo', mydemo());
};
