import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#D9D9D9",
    },
    background: {
      default: "#B9EDDD",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#577D86",
      secondary: "#000000",
    },
    success: {
      main: "#FFABAB",
    },
  },
});

export default customTheme;
