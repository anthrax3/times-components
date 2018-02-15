import brightcoverPlayerAndroid from "../brightcove-player.android";
import brightcoverPlayerNative from "../brightcove-player.native";
import brightcoveVideo from "../brightcove-video";

describe("Brightcove tests on android", () => {
  brightcoverPlayerAndroid();
  brightcoverPlayerNative();
  brightcoveVideo();
});
