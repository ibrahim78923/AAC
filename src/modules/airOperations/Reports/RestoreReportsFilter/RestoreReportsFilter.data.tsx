import { RHFDatePicker } from '@/components/ReactHookForm';
import { RestoreReportsFilterDataDefaultValuesI } from './RestoreReportsFilter.interface';

export const restoreReportFiltersDefaultValues: any = (
  filterValue: RestoreReportsFilterDataDefaultValuesI,
) => {
  return {
    startDate: filterValue?.startDate ?? null,
    endDate: filterValue?.endDate ?? null,
  };
};

export const restoreReportFilterFormFieldsDynamic = (startDateWatch: any) => [
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
      minDate: startDateWatch,
    },
    component: RHFDatePicker,
  },
];

export const DATE_DIFFERENCE = {
  ZERO: 0,
};
