import React from "react";
import { TransitionGroup } from "react-transition-group";
import { Alert, Collapse, Box, Snackbar } from "@mui/material";

import { useSnackbar } from "../../hooks/useSnackbar";

export const SnackBar: React.FC = ({}) => {
  const { items, deleteSnackItem } = useSnackbar();

  const autoClose = (id: number) => {
    setTimeout(() => deleteSnackItem(id), 3000);
  };

  return (
    <>
      {items && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Box>
            <TransitionGroup>
              {items.map((snack) => {
                if (!snack.noAutoHide) {
                  autoClose(snack.id);
                }
                return (
                  <Collapse key={snack.id}>
                    <Alert
                      data-testid="snack-item"
                      sx={{ m: 2 }}
                      variant="filled"
                      severity={snack.severity || "error"}
                      onClose={() => deleteSnackItem(snack.id)}
                    >
                      {snack.message}
                    </Alert>
                  </Collapse>
                );
              })}
            </TransitionGroup>
          </Box>
        </Snackbar>
      )}
    </>
  );
};
