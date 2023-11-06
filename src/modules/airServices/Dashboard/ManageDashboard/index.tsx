import { FilterSharedIcon, ViewDetailBackArrowIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button, Grid, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';

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
  } = useManageDashboard();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1.5}
          >
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
              <ViewDetailBackArrowIcon />
              <Typography variant="h3" color="grey.800">
                Manage Dashboards
              </Typography>
            </Box>
            <Button
              LinkComponent={Link}
              href={AIR_SERVICES?.CREATE_DASHBOARD}
              startIcon={
                <AddCircleRoundedIcon sx={{ color: 'common.white' }} />
              }
              variant="contained"
              disableElevation
              sx={styles(matches)?.createDashboardButton}
            >
              Create Dashboard
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={styles(matches)?.tableBox}>
            <Box sx={styles(matches)?.tableHeaderBox}>
              <Search
                label="search"
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
