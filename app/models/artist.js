import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export let INSTRUMENTS = [
  'Piano',
  'Bass',
  'Drums',
  'Guitar',
  'Trumpet'
];

export default Model.extend({
  name: attr('string'),
  instrument: attr('string'),
  events: hasMany('event', { inverse: 'artists' })
});
