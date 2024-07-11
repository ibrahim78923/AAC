import { COLLECTION_NAME } from '@/constants/strings';

export const xAxesDataArray: any = {
  CAMPAIGN: [
    {
      label: 'Campaign Owner ',
      value: 'campaign_campaignOwner',
      ref: COLLECTION_NAME?.USERS,
    },
    { label: 'Campaign Status', value: 'campaignStatus', ref: null },
  ],
  EMAIL_MARKETING: [
    { label: 'Status', value: 'status', ref: null },
    { label: 'Type', value: 'type', ref: null },
  ],
  LEAD_CTAS: [
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
