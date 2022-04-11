import { screen, render, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvents from "@testing-library/user-event";

import { Post } from "../../components/Post/Post";

import { mockMeQuery } from "../mocks/queries";
import { mockVotePostMutation } from "../mocks/mutations";

import { SnackbarProvider } from "../../context/snackbarProvider";
import { SnackBar } from "../../components/SnackBar";

import { ApolloCache, InMemoryCache } from "@apollo/client";
import { PostDocument, PostQuery } from "../../generated/graphql";

import { PostVoteFragment } from "../../utils/cache/updatePostVote";
import { Mock } from "../mocks/faker";
import { ReactNode } from "react";

describe("post vote", () => {
  let cache = new InMemoryCache({ addTypename: false });

  afterEach(() => {
    cache.reset();
  });

  it("changes cache on upvote", async () => {
    const post = Mock.post({ id: 1 });

    cache.writeQuery<PostQuery>({
      query: PostDocument,
      data: { post }
    });

    const mocks = [
      mockMeQuery(2),
      mockVotePostMutation({ postId: 1, value: 1 })
    ];

    customRender(<Post post={post} />, cache, mocks);

    const button = await screen.findByTestId("upvote-button");

    await userEvents.click(button);

    await waitFor(() => {
      const cacheFragment = cache.readFragment<PostVoteFragment>({
        id: "Post:1",
        fragment: PostVoteFragment
      });
      expect(cacheFragment?.rating).toEqual(post.rating + 1);
      expect(cacheFragment?.voteStatus).toEqual(1);
    });
  });

  it("changes cache on downvote", async () => {
    const post = Mock.post({ id: 1 });

    cache.writeQuery<PostQuery>({
      query: PostDocument,
      data: { post }
    });

    const mocks = [
      mockMeQuery(2),
      mockVotePostMutation({ postId: 1, value: -1 })
    ];

    customRender(<Post post={post} />, cache, mocks);

    const button = await screen.findByTestId("downvote-button");

    await userEvents.click(button);

    await waitFor(() => {
      const cacheFragment = cache.readFragment<PostVoteFragment>({
        id: "Post:1",
        fragment: PostVoteFragment
      });

      expect(cacheFragment?.rating).toEqual(post.rating - 1);
      expect(cacheFragment?.voteStatus).toEqual(-1);
    });
  });

  it("opens alert bar when not auth", async () => {
    const post = Mock.post({ id: 1 });

    customRender(<Post post={post} />);

    const button = await screen.findByTestId("upvote-button");

    await userEvents.click(button);

    const snack = await screen.findByTestId("snack-item");

    expect(snack).toHaveTextContent("You are not authenticated");
  });

  it("opens alert bar when upvoting your post", async () => {
    const post = Mock.post({ id: 1, authorId: 1 });

    const mocks = [
      mockMeQuery(1),
      mockVotePostMutation({ postId: 1, value: 1 })
    ];

    customRender(<Post post={post} />, cache, mocks);

    const button = await screen.findByTestId("upvote-button");

    await userEvents.click(button);

    const snack = await screen.findByTestId("snack-item");

    expect(snack).toHaveTextContent("You cannot vote on your posts");
  });

  it("opens alert bar when downvoting your post", async () => {
    const post = Mock.post({ id: 1, authorId: 1 });

    const mocks = [
      mockMeQuery(1),
      mockVotePostMutation({ postId: 1, value: -1 })
    ];

    customRender(<Post post={post} />, cache, mocks);

    const button = await screen.findByTestId("downvote-button");

    await userEvents.click(button);

    const snack = screen.queryByTestId("snack-item");

    expect(snack).toHaveTextContent("You cannot vote on your posts");
  });
});

const customRender = (
  el: ReactNode,
  cache?: ApolloCache<any>,
  mocks?: MockedResponse<Record<string, any>>[],
  addTypename: boolean = false
) => {
  const utils = render(
    <SnackbarProvider>
      <MockedProvider cache={cache} mocks={mocks} addTypename={addTypename}>
        {el}
      </MockedProvider>
      <SnackBar />
    </SnackbarProvider>
  );
  return { ...utils };
};
