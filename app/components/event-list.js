import Component from '@ember/component';
import { readOnly, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  tagName: '',

  isVisible: false,

  init(){
    this._super(...arguments);
    // Delay sorting events so graph can be created first
    scheduleOnce('afterRender', () => {
      this.set('isVisible', true);
    });
  },

  firstEvent: readOnly('events.firstObject'),

  sortDef: Object.freeze(['startTime']),
  sortedEvents: sort('events', function(eventA, eventB) {
    // Make events early in the morning like 1:00am appear at the end.
    let hoursA = eventA.get('date');
    let hoursB = eventB.get('date');
    return hoursA - hoursB;
  }),

  eventsByDay: computed('sortedEvents.[]', function() {
    let events = this.get('sortedEvents');
    let dates = {};
    events.forEach(event => {
      const date = event.get('date');
      if (!dates[date]) {
        dates[date] = {
          date,
          events: [event]
        };
      } else {
        dates[date].events.push(event);
      }
    });

    return dates;
  })
});
