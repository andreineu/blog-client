import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { Comment } from "../../components/Comment";

import { Mock } from "../mocks/faker";

describe("comment", () => {
  it("renders without error", async () => {
    const comment = Mock.comment();

    render(
      <MockedProvider addTypename={false}>
        <Comment comment={comment} />
      </MockedProvider>
    );

    const body = await screen.findByText(comment.body);

    expect(body).toBeVisible();
  });

  it("renders upvoted state", async () => {
    const comment = Mock.comment({ voteStatus: 1 });

    render(
      <MockedProvider addTypename={false}>
        <Comment comment={comment} />
      </MockedProvider>
    );

    const button = await screen.findByTestId("upvote-button");

    expect(button).toHaveClass("MuiIconButton-colorSuccess");
  });

  it("renders downvoted state", async () => {
    const comment = Mock.comment({ voteStatus: -1 });

    render(
      <MockedProvider addTypename={false}>
        <Comment comment={comment} />
      </MockedProvider>
    );

    const button = await screen.findByTestId("downvote-button");

    expect(button).toHaveClass("MuiIconButton-colorError");
  });
});
