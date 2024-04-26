import { DATE_TIME_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns: any = (columnsProps: any) => {
  const { checkedRows, setCheckedRows, companiesData } = columnsProps;

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedRows(
      checked ? companiesData?.data?.companies?.map(({ _id }: any) => _id) : [],
    );
  };
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedRows?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={
            companiesData?.data?.companies?.length &&
            checkedRows?.length === companiesData?.data?.companies?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
      header: 'Company Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.owner?.name,
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
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI) ?? 'N/A',
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
