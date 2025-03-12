import { Typography } from '@mui/material';
import { ExpenseI } from './Expense.interface';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';
import { tableCheckbox } from '@/utils/table-checkbox';
import { EXPENSE_TYPE } from '@/constants/services';

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
  tableCheckbox({
    selectedList: selectedExpenseList,
    setSelectedList: setSelectedExpenseList,
    tableData: expenseData,
  }),
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
