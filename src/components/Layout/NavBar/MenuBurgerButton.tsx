import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MenuBurgerButton = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    handleCloseNavMenu();

    setTimeout(() => {
      navigate(path);
    }, 150);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ color: "black" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ color: "black" }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          sx={{ mt: "40px" }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          MenuListProps={{ "aria-hidden": !Boolean(anchorElNav) }}
        >
          <MenuItem
            onClick={() => handleNavigation("/book")}
            sx={{ color: "black", textDecoration: "none" }}
          >
            Configuración
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default MenuBurgerButton;
