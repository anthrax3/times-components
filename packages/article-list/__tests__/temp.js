// /* eslint-env browser */
// import React from "react";
// import { shallow, mount } from "enzyme";
// import authorProfileFixture from "@times-components/provider-test-tools/fixtures/author-profile/author-profile.json";
// import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
// import test from "../helper";
// import ArticleList from "../../src/article-list.web.js";
// import ArticleListItem from "../../src/article-list-item";
// import pagedResult from "../paged-result";

// const delay = ms => new Promise(res => setTimeout(res, ms));

// describe("ArticleList tests on web", () => {
//   beforeAll(() => jest.useRealTimers());
//   afterAll(() => jest.useFakeTimers());

//   test(ArticleList);

//   const makeAuthor = ({ withImages } = {}) => ({
//     ...authorProfileFixture.data.author,
//     hasLeadAssets: withImages,
//     showImages: withImages
//   });

//   const articleListContentProps = {
//     ...makeAuthor({ withImages: true }),
//     articles: articleListWithImagesFixture.data.author.articles.list,
//     count: articleListWithImagesFixture.data.author.articles.list.length,
//     page: 1,
//     pageSize: 3,
//     imageRatio: 3 / 2,
//     onTwitterLinkPress: () => {},
//     onArticlePress: () => {},
//     refetch: () => {}
//   };

//   const intersectionObserverInstances = [];
//   class FakeIntersectionObserver {
//     constructor(cb) {
//       this.instanceId = intersectionObserverInstances.length;
//       intersectionObserverInstances.push({ nodes: new Set(), cb });
//     }

//     observe(node) {
//       Object.defineProperty(node, "clientWidth", {
//         value: 600
//       });
//       intersectionObserverInstances[this.instanceId].nodes.add(node);
//     }

//     static dispatchEntriesForInstance(instanceId, makeEntries) {
//       const instance = intersectionObserverInstances[instanceId];

//       instance.cb(makeEntries(instance.nodes));
//     }

//     disconnect() {
//       return this;
//     }
//   }

//   afterEach(() => {
//     delete window.IntersectionObserver;
//     intersectionObserverInstances.splice(0);
//   });

//   // it("renders profile error", () => {
//   //   const props = {
//   //     slug: "deborah-haynes",
//   //     analyticsStream: () => {},
//   //     error: new Error("broken")
//   //   };

//   //   // react test renderer would be preferred here but there is a bug
//   //   // in RNW that throws an exception when rendering Button
//   //   const wrapper = mount(<AuthorProfile {...props} />);

//   //   expect(wrapper.find("AuthorProfileListPageError")).toMatchSnapshot();
//   // });

//   it("renders page error", () => {
//     const wrapper = mount(
//       <ArticleList
//         articles={[]}
//         author={makeAuthor()}
//         count={0}
//         error={new Error("Failed")}
//         imageRatio={3 / 2}
//         page={1}
//         pageSize={3}
//         onArticlePress={() => {}}
//         onTwitterLinkPress={() => {}}
//         onViewed={() => {}}
//         refetch={() => {}}
//         slug="deborah-haynes"
//       />
//     );

//     expect(wrapper.find("ArticleListError")).toMatchSnapshot();
//   });

//   it("renders profile articles and invoke callback on article press", done => {
//     const component = shallow(
//       <ArticleList {...articleListContentProps} onArticlePress={done} />
//     );

//     component
//       .dive()
//       .find("ErrorView")
//       .at(0)
//       .dive()
//       .find(ArticleListItem)
//       .at(0)
//       .dive()
//       .dive()
//       .find("Link")
//       .simulate("press");
//   });

//   it("renders with an intersection observer which uses the expected options", () => {
//     // IntersectionObserver is used twice by AuthorProfileContent, once for image
//     // resizing and once for scroll tracking. We capture the opts passed so that
//     // we can assert on them later.
//     const optsSpy = jest.fn();
//     window.IntersectionObserver = class {
//       constructor(cb, opts) {
//         optsSpy(opts);
//       }
//       observe() {} // eslint-disable-line class-methods-use-this
//     };

//     mount(<ArticleList {...articleListContentProps} />);

//     expect(optsSpy.mock.calls[1][0]).toMatchSnapshot();
//   });

//   it("renders a good quality image if it is visible", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const component = mount(<ArticleList {...articleListContentProps} />);

//     // prove the first image starts off as low quality
//     expect(
//       component
//         .find("TimesImage")
//         .at(0)
//         .props().uri
//     ).toEqual(
//       "//www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1b5afe88-cb0d-11e7-9ee9-e45ae7e1cdd4.jpg?crop=4252%2C2835%2C0%2C0&resize=100"
//     );

//     const makeEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.75 : 0
//       }));

//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

//     await delay(100);

//     expect(
//       component
//         .find("TimesImage")
//         .at(0)
//         .render()
//     ).toMatchSnapshot();
//   });

//   it("renders a poor quality image if it is not visible", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const component = mount(<ArticleList {...articleListContentProps} />);

//     const makeEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.75 : 0
//       }));

//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

//     await delay(100);

//     expect(
//       component
//         .find("TimesImage")
//         .at(1)
//         .render()
//     ).toMatchSnapshot();
//   });

//   it("renders good quality images if there is no IntersectionObserver", () => {
//     const component = mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           2
//         )}
//       />
//     );

//     // not ideal as this relies on the actual implementation but there's no "nice" way of setting clientWidth
//     const authorProfileInstance = component.find("ArticleList").instance();
//     const rn = authorProfileInstance.registerNode;
//     authorProfileInstance.registerNode = node => {
//       if (node) {
//         Object.defineProperty(node, "clientWidth", {
//           value: 600
//         });
//       }

//       rn.call(authorProfileInstance, node);
//     };

//     // we have to force the render lifecycle that the lazy images rely on, in that first the nodes are registered
//     // and then when we render again after loading, we show the sized images
//     component.setProps({
//       isLoading: true
//     });

//     component.setProps({
//       isLoading: false
//     });

//     expect(component.find("TimesImage")).toMatchSnapshot();
//   });

//   it("does not render good quality images if the item is quickly scrolled passed", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const component = mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           5
//         )}
//       />
//     );

//     const makeEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.75 : 0
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

//     await delay(20);

//     const makeNewEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.25 : 0.75
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

//     await delay(100);

//     expect(component.render().find("img")).toMatchSnapshot();
//   });

//   it("does no work if there are no pending items", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const spy = jest.spyOn(ArticleList.prototype, "setState");

//     mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           5
//         )}
//       />
//     );

//     // View all items
//     const makeEntries = nodes =>
//       [...nodes].map(node => ({
//         target: node,
//         intersectionRatio: 0.75
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

//     await delay(20);

//     // Scroll passed all items before setting state
//     const makeNewEntries = nodes =>
//       [...nodes].map(node => ({
//         target: node,
//         intersectionRatio: 0
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

//     await delay(100);

//     // No work was done
//     expect(spy).not.toHaveBeenCalled();

//     spy.mockRestore();
//   });

//   it("does not set state after unmounting", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const setStateSpy = jest.spyOn(ArticleList.prototype, "setState");

//     const component = mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           5
//         )}
//       />
//     );

//     const makeEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.75 : 0
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

//     await delay(20);

//     const makeNewEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         intersectionRatio: indx === 0 ? 0.25 : 0.75
//       }));
//     window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

//     await delay(0);

//     component.unmount();

//     await delay(100);

//     expect(setStateSpy.mock.calls.length).toBe(0);

//     setStateSpy.mockRestore();
//   });

//   it("disconnects from the IntersectionObserver when unmounting", async () => {
//     window.IntersectionObserver = FakeIntersectionObserver;

//     const disconnectSpy = jest.spyOn(
//       window.IntersectionObserver.prototype,
//       "disconnect"
//     );

//     const component = mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           5
//         )}
//       />
//     );

//     component.unmount();

//     expect(disconnectSpy).toHaveBeenCalled();

//     disconnectSpy.mockRestore();
//   });

//   it("does not throw when unmounting with no IntersectionObserver", async () => {
//     delete window.IntersectionObserver;

//     const component = mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={articleListWithImagesFixture.data.author.articles.list.slice(
//           0,
//           5
//         )}
//       />
//     );

//     expect(component.unmount.bind(component)).not.toThrow();
//   });

//   it("emits scroll tracking events for author profile content", () => {
//     window.IntersectionObserver = FakeIntersectionObserver;
//     const reporter = jest.fn();
//     const pageResults = pagedResult(0, 3);

//     const mountPoint = document.createElement("div");
//     document.body.appendChild(mountPoint);

//     mount(
//       <ArticleList
//         {...articleListContentProps}
//         articles={pageResults.data.author.articles.list}
//       />,
//       {
//         context: {
//           tracking: {
//             analytics: reporter
//           }
//         },
//         attachTo: mountPoint
//       }
//     );

//     const makeEntries = nodes =>
//       [...nodes].map((node, indx) => ({
//         target: node,
//         isIntersecting: indx === 0
//       }));

//     window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

//     expect(reporter).toHaveBeenCalledWith(
//       expect.objectContaining({
//         attrs: expect.objectContaining({
//           scrollDepth: {
//             itemNumber: 1,
//             total: 3
//           }
//         })
//       })
//     );
//   });

//   it("scrolls to the top when moving to the previous page on bottom pagination click", () => {
//     const onScroll = jest.spyOn(window, "scroll");
//     const onPrev = jest.fn();
//     const component = mount(
//       <ArticleList {...articleListContentProps} page={2} onPrev={onPrev} />
//     );

//     component
//       .find({ href: "?page=1" })
//       .last()
//       .simulate("click");

//     expect(onScroll).toHaveBeenCalledWith({ left: 0, top: 0 });
//   });

//   it("scrolls to the top when moving to the next page on bottom pagination click", () => {
//     const onScroll = jest.spyOn(window, "scroll");
//     const onNext = jest.fn();
//     const component = mount(
//       <ArticleList {...articleListContentProps} page={2} onNext={onNext} />
//     );

//     component
//       .find({ href: "?page=3" })
//       .last()
//       .simulate("click");

//     expect(onScroll).toHaveBeenCalledWith({ left: 0, top: 0 });
//   });

//   it("doesnt scroll to the top when moving to the previous page on top pagination click", () => {
//     const onScroll = jest.spyOn(window, "scroll");
//     const onPrev = jest.fn();
//     const component = mount(
//       <ArticleList {...articleListContentProps} page={2} onPrev={onPrev} />
//     );

//     component
//       .find({ href: "?page=1" })
//       .first()
//       .simulate("click");

//     expect(onScroll).not.toHaveBeenCalledWith({ left: 0, top: 0 });
//   });

//   it("doesnt scroll to the top when moving to the next page on top pagination click", () => {
//     const onScroll = jest.spyOn(window, "scroll");
//     const onNext = jest.fn();
//     const component = mount(
//       <ArticleList {...articleListContentProps} page={2} onNext={onNext} />
//     );

//     component
//       .find({ href: "?page=3" })
//       .first()
//       .simulate("click");

//     expect(onScroll).not.toHaveBeenCalledWith({ left: 0, top: 0 });
//   });
// });
