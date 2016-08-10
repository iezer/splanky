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
    this.event = {
      startTime: new Date('Sun Jul 17 2016 22:00'),
      endTime: new Date('Mon Jul 18 2016 01:30'),
      artists: [ this.artist ]
    };
    this.set('event', this.event);
    this.on('selectArtist', () => this);
  },
  afterEach() {
    teardownMirage(this);
  }
});

test('it renders an event', function(assert) {
  assert.expect(3);

  this.render(hbs`{{event-info event=event selectArtist=(action 'selectArtist')}}`);
  let text = this.$().text().trim();
  assert.notStrictEqual(text.indexOf('Monk'), -1, 'shows event name');
  assert.notStrictEqual(text.indexOf('Sunday 7/17/2016'), -1, 'shows event date');
  assert.notStrictEqual(text.indexOf('10:00 PM - 1:30 AM'), -1, 'shows event time');
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

test('can unselect artist', function(assert) {
  assert.expect(4);
  this.set('selectedArtist', this.artist);

  this.on('selectArtist', param => {
    assert.deepEqual(param, null, 'null artist sent to action on click to reset');
    this.set('selectedArtist', param);
  });

  this.render(hbs`{{event-info event=event selectArtist=(action 'selectArtist') selectedArtist=selectedArtist}}`);

  assert.is$('.event-info__artist.selected:contains(Monk)', 'artist name initially selected');
  this.$('.event-info__artist').click();
  assert.is$('.event-info__artist:contains(Monk)', 'artist name still visible');
  assert.notOk(this.$('.event-info__artist.selected:contains(Monk)').length, 'artist name not selected');
});
