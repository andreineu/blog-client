import { SvgIconProps, SvgIcon } from "@mui/material";

export const ChevronUpIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      focusable="false"
      data-icon="arrow-alt-up"
      viewBox="0 -2 12 12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5.17197 0.378L0.551973 5.874C-0.0360266 6.57 0.455973 7.65 1.37997 7.65H10.62C11.532 7.65 12.036 6.582 11.448 5.874L6.82797 0.378C6.39597 -0.126 5.60397 -0.126 5.17197 0.378Z" />
    </SvgIcon>
  );
};
export const ChevronDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      focusable="false"
      data-icon="arrow-alt-down"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -2 12 12"
      {...props}
      sx={{ transform: "rotate(180deg)", ...props.sx }}
    >
      <path d="M5.17197 0.378L0.551973 5.874C-0.0360266 6.57 0.455973 7.65 1.37997 7.65H10.62C11.532 7.65 12.036 6.582 11.448 5.874L6.82797 0.378C6.39597 -0.126 5.60397 -0.126 5.17197 0.378Z" />
    </SvgIcon>
  );
};

export const ArrowUpIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </SvgIcon>
  );
};

export const ArrowDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </SvgIcon>
  );
};
