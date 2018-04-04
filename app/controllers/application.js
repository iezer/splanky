import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const YEARS = [
  2017,
  2018
];

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

export default Controller.extend({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
  router: service(),
  years: YEARS,
  months: MONTHS,

  selectedMonth: computed('month', 'months', function() {
    let months = this.get('months');
    let month = parseInt(this.get('month'));
    return months.findBy('value', month);
  }),

  showCTA: computed({
    get() {
      if (this.get('fastboot.isFastBoot')) {
        return;
      }
      return !localStorage.getItem('seenCTA-2');
    },
    set(key, value) {
      localStorage.setItem('seenCTA-2', !value);
      return value;
    }
  }),

  actions: {
    changeMonth({ value: month }) {
      let year = this.get('year');
      this.get('router').transitionTo('graph', year, month);
    },
    changeYear(year) {
      let month = this.get('month');
      this.get('router').transitionTo('graph', year, month);
    }
  }
});
