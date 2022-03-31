import { SvgIconProps, SvgIcon } from "@mui/material";

export const ArrowUpIcon = (props: SvgIconProps) => {
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
export const ArrowDownIcon = (props: SvgIconProps) => {
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
