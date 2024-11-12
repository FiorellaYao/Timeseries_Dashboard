import { Box, CssBaseline } from "@mui/material";
import HomeScreenBackground from "../../components/Home/HomeScreenBackground"
import HomeAssets from "../../components/Home/HomeAssets"

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
        <HomeAssets />
      </Box>
    </Box>
  );
};

export default Home;
