import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  queryParams: ['type'],

  // events or artists
  type: 'events',

  sortKey: computed('type', function() {
    let type = this.get('type');

    return [`${type}.length:desc`];
  }),

  sortedArtists: computed.sort('model', 'sortKey'),

  actions: {
    setType(type) {
      this.set('type', type);
    }
  }
});
