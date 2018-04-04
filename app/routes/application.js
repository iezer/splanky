import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const oneMonthInSeconds = 60*60*24*30;

export default Route.extend({
  fastboot: service(),

  beforeModel() {
    this.get('fastboot').setResponseHeader('Surrogate-Control', `max-age=${oneMonthInSeconds} stale-while-revalidate=60`);
  },

  actions: {
    willTransition(transition) {
      this.controllerFor('application').set('showCTA', false);
    }
  }
});
