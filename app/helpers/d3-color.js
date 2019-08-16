import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

const DEFAULT_SYMBOL = '🎶';

const SYMBOLS = {
  "Alto Sax": '🎷',
  "Baritone Sax": '🎷',
  'Bass': '🎻',
  'Clarinet': '🚦',
  'Composer': '✍️',
  'Flute': '🍾',
  'Vocalist': '🎤',
  'Drums': '🥁',
  'Guitar': '🎸',
  'Organ': '🎹',
  'Percussion': '🥁',
  'Piano': '🎹',
  'Soprano Sax': '🎷',
  'Tenor Sax': '🎷',
  'Trombone': '📎',
  'Trumpet': '🎺',
  'Vibraphone': '🎹',
};

export default Helper.extend({
  instruments: service(),

  compute([instrument], params) {
    let service = this.instruments;
    let code = service.code(instrument);

    if (params.icon) {
      return SYMBOLS[instrument] || DEFAULT_SYMBOL;
    }

    return color(code);
  }
});
