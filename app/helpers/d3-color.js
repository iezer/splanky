import Helper from 'ember-helper';
import d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

export function d3Color(params/*, hash*/) {
  return color(params[0]);
}

export default Helper.helper(d3Color);
