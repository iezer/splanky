import { moduleFor, test } from 'ember-qunit';
import d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

moduleFor('helper:d3-color', 'Unit | Helper | d3 color', {
  needs: [ 'service:instruments' ]
});

test('it works', function(assert) {
  assert.expect(3);

  let helper = this.subject();
  assert.equal(helper.compute('piano'), color(1));
  assert.equal(helper.compute('trumpet'), color(2));
  assert.equal(helper.compute('bass'), color(3));
});
