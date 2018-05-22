// Initializes the `member` service on path `/member`
const createService = require('feathers-mongoose');
const createModel = require('../../models/member.model');
const hooks = require('./member.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'member',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/member', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('member');

  service.hooks(hooks);
};
