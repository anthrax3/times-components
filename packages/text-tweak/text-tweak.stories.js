import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import TextTweak from "./text-tweak";

storiesOf("TextTweak", module).add("TextTweak", () => (
  <TextTweak>Beedy Beedy Beedy</TextTweak>
));
