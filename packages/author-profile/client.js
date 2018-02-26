import makeApp from "./app";
import { AppRegistry } from "react-native";
import { MockLink } from "react-apollo-temp/lib/test-utils";
import { fragmentMatcher } from "@times-components/utils/graphql";
import { ApolloClient } from "apollo-client";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import { makeArticleMocks } from "@times-components/provider/fixtures/author-profile/fixture-generator";

const mocks = makeArticleMocks({ withImages: true, pageSize: 5 });

const client = new ApolloClient({
  cache: new Cache({ addTypename: true, fragmentMatcher }).restore(
    window.__APOLLO_STATE__
  ),
  link: new MockLink(mocks)
});

const App = makeApp(client);

AppRegistry.registerComponent("authorProfile", () => () => App);

console.log("running client app");

AppRegistry.runApplication("authorProfile", {
  initialProps: {},
  rootTag: document.getElementById("app")
});
