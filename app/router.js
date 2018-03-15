import EmberRouter from 'ember-router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import run from 'ember-runloop';

const Router = EmberRouter.extend({
  location: config.locationType,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
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
});

export default Router;
