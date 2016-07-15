import Helper from 'ember-helper';

export function formatDate(params/*, hash*/) {
  return params[0].toDateString();
}

export default Helper.helper(formatDate);
