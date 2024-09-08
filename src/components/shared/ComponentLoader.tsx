import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  active: boolean;
  children: ReactNode;
}

function ComponentLoader({ active, children }: Props) {
  if (active) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  } else {
    return children;
  }
}

export default ComponentLoader;
