import Route from '@ember/routing/route';

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
