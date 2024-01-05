import Link from 'next/link';

import { Box, Button, Paper, Typography } from '@mui/material';

import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import { RestoreTableData } from '@/mock/modules/airSales/Deals/Restore';

import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';

import useRestore from './useRestore';
import { RestoreTableColumns } from './RestoreTable.data';
import RestoreAssignModalBox from './RestoreAssignModalBox';
import RestoreActions from '../ContactsActions';

import { BackArrIcon, FilterIcon } from '@/assets/icons';

const RestoreActivities = () => {
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
          <Link href={'/air-sales/contacts/view-details'}>
            <BackArrIcon />
          </Link>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme?.palette?.grey[600] }}
            >
              Restore Activities
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
          <RestoreActions
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
            {' '}
            Filter
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2 }}>
        <TanstackTable columns={RestoreTableColumns} data={RestoreTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
};

export default RestoreActivities;
