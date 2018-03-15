import FastbootService from 'ember-cli-fastboot/services/fastboot';

export default FastbootService.extend({
  setResponseHeader(key, value) {
    if (!this.get('isFastBoot')) { return; }
    let resHeaders = this.get('response.headers');
    resHeaders.set(key, value);
  }
});
