import Link from 'next/link';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import Search from '@/components/Search';
import { AIR_SALES } from '@/routesConstants/paths';

import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';
import RestoreDealModal from './RestoreDealModal';
import DealsActions from '../DealsActions';
import useRestore from './useRestore';

import { BackArrIcon, FilterIcon, RefreshTasksIcon } from '@/assets/icons';
import { RestoreTableColumns } from './RestoreTable.data';
import TanstackTable from '@/components/Table/TanstackTable';

const Restore = () => {
  const {
    handleRestoreFilter,
    IsRestoreFilterDrawer,
    setSearch,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
    restoeDealData,
    checkedAll,
    handlePermanantDeleteRetore,
    setRestoreFilter,
    setIsRestoreFilterDrawer,
    setCheckedAll,
    updateRestoreLoading,
    setPage,
    pageLimit,
    setPageLimit,
    getRestoreDealsLoading,
    isSuccess,
    restoreFilter,
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
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mt: '5px' }}>
              <Link href={AIR_SALES?.DEAL}>
                <BackArrIcon />
              </Link>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ colors: theme?.palette?.grey[600] }}
              >
                Restore Deals
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom['main'] }}
              >
                Restore Deals deleted in the last 90 days
              </Typography>
            </Box>
          </Box>
        </Box>

        {IsRestoreFilterDrawer && (
          <RestoreFilterDrawer
            open={IsRestoreFilterDrawer}
            onClose={handleRestoreFilter}
            setRestoreFilter={setRestoreFilter}
            setIsRestoreFilterDrawer={setIsRestoreFilterDrawer}
            restoreFilter={restoreFilter}
          />
        )}

        {isPermanantlyDel && (
          <RestoreDeleteModal
            open={isPermanantlyDel}
            onClose={handlePermanantDelete}
            updateRestoreLoading={updateRestoreLoading}
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
            updateRestoreLoading={updateRestoreLoading}
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
          <Search label="Search Here" setSearchBy={setSearch} size="small" />
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
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={() => setRestoreFilter({ dateStart: '', dateEnd: '' })}
            >
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
      <TanstackTable
        columns={columnParams}
        data={restoeDealData?.data?.deals}
        isPagination={true}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        count={restoeDealData?.data?.meta?.pages}
        totalRecords={restoeDealData?.data?.meta?.total}
        isLoading={getRestoreDealsLoading}
        isSuccess={isSuccess}
        currentPage={restoeDealData?.data?.meta?.page}
      />
    </Box>
  );
};

export default Restore;
