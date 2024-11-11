import { AppBar, Container, Toolbar } from "@mui/material";
import MenuBurgerButton from "../../components/Layout/NavBar/MenuBurgerButton";
import MenuPages from "../../components/Layout/NavBar/MenuPages";

interface NavBarProps {
  children?: React.ReactNode;
}

export const NavBar = ({ children }: NavBarProps) => {
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuPages />
            <MenuBurgerButton />
          </Toolbar>
        </Container>
      </AppBar>
      <main style={{ marginTop: '64px' }}>{children}</main>
    </>
  );
};
