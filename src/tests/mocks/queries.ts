import { MockedResponse } from "@apollo/client/testing";
import {
  MeQuery,
  MeDocument,
  PostQuery,
  PostDocument,
  PostQueryVariables
} from "../../generated/graphql";
import { FakePostOptions, Mock } from "./faker";

export const mockMeQuery = (id: number): MockedResponse<MeQuery> => ({
  request: { query: MeDocument },
  result: { data: { __typename: "Query", me: Mock.user({ id }) } }
});

export const mockPostQuery = (opts?: FakePostOptions): MockedResponse<PostQuery> => ({
  request: {
    query: PostDocument,
    variables: { id: opts?.id } as PostQueryVariables
  },
  result: { data: { post: Mock.post(opts), __typename: "Query" } }
});
