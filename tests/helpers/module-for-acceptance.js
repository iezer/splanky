import { Promise } from 'rsvp';
import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import getServer from 'cats-client/mirage/get-server';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      this.server = getServer();
      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      this.server.shutdown();
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
