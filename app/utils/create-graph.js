import { subscribe, instrument } from 'ember-instrumentation';

/*
 * Create a D3-force diagram compatible graph
 * based on an array of events.
 * returns { nodes, links }
 */
export default function(events) {
  let nodes = [];
  let links = [];
  let instruments = [];

  function desc(artist) {
    return `${artist.get('name')} (${artist.get('instrument')})`;
  }

  function addNode(artist) {
    let text = desc(artist);
    let id = artist.get('id');
    let node = nodes.find(n => n.id === id);
    if (node === undefined) {
      let group = groupCode(artist);
      let image = artist.get('image');
      nodes.push({ id, text, group, image, artist });
    }
  }

  function groupCode(artist) {
    let instrument = artist.get('instrument');
    let i = instruments.indexOf(instrument);

    if (i === -1) {
      instruments.push(instrument);
      return instruments.length;
    }

    return i + 1;
  }

  function addEvent(artistA, artistB) {
    let source = artistA.get('id');
    let target = artistB.get('id');
    let link = links.find(l => {
      return (l.source === source && l.target === target) ||
        (l.source === target && l.target === source);
    });
    if (link === undefined) {
      links.push({ source, target, value: 1, sqrtValue: 1 });
    } else {
      link.value++;
      link.sqrtValue = Math.sqrt(link.value);
    }
  }

  subscribe("create-graph", {
    before: function(name, start) {
      return start;
    },

    after: function(name, end, payload, start) {
      let duration = Math.round(end - start);
      console.log(`create-graph took ${duration} ms.`); // eslint-disable-line no-console
    }
  });

  instrument('create-graph', () => {
    events.forEach(event => {
      let artists = event.get('artists');
      for(let i = 0; i < artists.length; i++) {
        let artist = artists.objectAt(i);
        addNode(artist);

        for(let j = i + 1; j < artists.length; j++) {
          let targetArtist = artists.objectAt(j);
          addEvent(artist, targetArtist);
        }
      }
    });
  });

  return { nodes, links, instruments };
}
