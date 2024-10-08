import { Box, Grid } from '@mui/material';
import { createElement } from 'react';
import {
  REPORTS_WIDGETS,
  REPORTS_WIDGET_COMPONENT,
} from './ReportsWidgets.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { MUI_GRID_LENGTH } from '@/constants/strings';
import { TruncateText } from '@/components/TruncateText';

export const ReportsWidgets = (props: any) => {
  const { reportWidgets, reportResults } = props;
  if (!!!reportWidgets?.name && !!!reportWidgets?.widgets?.length) return;
  return (
    <Box
      border={'1px solid'}
      borderColor={'primary.main'}
      my={3}
      p={2}
      borderRadius={2}
    >
      {!!reportWidgets?.name && (
        <PageTitledHeader
          title={
            <TruncateText
              text={reportWidgets?.name}
              retainTextLeft={`Report Name :${'  '}`}
              size={40}
            />
          }
          titleColor="primary.main"
          titleVariant="h5"
          titleProps={{ fontWeight: 'fontWeightBold' }}
          outerMarginBottom={2}
        />
      )}
      <Grid container spacing={2}>
        {reportWidgets?.widgets?.map((item: any, index: any) => (
          <Grid
            item
            xs={12}
            lg={
              item?.type === REPORTS_WIDGETS?.TEXT_FIELD
                ? MUI_GRID_LENGTH?.TWELVE
                : MUI_GRID_LENGTH?.SIX
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
              })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
