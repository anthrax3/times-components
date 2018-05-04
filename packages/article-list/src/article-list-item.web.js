import React, { Fragment } from "react";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import articleListItemTrackingEvents from "./article-list-item-tracking-events";
import { propTypes, defaultProps } from "./article-list-item-prop-types";
import getImageUri from "./utils";
import {
  ListItemWrapper,
  ListItemLongText,
  ListItemShortText
} from "./styles/responsive";

const ArticleListItem = props => {
  const {
    headline,
    imageRatio,
    imageSize,
    isLoading,
    label,
    longSummary,
    onPress,
    publicationName,
    publishedTime,
    shortSummary,
    showImage,
    summary,
    url
  } = props;

  const imageUri = getImageUri(props);

  if (isLoading) {
    return (
      <ListItemWrapper>
        <Card
          contentContainerClass="articleListContent"
          imageContainerClass="articleListImage"
          imageRatio={imageRatio}
          isLoading={isLoading}
          showImage={showImage}
        />
      </ListItemWrapper>
    );
  }

  const childProps = {
    datePublicationProps: {
      date: publishedTime,
      publication: publicationName
    },
    headline: () => <ArticleSummaryHeadline headline={headline} />,
    labelProps: {
      title: label,
      color: colours.functional.primary
    }
  };

  const children = showImage ? (
    <ArticleSummary
      {...childProps}
      content={() => <ArticleSummaryContent ast={summary} />}
    />
  ) : (
    <Fragment>
      <ListItemLongText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={longSummary} />}
        />
      </ListItemLongText>
      <ListItemShortText>
        <ArticleSummary
          {...childProps}
          content={() => <ArticleSummaryContent ast={shortSummary} />}
        />
      </ListItemShortText>
    </Fragment>
  );

  return (
    <Link url={url} onPress={onPress}>
      <ListItemWrapper>
        <Card
          contentContainerClass="articleListContent"
          image={imageUri ? { uri: imageUri } : null}
          imageContainerClass="articleListImage"
          imageRatio={imageRatio}
          imageSize={imageSize}
          isLoading={isLoading}
          showImage={showImage}
        >
          {children}
        </Card>
      </ListItemWrapper>
    </Link>
  );
};

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
