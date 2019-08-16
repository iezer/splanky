import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';

export default Controller.extend({
  events: alias('model'),

  graph: computed('events.[]', function() {
    let events = this.events;
    let graph = createGraph(events);

    return graph;
  }),

  actions: {
    doTransition() {
      this.transitionToRoute(...arguments);
    }
  }
});
