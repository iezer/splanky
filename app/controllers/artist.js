import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';

export default Controller.extend({
  sortDef: Object.freeze(['startTime:desc']),
  artist: alias('model'),
  events: alias('artist.events'),
  sortedEvents: sort('events', 'sortDef'),

  graph: computed('events.[]', function() {
    let events = this.get('events');
    return createGraph(events);
  })
});
