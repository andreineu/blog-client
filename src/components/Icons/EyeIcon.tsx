import { SvgIconProps, SvgIcon } from "@mui/material";

export const EyeIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 12 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.491 6c0 1.463-1.117 2.654-2.491 2.654-1.371 0-2.486-1.19-2.486-2.654 0-1.466 1.115-2.658 2.486-2.658 1.374 0 2.491 1.192 2.491 2.658Zm3.182-.817C10.597 4.09 8.428 2.25 6 2.25c-2.432 0-4.597 1.838-5.672 2.934C.116 5.4-.002 5.694 0 6c0 .31.116.6.328.816C1.405 7.91 3.573 9.75 6 9.75c2.433 0 4.598-1.839 5.673-2.934.211-.216.327-.505.327-.817 0-.31-.116-.6-.327-.815"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 6.002A1.501 1.501 0 1 1 5.998 4.5c.83 0 1.502.673 1.502 1.502Z"
      ></path>
    </SvgIcon>
  );
};
