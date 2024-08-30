import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectsPage from "./pages/ProjectsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Navbar from "./components/layout/Navbar";
import { CssBaseline } from "@mui/material";
import CreateRoomPage from "./pages/CreateRoomPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/rooms/create" element={<CreateRoomPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
