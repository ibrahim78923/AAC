import { Box, Button, Typography } from '@mui/material';
import { UserList, transactionTableData } from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import {
  CirclePlusIcon,
  ExportIcon,
  FilterLinesIcon,
} from '@/assets/icons';
import { TransactionFilterDrawer } from './TransactionFilterDrawer';
import { AddTransactionDrawer } from './AddTransactionDrawer';
import { ExportModal } from '@/components/ExportModal';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import ImportModal from './TransactionImportDrawer';

export const Transactions = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h3" color="slateBlue.main">
          Gift Card Transactions
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
          <ImportModal />
          <Button
            onClick={() => setOpenDrawer1(true)}
            startIcon={<CirclePlusIcon />}
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Box>
      <br />
      <Box
        m={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Search
          label="Search Here"
          width={'16.25rem'}
          setSearchBy={setSearchValue}
          searchBy={searchValue}
        />
        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ExportIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setOpenModal(true)}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterLinesIcon />}
            onClick={() => setOpenDrawer(true)}
          >
            Filters
          </Button>
          <ExportModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            onSubmit={() => {
              enqueueSnackbar('Export Successfully', {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              });
              setOpenModal(false);
            }}
          />
        </Box>
      </Box>
      <TanstackTable
        data={transactionTableData}
        columns={UserList}
        isPagination={true}
      />
      <AddTransactionDrawer
        openDrawer={openDrawer1}
        setOpenDrawer={setOpenDrawer1}
      />
      <TransactionFilterDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};
