/* eslint-env node */

const FastBootAppServer = require('fastboot-app-server');

let enforceHTTP = (req, res, next) => {
  if (req.protocol === "http") {
    return next();
  } else {
    return res.redirect(301, `http://${req.host}${req.url}`);
  }
};

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true, // Optional - Enables gzip compression.
  host: '0.0.0.0', // Optional - Sets the host the server listens on.
  chunkedResponse: true, // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
  beforeMiddleware(app) {
    // This makes it so that req.protocol is correct (reads 'X-Forwarded-Proto')
    // and some other variables are as expected.
    // See: http://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', true);

    app.use(enforceHTTP);
  }
});

server.start();
