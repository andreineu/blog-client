import { ApolloCache, gql } from "@apollo/client";

export interface PostVoteFragment {
  rating: number;
  voteStatus: number | null;
}

export const PostVoteFragment = gql`
  fragment myPost on Post {
    rating
    voteStatus
  }
`;

export const updatePostVote = (
  cache: ApolloCache<any>,
  voteValue: number,
  id: string
) => {
  cache.updateFragment<PostVoteFragment>(
    {
      id,
      fragment: PostVoteFragment
    },
    (data) => ({
      rating: data?.rating! + voteValue,
      voteStatus: data?.voteStatus! + voteValue || null
    })
  );
};
