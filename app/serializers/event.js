import Serializer from './application';

export default Serializer.extend({
  normalizeResponse(store, type, payload, id, requestType) {
    // TODO move to mirage so all artists are sideloaded

    let normalizeEvent = event => {
      let artistIds = event.attributes['artist_ids'];
      if (artistIds) {
        if (typeof artistIds === 'string') {
          artistIds = artistIds.split(',');
        }
        delete event.attributes['artist_ids'];

        event.relationships = event.relationships || {};
        event.relationships.artists = event.relationships.artists || { data: [] };

        artistIds.forEach(artistId => {
          event.relationships.artists.data.push({ id: artistId, type: 'artist' });
        });
      }
    };

    if (Array.isArray(payload.data)) {
      payload.data.forEach(normalizeEvent);
    } else {
      normalizeEvent(payload.data);
    }

    return this._super(store, type, payload, id, requestType);
  }
});
