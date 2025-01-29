import NoData from '@/components/NoData';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../Dashboard.data';
import { createElement } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

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
    <ContainerGrid spacing={3}>
      {widgets?.map((item: any) => (
        <CustomGrid lg={6} {...gridSize} key={item?.name ?? item}>
          {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name ?? item] &&
            createElement(
              AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name ?? item],
              {
                ticketType: PRIORITY,
                isPreviewMode: isPreviewMode,
                ...componentProps,
              },
            )}
        </CustomGrid>
      ))}
    </ContainerGrid>
  );
};
