import dayjs from 'dayjs';
import * as yup from 'yup';
import { Box, Checkbox } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const orderDropdown = ['Purchase Cost', 'maintenance cost'];

export const addExpenseValidationSchema: any = yup?.object()?.shape({
  type: yup?.string()?.required('Required field!'),
  cost: yup?.string()?.required('Required field!'),
});

export const addExpenseDefaultValues = {
  type: '',
  cost: '',
  date: new Date(),
};

export const addExpenseFormData = [
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: 'Expense Type',
      select: true,
      options: orderDropdown,
      required: true,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 100,
    componentProps: {
      name: 'cost',
      fullWidth: true,
      placeholder: 'cost',
      label: 'Cost (£)',
      required: true,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 97,
    componentProps: {
      fullWidth: true,
      name: 'date',
      label: 'Date',
    },
    gridLength: 12,
    component: RHFDatePicker,
  },
];

export const addExpenseColumnsFunction = (
  expenseData: any,
  selectedExpenseList: any,
  setSelectedExpenseList: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedExpenseList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target.checked
            ? setSelectedExpenseList([
                ...selectedExpenseList,
                expenseData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setSelectedExpenseList(
                selectedExpenseList?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={selectedExpenseList?.length === expenseData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedExpenseList([...expenseData])
            : setSelectedExpenseList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: true,
    header: 'Expense Type',
    cell: (info: any) => <Box fontWeight={700}>{info?.getValue()}</Box>,
  },
  {
    accessorFn: (row: any) => row?.cost,
    id: 'cost',
    isSortable: true,
    header: 'Cost',
    cell: (info: any) => (info?.getValue() ? `$${info?.getValue()}` : '---'),
  },
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    isSortable: true,
    header: 'Date',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format('MMMM DD, YYYY')
        : '---',
  },
];

export const expenseActionsDropdownFunction = (handleActionClick: any) => [
  {
    title: 'Edit',
    handleClick: () => {
      handleActionClick('edit');
    },
  },
  {
    title: 'Delete',
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];
