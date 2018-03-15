/* eslint-env node */

const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true, // Optional - Enables gzip compression.
  host: '0.0.0.0', // Optional - Sets the host the server listens on.
  chunkedResponse: true // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
