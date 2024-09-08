import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseForProjectPieChart from "../components/expense/ExpenseForProjectPieChart";
import ExpenseForTypePieChart from "../components/expense/ExpenseForTypePieChart";
import ExpenseTable from "../components/expense/ExpenseTable";
import { useRooms } from "../hooks/room/useRooms.hook";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useProjects } from "../hooks/project/useProjects.hook";
import ExpenseAccordion from "../components/expense/ExpenseAccordion";
import { useExpenses } from "../hooks/expense/useExpenses.hook";
import PageLoader from "../components/shared/PageLoader";

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
  const { rooms } = useRooms(Number(projectId));

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
            {rooms.map((room) => (
              <Accordion key={room.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {room.name}
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <ExpenseForTypePieChart
                    projectId={Number(projectId)}
                    room={room}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </ExpenseAccordion>
        )}
      </Box>
    </PageLoader>
  );
}

export default ProjectPage;
