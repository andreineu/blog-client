import { SvgIconProps, SvgIcon } from "@mui/material";

export const CommentIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        d="M14 12.795H6.4L3.2 16v-3.205H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.795a2 2 0 0 1-2 2zm-1.205-8.31a.749.749 0 0 0-.75-.75h-8.09a.749.749 0 0 0-.75.75v.09c0 .415.335.75.75.75h8.09c.415 0 .75-.335.75-.75v-.09zm0 3.735a.749.749 0 0 0-.75-.75h-8.09a.749.749 0 0 0-.75.75v.09c0 .415.335.75.75.75h8.09c.415 0 .75-.335.75-.75v-.09z"
        fillRule="evenodd"
      ></path>
    </SvgIcon>
  );
};
