import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { A as emberA } from '@ember/array';

export default Model.extend({
  name: attr('string'),
  instrument: attr('string'),
  events: hasMany('event', { inverse: 'artists', async: false }),
  image: attr('string'),
  url: attr('string'),

  bandMates: computed('events.@each.artists', function() {
    let bandMates = emberA();
    this.events.forEach(event => {
      bandMates.pushObjects(event.get('artists').toArray());
    });
    return bandMates.uniq().removeObject(this);
  }),

  text: computed('name', 'instrument', function() {
    return `${this.name} (${this.instrument})`;
  })
});
