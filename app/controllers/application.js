import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const YEARS = [
  2017,
  2018
];

const MONTHS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
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

  showCTA: computed({
    get() {
      if (this.get('fastboot.isFastBoot')) {
        return;
      }
      return !localStorage.getItem('seenCTA');
    },
    set(key, value) {
      localStorage.setItem('seenCTA', !value);
      return value;
    }
  }),

  actions: {
    changeMonth(month) {
      let year = this.get('year');
      this.get('router').transitionTo('graph', year, month);
    },
    changeYear(year) {
      let month = this.get('month');
      this.get('router').transitionTo('graph', year, month);
    }
  }
});
