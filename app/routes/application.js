import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
  fastboot: service(),

  beforeModel() {
    return this.store.findAll('artist', { reload: false, backgroundReload: false});
  },

  model() {
    return this.store.findAll('event', { reload: false, backgroundReload: false });
  }
});
