import { CirclePlusIcon, FilterLinesIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';

export const TransactionsHeader = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}>
      <Typography variant="h3">Transactions</Typography>
      <Box display={'flex'} gap={1} mt={{ xs: 2, sm: 0 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterLinesIcon />}
          sx={{ borderRadius: '0.5rem' }}
        >
          Filters
        </Button>
        <Button startIcon={<CirclePlusIcon />} variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
};
