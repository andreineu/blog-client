import * as React from "react";
import { SnackItemPayload } from "./snackbarProvider";

export const SnackbarCtx = React.createContext<SnackbarContextType>({
  items: [],
  addSnackItem: () => {},
  deleteSnackItem: () => {}
});

export type SnackBarItem = {
  id: number;
  message: string;
  severity?: "error" | "info" | "success" | "warning";
  noAutoHide?: boolean;
};

export type SnackbarContextType = {
  items: SnackBarItem[];
  addSnackItem: (snackItem: SnackItemPayload) => void;
  deleteSnackItem: (id: number) => void;
};
