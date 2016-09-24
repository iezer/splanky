import Component from 'ember-component';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';

export default Component.extend({
  classNames: [ 'stats__column', 'stats__scroll' ],

  metrics: injectService(),

  sortKey: computed('key', function() {
    let key = this.get('key');
    return [`${key}.length:desc`];
  }),

  sortedArtists: computed.sort('artists', 'sortKey'),

  actions: {
    selectArtist(artist) {
      let key = this.get('key');
      let value = artist ? parseInt(artist.get('id'), 10) : 0;
      this.get('metrics').trackEvent({
        category: 'ui-interaction',
        action: 'select-artist',
        label: `stats-column-${key}`,
        value
      });

      this.get('selectArtist')(artist);
    }
  }
});
