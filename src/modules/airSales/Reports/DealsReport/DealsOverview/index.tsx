import { Box, Theme, Typography, useTheme } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './DealsOverview.data';
import { styles } from './DealsOverview.style';
import { DealsOverviewProps } from '../DealsReports-interface';

const DealsOverview = (props: DealsOverviewProps) => {
  const {
    dealsReportsTable,
    setSearchBy,
    setPage,
    setLimit,
    isLoading,
    isError,
    isSuccess,
  } = props;
  const theme = useTheme<Theme>();

  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Typography
          variant="h5"
          sx={{ color: `${theme?.palette?.grey[800]}`, mb: { xs: '10px' } }}
        >
          Deals Overview
        </Typography>
        <Search label="Search here" setSearchBy={setSearchBy} />
      </Box>
      <TanstackTable
        columns={columns}
        data={dealsReportsTable?.deals}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
        count={dealsReportsTable?.meta?.pages}
        pageLimit={dealsReportsTable?.meta?.limit}
        totalRecords={dealsReportsTable?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        currentPage={dealsReportsTable?.meta?.page}
      />
    </>
  );
};

export default DealsOverview;
