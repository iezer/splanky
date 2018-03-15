import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('stats-column', 'Integration | Component | stats column', {
  integration: true,
  beforeEach() {
    this.set('data', [
      EmberObject.create({ id: 1, events: { length: 1 }, name: 'miles' }),
      EmberObject.create({ id: 2, events: { length: 3 }, name: 'pops' }),
      EmberObject.create({ id: 3, events: { length: 2 }, name: 'monk' })
    ]);
  }
});

test('it renders', function(assert) {
  assert.expect(4);

  this.on('selectArtist', () => this);
  this.render(hbs`{{stats-column artists=data key='events' title='Stats Page' selectArtist=(action 'selectArtist')}}`);

  assert.ok(this.$('.stats__title:contains(Stats Page)').length, 'title');
  assert.ok(this.$('.stats__line:eq(0)').text().match(/3\s+pops/), '3 pops');
  assert.ok(this.$('.stats__line:eq(1)').text().match(/2\s+monk/), '2 monk');
  assert.ok(this.$('.stats__line:eq(2)').text().match(/1\s+miles/), '1 miles');
});

test('selectAction', function(assert) {
  assert.expect(2);

  this.on('selectArtist', param => {
    assert.equal(param, this.get('data').objectAt(2), 'selected passed to action');
  });

  this.render(hbs`{{stats-column artists=data key='events' title='Stats Page' selectArtist=(action 'selectArtist')}}`);
  this.$('.stats__line:eq(1)').click();

  this.on('selectArtist', param => {
    assert.strictEqual(param, null, 'null passed to action to clear');
  });

  this.$('.stats__line:eq(1)').click();
});
