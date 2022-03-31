import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Stack, Divider, Typography, Button, TextField } from "@mui/material";
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

  return (
    <Layout>
      {!data?.post && (
        <Typography variant="h3" align="center">
          no post found
        </Typography>
      )}

      {data?.post && (
        <>
          <Stack sx={{ gap: 2 }} alignItems="flex-start">
            <Post post={data.post} />
            <Wrapper variant="outlined" noPadding>
              {commentTree.map((c) => (
                <React.Fragment key={c.id}>
                  <Comment comment={c} />
                  <Divider />
                </React.Fragment>
              ))}
            </Wrapper>
            <Wrapper variant="outlined">
              <WriteCommentForm postId={data.post.id} />
            </Wrapper>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);
  const { pid } = ctx.params!;

  await apolloClient.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: {
      id: parseInt(pid as string)
    }
  });

  return addApolloState(apolloClient, { props: {} });
};

export default PostPage;
