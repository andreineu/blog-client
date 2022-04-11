import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/Button" {
  interface OutlinedInputPropsVariantOverrides {
    noHover: true;
  }
}
// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    // mode: "light",
    primary: {
      main: "#556cd6"
    },

    background: {
      default: "#0d1117",
      paper: "#161b22"
      // #161b22--color-header-bg
      // #8b949e dividerP
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    text: {
      primary: "#bfbfbf"
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => [
          {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider
            }
          },
          ownerState?.disabled || ownerState?.error
            ? {}
            : {
                "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider
                }
              }
        ]
      }
    }
  }
});

export default theme;
