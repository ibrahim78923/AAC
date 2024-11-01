import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';

export const delegateFilterDefaultValues = (data: any) => {
  return {
    status: data?.status ? data?.status : null,
    fromDate:
      typeof data?.fromDate === 'object' ? new Date(data?.fromDate) : null,
    toDate: typeof data?.toDate === 'object' ? new Date(data?.toDate) : null,
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
      name: 'fromDate',
      label: 'From Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'toDate',
      label: 'To Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
