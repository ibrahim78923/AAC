import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button, Grid } from '@mui/material';
import {
  dashboardsData,
  manageDashboardsDataColumns,
} from './ManageDashboard.data';
import CustomPagination from '@/components/CustomPagination';
import { ManageDashboardFilter } from './ManageDashboardFilter';
import { filterFieldsManageDashboard } from './ManageDashboardFilter/ManageDashboardFilter.data';
import { useManageDashboard } from './useManageDashboard';
import { styles } from './ManageDashboard.styles';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const ManageDashboard = () => {
  const {
    matches,
    searchValue,
    SetSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    resetManageDashboardFilterForm,
    submitManageDashboardFilterForm,
    methodsManageDashboardFilterForm,
    router,
  } = useManageDashboard();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageTitledHeader
            title={'Manage Dashboards'}
            canMovedBack
            moveBack={() => router?.push(AIR_SERVICES?.DASHBOARD)}
            addTitle={'Create Dashboard'}
            createPermissionKey={[
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
            ]}
            handleAction={() => router?.push(AIR_SERVICES?.CREATE_DASHBOARD)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={styles(matches)?.tableBox}>
            <Box sx={styles(matches)?.tableHeaderBox}>
              <Search
                label="Search Here"
                width="100%"
                searchBy={searchValue}
                setSearchBy={SetSearchValue}
              />
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FilterSharedIcon />}
                onClick={() => setIsDrawerOpen(true)}
                sx={styles(matches)?.filterButton}
              >
                Filter
              </Button>
            </Box>
            <TanstackTable
              data={dashboardsData}
              columns={manageDashboardsDataColumns}
            />
            <CustomPagination
              count={1}
              rowsPerPageOptions={[10, 20, 30]}
              entriePages={10}
            />
          </Box>
        </Grid>
      </Grid>
      <ManageDashboardFilter
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        filterFields={filterFieldsManageDashboard}
        methods={methodsManageDashboardFilterForm}
        handleSubmit={submitManageDashboardFilterForm}
        handleReset={resetManageDashboardFilterForm}
      />
    </>
  );
};
