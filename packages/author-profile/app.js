import React from "react";
import { MockedProvider } from "@times-components/utils/graphql";
import { AuthorProfileProvider } from "@times-components/provider";
import AuthorProfile from "./author-profile";

const slug = "deborah-haynes";
const pageSize = 5;

const props = {
  slug,
  page: 1,
  pageSize,
  onTwitterLinkPress: () => {},
  onArticlePress: () => {},
  analyticsStream: () => {}
};

export default client => (
  <MockedProvider client={client}>
    <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
      {({ author, isLoading, error, refetch }) => (
        <AuthorProfile
          {...props}
          author={author}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      )}
    </AuthorProfileProvider>
  </MockedProvider>
);
