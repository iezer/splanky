import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model({ id }) {
    let include = [
      'events',
      'events.artists',
      'events.artists.events',
      'events.artists.events.artists'
    ].join(',');

    return this.store.findRecord('artist', id, { include });
  }
});
