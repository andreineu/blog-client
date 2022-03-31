import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
      // #8b949e divider
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
