import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import MainRouter from "./MainRouter";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
