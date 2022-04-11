import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: Author;
  authorId: Scalars['Int'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  postId: Scalars['Int'];
  rating: Scalars['Int'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Community = {
  __typename?: 'Community';
  author: Author;
  authorId: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  followStatus?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  rules: Scalars['String'];
  subcriptionStatus?: Maybe<Scalars['Int']>;
  summary: Scalars['String'];
  totalPosts: Scalars['Int'];
  totalUsers: Scalars['Int'];
};

export type CommunityBase = {
  __typename?: 'CommunityBase';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  summary: Scalars['String'];
};

export enum CommunitySortKeys {
  CreatedAt = 'CREATED_AT',
  FollowerCount = 'FOLLOWER_COUNT'
}

export type CreateResponse = {
  __typename?: 'CreateResponse';
  created?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum FollowAction {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCommunity: CreateResponse;
  createPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  followCommunity: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateCommunity: Scalars['Boolean'];
  updatePost: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  voteComment?: Maybe<VoteResponse>;
  votePost?: Maybe<VoteResponse>;
  writeComment: Scalars['Boolean'];
};


export type MutationCreateCommunityArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  rules: Scalars['String'];
  summary: Scalars['String'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  communityId?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
};


export type MutationFollowCommunityArgs = {
  action: FollowAction;
  communityId: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  action: FollowAction;
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateCommunityArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  communityId: Scalars['Int'];
  rules?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  body: Scalars['String'];
  communityId?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationVotePostArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationWriteCommentArgs = {
  body: Scalars['String'];
  parentId?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type PaginatedCommunities = {
  __typename?: 'PaginatedCommunities';
  items: Array<Community>;
  pageInfo: PageInfo;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  items: Array<Post>;
  pageInfo: PageInfo;
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  authorId: Scalars['Int'];
  body: Scalars['String'];
  community?: Maybe<CommunityBase>;
  communityId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  rating: Scalars['Int'];
  title: Scalars['String'];
  totalComments: Scalars['Int'];
  totalViews: Scalars['Int'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  communities: PaginatedCommunities;
  community: Community;
  getAllPosts: Array<Post>;
  getComments: Array<Comment>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  user: User;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryCommunitiesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  sortKey?: InputMaybe<CommunitySortKeys>;
};


export type QueryCommunityArgs = {
  name: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  communityId?: InputMaybe<Scalars['Int']>;
  communityName?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  sortKey?: InputMaybe<SortKeys>;
  userId?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export enum SortKeys {
  CreatedAt = 'CREATED_AT',
  Rating = 'RATING'
}

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followStatus?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  rating: Scalars['Int'];
  totalFollowers: Scalars['Int'];
  totalPosts: Scalars['Int'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type VoteResponse = {
  __typename?: 'VoteResponse';
  message?: Maybe<Scalars['String']>;
  voted?: Maybe<Scalars['Boolean']>;
};

export type AuthorFragment = { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null };

export type CommentFragment = { __typename?: 'Comment', id: number, body: string, rating: number, voteStatus?: number | null, postId: number, parentId?: number | null, createdAt: string, updatedAt: string, authorId: number, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null } };

export type CommunityBaseFragment = { __typename?: 'CommunityBase', id: number, name: string, summary: string, avatar?: string | null };

export type CommunityFragment = { __typename?: 'Community', id: number, name: string, summary: string, avatar?: string | null, rules: string, totalPosts: number, totalUsers: number, followStatus?: number | null, createdAt: string, authorId: number, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null } };

export type PostFragment = { __typename?: 'Post', id: number, authorId: number, title: string, body: string, rating: number, totalComments: number, totalViews: number, voteStatus?: number | null, createdAt: string, updatedAt: string, communityId?: number | null, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null }, community?: { __typename?: 'CommunityBase', id: number, name: string, summary: string, avatar?: string | null } | null };

export type UserFragment = { __typename?: 'User', id: number, username: string, createdAt: string, avatar?: string | null, email: string, followStatus?: number | null, rating: number, totalFollowers: number, totalPosts: number };

export type UpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['Int'];
  avatar?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
}>;


export type UpdateCommunityMutation = { __typename?: 'Mutation', updateCommunity: boolean };

export type CreateCommunityMutationVariables = Exact<{
  name: Scalars['String'];
  summary: Scalars['String'];
  rules: Scalars['String'];
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'CreateResponse', created?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
  communityId?: InputMaybe<Scalars['Int']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: boolean };

export type FollowCommunityMutationVariables = Exact<{
  communityId: Scalars['Int'];
  action: FollowAction;
}>;


export type FollowCommunityMutation = { __typename?: 'Mutation', followCommunity: boolean };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  action: FollowAction;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, createdAt: string, avatar?: string | null, email: string, followStatus?: number | null, rating: number, totalFollowers: number, totalPosts: number } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, createdAt: string, avatar?: string | null, email: string, followStatus?: number | null, rating: number, totalFollowers: number, totalPosts: number } | null } };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  avatar?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type VoteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteCommentMutation = { __typename?: 'Mutation', voteComment?: { __typename?: 'VoteResponse', message?: string | null, voted?: boolean | null } | null };

export type VotePostMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VotePostMutation = { __typename?: 'Mutation', votePost?: { __typename?: 'VoteResponse', message?: string | null, voted?: boolean | null } | null };

export type WriteCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  body: Scalars['String'];
  parentId?: InputMaybe<Scalars['Int']>;
}>;


export type WriteCommentMutation = { __typename?: 'Mutation', writeComment: boolean };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: number, body: string, rating: number, voteStatus?: number | null, postId: number, parentId?: number | null, createdAt: string, updatedAt: string, authorId: number, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null } }> };

export type CommunitiesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  sortKey?: InputMaybe<CommunitySortKeys>;
}>;


export type CommunitiesQuery = { __typename?: 'Query', communities: { __typename?: 'PaginatedCommunities', items: Array<{ __typename?: 'Community', id: number, name: string, summary: string, avatar?: string | null, rules: string, totalPosts: number, totalUsers: number, followStatus?: number | null, createdAt: string, authorId: number, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } };

export type CommunityQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community: { __typename?: 'Community', id: number, name: string, summary: string, avatar?: string | null, rules: string, totalPosts: number, totalUsers: number, followStatus?: number | null, createdAt: string, authorId: number, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: number, username: string, createdAt: string, avatar?: string | null, followStatus?: number | null, rating: number, totalFollowers: number, totalPosts: number } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, authorId: number, title: string, body: string, rating: number, totalComments: number, totalViews: number, voteStatus?: number | null, createdAt: string, updatedAt: string, communityId?: number | null, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null }, community?: { __typename?: 'CommunityBase', id: number, name: string, summary: string, avatar?: string | null } | null } | null };

export type PostsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  username?: InputMaybe<Scalars['String']>;
  communityName?: InputMaybe<Scalars['String']>;
  sortKey?: InputMaybe<SortKeys>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', items: Array<{ __typename?: 'Post', id: number, authorId: number, title: string, body: string, rating: number, totalComments: number, totalViews: number, voteStatus?: number | null, createdAt: string, updatedAt: string, communityId?: number | null, author: { __typename?: 'Author', id: number, username: string, createdAt: string, avatar?: string | null }, community?: { __typename?: 'CommunityBase', id: number, name: string, summary: string, avatar?: string | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, createdAt: string, avatar?: string | null, email: string, followStatus?: number | null, rating: number, totalFollowers: number, totalPosts: number } };

export const AuthorFragmentDoc = gql`
    fragment Author on Author {
  id
  username
  createdAt
  avatar
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  body
  rating
  voteStatus
  postId
  parentId
  createdAt
  updatedAt
  authorId
  author {
    ...Author
  }
}
    ${AuthorFragmentDoc}`;
export const CommunityFragmentDoc = gql`
    fragment Community on Community {
  id
  name
  summary
  avatar
  rules
  totalPosts
  totalUsers
  followStatus
  createdAt
  authorId
  author {
    ...Author
  }
}
    ${AuthorFragmentDoc}`;
export const CommunityBaseFragmentDoc = gql`
    fragment CommunityBase on CommunityBase {
  id
  name
  summary
  avatar
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  authorId
  title
  body
  rating
  totalComments
  totalViews
  voteStatus
  createdAt
  updatedAt
  author {
    ...Author
  }
  communityId
  community {
    ...CommunityBase
  }
}
    ${AuthorFragmentDoc}
${CommunityBaseFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  createdAt
  avatar
  email
  followStatus
  rating
  totalFollowers
  totalPosts
}
    `;
export const UpdateCommunityDocument = gql`
    mutation updateCommunity($communityId: Int!, $avatar: String, $rules: String, $summary: String) {
  updateCommunity(
    communityId: $communityId
    avatar: $avatar
    rules: $rules
    summary: $summary
  )
}
    `;
export type UpdateCommunityMutationFn = Apollo.MutationFunction<UpdateCommunityMutation, UpdateCommunityMutationVariables>;

/**
 * __useUpdateCommunityMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutation, { data, loading, error }] = useUpdateCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      avatar: // value for 'avatar'
 *      rules: // value for 'rules'
 *      summary: // value for 'summary'
 *   },
 * });
 */
export function useUpdateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityMutation, UpdateCommunityMutationVariables>(UpdateCommunityDocument, options);
      }
export type UpdateCommunityMutationHookResult = ReturnType<typeof useUpdateCommunityMutation>;
export type UpdateCommunityMutationResult = Apollo.MutationResult<UpdateCommunityMutation>;
export type UpdateCommunityMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($name: String!, $summary: String!, $rules: String!) {
  createCommunity(name: $name, summary: $summary, rules: $rules) {
    errors {
      field
      message
    }
    created
  }
}
    `;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      name: // value for 'name'
 *      summary: // value for 'summary'
 *      rules: // value for 'rules'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($body: String!, $title: String!, $communityId: Int) {
  createPost(body: $body, title: $title, communityId: $communityId)
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      title: // value for 'title'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FollowCommunityDocument = gql`
    mutation FollowCommunity($communityId: Int!, $action: FollowAction!) {
  followCommunity(communityId: $communityId, action: $action)
}
    `;
export type FollowCommunityMutationFn = Apollo.MutationFunction<FollowCommunityMutation, FollowCommunityMutationVariables>;

/**
 * __useFollowCommunityMutation__
 *
 * To run a mutation, you first call `useFollowCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followCommunityMutation, { data, loading, error }] = useFollowCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useFollowCommunityMutation(baseOptions?: Apollo.MutationHookOptions<FollowCommunityMutation, FollowCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowCommunityMutation, FollowCommunityMutationVariables>(FollowCommunityDocument, options);
      }
export type FollowCommunityMutationHookResult = ReturnType<typeof useFollowCommunityMutation>;
export type FollowCommunityMutationResult = Apollo.MutationResult<FollowCommunityMutation>;
export type FollowCommunityMutationOptions = Apollo.BaseMutationOptions<FollowCommunityMutation, FollowCommunityMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: Int!, $action: FollowAction!) {
  followUser(userId: $userId, action: $action)
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($userId: Int!, $avatar: String) {
  updateUser(userId: $userId, avatar: $avatar)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VoteCommentDocument = gql`
    mutation VoteComment($commentId: Int!, $value: Int!) {
  voteComment(commentId: $commentId, value: $value) {
    message
    voted
  }
}
    `;
export type VoteCommentMutationFn = Apollo.MutationFunction<VoteCommentMutation, VoteCommentMutationVariables>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteCommentMutation(baseOptions?: Apollo.MutationHookOptions<VoteCommentMutation, VoteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument, options);
      }
export type VoteCommentMutationHookResult = ReturnType<typeof useVoteCommentMutation>;
export type VoteCommentMutationResult = Apollo.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = Apollo.BaseMutationOptions<VoteCommentMutation, VoteCommentMutationVariables>;
export const VotePostDocument = gql`
    mutation VotePost($postId: Int!, $value: Int!) {
  votePost(postId: $postId, value: $value) {
    message
    voted
  }
}
    `;
export type VotePostMutationFn = Apollo.MutationFunction<VotePostMutation, VotePostMutationVariables>;

/**
 * __useVotePostMutation__
 *
 * To run a mutation, you first call `useVotePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votePostMutation, { data, loading, error }] = useVotePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVotePostMutation(baseOptions?: Apollo.MutationHookOptions<VotePostMutation, VotePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument, options);
      }
export type VotePostMutationHookResult = ReturnType<typeof useVotePostMutation>;
export type VotePostMutationResult = Apollo.MutationResult<VotePostMutation>;
export type VotePostMutationOptions = Apollo.BaseMutationOptions<VotePostMutation, VotePostMutationVariables>;
export const WriteCommentDocument = gql`
    mutation WriteComment($postId: Int!, $body: String!, $parentId: Int) {
  writeComment(postId: $postId, body: $body, parentId: $parentId)
}
    `;
export type WriteCommentMutationFn = Apollo.MutationFunction<WriteCommentMutation, WriteCommentMutationVariables>;

/**
 * __useWriteCommentMutation__
 *
 * To run a mutation, you first call `useWriteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWriteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [writeCommentMutation, { data, loading, error }] = useWriteCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      body: // value for 'body'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useWriteCommentMutation(baseOptions?: Apollo.MutationHookOptions<WriteCommentMutation, WriteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WriteCommentMutation, WriteCommentMutationVariables>(WriteCommentDocument, options);
      }
export type WriteCommentMutationHookResult = ReturnType<typeof useWriteCommentMutation>;
export type WriteCommentMutationResult = Apollo.MutationResult<WriteCommentMutation>;
export type WriteCommentMutationOptions = Apollo.BaseMutationOptions<WriteCommentMutation, WriteCommentMutationVariables>;
export const CommentsDocument = gql`
    query Comments($postId: Int!) {
  comments(postId: $postId) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CommunitiesDocument = gql`
    query Communities($cursor: String, $limit: Int!, $sortKey: CommunitySortKeys) {
  communities(cursor: $cursor, limit: $limit, sortKey: $sortKey) {
    items {
      ...Community
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CommunityFragmentDoc}`;

/**
 * __useCommunitiesQuery__
 *
 * To run a query within a React component, call `useCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitiesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      sortKey: // value for 'sortKey'
 *   },
 * });
 */
export function useCommunitiesQuery(baseOptions: Apollo.QueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
      }
export function useCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
        }
export type CommunitiesQueryHookResult = ReturnType<typeof useCommunitiesQuery>;
export type CommunitiesLazyQueryHookResult = ReturnType<typeof useCommunitiesLazyQuery>;
export type CommunitiesQueryResult = Apollo.QueryResult<CommunitiesQuery, CommunitiesQueryVariables>;
export const CommunityDocument = gql`
    query Community($name: String!) {
  community(name: $name) {
    ...Community
  }
}
    ${CommunityFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
    email
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($cursor: String, $limit: Int!, $username: String, $communityName: String, $sortKey: SortKeys) {
  posts(
    cursor: $cursor
    limit: $limit
    username: $username
    sortKey: $sortKey
    communityName: $communityName
  ) {
    items {
      ...Post
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      username: // value for 'username'
 *      communityName: // value for 'communityName'
 *      sortKey: // value for 'sortKey'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;