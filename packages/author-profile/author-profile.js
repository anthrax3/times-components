import React from "react";
import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import { withPageState } from "@times-components/pagination";
import { AuthorArticlesWithImagesProvider } from "@times-components/provider";
import { withTrackingContext } from "@times-components/tracking";
import get from "lodash.get";
import AuthorArticlesNoImagesProvider from "./author-profile-list-provider";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileContent from "./author-profile-content";

const ratioTextToFloat = s => {
  if (!s || !s.length) {
    return 1;
  }

  const [w, h] = s.split(":");
  const ratio = parseFloat(w) / parseFloat(h);

  return !Number.isNaN(ratio) ? ratio : 1;
};

const AuthorProfile = ({
  author,
  error,
  isLoading,
  onArticlePress,
  onTwitterLinkPress,
  page,
  onNext,
  onPrev,
  pageSize: initPageSize,
  slug
}) => {
  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (isLoading) {
    return (
      <AuthorProfileContent
        isLoading={isLoading}
        pageSize={initPageSize}
        imageRatio={ratioTextToFloat("3:2")}
        articlesLoading
        onTwitterLinkPress={() => {}}
      />
    );
  }

  const {
    biography,
    name,
    image: uri,
    jobTitle,
    twitter,
    hasLeadAssets,
    articles
  } =
    author || {};

  const SelectedProvider = hasLeadAssets
    ? AuthorArticlesWithImagesProvider
    : AuthorArticlesNoImagesProvider;

  return (
    <SelectedProvider
      articleImageRatio="3:2"
      slug={slug}
      page={page}
      pageSize={initPageSize}
    >
      {({
        author: data,
        pageSize,
        isLoading: articlesLoading,
        variables: { imageRatio = "3:2" }
      }) => {
        const articlesWithPublishTime = get(data, "articles.list", []).map(
          article => ({
            ...article,
            author,
            page,
            pageSize,
            publishedTime: new Date(article.publishedTime)
          })
        );

        return (
          <AuthorProfileContent
            isLoading={isLoading}
            name={name}
            biography={biography}
            uri={uri}
            jobTitle={jobTitle}
            twitter={twitter}
            onTwitterLinkPress={onTwitterLinkPress}
            count={get(articles, "count", 0)}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            pageSize={pageSize}
            imageRatio={ratioTextToFloat(imageRatio)}
            showImages={hasLeadAssets}
            articlesLoading={articlesLoading}
            articles={articlesWithPublishTime}
            onArticlePress={onArticlePress}
          />
        );
      }}
    </SelectedProvider>
  );
};

AuthorProfile.defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  onArticlePress: () => {},
  onTwitterLinkPress: () => {},
  page: 1,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 10
};

AuthorProfile.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
  author: PropTypes.shape({
    name: PropTypes.string,
    jobTitle: PropTypes.string,
    biography: AuthorHead.propTypes.bio,
    image: PropTypes.string,
    twitter: PropTypes.string
  }),
  page: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  pageSize: PropTypes.number,
  onTwitterLinkPress: PropTypes.func,
  onArticlePress: PropTypes.func,
  slug: PropTypes.string.isRequired
};

const AuthorProfileWithTracking = withTrackingContext(AuthorProfile, {
  getAttrs: ({ author, page, pageSize } = {}) => ({
    authorName: author && author.name,
    page,
    pageSize,
    articlesCount: get(author, "articles.count", 0)
  }),
  trackingObject: "AuthorProfile"
});

export default withPageState(AuthorProfileWithTracking);
