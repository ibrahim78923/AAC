import { Box, Button, Typography } from '@mui/material';
import { UserList, transactionTableData } from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import {
  CirclePlusIcon,
  ExportIcon,
  FilterLinesIcon,
  ImportIcon,
} from '@/assets/icons';
import { AddTransactionDrawer } from './AddTransactionDrawer';

export const Transactions = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
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
          <Button variant="outlined" color="inherit" startIcon={<ImportIcon />}>
            Import
          </Button>
          <Button
            onClick={() => setOpenDrawer(true)}
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
          <Button variant="outlined" color="inherit" startIcon={<ExportIcon />}>
            Export
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterLinesIcon />}
          >
            Filters
          </Button>
        </Box>
      </Box>
      <TanstackTable
        data={transactionTableData}
        columns={UserList}
        isPagination={true}
      />
      <AddTransactionDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};
