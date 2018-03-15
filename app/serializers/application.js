import JSONAPISerializer from 'ember-data/serializers/json-api';
import { underscore } from '@ember/string';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return underscore(key);
  }
});
