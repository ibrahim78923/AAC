import { Grid, Typography, useTheme } from '@mui/material';
import { createElement } from 'react';
import { REPORTS_WIDGET_COMPONENT } from './ReportsWidgets.data';
import { capitalizeFirstLetters } from '@/utils';

export const ReportsWidgets = (props: any) => {
  const theme = useTheme();
  const { reportWidgets, reportResults } = props;
  return (
    <>
      <Typography
        variant="h3"
        color={theme?.palette?.slateBlue?.main}
        sx={{ mb: 2 }}
      >
        {capitalizeFirstLetters(reportWidgets?.name)}
      </Typography>

      <Grid container spacing={3}>
        {reportWidgets?.widgets?.map((item: any, index: any) => (
          <Grid item xs={12} lg={6} key={item?._id}>
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
              })}
          </Grid>
        ))}
      </Grid>
    </>
  );
};
