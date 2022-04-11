import { ApolloCache, gql } from "@apollo/client";
import { VoteCommentMutation } from "../../generated/graphql";

export interface VoteFragment {
  rating: number;
  voteStatus: number | null;
}

export const CommentVoteFragment = gql`
  fragment myComment on Comment {
    rating
    voteStatus
  }
`;

export const updateCommentVote = (
  cache: ApolloCache<VoteCommentMutation>,
  voteValue: number,
  id: string
) => {
  cache.updateFragment<VoteFragment>(
    {
      id,
      fragment: CommentVoteFragment
    },
    (data) => ({
      rating: data?.rating! + voteValue,
      voteStatus: data?.voteStatus! + voteValue || null
    })
  );
};
