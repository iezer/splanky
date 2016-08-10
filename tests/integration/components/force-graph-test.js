import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from 'ember-object';

moduleForComponent('force-graph', 'Integration | Component | force graph', {
  integration: true,
  beforeEach() {
    this.graph = {
      nodes: [
        { id: 1, text: 'miles', group: 1 },
        { id: 2, text: 'pops', group: 2 }
      ],
      links: [
        {
          source: 1,
          target: 2,
          value: 3
        }
      ]
    };

    this.set('graph', this.graph);
  }
});

let page = {
  line: 'svg g.force-graph__links line',

  node(id, name) {
    return `svg g.force-graph__nodes circle[dd-artist=${id}] title:contains(${name})`;
  }
};

test('it renders', function(assert) {
  assert.expect(3);
  this.render(hbs`{{force-graph graph=graph}}`);

  assert.is$(page.line, '1 link');
  assert.is$(page.node(1, 'miles'), 'node for miles');
  assert.is$(page.node(2, 'pops'), 'node for pops');
});

test('can select nodes', function(assert) {
  assert.expect(5);
  this.set('selectedArtist', null);
  this.render(hbs`{{force-graph graph=graph selectedArtist=selectedArtist}}`);

  assert.equal(this.$('circle[r=5]').length, 2, 'initially all circles have radius 5');

  let artists = [
    EmberObject.create({ id: 1 }),
    EmberObject.create({ id: 2 })
  ];

  this.set('selectedArtist', artists[0]);
  assert.equal(this.$('circle[dd-artist=1][r=75]').length, 1, 'node 1 set to radius 75');
  assert.equal(this.$('circle[dd-artist=2][r=5]').length, 1, 'node 2 radius unchanged');

  this.set('selectedArtist', artists[1]);
  assert.equal(this.$('circle[dd-artist=1][r=5]').length, 1, 'node 1 reset to radius 5');
  assert.equal(this.$('circle[dd-artist=2][r=75]').length, 1, 'node 2 set to radius 75');
});
