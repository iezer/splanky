import RESTAdapter from 'ember-data/adapters/rest';
import config from '../config/environment';

export default RESTAdapter.extend({
  host: config.APP.API_URL,
  namespace: config.apiNamespace
});
