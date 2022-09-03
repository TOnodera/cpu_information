import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import Layout from "./components/layouts/Layout";
import MainRouter from "./router/MainRouter";
import Titlebar from "./window/titlebar/Titlebar";

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#505050",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Titlebar />
      <Layout>
        <MainRouter />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
