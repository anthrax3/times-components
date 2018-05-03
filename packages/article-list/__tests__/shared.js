import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleList from "../article-list";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ArticleList />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
