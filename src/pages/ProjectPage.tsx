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

  const { rooms } = useRooms(Number(projectId));

  return (
    <Box sx={{ padding: 2, mb: 5 }}>
      <ExpenseAccordion name="Tabela wydatków" defaultExpanded={true}>
        <ExpenseTable projectId={Number(projectId)} />
      </ExpenseAccordion>
      <ExpenseAccordion name="Dodaj nowy przedmiot">
        <ExpenseForm projectId={Number(projectId)} />
      </ExpenseAccordion>
      <ExpenseAccordion name="Wykres z podziałem na pomieszczenia">
        <ExpenseForProjectPieChart projectId={Number(projectId)} />
      </ExpenseAccordion>
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
    </Box>
  );
}

export default ProjectPage;
