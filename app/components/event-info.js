import Component from 'ember-component';
import injectService from 'ember-service/inject';

export default Component.extend({
  classNames: ['event-info'],

  metrics: injectService(),

  actions: {
    selectArtist(artist) {
      let value = artist ? artist.get('id') : 'clear';
      this.get('metrics').trackEvent({
        category: 'ui-interaction',
        action: `select-artist-${value}`,
        label: 'event-info'
      });

      this.get('selectArtist')(artist);
    }
  }
});
