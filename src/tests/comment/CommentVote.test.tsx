import { render, screen, waitFor } from "@testing-library/react";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import userEvents from "@testing-library/user-event";

import { Comment } from "../../components/Comment";

import { ApolloCache, InMemoryCache } from "@apollo/client";

import {
  CommentsDocument,
  CommentsQuery,
  MeDocument,
  MeQuery
} from "../../generated/graphql";

import {
  VoteFragment,
  CommentVoteFragment
} from "../../utils/cache/updateCommentVote";

import { mockMeQuery } from "../mocks/queries";
import { mockVoteCommentMutation } from "../mocks/mutations";
import { SnackbarProvider } from "../../context/snackbarProvider";
import { SnackBar } from "../../components/SnackBar";
import { ReactNode } from "react";
import { Mock } from "../mocks/faker";

const initialCache = new InMemoryCache({ addTypename: false });

describe("comment-votes", () => {
  let cache = initialCache;

  afterEach(() => {
    cache = initialCache;
  });

  it("changes cache on upvote", async () => {
    const comment = Mock.comment({ authorId: 1, id: 1 });

    cache.writeQuery<CommentsQuery>({
      query: CommentsDocument,
      data: { comments: [comment] }
    });
    const mocks = [
      mockMeQuery(2),
      mockVoteCommentMutation({ commentId: 1, value: 1 })
    ];
    const { findByTestId } = customRender(
      <Comment comment={comment} />,
      cache,
      mocks
    );

    const button = await findByTestId("upvote-button");

    await userEvents.click(button);

    await waitFor(() => {
      const data = cache.readFragment<VoteFragment>({
        id: "Comment:1",
        fragment: CommentVoteFragment
      });
      expect(data?.rating).toEqual(comment.rating + 1);
    });
  });

  it("changes cache on downvote", async () => {
    const comment = Mock.comment({ authorId: 1, id: 1 });

    cache.writeQuery<CommentsQuery>({
      query: CommentsDocument,
      data: { comments: [comment] }
    });

    const mocks = [
      mockMeQuery(999),
      mockVoteCommentMutation({ commentId: 1, value: -1 })
    ];

    customRender(<Comment comment={comment} />, cache, mocks);

    const button = await screen.findByTestId("downvote-button");

    await userEvents.click(button);

    await waitFor(() => {
      const cacheFragment = cache.readFragment<VoteFragment>({
        id: "Comment:1",
        fragment: CommentVoteFragment
      });

      expect(cacheFragment?.rating).toBe(comment.rating - 1);
    });
  });
});

describe("handles invalid votes", () => {
  it("opens alert bar when not auth", async () => {
    const comment = Mock.comment({ authorId: 1, id: 1 });

    customRender(<Comment comment={comment} />);

    const button = await screen.findByTestId("upvote-button");

    await userEvents.click(button);

    const snack = await screen.findByTestId("snack-item");

    expect(snack).toHaveTextContent("You are not authenticated");
  });

  it("opens alert bar when upvoting your post", async () => {
    const comment = Mock.comment({ authorId: 1, id: 1 });

    const userId = 1;

    const cache = new InMemoryCache({ addTypename: false });

    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: { me: Mock.user({ id: 1 }) }
    });
    const mocks = [
      mockMeQuery(userId),
      mockVoteCommentMutation({ commentId: 1, value: 1 })
    ];
    customRender(<Comment comment={comment} />, cache, mocks);

    const button = await screen.findByTestId("upvote-button");

    await userEvents.click(button);

    const snack = await screen.findByTestId("snack-item");

    expect(snack).toHaveTextContent("You cannot vote on your comments");
  });

  it("opens alert bar when downvoting your post", async () => {
    const comment = Mock.comment({ authorId: 1, id: 1 });

    const userId = 1;

    const cache = new InMemoryCache({ addTypename: false });
    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: { me: Mock.user({ id: 1 }) }
    });

    const mocks = [
      mockMeQuery(userId),
      mockVoteCommentMutation({ commentId: 1, value: -1 })
    ];

    customRender(<Comment comment={comment} />, cache, mocks);

    const button = await screen.findByTestId("downvote-button");

    await userEvents.click(button);

    const snack = screen.queryByTestId("snack-item");

    expect(snack).toHaveTextContent("You cannot vote on your comments");
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
