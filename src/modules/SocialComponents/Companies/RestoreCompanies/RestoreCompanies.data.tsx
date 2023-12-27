import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns: any = (columnsProps: any) => {
  const { checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (val: any, rowId: string) => {
    val?.target?.checked ? setCheckedRows(rowId) : setCheckedRows();
  };

  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.id}
          onChange={(e: any) => handleCheckboxChange(e, info?.row?.id)}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.name,
      id: 'name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
      header: 'Company Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.deletedBy,
      id: 'deletedBy',
      isSortable: true,
      header: 'Deleted By',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'timeDeleted',
      isSortable: true,
      header: 'Time Deleted',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format('dddd, MMMM D, YYYY - HH:mm') ?? 'N/A',
    },
  ];
};

export const restoreTableData = [
  {
    Id: 1,
    name: 'My File.pdf',
    deletedBy: '10',
    timeDeleted: '11',
  },
  {
    Id: 2,
    name: 'word.pdf',
    deletedBy: '6',
    timeDeleted: '11',
  },
  {
    Id: 3,
    name: 'My File.pdf',
    deletedBy: '2',
    timeDeleted: '11',
  },
];
