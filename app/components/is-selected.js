import Component from 'ember-component';

export default Component.extend({
  tagName: '',

  current: null,
  selected: null,

  isSelected: false,

  didReceiveAttrs() {
    let current = this.get('current');
    let selected = this.get('selected');
    this.set('isSelected', !!selected && (current === selected));
  }
});
