import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    return this.store.findAll('artist');
  },

  model() {
    return this.store.findAll('event');
  }
});
