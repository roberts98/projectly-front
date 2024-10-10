import { HashRouter, Route, Routes } from "react-router-dom";
import { CreateCategoryPage } from "./pages/CreateCategoryPage";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { CreateUserLinkPage } from "./pages/CreateUserLinkPage";
import { ProcessUserLinkPage } from "./pages/ProcessUserLinkPage";
import { ProjectPage } from "./pages/ProjectPage";
import { UserLinksPage } from "./pages/UserLinksPage";
import { Page } from "./components/layout/Page";

export function Router() {
  return (
    <HashRouter>
      <Page>
        <Routes>
          <Route path="/" element={<CreateProjectPage />} />
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
      </Page>
    </HashRouter>
  );
}
