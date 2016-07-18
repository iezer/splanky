import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  setup as setupMirage, teardown as teardownMirage
} from 'cats-client/tests/helpers/setup-mirage-for-integration';

moduleForComponent('event-info', 'Integration | Component | event info', {
  integration: true,
  beforeEach() {
    setupMirage(this);
    this.artist = { id: 'monk', name: 'Monk' };
    this.event = { startTime: new Date(), artists: [ this.artist ] };
    this.set('event', this.event);
    this.on('selectArtist', () => this);
  },
  afterEach() {
    teardownMirage(this);
  }
});

test('it renders an event', function(assert) {
  assert.expect(2);

  this.render(hbs`{{event-info event=event selectArtist=(action 'selectArtist')}}`);
  let text = this.$().text().trim();
  assert.notStrictEqual(text.indexOf('Monk'), -1, 'shows event name');
  assert.notStrictEqual(text.indexOf(this.event.startTime.toDateString()), -1, 'shows event date');
});

test('it renders artists for event and handles action', function(assert) {
  assert.expect(4);

  this.set('selectedArtist', null);
  this.on('selectArtist', param => {
    assert.deepEqual(this.artist, param, 'artist sent to action on click');
    this.set('selectedArtist', param);
  });

  this.render(hbs`{{event-info event=event selectArtist=(action 'selectArtist') selectedArtist=selectedArtist}}`);

  assert.is$('.event-info__artist:contains(Monk)', 'shows artist name');
  assert.notOk(this.$('.event-info__artist.selected:contains(Monk)').length, 'artist initially not selected');
  this.$('.event-info__artist').click();
  assert.is$('.event-info__artist.selected:contains(Monk)', 'artist name is selected');
});
