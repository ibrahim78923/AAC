import {
  CHARTS,
  COLLECTION_NAME,
  FIELD_TYPE,
  REPORT_TYPE,
} from '@/constants/strings';

export const defaultValues = () => {
  return {
    chartTitle: 'Report Chart',
    tableTitle: 'Report Table',
    textTitle: 'Report Text',
    xAxis: null,
  };
};

export const fieldsList = [
  {
    id: '0',
    title: 'Chart',
    match: REPORT_TYPE?.CHART,
    description: 'Visualize your data',
  },
  {
    id: '1',
    title: 'Text',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '2',
    title: 'Table',
    match: 'table',
    description: 'General Table',
  },
];

export const templateList = [
  {
    id: '0',
    title: 'Forecast Analytics',
    type: 'Horizontal Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'Visualize your data',
  },
  {
    id: '1',
    title: 'Over Time',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'Visualize your data',
  },
  {
    id: '2',
    title: 'Comparison',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'Visualize your data',
  },
  {
    id: '3',
    title: 'Overview',
    tableColumns: [
      'Owner',
      'New',
      'Follow up',
      'Under review',
      'Demo',
      'Negotiation',
      'Won',
      'Total revenue goal',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'General Table',
  },
  {
    id: '4',
    title: 'Month Deal Stage',
    tableColumns: [
      'Name',
      '5/1/2023',
      '5/2/2023',
      '5/3/2023',
      '5/4/2023',
      '5/5/2023',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'General Table',
  },
  {
    id: '5',
    title: 'Year Deal Stage',
    tableColumns: [
      'Name',
      'Jan 2023',
      'Feb 2023',
      'March 2023',
      'April 2023',
      'May 2023',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.FORECAST_CATEGORY,
    description: 'General Table',
  },
  {
    id: '6',
    title: 'Deals Analytics',
    chartType: CHARTS?.BAR_CHART,
    type: CHARTS?.TEMPLATE_BAR_CHART,
    xAxis: { label: 'Priority', value: 'priority', ref: null },
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.DEALS,
    description: 'Visualize your data',
  },
  {
    id: '7',
    title: 'Deals Analytics',
    chartType: CHARTS?.PIE_CHART,
    type: CHARTS?.TEMPLATE_PIE_OR_DONUT_CHART,
    xAxis: { label: 'Priority', value: 'priority', ref: null },
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.DEALS,
    description: 'Visualize your data',
  },
  {
    id: '8',
    title: 'Deals Overview',
    type: REPORT_TYPE?.TEMPLATE_TABLE,
    tableColumns: ['dealPipelineId', 'priority', 'billingFrequency'],
    templateColumnsData: [
      {
        fieldType: FIELD_TYPE?.OBJECT_ID,
        fieldName: 'dealPipelineId',
        collectionName: COLLECTION_NAME?.DEAL_PIPELINES,
      },
      {
        fieldType: FIELD_TYPE?.STRING,
        fieldName: 'priority',
      },
      {
        fieldType: FIELD_TYPE?.STRING,
        fieldName: 'billingFrequency',
      },
    ],
    match: 'table',
    templateType: REPORT_TYPE?.DEALS,
    description: 'General Table',
  },
  {
    id: '9',
    title: 'Total',
    ticketCount: '6',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    match: REPORT_TYPE?.COUNTER,
    templateType: REPORT_TYPE?.DEALS,
    description: 'Total deals count',
  },
  {
    id: '10',
    title: 'Open',
    ticketCount: '3',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    match: REPORT_TYPE?.COUNTER,
    templateType: REPORT_TYPE?.DEALS,
    description: 'Open deals count',
  },
  {
    id: '11',
    title: 'Close',
    ticketCount: '3',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    match: REPORT_TYPE?.COUNTER,
    templateType: REPORT_TYPE?.DEALS,
    description: 'Close deals count',
  },
  {
    id: '12',
    title: 'Forecast Analytics',
    type: 'Horizontal Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'Visualize your data',
  },
  {
    id: '13',
    title: 'Over Time',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'Visualize your data',
  },
  {
    id: '14',
    title: 'Comparison',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'Visualize your data',
  },
  {
    id: '15',
    title: 'Overview',
    tableColumns: [
      'Owner',
      'New',
      'Follow up',
      'Under review',
      'Demo',
      'Negotiation',
      'Won',
      'Total revenue goal',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'General Table',
  },
  {
    id: '16',
    title: 'Month Deal Stage',
    tableColumns: [
      'Name',
      '5/1/2023',
      '5/2/2023',
      '5/3/2023',
      '5/4/2023',
      '5/5/2023',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'General Table',
  },
  {
    id: '17',
    title: 'Year Deal Stage',
    tableColumns: [
      'Name',
      'Jan 2023',
      'Feb 2023',
      'March 2023',
      'April 2023',
      'May 2023',
    ],
    match: 'table',
    templateType: REPORT_TYPE?.PIPELINE_FORECAST,
    description: 'General Table',
  },
];

export const modalInitialState: any = {
  chart: false,
  text: false,
  table: false,
  counter: false,
};

export const salesMetrics = (setMetricType: any) => [
  {
    title: REPORT_TYPE?.DEALS,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.DEALS);
      closeMenu?.();
    },
  },
  {
    title: REPORT_TYPE?.PIPELINE_FORECAST,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.PIPELINE_FORECAST);
      closeMenu?.();
    },
  },
  {
    title: REPORT_TYPE?.FORECAST_CATEGORY,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.FORECAST_CATEGORY);
      closeMenu?.();
    },
  },
];
