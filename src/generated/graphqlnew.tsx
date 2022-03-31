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

export type Comment = {
  __typename?: 'Comment';
  author: User;
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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  voteComment?: Maybe<VoteResponse>;
  votePost?: Maybe<VoteResponse>;
  writeComment: Scalars['Boolean'];
};


export type MutationCreateArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserRegInput;
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

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  items: Array<Post>;
  pageInfo: PageInfo;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  rating: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
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


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  postIds: Array<Scalars['Int']>;
  posts: Array<Post>;
  username: Scalars['String'];
};

export type UserRegInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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

export type PageInfo = {
  __typename?: 'pageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type CommentFragmentFragment = { __typename?: 'Comment', id: number, body: string, rating: number, voteStatus?: number | null, postId: number, parentId?: number | null, createdAt: string, updatedAt: string, authorId: number, author: { __typename?: 'User', id: number, username: string, createdAt: string } };

export type PostFragmentFragment = { __typename?: 'Post', id: number, authorId: number, title: string, body: string, rating: number, voteStatus?: number | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', username: string, id: number, email: string } };

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, createdAt: string };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', create: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, createdAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, createdAt: string } | null } };

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

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  createdAt
}
    `;
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on Comment {
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
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  id
  authorId
  title
  body
  rating
  voteStatus
  createdAt
  updatedAt
  author {
    username
    id
    email
  }
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($body: String!, $title: String!) {
  create(body: $body, title: $title)
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
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
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
  register(options: {email: $email, password: $password, username: $username}) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
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