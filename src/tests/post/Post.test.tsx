import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { Post } from "../../components/Post/Post";

import { Mock } from "../mocks/faker";

describe("posts", () => {
  it("renders without error", async () => {
    const mockPost = Mock.post();

    render(
      <MockedProvider addTypename={false}>
        <Post post={mockPost} />
      </MockedProvider>
    );

    const title = await screen.findByText(mockPost.title);

    expect(title).toBeVisible();
  });

  it("renders upvoted state", async () => {
    const mockPost = Mock.post({ voteStatus: 1 });
    render(
      <MockedProvider addTypename={false}>
        <Post post={mockPost} />
      </MockedProvider>
    );

    const button = await screen.findByTestId("upvote-button");

    expect(button).toHaveClass("MuiIconButton-colorSuccess");
  });

  it("renders downvoted state", async () => {
    const mockPost = Mock.post({ voteStatus: -1 });
    render(
      <MockedProvider addTypename={false}>
        <Post post={mockPost} />
      </MockedProvider>
    );

    const button = await screen.findByTestId("downvote-button");

    expect(button).toHaveClass("MuiIconButton-colorError");
  });
});
