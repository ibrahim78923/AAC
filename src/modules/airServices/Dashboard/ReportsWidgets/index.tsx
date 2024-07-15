import { Button, Grid } from '@mui/material';
import { createElement } from 'react';
import { REPORTS_WIDGET_COMPONENT } from './ReportsWidgets.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const ReportsWidgets = (props: any) => {
  const { reportWidgets, reportResults } = props;
  return (
    <>
      <br />
      <PageTitledHeader title={reportWidgets?.name}>
        {reportWidgets?.isDateFilter && <Button></Button>}
      </PageTitledHeader>
      <Grid container spacing={2}>
        {reportWidgets?.widgets?.map((item: any) => (
          <Grid item xs={12} key={item?._id}>
            {REPORTS_WIDGET_COMPONENT?.[item?.type] &&
              createElement(REPORTS_WIDGET_COMPONENT?.[item?.type], {
                data: { counts: [], items: [] }, //TODO: will send the BE data once the data from BE is ready
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
    </>
  );
};
