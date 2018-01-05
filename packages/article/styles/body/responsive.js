import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import config from "../responsive-config";

/* --- Body --- */

export const ParagraphContainer = withResponsiveStyles("div", {
  base: () => config.articleContainerPadding,
  mediumUp: () => config.mediumBpPositioningRS,
  wideUp: () => `width: ${config.wideBpWidth};`
});

export const Paragraph = withResponsiveStyles("p", {
  base: () => `
    color: "#333333";
    font-family: "TimesDigitalW04-Regular";
    line-height: 26px;
    font-size: 17px;
    margin-bottom: 25px;
    margin-top: 0;
  `,
  mediumUp: () => `
    font-size: 18px;
    line-height: 30px;
  `
});

/* --- Lead Asset Styles --- */

export const LeadAsset = withResponsiveStyles(View, {
  base: () => "margin-bottom: 10px;",
  mediumUp: () => "margin-bottom: 20px",
  wideUp: () => "width: 100%; margin: 0 auto;"
});

export const LeadAssetMobile = config.showHideToggleRS(View, true);

export const LeadAssetDesktop = config.showHideToggleRS(
  View,
  false,
  `
  width: ${config.wideBpWidth};
  margin: 0 auto;
  // Temp padding for feature flag release
  padding-bottom: 20px;
`
);

export const MediaContainerMobile = config.showHideToggleRS(View, true);

export const MediaContainerDesktop = config.showHideToggleRS(View);

/* --- Article Images --- */

export const PrimaryImg = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    flex-direction: column;
    padding-bottom: 25px;
  `,
  mediumUp: () => `
    width: ${config.mediumBpWidth};
    margin: 0 auto;
  `,
  wideUp: () => `width: ${config.wideBpWidth};`
});

export const SecondaryImg = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => config.mediumBpPositioningRS,
  wideUp: () => `width: ${config.wideBpWidth};`
});

export const InlineImg = withResponsiveStyles(View, {
  base: () => `
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => config.mediumBpPositioningRS,
  wideUp: () => `width: ${config.wideBpWidth};`
});

/* --- Pull Quotes --- */

export const PullQuoteResp = withResponsiveStyles(View, {
  base: () => `
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
  `,
  mediumUp: () => `
    width: 60%;
    float: left;
    margin-right: 20px;
    margin-bottom 0px;
    margin-top: 5px;
    padding-left: 0px;
    padding-right: 0px;
  `
});

export const PullQuoteContainer = withResponsiveStyles(View, {
  base: () => `display: block;`,
  mediumUp: () => config.mediumBpPositioningRS,
  wideUp: () => `width: ${config.wideBpWidth};`
});
