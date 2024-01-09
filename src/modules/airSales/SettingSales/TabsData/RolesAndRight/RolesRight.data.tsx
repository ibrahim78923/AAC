import { Checkbox } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { convertObjectIdToNumber } from '@/utils';

// table data starts here
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
          defaultChecked={checkedRows === info?.row?.original?._id}
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
        />
      ),
      header: <Checkbox disabled color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'roleId',
      cell: (info: any) => convertObjectIdToNumber(info?.getValue()),
      header: 'Role ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'roleName',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) =>
        info?.getValue()
          ? dayjs(info?.getValue()).format(DATE_FORMAT?.UI)
          : 'N/A',
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
// table data ends here
