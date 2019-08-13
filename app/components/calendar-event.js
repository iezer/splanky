import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  metrics: service(),

  showArtists: false,

  actions: {

    toggleArtist() {
      this.set('showArtists', !this.showArtists);
    },

    selectArtist(artist) {
      let value = artist ? artist.get('id') : 'clear';
      this.metrics.trackEvent({
        category: 'ui-interaction',
        action: `select-artist-${value}`,
        label: 'event-info'
      });

      this.selectArtist(artist);
    }
  }
});
