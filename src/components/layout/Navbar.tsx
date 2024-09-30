import { AppBar, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link
          to="/"
          color="#fff"
          underline="none"
          component={RouterLink}
          sx={{ marginRight: 20 }}
        >
          Strona główna
        </Link>
        <Link
          to="/categories/create"
          color="#fff"
          underline="none"
          component={RouterLink}
        >
          Dodaj pokój
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
