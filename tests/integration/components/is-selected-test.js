import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('is-selected', 'Integration | Component | is selected', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.set('current', null);
  this.set('selected', null);

  this.render(hbs`
    {{#is-selected current=current selected=selected as |isSelected|}}
      {{isSelected}}
    {{/is-selected}}
  `);

  assert.equal(this.$().text().trim(), 'false');

  this.set('current', 'monk');
  assert.equal(this.$().text().trim(), 'false');

  this.set('selected', 'pops');
  assert.equal(this.$().text().trim(), 'false');

  this.set('current', 'pops');
  assert.equal(this.$().text().trim(), 'true');
});
