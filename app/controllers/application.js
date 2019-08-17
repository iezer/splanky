import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const MONTHS = [
  { name: 'Jan' , value: 1},
  { name: 'Feb', value: 2 },
  { name: 'Mar', value: 3 },
  { name: 'Apr', value: 4 },
  { name: 'May', value: 5 },
  { name: 'Jun', value: 6 },
  { name: 'Jul', value: 7 },
  { name: 'Aug', value: 8 },
  { name: 'Sep', value: 9 },
  { name: 'Oct', value: 10 },
  { name: 'Nov', value: 11 },
  { name: 'Dec', value: 12 }
];

const CURRENT_DATE = new Date();
const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const OLDEST_YEAR = 2017;

export default Controller.extend({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
  router: service(),
  currentYear: CURRENT_YEAR,
  oldestYear: OLDEST_YEAR,
  years: computed('currentYear', 'oldestYear', function() {
    const { currentYear, oldestYear } = this;
    let results = [];
    for (let i = currentYear; i >= oldestYear; i--) {
      results.push(i);
    }
    return results;
  }),

  months: MONTHS,

  isGraphRoute: computed('router.currentRouteName', function() {
    return this.router.currentRouteName.includes('graph');
  }),

  selectedMonth: computed('month', 'months', function() {
    let months = this.months;
    let month = parseInt(this.month);
    return months.findBy('value', month);
  }),

  actions: {
    changeMonth({ value: month }) {
      let year = this.year;
      this.router.transitionTo('graph', year, month);
    },
    changeYear(year) {
      let month = this.month;
      this.router.transitionTo('graph', year, month);
    }
  }
});
