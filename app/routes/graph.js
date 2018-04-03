import Route from '@ember/routing/route';

export default Route.extend({
  year: null,
  month: null,

  model({ year, month }) {
    this.setProperties({ year, month });
    return this.store.query('event', {
      filter: {
        month,
        year
      },
      include: 'artists'
    });
  },

  setupController() {
    this._super(...arguments);
    let { year, month } = this.getProperties('year' , 'month');
    this.controllerFor('application').setProperties({year, month});
  }
});
