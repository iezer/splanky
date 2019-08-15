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

  eventsByDay: computed('sortedEvents.[]', function() {
    let events = this.get('sortedEvents');
    let dates = {};
    events.forEach(event => {
      const startTime = event.get('startTime');
      let date = startTime.getDate();
      if (!dates[date]) {
        dates[date] = {
          startTime,
          events: [event]
        };
      } else {
        dates[date].events.push(event);
      }
    });

    return dates;
  })
});
