import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  current: null,
  selected: null,

  isSelected: false,

  didReceiveAttrs() {
    let current = this.current;
    let selected = this.selected;
    this.set('isSelected', !!selected && (current === selected));
  }
});
