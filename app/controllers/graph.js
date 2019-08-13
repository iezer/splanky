import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';

export default Controller.extend({
  sortDef: Object.freeze(['startTime']),
  events: alias('model'),

  sortedEvents: sort('events', function(eventA, eventB) {
    // Make events early in the morning like 1:00am appear at the end.
    let hoursA = eventA.get('startTime').getHours();
    let hoursB = eventB.get('startTime').getHours();
    if (hoursA < 7) {
      hoursA = hoursA + 24;
    }

    if (hoursB < 7) {
      hoursB = hoursB + 24;
    }
    return hoursA - hoursB;
  }),

  graph: computed('events.[]', function() {
    let events = this.events;
    let graph = createGraph(events);

    return graph;
  }),

  eventsByDay: computed('sortedEvents.[]', function() {
    let events = this.get('sortedEvents');
    let dates = {};
    events.forEach(event => {
      const startTime = event.get('startTime');
      let date = startTime.getDate();
      if (!dates[date]) {
        dates[date] = [event];
      } else {
        dates[date].push(event);
      }
    });

    return dates;
  }),

  center: computed(function() {
    // TODO dynamic based on query param
    let center = new Date('2019-08-13');
    console.log(`center ${center}`);
    return center;
  })
});
