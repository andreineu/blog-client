import React from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

import { Box, Typography } from "@mui/material";
import { parseToHtml } from "../../utils/parseBlocks";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const parseBlocksToHtml = (s: string) => {
  try {
    const blockData = JSON.parse(s);
    const htmlArr = parseToHtml({ blocks: blockData });
    const html = htmlArr.join("");
    return html;
  } catch (error) {
    return "not html";
  }
};

interface PostBodyProps {
  body: string;
}

const PostContent: React.FC<PostBodyProps> = ({ body }) => {
  const html = parseBlocksToHtml(body);
  let C = <Typography variant="body2">{body}</Typography>;
  if (html !== "not html") C = <>{parse(html)}</>;

  return <>{C}</>;
};

export const PostBody: React.FC<PostBodyProps> = ({ body }) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 1024;
  return (
    <Box
      sx={[
        {
          my: 2,
          img: {
            maxWidth: "100%",
            objectFit: "cover",
            height: "auto"
          }
        },
        isMobile && { mx: -3, mt: 0 }
      ]}
    >
      <PostContent body={body} />
    </Box>
  );
};
