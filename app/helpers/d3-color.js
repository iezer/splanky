import Helper from 'ember-helper';
import { inject as service } from '@ember/service';
import d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

export default Helper.extend({
  instruments: service(),

  compute([instrument]) {
    let service = this.get('instruments');
    let code = service.code(instrument);
    return color(code);
  }
});
