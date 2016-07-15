import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  setup as setupMirage, teardown as teardownMirage
} from 'cats-client/tests/helpers/setup-mirage-for-integration';

moduleForComponent('event-info', 'Integration | Component | event info', {
  integration: true,
  beforeEach() {
    setupMirage(this);
  },
  afterEach() {
    teardownMirage(this);
  }
});

test('it renders an event', function(assert) {
  assert.expect(2);

  let event = {
    startTime: new Date(),
    name: 'Monk'
  };

  this.set('event', event);
  this.render(hbs`{{event-info event=event}}`);

  let text = this.$().text().trim();
  assert.notStrictEqual(text.indexOf('Monk'), -1, 'shows event name');
  assert.notStrictEqual(text.indexOf(event.startTime.toDateString()), -1, 'shows event date');
});

test('it renders artists for event and handles action', function(assert) {
  assert.expect(2);
  let done = assert.async();
  let artist = { name: 'Monk' };
  let event = { startTime: new Date(), artists: [ artist ] };

  this.on('selectArtist', function(param) {
    assert.deepEqual(artist, param, 'artist sent to action on click');
    done();
  });

  this.set('event', event);
  this.render(hbs`{{event-info event=event selectArtist=(action 'selectArtist')}}`);

  assert.is$('.event-info__artist:contains(Monk)', 'shows artist name');
  this.$('.event-info__artist').click();
});
