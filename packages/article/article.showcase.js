/* eslint-disable react/prop-types */
/* eslint-env browser */

import React from "react";
import { addTypenameToDocument } from "apollo-utilities";

import { ArticleProvider, articleQuery } from "@times-components/provider";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import Article from "./src/article";

import fullArticleTypenameFixture from "./fixtures/full-article-typename.json";
import fullArticleFixture from "./fixtures/full-article.json";
import fullLongArticleFixture from "./fixtures/full-long-article.json";
import articleWithVideoFixture from "./fixtures/article-with-video-asset.json";
import articleFixtureBylineAuthor from "./fixtures/article-with-byline-author.json";
import articleFixtureNoStandfirst from "./fixtures/no-standfirst.json";
import articleFixtureNoLabel from "./fixtures/no-label.json";
import articleFixtureNoAds from "./fixtures/no-ads.json";
import articleFixtureNoFlags from "./fixtures/no-flags.json";
import articleFixtureNoStandfirstNoLabel from "./fixtures/no-standfirst-no-label.json";
import articleFixtureNoStandfirstNoFlags from "./fixtures/no-standfirst-no-flags.json";
import articleFixtureNoLabelNoFlags from "./fixtures/no-label-no-flags.json";
import articleFixtureNoLabelNoFlagsNoStandFirst from "./fixtures/no-label-no-flags-no-standfirst.json";
import articleFixtureNoLeadAsset from "./fixtures/no-lead-asset.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery),
      variables: {
        id: "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
      }
    },
    result: fullArticleTypenameFixture
  }
];

const defaultAdConfig = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  pageTargeting: {
    title: "Title",
    label: "Label"
  },
  slotTargeting: {
    path: "/news",
    sec_id: "null",
    section: "news",
    zone: "current_edition",
    slot: "news"
  },
  biddersConfig: {
    timeout: 3000,
    minPrice: 0.01,
    maxBid: 15,
    bucketSize: 0.25,
    bidders: {
      appnexus: {
        placementId: "5823281"
      },
      rubicon: {
        accountId: "14062",
        siteId: "70608",
        zoneId: "335918"
      },
      amazon: {
        accountId: "3360"
      },
      criteo: {
        zoneMap: {
          "120x600": "764877"
        }
      },
      pubmatic: {
        accountId: "156034",
        adSlotPrefix: "Thetimes"
      },
      indexExchange: {
        siteId: "188830"
      }
    }
  },
  bidderSlots: ["ad-header", "ad-article-inline"]
};

const renderArticle = (
  decorateAction,
  {
    fixture: { data = {} } = {},
    isLoading = false,
    analyticsStream = storybookReporter,
    adConfig = defaultAdConfig,
    error
  }
) => (
  <Article
    {...data}
    isLoading={isLoading}
    analyticsStream={analyticsStream}
    adConfig={adConfig}
    error={error}
    onRelatedArticlePress={preventDefaultedAction(decorateAction)(
      "onRelatedArticlePress"
    )}
    onAuthorPress={preventDefaultedAction(decorateAction)("onAuthorPress")}
    onVideoPress={preventDefaultedAction(decorateAction)("onVideoPress")}
    onLinkPress={preventDefaultedAction(decorateAction)("onLinkPress")}
  />
);

export default {
  name: "Pages/Article",
  children: [
    {
      type: "story",
      name: "Default",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: fullArticleFixture })
    },
    {
      type: "story",
      name: "Article with video asset",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleWithVideoFixture })
    },
    {
      type: "story",
      name: "Long Article",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: fullLongArticleFixture })
    },
    {
      type: "story",
      name: "Loading",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { isLoading: true })
    },
    {
      type: "story",
      name: "Error",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, {
          error: { message: "An example error." }
        })
    },
    {
      type: "story",
      name: "With Provider",
      component: ({ select, text }, { decorateAction }) => {
        const predefinedArticles = {
          "198c4b2f-ecec-4f34-be53-c89f83bc1b44": "Default article",
          "1a576df6-cb50-11e4-81dd-064fe933cd41":
            "Video lead asset (requires GraphQL with CI data)"
        };
        const predefinedArticle = select(
          "Predefined article",
          predefinedArticles,
          "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
        );
        const overrideArticleId = text("Override article id", "");

        return (
          <StorybookProvider mocks={mocks}>
            <ArticleProvider
              id={overrideArticleId || predefinedArticle}
              debounceTimeMs={0}
            >
              {({ article, isLoading, error }) => (
                <Article
                  article={article}
                  isLoading={isLoading}
                  error={error}
                  analyticsStream={storybookReporter}
                  adConfig={defaultAdConfig}
                  onRelatedArticlePress={preventDefaultedAction(decorateAction)(
                    "onRelatedArticlePress"
                  )}
                  onAuthorPress={preventDefaultedAction(decorateAction)(
                    "onAuthorPress"
                  )}
                  onLinkPress={preventDefaultedAction(decorateAction)(
                    "onLinkPress"
                  )}
                />
              )}
            </ArticleProvider>
          </StorybookProvider>
        );
      }
    },
    {
      type: "story",
      name: "Fixtures - Full",
      platform: "web",
      component: (_, { decorateAction }) => (
        <div>
          <a
            href={`/iframe.html${window.top.location.search}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to render the ads
          </a>
          {renderArticle(decorateAction, { fixture: fullArticleFixture })}
        </div>
      )
    },
    {
      type: "story",
      name: "Fixtures - Full",
      platform: "native",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: fullArticleFixture })
    },
    {
      type: "story",
      name: "Fixtures - Byline with author profile",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureBylineAuthor })
    },
    {
      type: "story",
      name: "Fixtures - No ads",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoAds })
    },
    {
      type: "story",
      name: "Fixtures - No standfirst",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoStandfirst })
    },
    {
      type: "story",
      name: "Fixtures - No label",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoLabel })
    },
    {
      type: "story",
      name: "Fixtures - No flags",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoFlags })
    },
    {
      type: "story",
      name: "Fixtures - No standfirst, no label",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, {
          fixture: articleFixtureNoStandfirstNoLabel
        })
    },
    {
      type: "story",
      name: "Fixtures - No standfirst, no flags",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, {
          fixture: articleFixtureNoStandfirstNoFlags
        })
    },
    {
      type: "story",
      name: "Fixtures - No label, no flags",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoLabelNoFlags })
    },
    {
      type: "story",
      name: "Fixtures - No label, no flags, no standfirst",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, {
          fixture: articleFixtureNoLabelNoFlagsNoStandFirst
        })
    },
    {
      type: "story",
      name: "Fixtures - No lead asset",
      component: (_, { decorateAction }) =>
        renderArticle(decorateAction, { fixture: articleFixtureNoLeadAsset })
    }
  ]
};
