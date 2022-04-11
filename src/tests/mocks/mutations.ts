import { MockedResponse } from "@apollo/client/testing";
import {
  VotePostMutation,
  VotePostDocument,
  VoteCommentDocument,
  VoteCommentMutation
} from "../../generated/graphql";

export const mockVotePostMutation = (args: {
  postId: number;
  value: 1 | -1;
}): MockedResponse<VotePostMutation> => ({
  request: { query: VotePostDocument, variables: args },
  result: { data: { votePost: { message: "voted", voted: true } } }
});

export const mockVoteCommentMutation = (args: {
  commentId: number;
  value: 1 | -1;
}): MockedResponse<VoteCommentMutation> => ({
  request: { query: VoteCommentDocument, variables: args },
  result: { data: { voteComment: { message: "voted", voted: true } } }
});
