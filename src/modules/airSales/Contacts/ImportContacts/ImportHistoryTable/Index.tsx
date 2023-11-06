import { useRouter } from 'next/router';

import { Box, Button, Card, Paper, Typography, useTheme } from '@mui/material';

import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { SUPER_ADMIN } from '@/constants';

import { ImportHistoryTableData } from '@/mock/modules/airSales/Contacts/ImportHistoryData';

import { ContactsHistoryColumns } from './importHistory.data';
import useImportContacts from '../useImportCreated';
import FilterDrawer from '../FilterDrawer';

import { FilterIcon, ImportIcon } from '@/assets/icons';

const ImportHistoryTable = () => {
  const { handleFilterDrawer, isFilterDrawer } = useImportContacts();
  const theme = useTheme();
  const route = useRouter();

  return (
    <>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="space-between"
        gap={'10px'}
      >
        <Typography variant="h4">Import History</Typography>
        <Button
          variant="contained"
          onClick={() => route?.push(SUPER_ADMIN?.CONTACT_IMPORT)}
          startIcon={<ImportIcon />}
          sx={{ height: '35px' }}
        >
          Import
        </Button>
      </Box>
      <Card sx={{ mt: '20px' }}>
        <Box display="flex" justifyContent="space-between" px="20px" py="10px">
          <Search
            label={'Search Here'}
            width={250}
            searchBy={''}
            setSearchBy={() => {}}
          />
          <Button
            variant="outlined"
            sx={{
              height: '30px',
              color: theme?.palette?.custom['main'],
              my: '12px',
            }}
            onClick={handleFilterDrawer}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TanstackTable
              columns={ContactsHistoryColumns}
              data={ImportHistoryTableData}
            />
            <CustomPagination
              count={1}
              rowsPerPageOptions={[1, 2]}
              entriePages={1}
            />
          </Paper>
        </Box>
      </Card>
      <FilterDrawer open={isFilterDrawer} onClose={handleFilterDrawer} />
    </>
  );
};

export default ImportHistoryTable;
