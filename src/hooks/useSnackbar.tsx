import React from "react";

import { SnackbarContextType, SnackbarCtx } from "../context/snackbarCtx";

export const useSnackbar = (): SnackbarContextType => {
  const snackbCtx = React.useContext(SnackbarCtx);
  return snackbCtx;
};
