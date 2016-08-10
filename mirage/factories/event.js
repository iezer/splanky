import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.name.findName(); },
  start_time() { return faker.date.recent(30); },
  end_time() { return faker.date.recent(30); },
  artist_ids() { return []; }
});
