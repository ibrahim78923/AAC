import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  SelectPipeline: Yup.string(),
  CloseDate: Yup.string()?.nullable(),
});

export const filterDefaultValues = {
  SelectPipeline: '',
  CloseDate: null,
};

export const usersFilterArray = [
  {
    componentProps: {
      name: 'SelectPipeline',
      label: 'Select Pipeline',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'SalesPipeline', label: 'Sales Pipeline' },
      { value: 'TestPipeline', label: 'Test Pipeline' },
      {
        value: 'RegisterEmployeesPipeline',
        label: 'Register Employees Pipeline',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'CloseDate',
      label: 'Close date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
