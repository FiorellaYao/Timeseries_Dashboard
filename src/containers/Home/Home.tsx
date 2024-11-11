import { Box, CssBaseline } from "@mui/material";
import HomeScreenBackground from "../../components/Home/HomeScreenBackground"
const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          margin: "auto",
          width: "100%",
        }}
      >
        <CssBaseline />
        <HomeScreenBackground />
      </Box>
    </Box>
  );
};

export default Home;
