import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { BootstrapHttpService } from "./http/bootstrap-http.service";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import { queryClient } from "./query-client";
import { useUserStore } from "./store/user.store";
import CreateUserLinkPage from "./pages/CreateUserLinkPage";
import UserLinksPage from "./pages/UserLinksPage";
import ProcessUserLinkPage from "./pages/ProcessUserLinkPage";

function App() {
  const [ready, setReady] = useState(false);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    BootstrapHttpService.bootstrap().then((response) => {
      setUserInfo(response);
      setReady(true);
    });
  }, [setUserInfo]);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
            <Route path="/projects/create" element={<CreateProjectPage />} />
            <Route path="/categories/create" element={<CreateCategoryPage />} />
            <Route
              path="/user-links/process/*"
              element={<ProcessUserLinkPage />}
            />
            <Route path="/user-links/create" element={<CreateUserLinkPage />} />
            <Route path="/user-links/list" element={<UserLinksPage />} />
          </Routes>
        </HashRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
