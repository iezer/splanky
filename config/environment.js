/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'cats-client',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    apiNamespace: '',

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
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_URL: 'https://xmm46nsazlkwn7lljqokb7tli40lviig.lambda-url.eu-north-1.on.aws/'
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com",
      'font-src': "'self'",
      'connect-src': "'self' www.google-analytics.com https://xmm46nsazlkwn7lljqokb7tli40lviig.lambda-url.eu-north-1.on.aws",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {

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
  }

  return ENV;
};
