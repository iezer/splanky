import JSONAPISerializer from 'ember-data/serializers/json-api';
import { isEmberArray } from 'ember-array/utils';

export default JSONAPISerializer.extend({
  normalizeResponse(store, type, payload, id, requestType) {
    // TODO move to mirage so all artists are sideloaded

    let normalizeEvent = event => {
      let artistIds = event.attributes['artist-ids'];
      delete event.attributes['artist-ids'];

      event.relationships = event.relationships || {};
      event.relationships.artists = event.relationships.artists || { data: [] };

      artistIds.forEach(artistId => {
        event.relationships.artists.data.push({ id: artistId, type: 'artist' });
      });
    };

    if (isEmberArray(payload.data)) {
      payload.data.forEach(normalizeEvent);
    } else {
      normalizeEvent(payload.data);
    }

    return this._super(store, type, payload, id, requestType);
  }
});
