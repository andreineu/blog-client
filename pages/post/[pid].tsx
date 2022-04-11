import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Stack, Divider, Typography } from "@mui/material";
import { Comment } from "../../src/components/Comment";
import { Layout, Wrapper } from "../../src/components/Layout";
import { Post } from "../../src/components/Post";
import {
  Comment as CommentType,
  PostDocument,
  PostQuery,
  PostQueryVariables,
  useCommentsQuery,
  usePostQuery
} from "../../src/generated/graphql";
import { addApolloState, initializeApollo } from "../../src/utils/client";
import { WriteCommentForm } from "../../src/components/Forms";
import { createTree } from "../../src/utils/tree";

const PostPage: NextPage<{}> = () => {
  const router = useRouter();
  const pid = parseInt(router.query.pid as string);
  const { data } = usePostQuery({
    variables: { id: pid }
  });
  const { data: commentData } = useCommentsQuery({
    variables: { postId: pid }
  });

  const commentTree = createTree<CommentType>(commentData?.comments || []);

  const post = data!.post!;
  return (
    <Layout>
      <>
        <Stack sx={{ gap: 2 }} alignItems="flex-start">
          <Post post={post} />
          <Wrapper variant="outlined" noPadding>
            {commentTree.map((c) => (
              <React.Fragment key={c.id}>
                <Comment comment={c} />
                <Divider />
              </React.Fragment>
            ))}
          </Wrapper>
          <Wrapper variant="outlined">
            <WriteCommentForm postId={post.id} />
          </Wrapper>
        </Stack>
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);
  const { pid } = ctx.params!;

  const { data } = await apolloClient.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: {
      id: parseInt(pid as string)
    }
  });

  if (!data.post) return { redirect: { destination: "/not-found" } };

  return addApolloState(apolloClient, { props: {} });
};

export default PostPage;
