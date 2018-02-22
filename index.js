import { AppRegistry } from "react-native";
import Expo from 'expo';

import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./fructose/components";



AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));
Expo.registerRootComponent(Fructose(loadStories));