import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { BootstrapHttpService } from "./http/bootstrap-http.service";
import CreateRoomPage from "./pages/CreateRoomPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectsPage from "./pages/ProjectsPage";

export const queryClient = new QueryClient();

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    BootstrapHttpService.bootstrap().then(() => setReady(true));
  }, []);

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
            <Route path="/rooms/create" element={<CreateRoomPage />} />
          </Routes>
        </HashRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
