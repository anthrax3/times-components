const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, ['brightcove-player.native.js']);
