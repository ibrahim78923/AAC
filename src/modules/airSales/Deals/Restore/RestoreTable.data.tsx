import { DATE_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';

import dayjs from 'dayjs';

export const RestoreTableColumns: any = (columnProps: any) => {
  const { checkedAll, setCheckedAll, restoeDealData } = columnProps;

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedAll([...checkedAll, id]);
    } else {
      setCheckedAll(checkedAll?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedAll(
      checked ? restoeDealData?.data?.deals?.map(({ _id }: any) => _id) : [],
    );
  };
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedAll?.includes(original?._id)}
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
            restoeDealData?.data?.deals?.length &&
            checkedAll?.length === restoeDealData?.data?.deals?.length
          }
        />
      ),
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row?._id,
    //   id: '_id',
    //   cell: (info: any) => (
    //     <Checkbox
    //       color="primary"
    //       name={info?.getValue()}
    //       checked={checkedAll?.includes(info?.row?.original?._id)}
    //       onChange={(event) => handleSingleChecked(event, info)}
    //     />
    //   ),
    //   header: (
    //     <Checkbox
    //       color="primary"
    //       name="id"
    //       checked={checkedAll.length === restoeDealData?.data?.deals?.length}
    //       onChange={handleCheckAll}
    //     />
    //   ),
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Deal Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.deletedBy?.name,
      id: 'deletedby',
      isSortable: true,
      header: 'Deleted By',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.deletedAt,
      id: 'deletedAt',
      isSortable: true,
      header: 'Time Deleted',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
  ];
};
