import React from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

import { Box, Typography } from "@mui/material";
import { parseToHtml } from "../../utils/parseBlocks";

interface ParsedHtmlBodyProps {
  htmlToParse: string;
  options?: HTMLReactParserOptions;
}

export const ParsedHtmlBody: React.FC<ParsedHtmlBodyProps> = ({
  htmlToParse,
  options
}) => {
  return <>{parse(htmlToParse, options)}</>;
};

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

export const PostBody: React.FC<PostBodyProps> = ({ body }) => {
  const html = parseBlocksToHtml(body);

  let C = <Typography variant="body2">{body}</Typography>;

  if (html !== "not html") C = <ParsedHtmlBody htmlToParse={html} />;

  return (
    <Box
      sx={{
        my: 2,
        img: {
          maxWidth: "100%",
          objectFit: "cover",
          height: "auto"
        }
      }}
    >
      {C}
    </Box>
  );
};
