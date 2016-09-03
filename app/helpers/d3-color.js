import Helper from 'ember-helper';
import injectService from 'ember-service/inject';
import d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

export default Helper.extend({
  instruments: injectService(),

  compute([instrument]) {
    let service = this.get('instruments');
    let code = service.code(instrument);
    return color(code);
  }
});
