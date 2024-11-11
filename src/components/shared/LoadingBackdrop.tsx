import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const LoadingBackdrop: React.FC = () => {
  return (
    <Backdrop
      open
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cargando...
      </Typography>
    </Backdrop>
  );
};

export default LoadingBackdrop;