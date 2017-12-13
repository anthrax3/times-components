import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";

import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
} from "./styles/body/responsive";

const getImageContainer = imageType => {
  switch (imageType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    default:
      return PrimaryImg;
  }
};

const ArticleRow = props => {
  const { data } = props.content;
  return renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={key} uid={key}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, attributes) {
      const ImageContainer = getImageContainer(attributes.display);
      return (
        <ImageContainer key={key}>
          <ArticleImage
            imageOptions={{
              display: attributes.display,
              ratio: attributes.ratio,
              url: attributes.url
            }}
            captionOptions={{
              caption: attributes.caption,
              credits: attributes.credits
            }}
          />
        </ImageContainer>
      );
    },
    pullquote(key, attributes) {
      return (
        <PullQuoteContainer>
          <PullQuoteResp>
            <PullQuote
              key={key}
              content={attributes.content}
              caption={attributes.caption.name}
            />
          </PullQuoteResp>
        </PullQuoteContainer>
      );
    }
  });
};

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
