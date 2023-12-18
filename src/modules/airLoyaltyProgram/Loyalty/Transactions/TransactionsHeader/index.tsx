import { CirclePlusIcon, FilterLinesIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';
import { useTransitions } from '../useTransactions';
import UpsertTransactions from '../UpsertTransactions';
import Filters from '../Filters';

export const TransactionsHeader = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
  } = useTransitions();
  return (
    <Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}>
      <Typography variant="h3">Transactions</Typography>
      <Box display={'flex'} gap={1} mt={{ xs: 2, sm: 0 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterLinesIcon />}
          sx={{ borderRadius: '0.5rem' }}
          onClick={() => setIsFilterDrawerOpen(true)}
        >
          Filters
        </Button>
        <Filters
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
          title={'Filter'}
          okText={'Create'}
        />
        <Button
          startIcon={<CirclePlusIcon />}
          variant="contained"
          onClick={() => setIsDrawerOpen(true)}
        >
          Add
        </Button>
        <UpsertTransactions
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={'Add details'}
          okText={'Save'}
        />
      </Box>
    </Box>
  );
};
