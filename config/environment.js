/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'cats-client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    'ember-d3': {
      bundle: true
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-84664562-1'
        }
      }
    ],

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com",
      'font-src': "'self'",
      'connect-src': "'self' https://jazz-cats-api.herokuapp.com http://localhost:4000 www.google-analytics.com",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {
    ENV.APP.API_URL = 'http://localhost:4000';
    //ENV.APP.API_URL = 'https://jazz-cats-api.herokuapp.com';
    // ENV.APP.API_URL = '';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_URL = 'https://jazz-cats-api.herokuapp.com';
    ENV.rootURL = '/jazz-cats/';
    ENV.locationType = 'hash';
  }

  ENV.fastboot = {
    hostWhitelist: [
      ENV.APP.API_URL,
      'localhost:3000'
    ]
  };

  return ENV;
};
