import BrightcoveVideo from "../src/brightcove-video";
import brightcoveSharedTests from "./brightcove-video.shared";

describe("Brightcove native", () => {
  brightcoveSharedTests(BrightcoveVideo);
});
