import Component from '@ember/component';
import { computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import moment from 'moment';

export default Component.extend({
  classNames: [ 'artist-info' ],
  month: null,
  showClearButton: true,
  // could be zero
  hasMonth: computed('month', function() {
    return this.get('month') !== null;
  }),

  monthString: computed('month', function() {
    let month = this.get('month');
    if (month) {
      return moment().month(this.get('month')).format('MMMM');
    }

    return null;
  }),

  eventsForMonth: computed('artist.events.[]', 'month', function() {
    let month = this.get('month');
    if (month === null) { return null; }

    return this.get('artist.events').filter(event => {
      return event.get('startTime').getMonth() === month;
    });
  }),

  bandMatesForMonth: computed('eventsForMonth.[]', 'artist', function() {
    let events = this.get('eventsForMonth');
    let artist = this.get('artist');

    let bandMates = emberA();
    events.forEach(event => {
      bandMates.pushObjects(event.get('artists').toArray());
    });

    bandMates = bandMates.uniq().removeObject(artist);
    return bandMates;
  }),

  actions: {
    clearArtist() {
      window.history.back();
    }
  }
});
