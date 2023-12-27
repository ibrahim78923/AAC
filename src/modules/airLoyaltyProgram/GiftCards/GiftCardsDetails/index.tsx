import { Box, Button } from '@mui/material';

import { GiftCardsDetailsHeader } from './GiftCardsDetailsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { rulesColumns, rulesList } from './GiftCardDetails.data';
import { ExportButton } from '@/components/ExportButton';

import FilterListIcon from '@mui/icons-material/FilterList';

export const GiftCardsDetails = () => {
  return (
    <>
      <Box>
        <GiftCardsDetailsHeader />
      </Box>
      <Box mt={2} border={'1px solid lightgrey'} borderRadius={3}>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'flex-end'}
          mx={2}
          gap={1}
          mt={2}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '0.5rem' }}
          >
            Filters
          </Button>
          <ExportButton />
        </Box>
        <Box mt={2}>
          <TanstackTable data={rulesList} columns={rulesColumns} isPagination />
        </Box>
      </Box>
    </>
  );
};
