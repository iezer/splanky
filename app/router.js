import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import {run} from '@ember/runloop';

const Router = EmberRouter.extend({
  location: config.locationType,
  fastboot: service(),
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (this.get('fastboot.isFastBoot')) { return; }
    run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname + document.location.search;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      this.get('metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('stats');
  this.route('about');
  this.route('graph', { path: 'graph/:year/:month'});
  this.route('artist', { path: 'artist/:id'});
});

export default Router;
