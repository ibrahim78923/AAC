import dayjs from 'dayjs';
import * as yup from 'yup';
import { Checkbox } from '@mui/material';
import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const data: any = [
  {
    id: 1,
    type: 'purchase cost',
    cost: 1506.325,
    date: `${new Date()}`,
  },
  {
    id: 2,
    type: 'maintenance cost',
    cost: 1506.325,
    date: `${new Date()}`,
  },
];

export const dropdownDummy = [
  {
    value: 'purchase cost',
    label: 'purchase cost',
  },
  {
    value: 'maintenance cost',
    label: 'maintenance cost',
  },
];

export const addExpenseValidationSchema: any = yup?.object()?.shape({
  type: yup?.string()?.required('Required field!'),
  cost: yup
    ?.number()
    ?.positive()
    ?.typeError('Enter valid format!')
    ?.required('Required field!'),
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
      options: dropdownDummy,
      required: true,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 100,
    componentProps: {
      name: 'cost',
      fullWidth: true,
      placeholder: 'cost',
      label: 'Cost',
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
  expenseList: any,
  selectedExpenseList: any,
  setSelectedExpenseList: any,
) => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedExpenseList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target.checked
            ? setSelectedExpenseList([
                ...selectedExpenseList,
                expenseList?.find((item: any) => item?.id === info?.getValue()),
              ])
            : setSelectedExpenseList(
                selectedExpenseList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedExpenseList?.length === expenseList?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedExpenseList([...expenseList])
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
    cell: (info: any) => info?.getValue(),
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
