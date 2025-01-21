import { EXPENSE_TYPE } from '@/constants/strings';
import { localeDateTime } from '@/lib/date-time';
import * as yup from 'yup';
import { ExpenseI } from '../Expense.interface';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const expenseTypeDropdown = [
  EXPENSE_TYPE?.PURCHASE,
  EXPENSE_TYPE?.MAINTENANCE,
];

export const upsertExpenseFormValidationSchema: any = yup?.object()?.shape({
  type: yup?.string()?.required('Type is required!'),
  cost: yup
    ?.number()
    ?.positive('Must be above 0')
    ?.typeError('Must be a number')
    ?.nullable()
    ?.required('Cost is required!'),
  date: yup?.date(),
});

export const upsertExpenseFormDefaultValuesDynamic = (
  selectedExpenseList: ExpenseI,
) => {
  return {
    type: selectedExpenseList?.type ?? '',
    cost: selectedExpenseList?.cost ?? null,
    date: selectedExpenseList?.date
      ? localeDateTime(selectedExpenseList?.date)
      : new Date(),
  };
};

export const upsertExpenseFormFields = [
  {
    _id: 1,
    componentProps: {
      name: 'type',
      label: 'Expense Type',
      placeholder: 'Expense Type',
      options: expenseTypeDropdown,
      required: true,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    componentProps: {
      name: 'cost',
      placeholder: 'Cost',
      label: 'Cost (£)',
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      fullWidth: true,
      name: 'date',
      label: 'Date',
    },
    component: RHFDatePicker,
  },
];
