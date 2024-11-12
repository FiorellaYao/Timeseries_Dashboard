import { Box, Button, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink} from "react-router-dom";

const pages = [
  { name: "Home", path: "/home" },
  { name: "Book", path: "/book" },
  { name: "Plot", path: "/plot" }
];

const MenuPages = () => {
  const [_, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: {  xs: "none", md: "flex", justifyContent: "center", alignItems: "center", width: "100%"} }}>
   {pages.map((page) => (
        <Link
          key={page.name}
          component={RouterLink}
          to={page.path} 
          sx={{ color: "black", textDecoration: "none", margin: "0 10px" }}
        >
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "black", display: "block" }}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

export default MenuPages;
