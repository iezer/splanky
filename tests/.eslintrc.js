module.exports = {
  extends: 'plugin:qunit/recommended',
  plugins: [
    'qunit'
  ],
  globals: {
    $: true,
    andThen: true,
    click: true,
    currentPath: true,
    currentRouteName: true,
    currentURL: true,
    fillIn: true,
    find: true,
    findWithAssert: true,
    keyEvent: true,
    scrollTop: true,
    chooseFile: true,
    triggerEvent: true,
    visit: true,
    wait: true
  }
};
