import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { HorizontalChart } from './HorizontalChart';
import { PieChart } from './PieChart';
import { Table } from './Table';
import { TemplateText } from './TemplateText';
import { Text } from './Text';

export const REPORTS_WIDGETS = {
  BAR_CHART: 'BAR_CHART',
  HORIZONTAL_BAR_CHART: 'HORIZONTAL_BAR_CHART',
  DONUT_CHART: 'DONUT_CHART',
  PIE_CHART: 'PIE_CHART',
  TEMPLATE_BAR_CHART: 'TEMPLATE_BAR_CHART',
  TEMPLATE_PIE_OR_DONUT_CHART: 'TEMPLATE_PIE_OR_DONUT_CHART',
  TABLE: 'TABLE',
  TEXT_FIELD: 'TEXT_FIELD',
  TEMPLATE_TABLE: 'TEMPLATE_TABLE',
  TEMPLATE_TEXT: 'TEMPLATE_TEXT',
  TEMPLATE_PIE_CHART: 'TEMPLATE_PIE_CHART',
  TEMPLATE_DONUT_CHART: 'TEMPLATE_DONUT_CHART',
  TEMPLATE_HORIZONTAL_BAR_CHART: 'TEMPLATE_HORIZONTAL_BAR_CHART',
};

export const REPORTS_WIDGET_COMPONENT: any = {
  [REPORTS_WIDGETS?.BAR_CHART]: BarChart,
  [REPORTS_WIDGETS?.DONUT_CHART]: DonutChart,
  [REPORTS_WIDGETS?.HORIZONTAL_BAR_CHART]: HorizontalChart,
  [REPORTS_WIDGETS?.PIE_CHART]: PieChart,
  [REPORTS_WIDGETS?.TABLE]: Table,
  [REPORTS_WIDGETS?.TEMPLATE_BAR_CHART]: BarChart,
  [REPORTS_WIDGETS?.TEMPLATE_PIE_OR_DONUT_CHART]: PieChart,
  [REPORTS_WIDGETS?.TEXT_FIELD]: Text,
  [REPORTS_WIDGETS?.TEMPLATE_TABLE]: Table,
  [REPORTS_WIDGETS?.TEMPLATE_TEXT]: TemplateText,
  [REPORTS_WIDGETS?.TEMPLATE_PIE_CHART]: PieChart,
  [REPORTS_WIDGETS?.TEMPLATE_DONUT_CHART]: DonutChart,
  [REPORTS_WIDGETS?.TEMPLATE_HORIZONTAL_BAR_CHART]: HorizontalChart,
};

export const reportsWidgetsMap = (item: any, data: any) => {
  const props = {
    data: data?.reportResults?.[data?.index],
    title: item?.title,
    description: item?.text?.description,
    isDateFilter: item?.isDateFilter,
    tableColumns: item?.table?.fields,
    barChart: item?.barChart,
    pieChart: item?.genericChart,
    donutChart: item?.genericChart,
    filterQuery: item?.filterQuery,
  };
  switch (item?.type) {
    case REPORTS_WIDGETS?.BAR_CHART:
    case REPORTS_WIDGETS?.TEMPLATE_BAR_CHART:
      return <BarChart {...props} />;

    case REPORTS_WIDGETS?.DONUT_CHART:
    case REPORTS_WIDGETS?.TEMPLATE_DONUT_CHART:
      return <DonutChart {...props} />;

    case REPORTS_WIDGETS?.PIE_CHART:
    case REPORTS_WIDGETS?.TEMPLATE_PIE_CHART:
      return <PieChart {...props} />;

    case REPORTS_WIDGETS?.HORIZONTAL_BAR_CHART:
    case REPORTS_WIDGETS?.TEMPLATE_HORIZONTAL_BAR_CHART:
      return <BarChart {...props} />;

    case REPORTS_WIDGETS?.TABLE:
    case REPORTS_WIDGETS?.TEMPLATE_TABLE:
      return <Table {...props} />;

    case REPORTS_WIDGETS?.TEMPLATE_TEXT:
      return <TemplateText {...props} />;

    case REPORTS_WIDGETS?.TEXT_FIELD:
      return <Text {...props} />;

    default:
      return <></>;
  }
};

export const ITEMS_DATA_TYPE = {
  OBJECT_ID: 'OBJECT_ID',
};
