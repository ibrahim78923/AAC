import { Box, Checkbox } from '@mui/material';
export const expenseTableColumns = (
  expensData: any,
  setexpensData: any,
  expensMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={!!expensData.find((item: any) => item.id === info.getValue())}
        onChange={(e: any) => {
          e.target.checked
            ? setexpensData([
                ...expensData,
                expensMainData.find((item: any) => item.id === info.getValue()),
              ])
            : setexpensData(
                expensData.filter((item: any) => {
                  return item.id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={expensData.length === expensMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setexpensData([...expensMainData])
            : setexpensData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.expenseType,
    id: 'Expense Type',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
    header: 'Expense Type',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.cost,
    id: 'Cost',
    isSortable: true,
    header: 'Cost',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.date,
    id: 'Date',
    isSortable: true,
    header: 'Date',
    cell: (info: any) => (
      <Box sx={{ color: 'blue.dull_blue', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
];

export const expenseTableData: any = [
  {
    id: '1',
    expenseType: 'Purchase Cost',
    cost: '$ 5499.00',
    date: 'October 30, 2022',
  },
  {
    id: '2',
    expenseType: 'Maintenance Cost',
    cost: '$$ 4999.00',
    date: 'October 30, 2022',
  },
  {
    id: '3',
    expenseType: 'Services Charges',
    cost: '$ 1608.00',
    date: 'October 30, 2022',
  },
];
