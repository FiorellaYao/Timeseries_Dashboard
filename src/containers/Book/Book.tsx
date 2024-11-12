import { useState } from "react";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import styles from "./styles/Book.module.css";
import { useLocation } from "react-router-dom";
import useWebSocket from "../../hooks/useWebSocket";

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

interface BookProps {
  assets: Record<string, Asset[]>;
  setAssets: React.Dispatch<React.SetStateAction<Record<string, Asset[]>>>
}

const Book = ({ assets, setAssets }: BookProps) => {
  const location = useLocation();
  const [nameAsset, setNameAsset] = useState(
    location.state ? location.state.name : ""
  );
  const [search, setSearch] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [daysToSimulate, setDaysToSimulate] = useState<number>(0);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  // The value entered is taken in the input for the name of an asset
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setNameAsset(value);
    setSearch(false);
  };

  // Search for all the data that is entered for the asset
  const handleSearch = () => {
    const result = assets[nameAsset] || [];
    setFilteredAssets(result);
    setSearch(true);
  };

  // The value selected in the text field of days to simulate is taken
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDaysToSimulate(Number(value));
  };

  // The asset and day to simulate data are sent to websocket so that they can be shared with the backend
  useWebSocket(setAssets, daysToSimulate)

  return (
    <Box>
      <div className={styles.bookContainer}>
        <div className={styles.headerContainer}>
          <Typography variant="h4" className={styles.title}>
            Asset Prices
          </Typography>
        </div>

        <div className={styles.inputSector}>
          <TextField
            value={nameAsset}
            onChange={handleInputChange}
            label="Search Asset"
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSearch}
            className={styles.buttonSearch}
            variant="contained"
          >
            SEARCH
          </Button>
        </div>

        <div className={styles.inputSector}>
          <TextField
            value={daysToSimulate}
            onChange={handleDaysChange}
            label="Enter Number Of Days"
            type="number"
          />
        </div>
      </div>
      {search ? ( // Shows search results after clicking "Search"
        <>
          {filteredAssets.length === 0 ? (
            // Show "Invalid asset" message if there are no matches 
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                height: "150px",
                marginTop: "30px",
                marginLeft: "30px",
              }}
            >
              <Typography variant="h6" color="error">
                Invalid asset
              </Typography>
            </Box>
          ) : (
            // Show filtered assets if there are matches
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "flex-start",
                marginTop: "30px",
                marginLeft: "30px",
                marginBottom: "30px",
              }}
            >
              {filteredAssets.map((asset, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    width: "350px",
                    height: "170px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Top: asset name and timestamp */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginRight: "80px" }}
                    >
                      {asset.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {asset.timestamp}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* Bottom: Bid, Last and Ask values */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: "8px",
                      marginTop: "90px",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Bid: {asset.bid}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Last: {asset.last}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Ask: {asset.ask}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      ) : (
        // Show all assets if no search data was entered
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "flex-start",
            marginTop: "30px",
            marginLeft: "30px",
            marginBottom: "30px",
          }}
        >
       {Object.values(assets).flat().map((asset, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "350px",
                height: "170px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top: asset name and timestamp */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginRight: "80px" }}
                >
                  {asset.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {asset.timestamp}
                </Typography>
              </Box>

              <Divider />

              {/* Bottom: Bid, Last and Ask values */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "8px",
                  marginTop: "90px",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Bid: {asset.bid}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Last: {asset.last}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ask: {asset.ask}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Book;
