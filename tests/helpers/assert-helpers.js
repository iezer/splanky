import QUnit from 'qunit';
import $ from 'jquery';

QUnit.assert.is$ = function(selector, message) {
  let count = $(selector).length;
  message = message || `$ did not find ${selector}`;
  this.equal(count, 1, message);
};
