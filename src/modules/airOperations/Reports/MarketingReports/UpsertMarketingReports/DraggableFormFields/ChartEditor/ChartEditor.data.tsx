const CHART_METRICS = {
  FORM_VIEW: 'Form Views',
  CTA_RATE: 'CTA Rate',
  ENTRANCES: 'entrances',
  AVERGE_TIME_PER_PAGE_VIEW: 'Average Time Per Page View',
  TOTAL_SUBMISSIONS: 'Total Submissions',
  CTA_CLICKS: 'CTA Clicks',
  CTA_VIEWS: 'CTA Views',
  BOUNCE_RATE: 'Bounce Rate',
  TOTAL_SEND: 'Total send',
  TOTAL_ACTIVITY: 'Total Activity',
  TOTAL_BOUNCED: 'Total Bounced',
  TOTAL_UNSUBSCRIBE: 'Total Unsubscribe',
  IMPRESSIONS: 'Impressions',
  AMOUNT_SPEND: 'Amount Spend',
  CLICKS: 'Click',
  ROI: 'ROI',
};
export const LeadsCTAsMatrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.FORM_VIEW,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.FORM_VIEW);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CTA_RATE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CTA_RATE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.ENTRANCES,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.ENTRANCES);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.AVERGE_TIME_PER_PAGE_VIEW,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.AVERGE_TIME_PER_PAGE_VIEW);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.TOTAL_SUBMISSIONS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_SUBMISSIONS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CTA_CLICKS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CTA_CLICKS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CTA_VIEWS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CTA_VIEWS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.BOUNCE_RATE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.BOUNCE_RATE);
      closeMenu?.();
    },
  },
];
export const emailMarketingMatrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_SEND,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_SEND);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.TOTAL_ACTIVITY,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_ACTIVITY);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.TOTAL_BOUNCED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_BOUNCED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.TOTAL_UNSUBSCRIBE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_UNSUBSCRIBE);
      closeMenu?.();
    },
  },
];
export const adCampaignsMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.IMPRESSIONS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.IMPRESSIONS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.AMOUNT_SPEND,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.AMOUNT_SPEND);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CLICKS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CLICKS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.ROI,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.ROI);
      closeMenu?.();
    },
  },
];
