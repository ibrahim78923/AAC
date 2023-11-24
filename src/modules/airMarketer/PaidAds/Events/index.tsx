import { Box, Button, useTheme } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { eventsTableColumns, eventsTableData } from './Events.data';
import useManage from '../Manage/useManage';
import { FilterrIcon } from '@/assets/icons';
import Search from '@/components/Search';
import usePaidAds from '../usePaidAds';
import PaidAdsFilterDrawer from '../FilterDrwaer';

const Events = () => {
  const theme = useTheme();
  const { statusBtnValue } = useManage();
  const { isFilterDrawer, setIsFilterDrawer } = usePaidAds();
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Search placeholder="Search" size="small" />
        <Button
          onClick={() => setIsFilterDrawer(true)}
          startIcon={<FilterrIcon />}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: theme?.palette?.custom?.main,
            width: '95px',
            height: '36px',
          }}
        >
          Filter
        </Button>
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
