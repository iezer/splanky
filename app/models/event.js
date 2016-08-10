import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  artists: hasMany('artist', { inverse: 'events', async: false }),
  startTime: attr('date'),
  endTime: attr('date')
});
