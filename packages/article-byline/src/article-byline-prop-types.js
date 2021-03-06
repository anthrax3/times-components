import PropTypes from "prop-types";
import { Text } from "react-native";
import { treePropType } from "@times-components/markup";

export const articleBylinePropTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  onAuthorPress: PropTypes.func,
  style: PropTypes.shape({
    link: Text.propTypes.style
  })
};

export const articleBylineDefaultPropTypes = {
  ast: {},
  onAuthorPress: () => null,
  style: {}
};
