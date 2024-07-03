export const CHART_METRICS = {
  TOTAL_DEALS: 'Total Deals',
  OPEN_DEALS: 'Open Deals',
  CLOSE_DEALS: 'Close Deals',
  ADD_METRIC: 'Add Metric',
};
export const dealsMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.OPEN_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.OPEN_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CLOSE_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CLOSE_DEALS);
      closeMenu?.();
    },
  },
];
export const pipelineMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.OPEN_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.OPEN_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CLOSE_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CLOSE_DEALS);
      closeMenu?.();
    },
  },
];
export const forecastMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.OPEN_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.OPEN_DEALS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CLOSE_DEALS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CLOSE_DEALS);
      closeMenu?.();
    },
  },
];

export const xAxesDataArray: any = {
  Deals: [
    {
      label: 'Inventory AssetType',
      value: 'inventory_assetType',
      ref: 'assettype',
    },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Inventory LocationId',
      value: 'inventory_locationId',
      ref: 'location',
    },
    {
      label: 'Inventory DepartmentId',
      value: 'inventory_departmentId',
      ref: 'department',
    },
    { label: 'Impact', value: 'impact', ref: null },
  ],
  Pipeline_Forecast: [
    { label: 'Status', value: 'status', ref: null },
    { label: 'Type', value: 'type', ref: null },
  ],
  Forecast_Category: [
    { label: 'Contract Type', value: 'contractType', ref: null },
    { label: 'Status', value: 'status', ref: null },
    { label: 'Contract Vendor', value: 'contract_vendor', ref: 'vendors' },
    { label: 'Contract Approver', value: 'contract_approver', ref: 'users' },
  ],
};
