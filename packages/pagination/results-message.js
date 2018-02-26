import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { fonts } from "@times-components/styleguide";

const styles = StyleSheet.create({
  message: {
    color: "#696969",
    fontFamily: fonts.supporting,
    fontSize: 15,
    paddingTop: 4
  }
});

const ResultsMessage = ({ children: message }) => (
  <Text style={[styles.message]}>{message}</Text>
);

ResultsMessage.propTypes = {
  children: PropTypes.string.isRequired
};

export default ResultsMessage;
