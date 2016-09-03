import { moduleFor, test } from 'ember-qunit';

moduleFor('service:instruments', 'Unit | Service | instruments', {
});

test('it stores instrument lookup values', function(assert) {
  let service = this.subject();
  assert.equal(service.code('piano'), 1, 'first code');
  assert.equal(Object.keys(service.instruments).length, 1);

  assert.equal(service.code('piano'), 1, 'first code again');
  assert.equal(Object.keys(service.instruments).length, 1, 'repeated lookups use cached value');

  assert.equal(service.code('trumpet'), 2, 'second code');
  assert.equal(Object.keys(service.instruments).length, 2, 'new record added');

  assert.equal(service.code('trumpet'), 2, 'second code again');
  assert.equal(Object.keys(service.instruments).length, 2, 'no new records');

  assert.equal(service.code('piano'), 1, 'first code again');
  assert.equal(Object.keys(service.instruments).length, 2, 'no new records');

});
