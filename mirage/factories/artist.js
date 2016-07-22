import { Factory, faker } from 'ember-cli-mirage';
import { INSTRUMENTS } from 'cats-client/models/artist';

let randomInstrument = function() {
  let i = Math.floor(Math.random() * INSTRUMENTS.length);
  return INSTRUMENTS[i];
};

export default Factory.extend({
  name() { return faker.name.findName(); },
  instrument() { return randomInstrument(); },
  image: 'image.jpg'
});
