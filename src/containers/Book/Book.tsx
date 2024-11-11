import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

interface BookProps {
  assets: Asset[];
}

const Book = ({ assets }: BookProps) => {
  console.log("Asset data:", assets);

  if (assets.length === 0) {
    return <Typography variant="h6">No assets available</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Asset Prices
      </Typography>
      <TableContainer component={Paper}>
        <Table>
        <TableBody>
            {assets.map((asset, index) => {
              console.log("Asset information:", asset);
              return (
                <TableRow key={index}>
                  <TableCell>Asset: {asset.name}</TableCell>
                  <TableCell>Timestamp: {asset.timestamp}</TableCell>
                  <TableCell>Bid: {asset.bid}</TableCell>
                  <TableCell>Last: {asset.last}</TableCell>
                  <TableCell>Ask: {asset.ask}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Book;
