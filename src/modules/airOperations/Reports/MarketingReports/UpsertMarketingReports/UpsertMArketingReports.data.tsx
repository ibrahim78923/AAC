export const MARKETING_REPORT_METRICS = {
  LEAD_CTAS: 'Leads CTAs',
  EMAIL_MARKETING: 'Email Marketing',
  ADS_CAMPAIGNS: "Ad's Campaigns",
};
export const fieldsList = [
  {
    id: '0',
    title: 'Chart',
    match: 'chart',
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
    title: 'Leads Geerated by CTA',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    yAxis: 'Status',
    subMetric: 'Users',
    subFilter: true,
    match: 'chart',
    templateType: 'Leads CTAs',
    description: 'Visualize your data',
  },

  {
    id: '1',
    title: 'Table',
    tableColumns: [
      'Form Name',
      'Page View',
      'Submissions',
      'Page Responses',
      'Status',
    ],
    match: 'table',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs Table',
  },
  {
    id: '2',
    title: 'Form Views',
    ticketCount: '68',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '3',
    title: 'CTA Rate',
    ticketCount: '62%',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '4',
    title: 'Entraces',
    ticketCount: '68',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '5',
    title: 'Average Time Per Page View',
    ticketCount: '68',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '6',
    title: 'Total Submissions',
    ticketCount: '156',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '7',
    title: 'CTA Clicks',
    ticketCount: '06',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '8',
    title: 'CTA Views',
    ticketCount: '42',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },
  {
    id: '9',
    title: 'Bounce Rate',
    ticketCount: '40%',
    match: 'counter',
    templateType: 'Leads CTAs',
    description: 'Leads CTAs',
  },

  {
    id: '10',
    title: 'Total Send',
    ticketCount: '3282',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '11',
    title: 'Total Activity',
    ticketCount: '08',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '12',
    title: 'Total Bounced',
    ticketCount: '12',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '13',
    title: 'Total Unsuscribe',
    ticketCount: '03',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '14',
    title: 'Report',
    type: 'Bar Chart',
    xAxis: 'subscribers',
    yAxis: 'unsubscribers',
    subMetric: 'Users',
    subFilter: true,
    match: 'chart',
    templateType: 'Email Marketing',
    description: 'Visualize your data',
  },
  {
    id: '15',
    title: 'Total Unsuscribe',
    ticketCount: '03',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '16',
    title: 'Total Software',
    ticketCount: '0',
    match: 'counter',
    templateType: 'Email Marketing',
    description: 'Email Marketing',
  },
  {
    id: '17',
    title: 'Impressions',
    ticketCount: '4k',
    match: 'counter',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },
  {
    id: '18',
    title: 'Amount Spend',
    ticketCount: '$20',
    match: 'counter',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },
  {
    id: '19',
    title: 'Clicks',
    ticketCount: '93',
    match: 'counter',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },
  {
    id: '20',
    title: 'ROI',
    ticketCount: '50%',
    match: 'counter',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },
  {
    id: '21',
    title: 'Total Add Spend',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    yAxis: 'Status',
    subMetric: 'Users',
    subFilter: true,
    match: 'chart',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },

  {
    id: '22',
    title: "Ad's Campaigns",
    tableColumns: [
      'Campaings Name',
      'Account Name',
      'ROI',
      'Revenue',
      'Impressions',
      'CLicks',
      'Cost per contact',
      'Amount Spend',
    ],
    match: 'table',
    templateType: "Ad's Campaigns",
    description: "Ad's Campaigns",
  },
];

export const modalInitialState: any = {
  chart: false,
  text: false,
  table: false,
  counter: false,
};

export const marketingMetrics = (setMetricType: any) => [
  {
    title: MARKETING_REPORT_METRICS?.LEAD_CTAS,
    handleClick: (closeMenu: any) => {
      setMetricType(MARKETING_REPORT_METRICS?.LEAD_CTAS);
      closeMenu?.();
    },
  },
  {
    title: MARKETING_REPORT_METRICS?.EMAIL_MARKETING,
    handleClick: (closeMenu: any) => {
      setMetricType(MARKETING_REPORT_METRICS?.EMAIL_MARKETING);
      closeMenu?.();
    },
  },
  {
    title: MARKETING_REPORT_METRICS?.ADS_CAMPAIGNS,
    handleClick: (closeMenu: any) => {
      setMetricType(MARKETING_REPORT_METRICS?.ADS_CAMPAIGNS);
      closeMenu?.();
    },
  },
];
