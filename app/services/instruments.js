import Service from '@ember/service';
export default Service.extend({
  lastCode: 1,

  init() {
    this._super(...arguments);
    this.instruments = {};
  },

  code(key) {
    let instruments = this.get('instruments');
    let val = instruments[key];
    if (val) {
      return val;
    }

    let code = this.get('lastCode');
    instruments[key] = code;
    this.set('lastCode', code + 1);
    return code;
  }
});
