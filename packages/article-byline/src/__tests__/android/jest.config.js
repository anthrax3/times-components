const jestConfigurator = require("@times-components/jest-configurator").default;
console.log(jestConfigurator("android",__dirname));
module.exports = jestConfigurator("android", __dirname);
