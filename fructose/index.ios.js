import { AppRegistry } from "react-native";
import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
//import loadStories  from "./components";

const death = () => {
    const test = { 
        lol: "test",
        plz: () => 1+2
    }
    return test;
}

AppRegistry.registerComponent("storybooknative", () => Fructose(death));
