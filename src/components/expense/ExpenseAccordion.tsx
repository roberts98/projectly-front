import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  name: string;
  defaultExpanded?: boolean;
}

function ExpenseAccordion({ children, name, defaultExpanded }: Props) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMore />}>{name}</AccordionSummary>
      <Divider />
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default ExpenseAccordion;
