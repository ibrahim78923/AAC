import NoData from '@/components/NoData';
import { Grid } from '@mui/material';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../Dashboard.data';
import { createElement } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';

const { PRIORITY } = TICKET_GRAPH_TYPES ?? {};

export const StaticDashboardWidgets = (props: any) => {
  const {
    widgets,
    NoDataImage,
    NoDataMessage = 'No widgets found',
    NoDataHeight,
    gridSize = {},
    isPreviewMode = true,
    componentProps = {},
  } = props;

  if (!!!widgets?.length)
    return (
      <NoData
        message={NoDataMessage}
        image={NoDataImage}
        height={NoDataHeight}
      />
    );

  return (
    <Grid container spacing={3}>
      {widgets?.map((item: any) => (
        <Grid item xs={12} lg={6} {...gridSize} key={item?.name ?? item}>
          {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name ?? item] &&
            createElement(
              AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name ?? item],
              {
                ticketType: PRIORITY,
                isPreviewMode: isPreviewMode,
                ...componentProps,
              },
            )}
        </Grid>
      ))}
    </Grid>
  );
};
