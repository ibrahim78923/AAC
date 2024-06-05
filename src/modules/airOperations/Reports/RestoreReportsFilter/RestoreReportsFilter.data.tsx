import { RHFDatePicker } from '@/components/ReactHookForm';

export const restoreReportFiltersDefaultValues: any = (filterValue: any) => {
  return {
    owner: filterValue?.owner ?? null,
    assigned: filterValue?.assigned ?? null,
    createdDate: filterValue?.createdDate ?? null,
  };
};

export const restoreReportFilterFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'owner',
      label: 'Report Owner',
      placeholder: 'Select report owner',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 2,
    componentProps: {
      name: 'assigned',
      label: 'Assigned',
      placeholder: 'Select Assignee',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
];
