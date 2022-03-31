import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

export const MinusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 6 6" {...props}>
      <path fill="currentColor" d="M6 3.5H0v-1h6"></path>
      {/* <path d="M2.5 6V0h1v6"></path> */}
    </SvgIcon>
  );
};

export const PlusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 6 6" {...props}>
      <path fill="currentColor" d="M6 3.5H0v-1h6"></path>
      <path d="M2.5 6V0h1v6"></path>
    </SvgIcon>
  );
};

export const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 6 6"
      {...props}
      sx={{ transform: "rotate(45deg)", ...props.sx }}
    >
      <path fill="currentColor" d="M6 3.5H0v-1h6"></path>
      <path d="M2.5 6V0h1v6"></path>
    </SvgIcon>
  );
};
