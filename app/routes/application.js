import Route from 'ember-route';

export default Route.extend({
  beforeModel() {
    return this.store.findAll('artist');
  },

  model() {
    return this.store.findAll('event');
  }
});
