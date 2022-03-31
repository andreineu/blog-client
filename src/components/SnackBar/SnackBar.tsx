import React from "react";
import { TransitionGroup } from "react-transition-group";
import { Alert, Collapse, Box, Snackbar } from "@mui/material";

import { useSnackbar } from ".";

export const SnackBar: React.FC = ({}) => {
  const { items: errors, deleteSnackItem } = useSnackbar();

  return (
    <>
      {errors && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Box>
            <TransitionGroup>
              {errors.map((err) => (
                <Collapse key={err.id}>
                  <Alert
                    sx={{ m: 2 }}
                    variant="filled"
                    severity={err.severity}
                    onClose={() => deleteSnackItem(err.id)}
                  >
                    {err.message}
                  </Alert>
                </Collapse>
              ))}
            </TransitionGroup>
          </Box>
        </Snackbar>
      )}
    </>
  );
};
