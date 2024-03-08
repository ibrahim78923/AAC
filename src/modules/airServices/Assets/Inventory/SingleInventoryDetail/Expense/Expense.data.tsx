import dayjs from 'dayjs';
import * as yup from 'yup';
import { Box, Checkbox } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { EXPENSE_TYPE } from '@/constants/strings';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const expenseTypeDropdown = [
  EXPENSE_TYPE?.PURCHASE,
  EXPENSE_TYPE?.MAINTENANCE,
];

export const addExpenseValidationSchema: any = yup?.object()?.shape({
  type: yup?.string()?.required('Required field!'),
  cost: yup?.string()?.required('Required field!'),
});

export const addExpenseDefaultValues = (selectedExpenseList: any) => {
  const expenseUpdateData = selectedExpenseList[0];

  return {
    type: expenseUpdateData?.type ?? '',
    cost: expenseUpdateData?.cost ?? '',
    date: expenseUpdateData?.date ?? new Date(),
  };
};

export const addExpenseFormData = [
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: 'Expense Type',
      placeholder: 'Expense Type',
      select: true,
      options: expenseTypeDropdown,
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
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EDIT_EXPENSE],
    handleClick: (close: any) => {
      handleActionClick('edit');
      close?.(false);
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_EXPENSE],
    handleClick: (close: any) => {
      handleActionClick?.('delete');
      close?.(false);
    },
  },
];
