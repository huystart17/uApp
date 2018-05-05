// Initializes the `m` service on path `/m`
const createService = require('./m.class.js');
const hooks = require('./m.hooks');

module.exports = function(app) {
    const paginate = app.get('paginate');

    const options = {
        name: 'm',
        paginate,
    };

    // Initialize our service with any options it requires
    app.use('/m', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('m');

    service.hooks(hooks);
};
