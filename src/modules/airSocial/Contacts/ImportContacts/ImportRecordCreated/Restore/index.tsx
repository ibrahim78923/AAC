import Link from 'next/link';
import { Box, Button, Paper, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';

import { CreatedRestoreTableData } from '@/mock/modules/airSales/Contacts/ImportHistoryData/ImportRecordTableCreated/CreatedRestoreData';

import useRestore from './useRestore';
import { CreatedRestoreTableColumns } from './RestoreTable.data';
import RestoreAssignModalBox from './RestoreAssignModalBox';
import ContactsActions from '../CreatedActions';

import { BackArrIcon, FilterIcon } from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';

const Restore = () => {
  const {
    handleRestoreFilter,
    isRestoreFilter,
    setSearch,
    search,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
  } = useRestore();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          mb: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Link href={AIR_SOCIAL?.IMPORT_RECORD_CREATED}>
            <BackArrIcon />
          </Link>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme?.palette?.grey[600] }}
            >
              Restore Contacts
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.custom['main'] }}
            >
              Restore Deals deleted in the last 90 days
            </Typography>
          </Box>
        </Box>

        <RestoreFilterDrawer
          open={isRestoreFilter}
          onClose={handleRestoreFilter}
        />
        <RestoreDeleteModal
          open={isPermanantlyDel}
          onClose={handlePermanantDelete}
        />
        <RestoreAssignModalBox
          open={IsRestoreDealModal}
          onClose={handleResDealModal}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: 2,
          gap: '15px',
        }}
      >
        <Box>
          <Search
            label="Search Here"
            searchBy={search}
            setSearchBy={setSearch}
            fullWidth
            autoComplete="off"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <ContactsActions
            menuItem={['Restore', 'Delete']}
            disableActionBtn={false}
            onChange={handleActions}
          />
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
            onClick={handleRestoreFilter}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2 }}>
        <TanstackTable
          columns={CreatedRestoreTableColumns}
          data={CreatedRestoreTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
};

export default Restore;
