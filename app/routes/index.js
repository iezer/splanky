import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  fastboot: service(),
  
  beforeModel() {
    if (this.get('fastboot.isFastBoot')) { return; }
    let { month, year } = getCurrentMonth();
    this.replaceWith('graph', year, month);
  }
});

function getCurrentMonth() {
  let d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return { month, year };
}
