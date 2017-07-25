import { getMaxSizes } from "../generate-config";

describe("Generate Config test", () => {
  it("getMaxSizes has default values if no size is sent", () => {
    const result = getMaxSizes(null);
    expect(result).toEqual({ width: 0, height: 0 });
  });

  it("getMaxSizes returns the maximum height and width from an array of arrays of sizes", () => {
    const sizes = [[300, 250], [320, 50], [320, 48]];
    const result = getMaxSizes(sizes);
    expect(result).toEqual({ width: 320, height: 250 });
  });
});
