import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  setup as setupMirage, teardown as teardownMirage
} from 'cats-client/tests/helpers/setup-mirage-for-integration';


moduleForComponent('artist-info', 'Integration | Component | artist info', {
  integration: true,
  beforeEach() {
    setupMirage(this);
    this.artistData = this.server.create('artist');
    let store = this.container.lookup('service:store');
    return store.findRecord('artist', this.artistData.id).then(artist => {
      this.set('artist', artist);
    });
  },
  afterEach() {
    teardownMirage(this);
  }
});

test('it renders', function(assert) {
  assert.expect(2);
  this.on('clearArtist', () => this);
  this.render(hbs`{{artist-info artist=artist clearArtist=(action 'clearArtist')}}`);

  assert.ok(this.$(`.artist-info__name:contains(${this.artistData.name})`).length, 'renderd artist name');

  // Template block usage:
  this.render(hbs`
    {{#artist-info artist=artist clearArtist=(action 'clearArtist')}}
      <div class='block'>
        template block text
      </div>
    {{/artist-info}}
  `);

  assert.ok(this.$(`.block:contains(template block text)`).length, 'yields');
});

test('sends clear action',function(assert) {
  assert.expect(1);
  this.on('clearArtist', param => {
    assert.strictEqual(param, null, 'clear button called');
  });

  this.render(hbs`{{artist-info artist=artist clearArtist=(action 'clearArtist')}}`);
  this.$('.artist-info__button:contains(Clear)').click();
});
