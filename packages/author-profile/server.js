import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { AppRegistry } from "react-native";
import { getDataFromTree } from "react-apollo-temp";
import { ServerStyleSheet } from "styled-components";
import { ApolloClient } from "apollo-client";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import { MockLink } from "react-apollo-temp/lib/test-utils";
import { fragmentMatcher } from "@times-components/utils/graphql";
import { makeArticleMocks } from "@times-components/provider/fixtures/author-profile/fixture-generator";
import makeApp from "./app";

const port = 3000;
const server = express();

const mocks = makeArticleMocks({ withImages: true, pageSize: 5 });

const client = new ApolloClient({
  ssrMode: true,
  link: new MockLink(mocks),
  cache: new Cache({ addTypename: true, fragmentMatcher })
});

const App = makeApp(client);

server.get("/", (req, res) => {
  getDataFromTree(App)
    .then(() => {
      AppRegistry.registerComponent("authorProfile", () => () => App);

      const { element, getStyleElement } = AppRegistry.getApplication(
        "authorProfile"
      );
      const serverStylesheet = new ServerStyleSheet();

      const html = ReactDOMServer.renderToString(
        serverStylesheet.collectStyles(element)
      );

      const scStyles = serverStylesheet.getStyleTags();

      const rnwStyles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

      res.send(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Author Profile</title>
            ${rnwStyles}
            ${scStyles}
            <script>
            window.__APOLLO_STATE__=${JSON.stringify(client.extract()).replace(
              /</g,
              "\\\u003c"
            )};
            </script>
          </head>
          <body style="margin:0">
            <div id="app">${html}</div>
          </body>
          <script src="/client.js"></script>
        </html>
      `
      );
    })
    .catch(e => {
      console.log("e", e);
    });
});

server.use(express.static("dist"));

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
