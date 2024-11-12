import backgroundImage from "../../assets/background_timeseries.png";
import { Box, Typography, Container } from "@mui/material";

const HomeScreenBackground: React.FC = () => {
  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "6%",
        marginLeft: "8%",
        marginRight: "8%",
        height: "75vh",
        width: "84%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          width: "80%",
          maxWidth: "600px",
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          boxShadow: 5,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Real-time Asset Tracker
        </Typography>
        <Typography variant="h6" gutterBottom>
          Monitor the movement of financial asset prices in real time
        </Typography>
      </Container>
    </Box>
  );
};

export default HomeScreenBackground;
