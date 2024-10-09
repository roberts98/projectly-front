import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryTiles from "../components/category/CategoryTiles";
import ExpenseForBuyDateBarChart from "../components/expense/ExpenseForBuyDateBarChart";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseTable from "../components/expense/ExpenseTable";
import PageLoader from "../components/shared/PageLoader";
import { useExpenses } from "../hooks/expense/useExpenses.hook";
import { useProjects } from "../hooks/project/useProjects.hook";
import { usePassphraseStore } from "../store/project-auth.store";
import { useUserStore } from "../store/user.store";
import AuthProjectPage from "./AuthProjectPage";
import { Button, Spinner } from "flowbite-react";
import { useDeleteProject } from "../hooks/project/useDeleteProject.hook";

function ProjectPage() {
  const { projectId: projectIdString } = useParams();
  const { projects, areProjectsLoading } = useProjects();
  const allProjects = [...projects.personal, ...projects.shared];
  const projectId = Number(projectIdString);
  const project = allProjects.find((project) => project.id === projectId);
  const passphraseInStore = usePassphraseStore((state) =>
    state.passphrases.find((x) => x.projectId === projectId)
  );
  const { expenses, areExpensesLoading } = useExpenses(
    projectId,
    !!project?.isEncrypted,
    !areProjectsLoading,
    passphraseInStore?.passphrase
  );
  const userId = useUserStore((state) => state.user?.userId);
  const isOwned = project?.userId === userId;
  const { deleteProject, isDeletingProject } = useDeleteProject();

  useEffect(() => {
    document.title = `Projekt - ${project?.name || projectId}`;
  }, [project, projectId]);

  if (!projectId || allProjects.length === 0) {
    return null;
  }

  if (project?.isEncrypted && !passphraseInStore) {
    return <AuthProjectPage projectId={projectId} />;
  }

  function handleRemoveClick() {
    deleteProject(projectId);
  }

  return (
    <PageLoader active={areExpensesLoading}>
      <div className="flex justify-end mb-5">
        {isOwned &&
          (isDeletingProject ? (
            <Spinner />
          ) : (
            <Button
              color="failure"
              onClick={handleRemoveClick}
              disabled={isDeletingProject}
            >
              Usuń projekt
            </Button>
          ))}
      </div>
      <CategoryTiles projectId={projectId} expenses={expenses} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div
          className={`col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ${
            isOwned ? "xl:col-span-8" : "xl:col-span-12"
          }`}
        >
          <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
            Tabela wydatków
          </div>
          <div>
            <ExpenseTable
              projectId={projectId}
              readOnly={!isOwned}
              expenses={expenses}
              passphrase={passphraseInStore?.passphrase}
            />
          </div>
        </div>
        {isOwned && (
          <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
              Nowy wydatek
            </div>
            <ExpenseForm
              projectId={projectId}
              passphrase={passphraseInStore?.passphrase}
            />
          </div>
        )}

        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12">
          <ExpenseForBuyDateBarChart expenses={expenses} />
        </div>
      </div>
    </PageLoader>
  );
}

export default ProjectPage;
