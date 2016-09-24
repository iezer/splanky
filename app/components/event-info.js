import Component from 'ember-component';
import injectService from 'ember-service/inject';

export default Component.extend({
  classNames: ['event-info'],

  metrics: injectService(),

  actions: {
    selectArtist(artist) {
      let value = artist ? parseInt(artist.get('id'), 10) : 0;
      this.get('metrics').trackEvent({
        category: 'ui-interaction',
        action: 'select-artist',
        label: 'event-info',
        value
      });

      this.get('selectArtist')(artist);
    }
  }
});
