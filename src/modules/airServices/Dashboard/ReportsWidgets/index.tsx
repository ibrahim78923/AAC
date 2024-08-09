import { Grid } from '@mui/material';
import { createElement } from 'react';
import {
  REPORTS_WIDGETS,
  REPORTS_WIDGET_COMPONENT,
} from './ReportsWidgets.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { MUI_GRID_LENGTH } from '@/constants/strings';

export const ReportsWidgets = (props: any) => {
  const { reportWidgets, reportResults } = props;
  return (
    <>
      <br />
      <PageTitledHeader title={reportWidgets?.name}>
        {reportWidgets?.isDateFilter && <></>}
      </PageTitledHeader>
      <Grid container spacing={2}>
        {reportWidgets?.widgets?.map((item: any, index: any) => (
          <Grid
            item
            xs={12}
            lg={
              item?.type === REPORTS_WIDGETS?.TEMPLATE_TEXT
                ? MUI_GRID_LENGTH?.SIX
                : MUI_GRID_LENGTH?.TWELVE
            }
            key={item?._id}
          >
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
    </>
  );
};
