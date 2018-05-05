const assert = require('assert');
const app = require('../../src/app');

describe('\'m\' service', () => {
  it('registered the service', () => {
    const service = app.service('m');

    assert.ok(service, 'Registered the service');
  });
});
