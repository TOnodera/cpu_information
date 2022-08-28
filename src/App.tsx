import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import Layout from "./components/layouts/Layout";
import MainRouter from "./router/MainRouter";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <MainRouter />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
