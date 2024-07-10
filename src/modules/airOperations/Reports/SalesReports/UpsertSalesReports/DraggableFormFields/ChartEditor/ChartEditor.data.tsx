import { COLLECTION_NAME } from '@/constants/strings';

export const xAxesDataArray: any = {
  DEALS: [
    {
      label: 'Deals Pipelines',
      value: 'deals_dealPipelineId',
      ref: COLLECTION_NAME?.DEAL_PIPELINES,
    },
    { label: 'Priority', value: 'priority', ref: null },
    { label: 'Billing Frequency', value: 'billingFrequency', ref: null },
  ],
  PIPELINE_FORECAST: [
    { label: 'Status', value: 'status', ref: null },
    { label: 'Type', value: 'type', ref: null },
  ],
  FORECAST_CATEGORY: [
    { label: 'Contract Type', value: 'contractType', ref: null },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Contract Vendor',
      value: 'contract_vendor',
      ref: COLLECTION_NAME?.VENDORS,
    },
    {
      label: 'Contract Approver',
      value: 'contract_approver',
      ref: COLLECTION_NAME?.USERS,
    },
  ],
};
