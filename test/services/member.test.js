const assert = require('assert');
const app = require('../../src/app');

describe('\'member\' service', () => {
  it('registered the service', () => {
    const service = app.service('member');

    assert.ok(service, 'Registered the service');
  });
});
