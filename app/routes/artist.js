import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model({ id }) {
    return this.store.findRecord('artist', id, { include: 'events' });
  },

  afterModel(artist) {
    let promises = artist.get('events').map(e => {
      return this.store.findRecord('event', e.get('id'), { include: 'artists' });
    });

    return RSVP.all(promises);
  }
});
