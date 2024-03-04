import Link from 'next/link';

import { Box, Button, Paper, Typography, Tooltip } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import { AIR_SALES } from '@/routesConstants/paths';

import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';
import RestoreDealModal from './RestoreDealModal';
import DealsActions from '../DealsActions';
import useRestore from './useRestore';

import { BackArrIcon, FilterIcon, RefreshTasksIcon } from '@/assets/icons';
import { RestoreTableColumns } from './RestoreTable.data';

const Restore = () => {
  const {
    handleRestoreFilter,
    IsRestoreFilterDrawer,
    setSearch,
    search,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
    restoeDealData,
    // handleCheckAll,
    // handleSingleChecked,
    checkedAll,
    handlePermanantDeleteRetore,
    setRestoreFilter,
    setIsRestoreFilterDrawer,
    setCheckedAll,
  } = useRestore();

  const columnsProps = {
    checkedAll: checkedAll,
    setCheckedAll: setCheckedAll,
    restoeDealData: restoeDealData,
  };

  const columnParams = RestoreTableColumns(columnsProps);

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
        <Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Box sx={{ mt: '5px' }}>
              <Link href={AIR_SALES?.DEAL}>
                <BackArrIcon />
              </Link>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme?.palette?.grey[600] }}
            >
              Restore Deals
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.custom['main'] }}
            >
              Restore Deals deleted in the last 90 days
            </Typography>
          </Box>
        </Box>

        {IsRestoreFilterDrawer && (
          <RestoreFilterDrawer
            open={IsRestoreFilterDrawer}
            onClose={handleRestoreFilter}
            setRestoreFilter={setRestoreFilter}
            setIsRestoreFilterDrawer={setIsRestoreFilterDrawer}
          />
        )}

        {isPermanantlyDel && (
          <RestoreDeleteModal
            open={isPermanantlyDel}
            onClose={handlePermanantDelete}
            handlePermanantDeleteRetore={() =>
              handlePermanantDeleteRetore(
                'HARD_DELETED',
                'Deal deleted successfully',
              )
            }
          />
        )}

        {IsRestoreDealModal && (
          <RestoreDealModal
            open={IsRestoreDealModal}
            onClose={handleResDealModal}
            handlePermanantDeleteRetore={() =>
              handlePermanantDeleteRetore(
                'ACTIVE',
                'Deal restored successfully',
              )
            }
          />
        )}
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
          <DealsActions
            menuItem={['Restore', 'Delete']}
            disableActionBtn={checkedAll.length > 0 ? false : true}
            onChange={handleActions}
            checkedRows={checkedAll}
          />
          <Tooltip title={'Refresh Filter'}>
            <Button variant="outlined" color="inherit" className="small">
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            color="inherit"
            className="small"
            onClick={handleRestoreFilter}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2 }}>
        <TanstackTable
          columns={columnParams}
          data={restoeDealData?.data?.deals}
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
