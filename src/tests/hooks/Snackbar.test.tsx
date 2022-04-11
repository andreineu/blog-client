import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import { SnackbarProvider } from "../../context/snackbarProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

beforeEach(() => {});

describe("useSnackbar hook", () => {
  it("adds items to state", () => {
    const { result } = renderHook(() => useSnackbar(), {
      wrapper: SnackbarProvider
    });

    const item = { message: "new item" };

    act(() => {
      result.current.addSnackItem(item);
    });

    expect(
      result.current.items.find((e) => e.message === item.message)
    ).toBeTruthy();
  });

  it("auto-deletes item after time", () => {
    const { result } = renderHook(() => useSnackbar(), {
      wrapper: SnackbarProvider
    });
    const item = { message: "new item" };

    act(() => {
      result.current.addSnackItem(item);
    });
    waitFor(() => {
      expect(result.current.items.length === 0).toBeTruthy();
    });
  });

  it("deletes item", () => {
    const { result } = renderHook(() => useSnackbar(), {
      wrapper: SnackbarProvider
    });
    const item = { message: "new item" };

    act(() => {
      result.current.addSnackItem(item);
    });

    expect(result.current.items.length === 1).toBeTruthy();

    act(() => {
      result.current.deleteSnackItem(result.current.items[0].id);
    });

    expect(result.current.items.length === 0).toBeTruthy();
  });
});
