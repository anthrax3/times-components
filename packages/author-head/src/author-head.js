import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import { TextLink } from "@times-components/link";
import { treePropType } from "@times-components/markup";
import { IconTwitter } from "@times-components/icons";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import { withTrackEvents } from "@times-components/tracking";
import AuthorTitle from "./author-title";
import Bio from "./author-bio";
import AuthorName from "./author-name";
import AuthorPhoto from "./author-photo";
import AuthorHeadContainer from "./author-head-container";
import AuthorHeadLoading from "./author-head-loading";

const styles = StyleSheet.create({
  twitter: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    ...Platform.select({
      android: {
        alignItems: "center"
      }
    })
  },
  twitterLink: {
    fontSize: fontSizes.tertiary,
    fontFamily: fonts.supporting,
    color: colours.functional.action,
    textDecorationLine: "none",
    paddingLeft: spacing(1)
  }
});

class AuthorHead extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isLoading !== nextProps.isLoading;
  }

  render() {
    const {
      bio,
      isLoading,
      name,
      onTwitterLinkPress,
      title,
      twitter,
      uri
    } = this.props;

    if (isLoading) return <AuthorHeadLoading />;

    return (
      <AuthorHeadContainer>
        <AuthorPhoto uri={uri} />
        <AuthorName name={name} />
        <AuthorTitle title={title} />
        <TwitterLink handle={twitter} onPress={onTwitterLinkPress} />
        <Bio bio={bio} />
      </AuthorHeadContainer>
    );
  }
}

AuthorHead.defaultProps = {
  isLoading: false,
  name: "",
  title: "",
  uri: "",
  bio: [],
  twitter: null
};

AuthorHead.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
  bio: PropTypes.arrayOf(treePropType),
  twitter: PropTypes.string,
  onTwitterLinkPress: PropTypes.func.isRequired
};

const TwitterLink = ({ handle, onPress }) => {
  if (!handle) {
    return null;
  }
  const url = `https://twitter.com/${handle}`;

  return (
    <View style={styles.twitter}>
      <IconTwitter width={15} height={15} />
      <TextLink
        style={styles.twitterLink}
        url={url}
        onPress={e => onPress(e, { handle, url })}
      >
        @{handle}
      </TextLink>
    </View>
  );
};

TwitterLink.propTypes = {
  handle: AuthorHead.propTypes.twitter,
  onPress: PropTypes.func.isRequired
};

TwitterLink.defaultProps = {
  handle: AuthorHead.defaultProps.twitter
};

export default withTrackEvents(AuthorHead, {
  analyticsEvents: [
    {
      eventName: "onTwitterLinkPress",
      actionName: "Pressed",
      trackingName: "TwitterLink",
      getAttrs: (props, eventArgs) => ({
        twitterHandle: props.twitter,
        url: eventArgs[1] && eventArgs[1].url
      })
    }
  ]
});
