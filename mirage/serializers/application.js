import { JSONAPISerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  }
});
