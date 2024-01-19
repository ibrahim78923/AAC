import { Box, Button } from '@mui/material';

import { GiftCardsDetailsHeader } from './GiftCardsDetailsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { rulesColumns, rulesList } from './GiftCardDetails.data';

import FilterListIcon from '@mui/icons-material/FilterList';
import { GiftCardDetailsFilter } from './GiftCardDetailsFilter';
import { useState } from 'react';
import { AddTransaction } from './AddTransaction';
import { ExportModal } from '@/components/ExportModal';
import { ExportBlackIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const GiftCardsDetails = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [addTransaction, setAddTransaction] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileExportSubmit = (type: any) => {
    if (!!!type) {
      setOpen(false);
      return;
    }
    setOpen(false);
    enqueueSnackbar('File Exported Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return (
    <>
      <Box>
        <GiftCardsDetailsHeader setAddTransaction={setAddTransaction} />
      </Box>
      <Box mt={2} border={'1px solid lightgrey'} borderRadius={3}>
        <Box display={'flex'} justifyContent={'flex-end'} mx={2} gap={1} mt={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setOpenFilter(true)}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExportBlackIcon />}
            onClick={() => setOpen(true)}
          >
            Export
          </Button>
          <ExportModal
            open={open}
            onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
            handleClose={handleClose}
          />
        </Box>
        <Box mt={2}>
          <TanstackTable data={rulesList} columns={rulesColumns} isPagination />
        </Box>
      </Box>
      <GiftCardDetailsFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      />
      <AddTransaction
        addTransaction={addTransaction}
        setAddTransaction={setAddTransaction}
      />
    </>
  );
};
