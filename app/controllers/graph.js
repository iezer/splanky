import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';

export default Controller.extend({
  sortDef: Object.freeze(['startTime:desc']),
  events: alias('model'),
  sortedEvents: sort('events', 'sortDef'),

  graph: computed('events.[]', function() {
    let events = this.events;
    let graph = createGraph(events);

    return graph;
  })
});
