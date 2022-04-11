import { SvgIconProps, SvgIcon } from "@mui/material";

export const PhotoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 13 11" {...props}>
      <path
        d="M11.134 11H1.238C.558 11 0 10.45 0 9.776V2.444c0-.67.557-1.22 1.238-1.22h1.98L4.33 0h3.71l1.114 1.224h1.98c.68 0 1.238.55 1.238 1.22v7.332c0 .674-.557 1.224-1.238 1.224zM6.187 3.056c-1.732 0-3.093 1.344-3.093 3.056s1.36 3.056 3.094 3.056c1.73 0 3.09-1.344 3.09-3.056s-1.36-3.056-3.09-3.056zm0 5.012c-1.093 0-1.98-.877-1.98-1.956 0-1.08.887-1.956 1.98-1.956 1.094 0 1.977.877 1.977 1.956 0 1.08-.883 1.956-1.976 1.956z"
        fillRule="evenodd"
      ></path>
    </SvgIcon>
  );
};