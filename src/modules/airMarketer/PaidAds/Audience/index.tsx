import { Box, Button, useTheme } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { audienceTableColumns, audienceTableData } from './Audience.data';
import useManage from '../Manage/useManage';
import { FilterrIcon } from '@/assets/icons';
import Search from '@/components/Search';
import usePaidAds from '../usePaidAds';
import PaidAdsFilterDrawer from '../FilterDrwaer';

const Audience = () => {
  const theme = useTheme();
  const { statusBtnValue } = useManage();
  const { isFilterDrawer, setIsFilterDrawer } = usePaidAds();
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Search placeholder="Search" size="small" />
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
      <Box mt={2}>
        <TanstackTable
          columns={audienceTableColumns(statusBtnValue)}
          data={audienceTableData}
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

export default Audience;
