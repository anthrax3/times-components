import React from "react";
import { View } from "react-native";
import styles from "../styles";
import config from "./config";
import propTypes from "./proptypes";

const StandardSlice = ({ itemCount, renderItems }) => (
  <View style={styles.container}>
    {renderItems(config({ itemCount })).map(item => (
      <View key={item.props.id} style={styles.itemContainer}>
        <View style={styles.item}>{item}</View>
      </View>
    ))}
  </View>
);

StandardSlice.propTypes = propTypes;

export default StandardSlice;
