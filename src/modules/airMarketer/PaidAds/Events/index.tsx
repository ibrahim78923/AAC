import { Box, Button, Tooltip, useTheme } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { eventsTableColumns, eventsTableData } from './Events.data';
import useManage from '../Manage/useManage';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import Search from '@/components/Search';
import usePaidAds from '../usePaidAds';
import PaidAdsFilterDrawer from '../FilterDrwaer';

const Events = () => {
  const theme = useTheme();
  const { statusBtnValue } = useManage();
  const { isFilterDrawer, setIsFilterDrawer } = usePaidAds();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Search placeholder="Search" size="small" />
        <Box display="flex" gap={1}>
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
          columns={eventsTableColumns(statusBtnValue)}
          data={eventsTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      {isFilterDrawer && (
        <PaidAdsFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
        />
      )}
    </Box>
  );
};

export default Events;
