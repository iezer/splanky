import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';
import { A as emberA } from '@ember/array';

export default Controller.extend({
  queryParams: ['includeBandmates'],
  sortDef: Object.freeze(['startTime:desc']),
  artist: alias('model'),
  sortedEvents: sort('events', 'sortDef'),
  includeBandmates: true,

  events: computed('artist', 'artist.events.[]', 'includeBandmates', function() {
    if (!this.includeBandmates) {
      return this.get('artist.events');
    }

    let events = emberA();
    let artistEvents = this.get('artist.events');

    let bandMates = emberA();
    artistEvents.forEach(event => {
      bandMates.pushObjects(event.get('artists').toArray());
    });

    bandMates = bandMates.uniq();

    bandMates.forEach(bandMate => events.pushObjects(bandMate.get('events').toArray()));

    return events.uniq();
  }),

  graph: computed('events.[]', function() {
    let events = this.events;
    return createGraph(events);
  }),

  actions: {
    doTransition() {
      this.transitionToRoute(...arguments);
    }
  }
});
