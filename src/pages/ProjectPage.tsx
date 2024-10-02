import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpenseAccordion from "../components/expense/ExpenseAccordion";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseTable from "../components/expense/ExpenseTable";
import AuthForm from "../components/project/AuthForm";
import PageLoader from "../components/shared/PageLoader";
import { useExpenses } from "../hooks/expense/useExpenses.hook";
import { useProjects } from "../hooks/project/useProjects.hook";
import { usePassphraseStore } from "../store/project-auth-store";

function ProjectPage() {
  const { projectId: projectIdString } = useParams();
  const { projects, isLoading: areProjectsLoading } = useProjects();
  const projectId = Number(projectIdString);

  const project = projects.find((project) => project.id === projectId);
  const passphraseInStore = usePassphraseStore((state) =>
    state.passphrases.find((x) => x.projectId === projectId)
  );

  const { expenses, isLoading } = useExpenses(
    projectId,
    !!project?.isEncrypted,
    !areProjectsLoading,
    passphraseInStore?.passphrase
  );

  useEffect(() => {
    document.title = `Projekt - ${project?.name || projectId}`;
  }, [project]);

  if (!projectId || projects.length === 0 || isLoading) {
    return null;
  }

  if (project?.isEncrypted && !passphraseInStore) {
    return <AuthForm projectId={projectId} />;
  }

  const isEmptyProject = !isLoading && expenses.length === 0;

  return (
    <PageLoader active={isLoading}>
      <Box sx={{ padding: 2, mb: 5 }}>
        {!isEmptyProject && (
          <ExpenseAccordion name="Tabela wydatków" defaultExpanded={true}>
            <ExpenseTable projectId={projectId} expenses={expenses} />
          </ExpenseAccordion>
        )}
        <ExpenseAccordion name="Dodaj nowy przedmiot">
          <ExpenseForm
            projectId={projectId}
            passphrase={passphraseInStore?.passphrase}
          />
        </ExpenseAccordion>
        {/* Uncomment and implement as needed
        {!isEmptyProject && (
          <ExpenseAccordion name="Wykres z podziałem na pomieszczenia">
            <ExpenseForProjectPieChart projectId={projectId} />
          </ExpenseAccordion>
        )}
        {!isEmptyProject && (
          <ExpenseAccordion name="Wykres z podziałem na typy przdmiotów">
            {categories.map((category) => (
              <ExpenseAccordion key={category.id} name={category.name}>
                <ExpenseForTypePieChart
                  projectId={projectId}
                  category={category}
                />
              </ExpenseAccordion>
            ))}
          </ExpenseAccordion>
        )}
        */}
      </Box>
    </PageLoader>
  );
}

export default ProjectPage;
