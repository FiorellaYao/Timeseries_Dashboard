import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";

const HomeAssets: React.FC = () => {
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const assets = [
    { name: "WTI", volatility: "47%", return: "6%" },
    { name: "SOY", volatility: "14%", return: "8%" },
    { name: "YPF", volatility: "46%", return: "16%" },
    { name: "SP500", volatility: "12%", return: "10%" },
  ];
  return (
    <Box
      style={{
        marginBottom: "40px",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Assets
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "3px",
            backgroundColor: "#000",
          }}
        />
      </Box>
      <Box
        style={{
          marginLeft: "10%",
          height: "40vh",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*Goes through all assets one by one*/}
        {assets.map((asset, index) => (
          <Container
            key={index}
            sx={{
              width: "250px",
              maxWidth: "600px",
              padding: 4,
              backgroundColor:
                asset.name === "WTI"
                  ? "#f8954c"
                  : asset.name === "SOY"
                  ? "#007dc4"
                  : asset.name === "YPF"
                  ? "#0031d9"
                  : "#e5db02",
              boxShadow: 5,
              borderRadius: 2,
              textAlign: "center",
              marginLeft: index !== 0 ? "25px" : "0",
              position: "relative", 
            }}
            onMouseEnter={() => setHoveredAsset(asset.name)}
            onMouseLeave={() => setHoveredAsset(null)}
          >
            <Typography variant="h3" gutterBottom>
              {asset.name}
            </Typography>

            {/* Show additional data when mouse is over asset*/}
            {hoveredAsset === asset.name && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "#00000099",
                  borderRadius: 2,
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  fontSize: "0.9rem",
                }}
              >
                <Typography variant="body1">
                  Volatility: {asset.volatility}
                </Typography>
                <Typography variant="body1">Return: {asset.return}</Typography>
              </Box>
            )}
          </Container>
        ))}
      </Box>
    </Box>
  );
};

export default HomeAssets;
