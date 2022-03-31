export { SnackBar } from "./SnackBar";

import * as React from "react";

type SnackBarItem = {
  id: number;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

type SnackbarContextType = {
  items: SnackBarItem[];
  addSnackItem: (snackItem: SnackItemPayload) => void;
  deleteSnackItem: (id: number) => void;
};
const SnakbarCtx = React.createContext<SnackbarContextType>({
  items: [],
  addSnackItem: () => {},
  deleteSnackItem: () => {}
});

type SnackItemPayload = Omit<SnackBarItem, "id">;
type SnackbarState = {
  items: SnackBarItem[];
};
interface ADD_ITEM_ACTION {
  type: "ADD_ITEM";
  payload: SnackItemPayload;
}

interface REMOVE_ITEM_ACTION {
  type: "REMOVE_ITEM";
  payload: number;
}
type SnackAction = ADD_ITEM_ACTION | REMOVE_ITEM_ACTION;
type SnackReducer = (st: SnackbarState, action: SnackAction) => SnackbarState;
const snackReducer: SnackReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const item = action.payload;
      const id = new Date().getTime();
      return {
        items: [...state.items, { ...item, id }]
      };
    case "REMOVE_ITEM":
      return {
        items: [...state.items.filter((item) => item.id !== action.payload)]
      };

    default:
      return {
        ...state
      };
  }
};

const initialSnackState: SnackbarState = {
  items: []
};

export const SnackbarProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(snackReducer, initialSnackState);
  const ctxValue: SnackbarContextType = {
    items: state.items,
    addSnackItem: (item) => {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    deleteSnackItem: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    }
  };
  return <SnakbarCtx.Provider value={ctxValue}>{children}</SnakbarCtx.Provider>;
};

export const useSnackbar = (): SnackbarContextType => {
  const snackbCtx = React.useContext(SnakbarCtx);
  return snackbCtx;
};
