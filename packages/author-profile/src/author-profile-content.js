import React from "react";
import { FlatList, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import ErrorView from "@times-components/error-view";
import { withTrackScrollDepth } from "@times-components/tracking";
import AuthorProfilePagination from "./author-profile-pagination";
import AuthorProfileListItem from "./author-profile-list-item";
import AuthorProfileListItemSeparator from "./author-profile-list-item-separator";
import { propTypes, defaultProps } from "./author-profile-content-prop-types";
import AuthorProfileListError from "./author-profile-list-error";
import styles from "./styles";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class AuthorProfileContent extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
  }

  componentWillUnmount() {
    global.cancelAnimationFrame(this.scrollAnimationFrame);
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(
        viewableItem =>
          this.props.onViewed &&
          this.props.onViewed(viewableItem.item, this.props.articles)
      );
  }

  render() {
    const {
      count,
      isLoading,
      articles,
      articlesLoading,
      biography,
      jobTitle,
      name,
      onArticlePress,
      onNext,
      onPrev,
      onTwitterLinkPress,
      page,
      pageSize,
      twitter,
      uri,
      imageRatio,
      showImages,
      error,
      refetch
    } = this.props;

    const AuthorProfileHead = (
      <AuthorHead
        isLoading={isLoading}
        name={name}
        bio={biography}
        uri={uri}
        title={jobTitle}
        twitter={twitter}
        onTwitterLinkPress={onTwitterLinkPress}
      />
    );

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {AuthorProfileHead}
          <AuthorProfileListError refetch={refetch} />
        </View>
      );
    }

    const scrollToTopNextFrame = () => {
      this.scrollAnimationFrame = global.requestAnimationFrame(() => {
        this.listRef.scrollToOffset({
          offset: 0,
          animated: true
        });
      });
    };

    const paginationComponent = (
      { hideResults = false, autoScroll = false } = {}
    ) => (
      <AuthorProfilePagination
        count={count}
        hideResults={hideResults}
        onNext={(...args) => {
          onNext(...args);
          if (autoScroll) scrollToTopNextFrame();
        }}
        onPrev={(...args) => {
          onPrev(...args);
          if (autoScroll) scrollToTopNextFrame();
        }}
        page={page}
        pageSize={pageSize}
      />
    );

    const data = articlesLoading
      ? Array(pageSize)
          .fill()
          .map((number, indx) => ({
            id: indx,
            elementId: `empty.${indx}`,
            isLoading: true
          }))
      : articles.map((article, indx) => ({
          ...article,
          elementId: `${article.id}.${indx}`
        }));

    if (!articlesLoading) this.props.receiveChildList(data);

    return (
      <FlatList
        ref={list => {
          this.listRef = list;
        }}
        testID="scroll-view"
        accessibilityID="scroll-view"
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <ErrorView>
            {({ hasError }) =>
              hasError ? null : (
                <AuthorProfileListItem
                  {...item}
                  imageRatio={imageRatio}
                  showImage={showImages}
                  testID={`articleList-${index}`}
                  onPress={e =>
                    onArticlePress(e, { id: item.id, url: item.url })
                  }
                />
              )
            }
          </ErrorView>
        )}
        initialListSize={pageSize}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollRenderAheadDistance={2}
        pageSize={pageSize}
        ListHeaderComponent={
          <View>
            {AuthorProfileHead}
            {paginationComponent({ hideResults: false, autoScroll: false })}
          </View>
        }
        ListFooterComponent={paginationComponent({
          hideResults: true,
          autoScroll: true
        })}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparatorContainer}>
            <AuthorProfileListItemSeparator />
          </View>
        )}
      />
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
AuthorProfileContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileContent);
