import Controller from '@ember/controller';
import {computed} from '@ember/object';
import createGraph from 'cats-client/utils/create-graph';
import { A as emberA } from '@ember/array';
import { inject as service } from '@ember/service';

export const ALL_MONTHS = 0;

export default Controller.extend({
  store: service(),
  fastboot: service(),

  allMonths: ALL_MONTHS,

  showCTA: computed({
    get() {
      if (this.get('fastboot.isFastBoot')) {
        return;
      }
      return !localStorage.getItem('seenCTA');
    },
    set(key, value) {
      localStorage.setItem('seenCTA', !value);
      return value;
    }
  }),

  selectedArtist: computed('artist', {
    get() {
      let artist = this.get('artist');
      if (artist) {
        return this.get('store').peekRecord('artist', artist);
      }

      return null;
    },
    set(key, value) {
      this.set('showCTA', false);
      this.set('artist', value && value.get('id'));
      return value;
    }
  }),

  sortDef: Object.freeze(['startTime:desc']),
  sortedEvents: computed.sort('events', 'sortDef'),

  includeBandmates: true,
  month: ALL_MONTHS,
  year: null,

  artist: null,

  queryParams: Object.freeze([ 'month', 'year', 'includeBandmates', 'artist' ]),

  // converter query-string month input "1"-"12"
  // do 0 based int 0-11 so that getMonth() works.
  monthInt: computed('month', function() {
    let month = this.get('month');
    if (month === ALL_MONTHS || month === null) {
      return null;
    }

    return parseInt(month, 10) - 1;
  }),

  // Filter on month and/or selectedArtist
  events: computed('monthInt', 'selectedArtist', 'includeBandmates', function() {
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

      if (this.get('includeBandmates')) {
        let bandMates = emberA();
        events.forEach(event => {
          bandMates.pushObjects(event.get('artists').toArray());
        });

        bandMates = bandMates.uniq().removeObject(selectedArtist);

        bandMates.forEach(bandMate => pushEvents(bandMate));
      }

      return events.uniq();
    }

    // if (month !== null) {
    //   return this.get('model').filter(event => {
    //     return event.get('startTime').getMonth() === month;
    //   });
    // }

    return this.get('model');
  }),

  graph: computed('events.[]', function() {
    let events = this.get('events');
    return createGraph(events);
  })
});
