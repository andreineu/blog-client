import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

export const MinusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      > */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
      {/* </svg> */}
    </SvgIcon>
  );
};

export const PlusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      > */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      {/* </svg> */}
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
