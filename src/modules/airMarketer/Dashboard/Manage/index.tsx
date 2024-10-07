import { Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Search from '@/components/Search';
import useManage from './useManage';
import Filters from './Filters';
import {
  ArrowLeft,
  FilterSharedIcon,
  PlusIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Manage.data';
import { AlertModals } from '@/components/AlertModals';
import useDashboard from '../useDashboard';

const Manage = () => {
  const {
    marketingDashboardsListArray,
    loadingDeleteDashboard,
    handleCloseDeleteModal,
    setIsOpenFilterDrawer,
    setIsDeleteModalOpen,
    handleUpdateDefault,
    isOpenFilterDrawer,
    isDeleteModalOpen,
    setFilterValues,
    filterValues,
    handleDelete,
    resetFilters,
    setPageLimit,
    currentUser,
    isLoading,
    setPage,
    theme,
    router,
  } = useManage();
  const { handelNavigate } = useDashboard();

  const columnsProps = {
    setIsDeleteModalOpen: setIsDeleteModalOpen,
    theme: theme,
    router: router,
    handleUpdateDefault: handleUpdateDefault,
    currentUser: currentUser,
  };

  const columnParams = columns(columnsProps);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={{ sm: 'row' }} justifyContent="space-between">
            <Stack
              sx={{ cursor: 'pointer' }}
              onClick={() => router?.back()}
              direction="row"
              gap={1}
              alignItems="center"
            >
              <ArrowLeft />
              <Typography variant="h3">Manage Dashboards</Typography>
            </Stack>
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              className="small"
              onClick={handelNavigate}
            >
              Create Dashboard
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ sm: 'row' }}
            gap={2}
            justifyContent="space-between"
          >
            <Search
              label="Search by name"
              searchBy={filterValues?.search}
              setSearchBy={(value: string) =>
                setFilterValues({ ...filterValues, search: value })
              }
              size="small"
            />
            <Stack direction={{ sm: 'row' }} gap={1}>
              <Tooltip title={'Refresh Filter'}>
                <Button
                  sx={{ width: { xs: '100%', sm: '50px' } }}
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={resetFilters}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
              <Button
                className="small"
                color="inherit"
                variant="outlined"
                startIcon={<FilterSharedIcon />}
                onClick={() => setIsOpenFilterDrawer(true)}
              >
                Filter
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columnParams}
            data={marketingDashboardsListArray?.dynamicdashboards}
            totalRecords={marketingDashboardsListArray?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            count={marketingDashboardsListArray?.meta?.pages}
            pageLimit={marketingDashboardsListArray?.meta?.limit}
            currentPage={marketingDashboardsListArray?.meta?.page}
            setPageLimit={setPageLimit}
            isLoading={isLoading}
            setPage={setPage}
            isPagination
          />
        </Grid>
      </Grid>

      {isOpenFilterDrawer && (
        <Filters
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => setIsOpenFilterDrawer(false)}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      )}

      {isDeleteModalOpen?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete dashboard"
          type="delete"
          open={isDeleteModalOpen?.isToggle}
          handleClose={handleCloseDeleteModal}
          handleSubmitBtn={() => handleDelete(isDeleteModalOpen?.id)}
          loading={loadingDeleteDashboard}
        />
      )}
    </>
  );
};
export default Manage;
