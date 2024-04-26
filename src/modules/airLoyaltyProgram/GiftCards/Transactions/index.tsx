import { Box, Button, Typography } from '@mui/material';
import { UserList, transactionTableData } from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import { CirclePlusIcon, ExportIcon, FilterLinesIcon } from '@/assets/icons';
import { AddTransaction } from './AddTransaction';
import { TransactionFilter } from './TransactionFilter';
import { ExportModal } from '@/components/ExportModal';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import ImportModal from './TransactionImportDrawer';
import { useTransaction } from './useTransaction';

export const Transactions = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    meta,
  } = useTransaction();
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
          setSearchBy={setSearch}
          searchBy={search}
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
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        count={meta?.pages}
        pageLimit={limit}
        currentPage={page}
        totalRecords={meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
      <AddTransaction openDrawer={openDrawer1} setOpenDrawer={setOpenDrawer1} />
      <TransactionFilter
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};
