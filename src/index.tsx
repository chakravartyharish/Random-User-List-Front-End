import { Box, CircularProgress } from "@mui/material";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./i18n";

const App = lazy(() => import("./App"));

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
