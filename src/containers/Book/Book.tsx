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
  console.log("Datos de assets:", assets);

  if (assets.length === 0) {
    return <Typography variant="h6">No hay activos disponibles.</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Precios de Activos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
        <TableBody>
            {assets.map((asset, index) => {
              console.log("Información del activo:", asset);
              return (
                <TableRow key={index}>
                  <TableCell>Activo: {asset.name}</TableCell>
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
