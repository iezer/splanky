export default function(server, numberOfArtists = 100, numberOfEvents = 50) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  let artists = server.createList('artist', numberOfArtists);

  let names = {
    3: 'Trio',
    4: 'Quartet',
    5: 'Quintet'
  };

  // create 20 random events;
  let events = [];
  for (let i = 0; i < numberOfEvents; i++) {
    let bandSize = getRandomInt(3, 6);
    let bandArtists = choose(artists, bandSize);
    let firstArtist = bandArtists[0];
    let name =`The ${firstArtist.attrs.name} ${names[bandSize]}`;
    let artistIds = bandArtists.map(a => a.id);

    let event = server.create('event', {
      name,
      artist_ids: artistIds
    });
    events.push(event);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// return an array of length n with n unique, random
// numbers between 0..max where max = a.length
function choose(a, n) {
  let numbers = [];
  while (numbers.length < n) {
    let i = Math.floor(Math.random() * a.length);
    if (numbers.indexOf(i) === -1) {
      numbers.push(i);
    }
  }

  return numbers.map(i => a[i]);
}
