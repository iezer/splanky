import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let { month, year } = getCurrentMonth();
    this.replaceWith('graph', year, month);
  }
});

function getCurrentMonth() {
  return { month: 11, year: 2017 };
  let d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return { month, year };
}
