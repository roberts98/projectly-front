import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpenseAccordion from "../components/expense/ExpenseAccordion";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseForProjectPieChart from "../components/expense/ExpenseForProjectPieChart";
import ExpenseForTypePieChart from "../components/expense/ExpenseForTypePieChart";
import ExpenseTable from "../components/expense/ExpenseTable";
import PageLoader from "../components/shared/PageLoader";
import { useExpenses } from "../hooks/expense/useExpenses.hook";
import { useProjects } from "../hooks/project/useProjects.hook";
import { useCategories } from "../hooks/category/useCategories.hook";

function ProjectPage() {
  const { projectId } = useParams();
  const { projects } = useProjects();

  if (!projectId) {
    return null;
  }

  useEffect(() => {
    const projectName = projects.find(
      (project) => project.id === Number(projectId)
    )?.name;
    document.title = `Projekt - ${projectName || projectId}`;
  }, [document, projectId, projects]);

  const { expenses, isLoading } = useExpenses(Number(projectId));
  const { categories } = useCategories(Number(projectId));

  const isEmptyProject = !isLoading && expenses.length === 0;

  return (
    <PageLoader active={isLoading}>
      <Box sx={{ padding: 2, mb: 5 }}>
        {!isEmptyProject && (
          <ExpenseAccordion name="Tabela wydatków" defaultExpanded={true}>
            <ExpenseTable projectId={Number(projectId)} expenses={expenses} />
          </ExpenseAccordion>
        )}
        <ExpenseAccordion name="Dodaj nowy przedmiot">
          <ExpenseForm projectId={Number(projectId)} />
        </ExpenseAccordion>
        {!isEmptyProject && (
          <ExpenseAccordion name="Wykres z podziałem na pomieszczenia">
            <ExpenseForProjectPieChart projectId={Number(projectId)} />
          </ExpenseAccordion>
        )}
        {!isEmptyProject && (
          <ExpenseAccordion name="Wykres z podziałem na typy przdmiotów">
            {categories.map((category) => (
              <ExpenseAccordion key={category.id} name={category.name}>
                <ExpenseForTypePieChart
                  projectId={Number(projectId)}
                  category={category}
                />
              </ExpenseAccordion>
            ))}
          </ExpenseAccordion>
        )}
      </Box>
    </PageLoader>
  );
}

export default ProjectPage;
