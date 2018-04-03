import Route from '@ember/routing/route';

export default Route.extend({
  model({ year, month }) {
    return this.store.query('event', {
      filter: {
        month,
        year
      },
      include: 'artists'
    });
  }
});
