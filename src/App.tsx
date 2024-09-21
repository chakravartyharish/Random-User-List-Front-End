import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContextProvider } from "./context/ThemeContext";
import { CACHE_KEY, UserProvider, useUser } from "./context/UserContext";

// Lazy load components
const LanguageSelector = lazy(() => import("./components/LanguageSelector"));
const ThemeToggle = lazy(() => import("./components/ThemeToggle"));
const UserList = lazy(() => import("./components/UserList"));

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

const AppContent: React.FC = () => {
  const { refreshUsers, error } = useUser();
  const { t } = useTranslation();

  const handleForceRefresh = async () => {
    localStorage.removeItem(CACHE_KEY);
    await refreshUsers();
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h2" component="h1">
          {t("appTitle")}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="contained" color="primary" onClick={refreshUsers}>
            {t("refreshUsers")}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleForceRefresh}
          >
            {t("forceRefresh")}
          </Button>
          <Suspense fallback={<CircularProgress size={24} />}>
            <ThemeToggle />
          </Suspense>
          <Suspense fallback={<CircularProgress size={24} />}>
            <LanguageSelector />
          </Suspense>
        </Box>
      </Box>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <Suspense fallback={<LoadingFallback />}>
        <UserList />
      </Suspense>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <UserProvider>
        <Suspense fallback={<LoadingFallback />}>
          <AppContent />
        </Suspense>
      </UserProvider>
    </ThemeContextProvider>
  );
};

export default App;
