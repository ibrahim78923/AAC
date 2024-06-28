const CHART_METRICS = {
  TOTAL_DEALS: 'Total Deals',
  OPEN_DEALS: 'Open Deals',
  CLOSE_DEALS: 'Close Deals',
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
