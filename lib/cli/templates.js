const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default function {{{component}}}() {
  return (
    <Text style={styles.{{{component}}}Body}>{{{component}}}</Text>
  );
}
`);

const showcaseFile = handlebars.compile(`import "react-native";
import React from "react";
import {{{component}}} from "./src/{{{packageName}}}";

export default {
  name: "{{{component}}}",
  children: [
    {
      type: "story",
      name: "{{{component}}}",
      component: () => <{{{component}}} />
    }
  ]
};
`);

const storyFile = handlebars.compile(`import { showcaseConverter } from "@times-components/storybook";
import showcase from "./{{{packageName}}}.showcase";

showcaseConverter(module, showcase);
`);

const testFile = handlebars.compile(`import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {{{component}}} from "../{{{packageName}}}";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<{{{component}}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
`);

const testEsLintConfigFile = handlebars.compile(`{
  "env": {
    "jest": true
  }
}
`);

const testFileNative = platform =>
  handlebars.compile(`import shared from "../shared";

describe("{{{component}}} tests on ${platform}: ", () => {
  shared();
});
`);

const testFileWeb = handlebars.compile(`import shared from "../shared";

describe("{{{component}}} tests on web: ", () => {
  shared();
});
`);

const jestConfigFile = platform =>
  handlebars.compile(`const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("${platform}", __dirname);
`);

const styleShared = handlebars.compile(`const sharedStyle = {
  {{{component}}}Body: {
    padding: 20
  }
};

export default sharedStyle;
`);

const styleIndex = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "red"
  }
});

export default webStyles;
`);

const styleIos = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "blue"
  }
});

export default webStyles;
`);

const styleAndroid = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "green"
  }
});

export default webStyles;
`);

const packageJsonFile = variables =>
  `${JSON.stringify(packageJson(variables), null, 2)}\n`;

module.exports = variables => [
  [indexFile, `src/${variables.packageName}.js`],
  [testFile, `__tests__/shared.js`],
  [testEsLintConfigFile, `__tests__/.eslintrc.json`],
  [jestConfigFile("android"), `__tests__/android/jest.config.js`],
  [jestConfigFile("ios"), `__tests__/ios/jest.config.js`],
  [jestConfigFile("web"), `__tests__/web/jest.config.js`],
  [
    testFileNative("android"),
    `__tests__/android/${variables.packageName}.test.js`
  ],
  [testFileNative("ios"), `__tests__/ios/${variables.packageName}.test.js`],
  [testFileWeb, `__tests__/web/${variables.packageName}.test.js`],
  [styleShared, `src/styles/shared.js`],
  [styleIndex, `src/styles/index.js`],
  [styleIos, `src/styles/index.ios.js`],
  [styleAndroid, `src/styles/index.android.js`],
  [showcaseFile, `${variables.packageName}.showcase.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [packageJsonFile, "package.json"]
];
