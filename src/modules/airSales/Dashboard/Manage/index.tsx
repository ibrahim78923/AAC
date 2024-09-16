import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Search from '@/components/Search';
import {
  ArrowLeft,
  FilterSharedIcon,
  PlusIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SALES } from '@/routesConstants/paths';
import Filters from './Filters';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Manage.data';
import useManage from './useManage';
import { AlertModals } from '@/components/AlertModals';

const Manage = () => {
  const {
    loadingDeleteDashboard,
    handleCloseDeleteModal,
    setIsDeleteModalOpen,
    dashboardListArray,
    isDeleteModalOpen,
    setIsFilterDrawer,
    setFilterValues,
    isFilterDrawer,
    handelNavigate,
    handleUpdateDefault,
    handleDelete,
    filterValues,
    setPageLimit,
    resetFilters,
    isLoading,
    currentUser,
    setPage,
    router,
    theme,
  } = useManage();

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
          <Stack
            direction={{ sm: 'row' }}
            gap={2}
            justifyContent="space-between"
          >
            <Stack direction="row" gap={1}>
              <Box
                mt={0.7}
                onClick={() =>
                  router?.push({ pathname: `${AIR_SALES?.SALES_DASHBOARD}` })
                }
                sx={{ cursor: 'pointer' }}
              >
                <ArrowLeft />
              </Box>
              <Typography variant="h3">Manage Dashboards</Typography>
            </Stack>
            <PermissionsGuard
              permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD]}
            >
              <Button
                startIcon={<PlusIcon />}
                variant="contained"
                className="small"
                onClick={handelNavigate}
              >
                Create Dashboard
              </Button>
            </PermissionsGuard>
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
                onClick={() => setIsFilterDrawer(true)}
              >
                Filter
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columnParams}
            data={dashboardListArray?.dynamicdashboards}
            totalRecords={dashboardListArray?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            count={dashboardListArray?.meta?.pages}
            pageLimit={dashboardListArray?.meta?.limit}
            currentPage={dashboardListArray?.meta?.page}
            setPageLimit={setPageLimit}
            isLoading={isLoading}
            setPage={setPage}
            isPagination
          />
        </Grid>
      </Grid>

      {isFilterDrawer && (
        <Filters
          isOpenDrawer={isFilterDrawer}
          onClose={setIsFilterDrawer}
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
