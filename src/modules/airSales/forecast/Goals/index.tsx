import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import { manageTableColumns } from './Goals.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import useForecast from '../useforecast';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { styles } from './Goals.style';
import useGoals from './useGoals';
import ViewDetailsDrwaer from '../ViewDetailsDrwaer';
import EditGoalsDrwaer from '../EditGoalsDrwaer';
import { AlertModals } from '@/components/AlertModals';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import GoalsFilterDrawer from '../GoalsDrwaer';

const Goals = () => {
  const { isViewDealDrawer, setIsViewDealDrawer } = useForecast();
  const {
    theme,
    anchorEl,
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
    handleDelete,
    loadingDelete,
    goalsTeamData,
    isLoadingTeam,
    isErrorTeam,
    isSuccessTeam,
    isFetchingTeam,
    setPageTeam,
    setPageLimitTeam,
    alignment,
    handleChange,
    isFilterDrawer,
    setIsFilterDrawer,
    setFilterValues,
  } = useGoals();

  return (
    <Box>
      <Box sx={{ marginBottom: '20px' }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            disableRipple
            value="User"
            sx={{
              color: theme?.palette?.primary?.main,
              backgroundColor: '#fff',
              border: `1px solid ${theme?.palette?.grey[0]}`,
              height: '40px',
              '&.Mui-selected': {
                backgroundColor: theme?.palette?.primary?.main,
                color: '#fff',
              },
              '&.Mui-selected:hover': {
                backgroundColor: theme?.palette?.primary?.main,
              },
              '&:hover': {
                backgroundColor: theme?.palette?.primary?.light,
              },
            }}
          >
            Users
          </ToggleButton>
          <ToggleButton
            disableRipple
            value="Team"
            sx={{
              color: theme?.palette?.primary?.main,
              backgroundColor: '#fff',
              border: `1px solid ${theme?.palette?.grey[0]}`,
              height: '40px',
              '&.Mui-selected': {
                backgroundColor: theme?.palette?.primary?.main,
                color: '#fff',
              },
              '&.Mui-selected:hover': {
                backgroundColor: theme?.palette?.primary?.main,
              },
              '&:hover': {
                backgroundColor: theme?.palette?.primary?.light,
              },
            }}
          >
            Teams
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment === 'User' ? (
        <>
          <Box
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
                  disabled={tableRowValues?.length < 1 ? true : false}
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
                    disabled={tableRowValues?.length > 1}
                  >
                    View Deal
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsEditDrawer(true);
                      setAnchorEl(null);
                    }}
                    disabled={tableRowValues?.length > 1}
                  >
                    Edit Goals
                  </MenuItem>
                  <MenuItem onClick={() => setIsDelete(true)}>Delete</MenuItem>
                </Menu>
                <Tooltip title={'Refresh Filter'}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="small"
                    onClick={() => {
                      setFilterValues('');
                    }}
                  >
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
              </Stack>
            </Box>
          </Box>
          <Box mt={2}>
            <TanstackTable
              columns={manageTableColumns(
                theme,
                tableRowValues,
                setTableRowValues,
                goalsData,
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
        </>
      ) : (
        <>
          <Box
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
                  disabled={tableRowValues?.length < 1 ? true : false}
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
                    disabled={tableRowValues?.length > 1}
                  >
                    View Deal
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsEditDrawer(true);
                      setAnchorEl(null);
                    }}
                    disabled={tableRowValues?.length > 1}
                  >
                    Edit Goals
                  </MenuItem>
                  <MenuItem onClick={() => setIsDelete(true)}>Delete</MenuItem>
                </Menu>

                <Tooltip title={'Refresh Filter'}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="small"
                    onClick={() => {
                      setFilterValues('');
                    }}
                  >
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
              </Stack>
            </Box>
          </Box>
          <Box mt={2}>
            <TanstackTable
              columns={manageTableColumns(
                theme,
                tableRowValues,
                setTableRowValues,
                goalsTeamData,
              )}
              data={goalsTeamData?.goals}
              isPagination
              isLoading={isLoadingTeam}
              isError={isErrorTeam}
              isFetching={isFetchingTeam}
              isSuccess={isSuccessTeam}
              setPageLimit={setPageLimitTeam}
              setPage={setPageTeam}
              currentPage={goalsTeamData?.meta?.page}
              count={goalsTeamData?.meta?.pages}
              pageLimit={goalsTeamData?.meta?.limit}
              totalRecords={goalsTeamData?.meta?.total}
              onPageChange={(page: any) => setPageTeam(page)}
            />
          </Box>
        </>
      )}

      {isViewDealDrawer && (
        <ViewDetailsDrwaer
          isOpenDrawer={isViewDealDrawer}
          tableRowValues={tableRowValues}
          onClose={() => setIsViewDealDrawer(false)}
          user={alignment}
        />
      )}
      {isEditDrawer && (
        <EditGoalsDrwaer
          isOpenDrawer={isEditDrawer}
          onClose={() => setIsEditDrawer(false)}
          tableRowValues={tableRowValues}
          setIsEditDrawer={setIsEditDrawer}
          setTableRowValues={setTableRowValues}
          user={alignment}
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
          handleDelete();
        }}
        loading={loadingDelete}
      />

      {isFilterDrawer && (
        <GoalsFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
          setIsFilterDrawer={setIsFilterDrawer}
          setFilterValues={setFilterValues}
        />
      )}
    </Box>
  );
};

export default Goals;
