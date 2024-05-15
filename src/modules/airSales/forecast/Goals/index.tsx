import { Box, Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { manageTableColumns, manageTableData } from './Goals.data';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import useForecast from '../useforecast';
import ForecastFilterDrawer from '../FilterDrwaer';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { styles } from './Goals.style';
import useGoals from './useGoals';
import ViewDealsDrawer from '../ViewDealsDrwaer';

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
        <Search placeholder="Search" size="small" />
        <Box display="flex" gap={1}>
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
          data={manageTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      {isFilterDrawer && (
        <ForecastFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
        />
      )}
      {isViewDealDrawer && (
        <ViewDealsDrawer
          isOpenDrawer={isViewDealDrawer}
          onClose={() => setIsViewDealDrawer(false)}
        />
      )}
    </Box>
  );
};

export default Goals;
