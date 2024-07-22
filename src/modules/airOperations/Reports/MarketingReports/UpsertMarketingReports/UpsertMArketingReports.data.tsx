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
    chartType: CHARTS?.BAR_CHART,
    type: CHARTS?.TEMPLATE_BAR_CHART,
    xAxis: { label: 'Status', value: 'status', ref: null },
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.LEADS,
    description: 'Visualize your data',
  },

  {
    id: '1',
    title: 'Table',
    type: REPORT_TYPE?.TEMPLATE_TABLE,
    tableColumns: ['campaignOwner', 'status'],
    templateColumnsData: [
      {
        fieldType: FIELD_TYPE?.OBJECT_ID,
        fieldName: 'campaignOwner',
        collectionName: COLLECTION_NAME?.USERS,
      },
      {
        fieldType: FIELD_TYPE?.STRING,
        fieldName: 'status',
      },
    ],
    match: 'table',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs Table',
  },
  {
    id: '2',
    title: 'Form Views',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '68',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '3',
    title: 'CTA Rate',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '62%',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '4',
    title: 'Entraces',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '68',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '5',
    title: 'Average Time Per Page View',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '68',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '6',
    title: 'Total Submissions',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '156',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '7',
    title: 'CTA Clicks',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '06',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '8',
    title: 'CTA Views',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '42',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },
  {
    id: '9',
    title: 'Bounce Rate',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '40%',
    match: 'counter',
    templateType: REPORT_TYPE?.LEADS,
    description: 'LeadsCTAs',
  },

  {
    id: '10',
    title: 'Total Send',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '3282',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '11',
    title: 'Total Activity',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '08',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '12',
    title: 'Total Bounced',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '12',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '13',
    title: 'Total Unsuscribe',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '03',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '14',
    title: 'Report',
    chartType: CHARTS?.BAR_CHART,
    type: CHARTS?.TEMPLATE_BAR_CHART,
    xAxis: { label: 'Status', value: 'status', ref: null },
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'Visualize your data',
  },
  {
    id: '15',
    title: 'Total Unsubcribes',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '03',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '16',
    title: 'Total Software',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '0',
    match: 'counter',
    templateType: REPORT_TYPE?.EMAIL_MARKETING,
    description: 'EmailMarketing',
  },
  {
    id: '17',
    title: 'Total Add Spend',
    chartType: CHARTS?.BAR_CHART,
    type: CHARTS?.TEMPLATE_BAR_CHART,
    xAxis: { label: 'Status', value: 'status', ref: null },
    subFilter: true,
    match: REPORT_TYPE?.CHART,
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'Visualize your data',
  },
  {
    id: '18',
    title: 'Ad Campaigns',
    type: REPORT_TYPE?.TEMPLATE_TABLE,
    tableColumns: ['campaignOwner', 'status'],
    templateColumnsData: [
      {
        fieldType: FIELD_TYPE?.OBJECT_ID,
        fieldName: 'campaignOwner',
        collectionName: COLLECTION_NAME?.USERS,
      },
      {
        fieldType: FIELD_TYPE?.STRING,
        fieldName: 'status',
      },
    ],
    match: 'table',
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'General Table',
  },
  {
    id: '19',
    title: 'Impressions',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '4k',
    match: 'counter',
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'AdCampaigns',
  },
  {
    id: '20',
    title: 'Amount Spend',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '$20',
    match: 'counter',
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'AdCampaigns',
  },
  {
    id: '21',
    title: 'Clicks',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '93',
    match: 'counter',
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'AdCampaigns',
  },
  {
    id: '22',
    title: 'ROI',
    type: REPORT_TYPE?.TEMPLATE_TEXT,
    ticketCount: '50%',
    match: 'counter',
    templateType: REPORT_TYPE?.CAMPAIGNS,
    description: 'AdCampaigns',
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
    title: REPORT_TYPE?.LEADS,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.LEADS);
      closeMenu?.();
    },
  },
  {
    title: REPORT_TYPE?.EMAIL_MARKETING,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.EMAIL_MARKETING);
      closeMenu?.();
    },
  },
  {
    title: REPORT_TYPE?.CAMPAIGNS,
    handleClick: (closeMenu: any) => {
      setMetricType(REPORT_TYPE?.CAMPAIGNS);
      closeMenu?.();
    },
  },
];
