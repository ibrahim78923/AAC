import { RHFDatePicker } from '@/components/ReactHookForm';

export const restoreReportFiltersDefaultValues: any = (filterValue: any) => {
  return {
    startDate: filterValue?.startDate ?? null,
    endDate: filterValue?.endDate ?? null,
  };
};

export const restoreReportFilterFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      placeholder: 'Select Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 2,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      placeholder: 'Select End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
];
