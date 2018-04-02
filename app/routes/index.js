import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    month: { refreshModel: true },
    year: { refreshModel: true }
  },
  model({month, year}) {
    if (!month || !year) {
      return this.replaceWith('application', { queryParams: getCurrentMonth() } );
    }
    return this.store.query('event', {
      filter: {
        month,
        year
      },
      include: 'artists'
    });
  }
});

function getCurrentMonth() {
  return { month: 11, year: 2017 };
  let d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return { month, year };
}
