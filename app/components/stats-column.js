import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  classNames: [ 'stats__column', 'stats__scroll' ],
  sortKey: computed('key', function() {
    let key = this.get('key');
    return [`${key}.length:desc`];
  }),

  sortedArtists: computed.sort('artists', 'sortKey')
});
