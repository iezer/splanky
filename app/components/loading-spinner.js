import { computed } from '@ember/object';
import Component from '@ember/component';

// https://github.com/machty/ember-concurrency/blob/master/tests/dummy/app/templates/components/loading-spinner.hbs
export default Component.extend({
  tagName: '',

  inlineSize: 20,
  largeSize: 200,
  isInline: false,
  size: computed('inlineSize', 'isLine', 'largeSize', function() {
    const { inlineSize, isInline, largeSize } = this;
    return isInline ? inlineSize : largeSize;
  })
});
