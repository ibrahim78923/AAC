import {
  Box,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
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
import { isNullOrEmpty } from '@/utils';

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
    isError,
    isSuccess,
    isFetching,
    setSearch,
    handleDelete,
    loadingDelete,
    goalsTeamData,
    isLoadingTeam,
    isErrorTeam,
    isSuccessTeam,
    isFetchingTeam,
    alignment,
    handleChange,
    isFilterDrawer,
    setIsFilterDrawer,
    setFilterValues,
    filterValues,
    selectedSerial,
    setSelectedSerial,
  } = useGoals();

  // Choose the goals data based on the current alignment
  const activeGoalsData =
    alignment === 'Team' ? goalsTeamData?.goals : goalsData?.goals;

  // Function to handle the serial number click and show filtered goals
  const handleSerialClick = (serialNumber: any) => {
    if (selectedSerial === serialNumber) {
      setSelectedSerial(null);
    } else {
      setSelectedSerial(serialNumber);
    }
  };

  const uniqueSerialNumbers = Array?.from(
    new Set(
      activeGoalsData?.flatMap(
        (g: any) => g?.goals?.map((goal: any) => goal?.serialNumber),
      ),
    ),
  );

  // Filter the goals based on the selected serial number
  const filteredGoals = selectedSerial
    ? activeGoalsData
        ?.flatMap((g: any) => g?.goals)
        ?.filter((goal: any) => goal?.serialNumber === selectedSerial)
    : activeGoalsData?.flatMap((g: any) => g?.goals);

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
              placeholder="Search by number or Name"
              size="small"
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
            {isNullOrEmpty(selectedSerial) ? (
              <>
                {isLoading || isFetching ? (
                  [1, 2, 3]?.map((index: any) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      width="100%"
                      height={44}
                      sx={{ marginTop: '10px' }}
                    />
                  ))
                ) : (
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    {uniqueSerialNumbers?.map((serialNumber: any) => {
                      const goal = activeGoalsData
                        ?.flatMap((g: any) => g?.goals)
                        ?.find(
                          (goal: any) => goal?.serialNumber === serialNumber,
                        );

                      return (
                        <Button
                          disableRipple
                          key={serialNumber}
                          onClick={() => handleSerialClick(serialNumber)}
                          variant="contained"
                          sx={{
                            backgroundColor:
                              selectedSerial === serialNumber
                                ? 'blue'
                                : theme?.palette?.grey[600],
                            marginBottom: '10px',
                            justifyContent: 'start',
                          }}
                        >
                          #GL- {serialNumber} - {goal?.goalName}
                        </Button>
                      );
                    })}

                    {uniqueSerialNumbers?.length === 0 && (
                      <Typography sx={{ color: theme?.palette?.error?.main }}>
                        No data found
                      </Typography>
                    )}
                  </Box>
                )}
              </>
            ) : (
              <>
                <Button
                  disableRipple
                  sx={{
                    backgroundColor: theme?.palette?.grey[600],
                    marginBottom: '8px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme?.palette?.primary?.main,
                    },
                  }}
                  onClick={() => setSelectedSerial(null)}
                  className="small"
                >
                  Back
                </Button>
                <TanstackTable
                  columns={manageTableColumns(
                    theme,
                    tableRowValues,
                    setTableRowValues,
                    { goals: filteredGoals },
                  )}
                  data={filteredGoals}
                  isLoading={isLoading}
                  isError={isError}
                  isFetching={isFetching}
                  isSuccess={isSuccess}
                />
              </>
            )}
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
              placeholder="Search by number or Name"
              size="small"
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
            {isNullOrEmpty(selectedSerial) ? (
              <>
                {isLoadingTeam || isFetchingTeam ? (
                  [1, 2, 3]?.map((index: any) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      width="100%"
                      height={44}
                      sx={{ marginTop: '10px' }}
                    />
                  ))
                ) : (
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    {uniqueSerialNumbers?.map((serialNumber: any) => {
                      const goal = activeGoalsData
                        ?.flatMap((g: any) => g?.goals)
                        ?.find(
                          (goal: any) => goal?.serialNumber === serialNumber,
                        );

                      return (
                        <Button
                          disableRipple
                          key={serialNumber}
                          onClick={() => handleSerialClick(serialNumber)}
                          variant="contained"
                          sx={{
                            backgroundColor:
                              selectedSerial === serialNumber
                                ? 'blue'
                                : theme?.palette?.grey[600],
                            marginBottom: '8px',
                            justifyContent: 'start',
                          }}
                        >
                          #GL- {serialNumber} - {goal?.goalName}
                        </Button>
                      );
                    })}
                    {uniqueSerialNumbers?.length === 0 && (
                      <Typography sx={{ color: theme?.palette?.error?.main }}>
                        No data found
                      </Typography>
                    )}
                  </Box>
                )}
              </>
            ) : (
              <Box mt={2}>
                <Button
                  className="small"
                  disableRipple
                  sx={{
                    backgroundColor: theme?.palette?.grey[600],
                    marginBottom: '8px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme?.palette?.primary?.main,
                    },
                  }}
                  onClick={() => setSelectedSerial(null)}
                >
                  Back
                </Button>
                <TanstackTable
                  columns={manageTableColumns(
                    theme,
                    tableRowValues,
                    setTableRowValues,
                    { goals: filteredGoals },
                  )}
                  data={filteredGoals}
                  isLoading={isLoadingTeam}
                  isError={isErrorTeam}
                  isFetching={isFetchingTeam}
                  isSuccess={isSuccessTeam}
                />
              </Box>
            )}
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
          filterValues={filterValues}
        />
      )}
    </Box>
  );
};

export default Goals;
