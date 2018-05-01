import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listErrorContainer: {
    alignSelf: "center",
    flexBasis: "50%",
    maxWidth: 548
  },
  listErrorButtonContainer: {
    alignSelf: "center",
    maxWidth: 300,
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
    width: 200
  }
});

export default styles;
