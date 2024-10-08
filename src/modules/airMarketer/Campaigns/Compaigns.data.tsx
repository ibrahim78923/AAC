import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

export const compareInitialVals = {
  startDate: '',
  endDate: '',
  selectFirstCampaign: '',
  selectSecondCampaign: '',
};

export const compareCampaignArray = [
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectFirstCampaign',
      label: 'Select Campaign 1',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectSecondCampaign',
      label: 'Select Campaign 2',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
