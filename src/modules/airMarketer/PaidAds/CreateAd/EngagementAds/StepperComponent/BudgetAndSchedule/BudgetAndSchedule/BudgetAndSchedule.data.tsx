import {
  RHFCheckbox,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const budgetValidationSchema = Yup.object().shape({
  budget: Yup.string().required('Field is Required'),
  strategy: Yup.string().required('Field is Required'),
  target: Yup.string(),
});

export const budgetDefaultValues = {
  budget: '',
  strategy: '',
  target: '',
  scheduleStart: null,
  scheduleEnd: null,
  time: null,
};

export const budgetDataArray = [
  {
    componentProps: {
      name: 'budget',
      label: 'Budget(£)',
      placeholder: 'Enter Here',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'strategy',
      label: 'Bid Strategy',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [{ value: 'minimize', label: 'Minimize conversions' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'target',
      label: 'Set target cost per action (optional)',
      placeholder: 'Enter Here',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'scheduleStart',
      label: 'Schedule',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'scheduleEnd',
      label: 'End',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'time',
      label: 'Time',
      fullWidth: true,
      select: true,
    },
    component: RHFTimePicker,
    md: 12,
  },
];
