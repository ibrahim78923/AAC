import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSingleGenericReportDetail } from './useSingleGenericReportDetail';
import { Box, Grid } from '@mui/material';
import { REPORTS_WIDGET_COMPONENT } from '@/modules/airServices/Dashboard/ReportsWidgets/ReportsWidgets.data';
import { createElement } from 'react';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const SingleGenericReportDetail = () => {
  const {
    reportWidgets = {},
    reportResults = {},
    downloadReport,
    reportRef,
    router,
    singleReportApi,
  } = useSingleGenericReportDetail?.();

  if (singleReportApi?.isLoading || singleReportApi?.isFetching)
    return <SkeletonTable />;

  if (singleReportApi?.isError) return <ApiErrorState />;

  return (
    <>
      <Box ref={reportRef} p={2}>
        <PageTitledHeader
          title={reportWidgets?.name}
          canMovedBack
          moveBack={() => router?.back()}
        >
          <LoadingButton onClick={() => downloadReport?.()}>
            Download PDF
          </LoadingButton>
        </PageTitledHeader>
        <br />
        <Grid container spacing={2}>
          {reportWidgets?.widgets?.map((item: any, index: any) => (
            <Grid item xs={12} key={item?._id}>
              {REPORTS_WIDGET_COMPONENT?.[item?.type] &&
                createElement(REPORTS_WIDGET_COMPONENT?.[item?.type], {
                  data: reportResults?.[index],
                  title: item?.title,
                  description: item?.text?.description,
                  isDateFilter: item?.isDateFilter,
                  tableColumns: item?.table?.fields,
                  barChart: item?.barChart,
                  pieChart: item?.genericChart,
                  donutChart: item?.genericChart,
                  filterQuery: item?.filterQuery,
                  results: reportResults,
                })}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
