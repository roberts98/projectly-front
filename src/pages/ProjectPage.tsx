import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLoader } from "../components/shared/PageLoader";
import { useProjects } from "../hooks/project/useProjects.hook";
import { usePassphraseStore } from "../store/project-auth.store";
import { AuthProjectPage } from "./AuthProjectPage";
import { Tabs } from "flowbite-react";
import { ProjectData } from "../components/project/ProjectData.tsx";
import { ProjectSettings } from "../components/project/ProjectSettings.tsx";
import { ProjectHeader } from "../components/project/ProjectHeader.tsx";
import { useUserStore } from "../store/user.store.ts";
import { useTranslation } from "react-i18next";

export function ProjectPage() {
  const { t } = useTranslation();
  const { projectId: projectIdString } = useParams();
  const { projects, areProjectsLoading } = useProjects();
  const allProjects = [...projects.personal, ...projects.shared];
  const projectId = Number(projectIdString);
  const project = allProjects.find((project) => project.id === projectId);
  const passphraseInStore = usePassphraseStore((state) =>
    state.passphrases.find((x) => x.projectId === projectId),
  );
  const userId = useUserStore((state) => state.user?.userId);
  const isOwned = project?.userId === userId;

  useEffect(() => {
    document.title = `Projekt - ${project?.name || projectId}`;
  }, [project, projectId]);

  if (areProjectsLoading) {
    return <PageLoader active={areProjectsLoading} />;
  }

  if (!projectId || allProjects.length === 0 || !project) {
    return null;
  }

  if (project?.isEncrypted && !passphraseInStore) {
    return <AuthProjectPage projectId={projectId} />;
  }

  return (
    <section>
      <ProjectHeader project={project} isOwned={isOwned} />
      <Tabs>
        <Tabs.Item title={t("general.data")}>
          <ProjectData
            project={project}
            passphrase={passphraseInStore?.passphrase}
          />
        </Tabs.Item>
        {isOwned && (
          <Tabs.Item title={t("general.settings")}>
            <ProjectSettings project={project} />
          </Tabs.Item>
        )}
      </Tabs>
    </section>
  );
}
