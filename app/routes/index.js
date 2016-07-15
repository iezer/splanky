import Route from 'ember-route';
import createGraph from 'cats-client/utils/create-graph';
import { subscribe, instrument } from 'ember-instrumentation';

export default Route.extend({
  beforeModel() {
    return this.store.findAll('artist');
  },

  model() {
    return this.store.findAll('event');
  },

  setupController(controller, model) {
    this._super(...arguments);

    subscribe("create-graph", {
      before: function(name, start) {
        return start;
      },

      after: function(name, end, payload, start) {
        let duration = Math.round(end - start);
        console.log(`create-graph took ${duration} ms.`); // eslint-disable-line no-console
      }
    });

    instrument('create-graph', () => {
      let graph = createGraph(model);
      controller.set('graph', graph);
    });
  }
});
