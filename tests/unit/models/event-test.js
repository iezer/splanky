import { moduleForModel, test } from 'ember-qunit';
import { startMirage } from 'cats-client/initializers/ember-cli-mirage';
import {run} from '@ember/runloop';

moduleForModel('event', 'Unit | Model | Event', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('can find single record', function(assert) {
  assert.expect(4);
  let data = this.server.create('event');

  return run(() => {
    return this.store().find('event', data.id);
  }).then(event => {
    assert.equal(event.get('id'), data.id, `id serialized - ${data.id}`);
    assert.equal(event.get('name'), data.name, `name serialized - ${data.name}`);
    assert.deepEqual(event.get('startTime'), data.start_time, `start_time serialized - ${data.start_time}`);
    assert.deepEqual(event.get('endTime'), data.end_time, `end_time serialized - ${data.end_time}`);
  });
});

test('can find all records', function(assert) {
  assert.expect(4);
  let data = this.server.create('event');

  return run(() => {
    return this.store().findAll('event');
  }).then(events => {
    assert.equal(events.get('length'), 1, '1 event returned');
    let event = events.get('firstObject');
    assert.equal(event.get('id'), data.id, `id serialized - ${data.id}`);
    assert.equal(event.get('name'), data.name, `name serialized - ${data.name}`);
    assert.deepEqual(event.get('startTime'), data.start_time, `start_time serialized - ${data.start_time}`);
  });
});

test('can sets ID for related artists', function(assert) {
  assert.expect(1);
  let data = this.server.create('event', { artist_ids: [ 'a5' ]});

  return run(() => {
    return this.store().find('event', data.id);
  }).then(event => {
    let artistIds = event.hasMany('artists').ids();
    assert.deepEqual(artistIds, ['a5'], 'artist Ids set on hasMany relationship');
  });
});
