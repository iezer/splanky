import { formatDate } from 'cats-client/helpers/format-date';
import { module, test } from 'qunit';

module('Unit | Helper | format date');

test('formats date', function(assert) {
  let date = new Date();
  let result = formatDate([date]);
  assert.equal(result, date.toDateString(), 'calls toDateString()');
});
