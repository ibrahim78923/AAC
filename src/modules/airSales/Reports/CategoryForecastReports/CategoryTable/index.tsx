import { Box, Theme, Typography, useTheme } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { styles } from './CategoryTable.style';
import usePipelineOverview from './useCategoryTable';
import usePipelineForcastReports from '../useCategoryForcastReports';
import dayjs from 'dayjs';

const PipelineOverview = ({
  activeCard,
  data,
  CategoryForecastReportDataIsLoading,
  CategoryForecastReportDataIsFetching,
  CategoryForecastReportDataIsError,
  CategoryForecastReportDataIsSuccess,
  setPageLimit,
  setPage,
}: any) => {
  const theme = useTheme<Theme>();
  const { activeTable, cardTableHeader } = usePipelineOverview();
  const { activeCardObj } = usePipelineForcastReports();

  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Box>
          <Typography
            variant="h5"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            {cardTableHeader(activeCard)}
          </Typography>
          {activeCard !== activeCardObj?.TOTAL && (
            <Typography
              variant="body3"
              sx={{
                color: `${theme?.palette?.custom?.main}`,
                mb: { xs: '10px' },
              }}
            >
              {activeCard === activeCardObj?.OVERTIME
                ? 'Date range: This entire month'
                : `Date range: ${dayjs().year()}`}
            </Typography>
          )}
        </Box>

        {/* {activeCard === activeCardObj?.TOTAL && <Search label="Search here" />} */}
      </Box>
      <TanstackTable
        columns={activeTable(activeCard, data)}
        data={data?.paginated?.goals}
        isLoading={CategoryForecastReportDataIsLoading}
        isError={CategoryForecastReportDataIsError}
        isFetching={CategoryForecastReportDataIsFetching}
        isSuccess={CategoryForecastReportDataIsSuccess}
        setPageLimit={setPageLimit}
        setPage={setPage}
        currentPage={data?.paginated?.meta?.page}
        count={data?.paginated?.meta?.pages}
        pageLimit={data?.paginated?.meta?.limit}
        totalRecords={data?.paginated?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
    </>
  );
};

export default PipelineOverview;
