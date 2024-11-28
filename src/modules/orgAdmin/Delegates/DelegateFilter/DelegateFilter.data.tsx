import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';
import { DATA_TYPES } from '@/constants/strings';

export const delegateFilterDefaultValues = (data: any) => {
  return {
    status: data?.status ? data?.status : null,
    dateStart:
      typeof data?.dateStart === DATA_TYPES?.OBJECT
        ? new Date(data?.dateStart)
        : null,
    dateEnd:
      typeof data?.dateEnd === DATA_TYPES?.OBJECT
        ? new Date(data?.dateEnd)
        : null,
  };
};

export const delegateFilterArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select Status',
      options: ['ACTIVE', 'INACTIVE'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'dateStart',
      label: 'From Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'dateEnd',
      label: 'To Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
