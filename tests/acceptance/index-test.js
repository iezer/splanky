import { test } from 'qunit';
import moduleForAcceptance from 'cats-client/tests/helpers/module-for-acceptance';
import defaultScenario from 'cats-client/mirage/scenarios/default';

moduleForAcceptance('Acceptance | index', {
  beforeEach() {
    defaultScenario(this.server, 10, 10);
  }
});

test('visiting /', function(assert) {
  assert.expect(3);
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.event-info').length, 10, '10 events on the page');
    assert.is$('.force-graph', 'force-graph rendered');
  });
});
