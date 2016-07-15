var path = require('path');

module.exports = {
  extends: [
    require.resolve('ember-cli-eslint/coding-standard/ember-application.js')
  ],
  plugins: [
    'ember-rules'
  ],
  rules: {
    // Ember Rules
    "ember-rules/destructure-namespaces": [2, ["Ember", "DS"]],
    "ember-rules/no-function-prototype-extension-calls": 2

  }
};
