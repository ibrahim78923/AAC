import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const FilterSalesWorkflow = Yup?.object()?.shape({
  status: Yup?.string(),
  type: Yup?.string(),
  createdBy: Yup?.string(),
});
export const salesWorkflowsFilterValues = {
  status: '',
  type: '',
  createdBy: '',
};
const statusOption = ['Enabled', 'Disabled', 'Draft'];
const typeOption = ['Deal', 'Quotes', 'Tasks', 'Meetings'];
const createdByOption = ['Jerome bell', 'Tom Curran', 'David Boon'];

export const salesWorkflowFilterFields = [
  {
    id: 434,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      options: statusOption,
    },
    component: RHFAutocomplete,
  },
  {
    id: 565,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      options: typeOption,
    },
    component: RHFAutocomplete,
  },
  {
    id: 865,
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,
      options: createdByOption,
    },
    component: RHFAutocomplete,
  },
];
