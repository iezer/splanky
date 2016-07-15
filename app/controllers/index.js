import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  selectedArtist: null,
  sortDef: ['startTime:desc'],
  sortedEvents: computed.sort('model', 'sortDef')
});
