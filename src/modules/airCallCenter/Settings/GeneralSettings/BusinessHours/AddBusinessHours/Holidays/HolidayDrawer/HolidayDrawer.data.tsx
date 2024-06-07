import {
  RHFCheckbox,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const defaultValues = {
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },

  name: '',
  addMore: false,
};

export const HolidayValidationSchema = Yup?.object()?.shape({
  dateRange: Yup?.mixed()?.nullable()?.required('dateRange is required'),
  name: Yup?.string()?.required('name is required'),
  addMore: Yup?.string(),
});

export const transactionFilterData = [
  {
    id: 2,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'DD-MM',
      required: true,
    },
    component: RHFDateRangePicker,
    md: 12,
  },

  {
    id: 5,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2355,
    componentProps: {
      name: 'addMore',
      label: 'Add More',
    },
    component: RHFCheckbox,
  },
];
