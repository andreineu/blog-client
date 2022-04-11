import React from "react";
import { Menu, MenuProps, SxProps, Theme } from "@mui/material";

interface DropdownProps extends Omit<MenuProps, "open"> {
  anchorEl: null | HTMLElement;
  setAnchorEl: (el: null | HTMLElement) => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  anchorEl,
  setAnchorEl,
  children,
  sx = {},
  ...props
}) => {
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} {...props}>
      {children}
    </Menu>
  );
};
