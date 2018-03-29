import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import BrightcoveVideo from "@times-components/brightcove-video";
import Caption from "@times-components/caption";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";

const ArticleRow = ({ content: { data, index } }) =>
  renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={index} uid={index}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, { display, ratio, url, caption, credits }) {
      return (
        <View key={key}>
          <ArticleImage
            imageOptions={{
              display,
              ratio,
              url
            }}
            captionOptions={{
              caption,
              credits
            }}
          />
        </View>
      );
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <View key={key}>
          <PullQuote
            key={key}
            content={content}
            caption={name}
            twitter={twitter}
          />
        </View>
      );
    },
    link(key, attributes, children) {
      return (
        <ArticleLink
          key={index}
          uuid={index}
          onPress={() => {}}
          url={attributes.href}
        >
          {children}
        </ArticleLink>
      );
    },
    video(
      key,
      {
        brightcovePolicyKey,
        brightcoveVideoId,
        brightcoveAccountId,
        posterImage,
        caption
      }
    ) {
      return (
        <Fragment>
          <View key={key}>
            <BrightcoveVideo
              width="100%"
              height="100%"
              policyKey={brightcovePolicyKey}
              videoId={brightcoveVideoId}
              accountId={brightcoveAccountId}
              poster={{ uri: posterImage.crop.url }}
            />
          </View>
          <Caption text={caption} />
        </Fragment>
      );
    }
  });

ArticleRow.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    }),
    index: PropTypes.number
  }).isRequired
};

export default ArticleRow;
