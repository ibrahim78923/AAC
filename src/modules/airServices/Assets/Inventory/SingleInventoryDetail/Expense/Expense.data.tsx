import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { EXPENSE_TYPE } from '@/constants/strings';
import { ExpenseI } from './Expense.interface';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const EXPENSE_PORTAL_ACTIONS = {
  ADD_EXPENSE: 'Add New Expense',
  EDIT_EXPENSE: 'Update Expense',
  DELETE_EXPENSE: 'delete',
};

export const expenseTypeDropdown = [
  EXPENSE_TYPE?.PURCHASE,
  EXPENSE_TYPE?.MAINTENANCE,
];

export const addExpenseColumnsFunction = (
  expenseData: ExpenseI[],
  selectedExpenseList: ExpenseI[],
  setSelectedExpenseList: React.Dispatch<React.SetStateAction<ExpenseI[]>>,
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
          e?.target?.checked
            ? setSelectedExpenseList([
                ...selectedExpenseList,
                info?.row?.original,
              ])
            : setSelectedExpenseList(
                selectedExpenseList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
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
        checked={
          !!expenseData?.length
            ? selectedExpenseList?.length === expenseData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedExpenseList(expenseData)
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
    cell: (info: any) => (
      <Typography variant={'body3'} fontWeight={700}>
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.cost,
    id: 'cost',
    isSortable: true,
    header: 'Cost',
    cell: (info: any) => (info?.getValue() ? `£${info?.getValue()}` : '---'),
  },
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    isSortable: true,
    header: 'Date',
    cell: (info: any) =>
      info?.getValue()
        ? otherDateFormat(info?.getValue(), CALENDAR_FORMAT?.UI)
        : '---',
  },
];
