import { moduleForModel, test } from 'ember-qunit';
import {
  setup as setupMirage, teardown as teardownMirage
} from 'cats-client/tests/helpers/setup-mirage-for-integration';
import run from 'ember-runloop';

moduleForModel('artist', 'Unit | Model | Artist', {
  integration: true,
  beforeEach() {
    setupMirage(this);
  },
  afterEach() {
    teardownMirage(this);
  }
});

test('can find single record', function(assert) {
  assert.expect(4);
  let artistData = this.server.create('artist');

  run(() => {
    return this.store().find('artist', artistData.id);
  }).then(artist => {
    assert.equal(artist.get('id'), artistData.id, `id serialized - ${artistData.id}`);
    assert.equal(artist.get('name'), artistData.name, `name serialized - ${artistData.name}`);
    assert.equal(artist.get('instrument'), artistData.instrument, `instrument serialized - ${artistData.instrument}`);
    assert.equal(artist.get('image'), artistData.image, `image serialized - ${artistData.image}`);
  });
});
