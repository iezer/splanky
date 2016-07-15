import mirageInitializer from 'cats-client/initializers/ember-cli-mirage';
import getServer from 'cats-client/mirage/get-server';

/**
 * These setup and teardown methods can be used to start a Mirage server
 * in non-acceptance tests
 */
export function setup(testContext) {
  mirageInitializer.initialize(testContext.container);
  testContext.server = getServer();
}

export function teardown(testContext) {
  testContext.server.shutdown();
}
