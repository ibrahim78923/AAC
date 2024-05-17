import { Box, Theme, Typography, useTheme } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './DealsOverview.data';
import { styles } from './DealsOverview.style';
import { dealsDataByResponse } from '@/modules/airSales/Reports/Reports.data';

const DealsOverview = () => {
  const theme = useTheme<Theme>();

  const dealsTableData = dealsDataByResponse?.data?.deals?.deals;
  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Typography
          variant="h5"
          sx={{ color: `${theme?.palette?.grey[800]}`, mb: { xs: '10px' } }}
        >
          Deals Overview
        </Typography>
        <Search label="Search here" />
      </Box>
      <TanstackTable
        columns={columns}
        data={dealsTableData}
        isPagination
        totalRecords={5}
      />
    </>
  );
};

export default DealsOverview;
