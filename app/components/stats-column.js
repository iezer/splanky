import { sort } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  metrics: service(),

  sortKey: computed('key', function() {
    let key = this.key;
    return [`${key}.length:desc`];
  }),

  sortedArtists: sort('artists', 'sortKey'),

  actions: {
    selectArtist(artist) {
      let key = this.key;
      let value = artist ? artist.get('id') : 'clear';
      this.metrics.trackEvent({
        category: 'ui-interaction',
        action: `select-artist-${value}`,
        label: `stats-column-${key}`
      });

      this.selectArtist(artist);
    }
  }
});
