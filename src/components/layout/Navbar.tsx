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
          to="/projects/create"
          color="#fff"
          underline="none"
          component={RouterLink}
          sx={{ marginRight: 20 }}
        >
          Dodaj projekt
        </Link>
        <Link
          to="/categories/create"
          color="#fff"
          underline="none"
          component={RouterLink}
          sx={{ marginRight: 20 }}
        >
          Dodaj kategorię
        </Link>
        <Link
          to="/user-links/create"
          color="#fff"
          underline="none"
          component={RouterLink}
          sx={{ marginRight: 20 }}
        >
          Dodaj link dostępu
        </Link>
        <Link
          to="/user-links/list"
          color="#fff"
          underline="none"
          component={RouterLink}
        >
          Lista linków dostępu
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
