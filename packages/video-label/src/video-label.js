import React from "react";
import { View, Text } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";
import beautifyTitle from "./beautify-title";

const VideoLabel = ({ title, color }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>
      {beautifyTitle(title || "VIDEO")}
    </Text>
  </View>
);

VideoLabel.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  title: "",
  color: "black"
};

export default VideoLabel;
