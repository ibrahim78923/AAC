import { Box, Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { manageTableColumns } from './Goals.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import useForecast from '../useforecast';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { styles } from './Goals.style';
import useGoals from './useGoals';
import GoalsFilterDrawer from '../GoalsDrwaer';
import ViewDetailsDrwaer from '../ViewDetailsDrwaer';
import EditGoalsDrwaer from '../EditGoalsDrwaer';
import { AlertModals } from '@/components/AlertModals';

const Goals = () => {
  const {
    isFilterDrawer,
    setIsFilterDrawer,
    isViewDealDrawer,
    setIsViewDealDrawer,
  } = useForecast();
  const {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
    setAnchorEl,
    isEditDrawer,
    setIsEditDrawer,
    isDelete,
    setIsDelete,
    goalsData,
    isLoading,
    setPageLimit,
    setPage,
    isError,
    isSuccess,
    isFetching,
    search,
    setSearch,
  } = useGoals();

  return (
    <Box>
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Search
          placeholder="Search by Name"
          size="small"
          searchBy={search}
          setSearchBy={setSearch}
        />
        <Box display="flex" gap={1} flexWrap="wrap">
          <Stack
            direction={{ xs: 'row' }}
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="small"
              sx={styles?.actionButton(theme)}
              disabled={isDisabled}
            >
              Actions <ArrowDropDownIcon />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  setIsViewDealDrawer(true);
                  setAnchorEl(null);
                }}
              >
                View Deal
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsEditDrawer(true);
                  setAnchorEl(null);
                }}
              >
                Edit Goals
              </MenuItem>
              <MenuItem onClick={() => setIsDelete(true)}>Delete</MenuItem>
            </Menu>
          </Stack>
          <Tooltip title={'Refresh Filter'}>
            <Button variant="outlined" color="inherit" className="small">
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={() => setIsFilterDrawer(true)}
            startIcon={<FilterrIcon />}
            sx={{ border: `1px solid ${theme?.palette?.custom?.dark}` }}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        <TanstackTable
          columns={manageTableColumns(
            theme,
            isDisabled,
            setIsDisabled,
            tableRowValues,
            setTableRowValues,
          )}
          data={goalsData?.goals}
          isPagination
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          isSuccess={isSuccess}
          setPageLimit={setPageLimit}
          setPage={setPage}
          currentPage={goalsData?.meta?.page}
          count={goalsData?.meta?.pages}
          pageLimit={goalsData?.meta?.limit}
          totalRecords={goalsData?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
        />
      </Box>
      {isFilterDrawer && (
        <GoalsFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
        />
      )}
      {isViewDealDrawer && (
        <ViewDetailsDrwaer
          isOpenDrawer={isViewDealDrawer}
          onClose={() => setIsViewDealDrawer(false)}
        />
      )}
      {isEditDrawer && (
        <EditGoalsDrwaer
          isOpenDrawer={isEditDrawer}
          onClose={() => setIsEditDrawer(false)}
        />
      )}

      <AlertModals
        message={'Are you sure you want to delete this Goal?'}
        type={'delete'}
        open={isDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsDelete(false)}
        handleSubmitBtn={() => {
          setIsDelete(false);
        }}
      />
    </Box>
  );
};

export default Goals;
