import Controller from '@ember/controller';
import { ALL_MONTHS } from './index';

export default Controller.extend({
  allMonths: ALL_MONTHS,

  selectedArtist: null,

  actions: {
    selectArtist(selectedArtist) {
      this.set('selectedArtist', selectedArtist);
      selectedArtist.reload()
    }
  }
});
