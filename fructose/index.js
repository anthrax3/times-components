import { AppRegistry } from "react-native";
import Expo, { Font } from "expo";
import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./components";

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));
Expo.registerRootComponent(Fructose(loadStories));

Font.loadAsync({
      "GillSansMTStd-Medium": require(`${__dirname}/../dist/public/fonts/GillSansMTStd-Medium.ttf`),
      "TimesDigitalW04-Regular": require(`${__dirname}/../dist/public/fonts/TimesDigitalW04-Regular.ttf`),
      "TimesDigitalW04-RegularSC": require(`${__dirname}/../dist/public/fonts/TimesDigitalW04-RegularSC.ttf`),
      "TimesDigitalW04": require(`${__dirname}/../dist/public/fonts/TimesDigitalW04.ttf`),
      "TimesDigitalW04_bold": require(`${__dirname}/../dist/public/fonts/TimesDigitalW04_bold.ttf`),
      "TimesDigitalW04_italic": require(`${__dirname}/../dist/public/fonts/TimesDigitalW04_italic.ttf`),
      "TimesModern-Bold": require(`${__dirname}/../dist/public/fonts/TimesModern-Bold.ttf`),
      "TimesModern-Regular": require(`${__dirname}/../dist/public/fonts/TimesModern-Regular.ttf`),
});

