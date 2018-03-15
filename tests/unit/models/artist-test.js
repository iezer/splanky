import { moduleForModel, test } from 'ember-qunit';
import { startMirage } from 'cats-client/initializers/ember-cli-mirage';
import run from 'ember-runloop';

moduleForModel('artist', 'Unit | Model | Artist', {
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
  let artistData = this.server.create('artist');

  return run(() => {
    return this.store().findRecord('artist', artistData.id);
  }).then(artist => {
    assert.equal(artist.get('id'), artistData.id, `id serialized - ${artistData.id}`);
    assert.equal(artist.get('name'), artistData.name, `name serialized - ${artistData.name}`);
    assert.equal(artist.get('instrument'), artistData.instrument, `instrument serialized - ${artistData.instrument}`);
    assert.equal(artist.get('image'), artistData.image, `image serialized - ${artistData.image}`);
  });
});

test('can compute text', function(assert) {
  assert.expect(1);

  let artistData = this.server.create('artist');

  return run(() => {
    return this.store().findRecord('artist', artistData.id);
  }).then(artist => {
    assert.equal(artist.get('text'), `${artistData.name} (${artistData.instrument})`, 'computes description text');
  });
});
