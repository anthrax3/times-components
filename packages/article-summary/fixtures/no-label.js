import React from "react";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import { ArticleSummaryHeadline, renderer, summarise } from "../";

export default {
  DatePublication: () => (
    <DatePublication date="2017-11-17T00:01:00.000Z" publication="TIMES" />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="Top medal for forces dog who took a bite out of the Taliban" />
  ),
  Byline: () => (
    <ArticleByline
      ast={[
        {
          name: "author",
          attributes: {
            slug: "camilla-long"
          },
          children: [
            {
              name: "text",
              attributes: {
                value: "Camilla Long"
              },
              children: []
            }
          ]
        },
        {
          name: "inline",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: ", Environment Editor"
              },
              children: []
            }
          ]
        }
      ]}
    />
  ),
  textAst: () =>
    renderTrees(
      summarise([
        {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value:
                  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear."
              },
              children: []
            }
          ]
        }
      ]),
      renderer
    )
};
