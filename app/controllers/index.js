import Controller from 'ember-controller';
import computed from 'ember-computed';
import createGraph from 'cats-client/utils/create-graph';
import { A as emberA } from 'ember-array/utils';

export default Controller.extend({
  selectedArtist: null,
  sortDef: ['startTime:desc'],
  sortedEvents: computed.sort('events', 'sortDef'),

  month: null,
  queryParams: [ 'month' ],

  // converter query-string month input "1"-"12"
  // do 0 based int 0-11 so that getMonth() works.
  monthInt: computed('month', function() {
    let month = this.get('month');
    if (month !== null) {
      return parseInt(month, 10) - 1;
    }

    return null;
  }),

  // Filter on month and/or selectedArtist
  events: computed('monthInt', 'selectedArtist', function() {
    let month = this.get('monthInt');
    let events;

    let selectedArtist = this.get('selectedArtist');
    if (selectedArtist) {
      events = emberA();

      let pushEvents = function(artist) {
        events.pushObjects(artist.get('events').filter(event => {
          if (month === null) {
            return true;
          }

          return event.get('startTime').getMonth() === month;
        }));
      };

      pushEvents(selectedArtist);

      let bandMates = emberA();
      events.forEach(event => {
        bandMates.pushObjects(event.get('artists').toArray());
      });

      bandMates = bandMates.uniq().removeObject(selectedArtist);

      bandMates.forEach(bandMate => pushEvents(bandMate));

      return events;
    }

    if (month) {
      return this.get('model').filter(event => {
        return event.get('startTime').getMonth() === month;
      });
    }

    return this.get('model');
  }),

  graph: computed('events.[]', function() {
    let events = this.get('events');
    return createGraph(events);
  })
});
