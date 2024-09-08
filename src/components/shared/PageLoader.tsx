import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  active: boolean;
  children: ReactNode;
}

function PageLoader({ active, children }: Props) {
  if (active) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 48px)"
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return children;
  }
}

export default PageLoader;
